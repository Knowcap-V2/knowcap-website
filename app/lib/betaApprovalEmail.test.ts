// Run: npm test  (node:test via tsx — no DB, no SMTP; both are faked)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  deliverApprovalEmail,
  resendApprovalEmail,
  type ApprovalEmailRecord,
  type SendMail,
} from './betaApprovalEmail'

const NOW = new Date('2026-09-30T10:00:00Z')
const LATER = new Date('2026-09-30T11:00:00Z')
const applicant = { id: 'app_1', email: 'ada@example.com', name: 'Ada Lovelace', approvedAt: NOW }

function fakeStore() {
  const saved: Array<{ id: string; record: ApprovalEmailRecord }> = []
  return { saved, saveOutcome: async (id: string, record: ApprovalEmailRecord) => { saved.push({ id, record }) } }
}

const okSender = (sent: unknown[]): SendMail => async (msg) => { sent.push(msg) }
const gmailRejects: SendMail = async () => {
  throw new Error('Invalid login: 535-5.7.8 Username and Password not accepted')
}

test('successful send records status=sent, clears the error and stamps sentAt', async () => {
  const store = fakeStore()
  const sent: any[] = []
  const result = await deliverApprovalEmail(applicant, { send: okSender(sent), saveOutcome: store.saveOutcome }, NOW)

  assert.equal(sent.length, 1)
  assert.equal(sent[0].to, 'ada@example.com')
  assert.match(sent[0].html, /Hi Ada,/)
  assert.deepEqual(store.saved, [{
    id: 'app_1',
    record: { approvalEmailStatus: 'sent', approvalEmailError: null, approvalEmailSentAt: NOW },
  }])
  assert.equal(result.persisted, true)
})

test('failed send records status=failed with the real SMTP error, not a password hint', async () => {
  const store = fakeStore()
  const result = await deliverApprovalEmail(applicant, { send: gmailRejects, saveOutcome: store.saveOutcome }, NOW)

  assert.deepEqual(store.saved, [{
    id: 'app_1',
    record: {
      approvalEmailStatus: 'failed',
      approvalEmailError: 'Invalid login: 535-5.7.8 Username and Password not accepted',
    },
  }])
  assert.equal(result.outcome.status, 'failed')
  assert.ok(!('approvalEmailSentAt' in store.saved[0].record), 'failure must not overwrite the last success time')
})

test('missing GMAIL_APP_PASSWORD is recorded as a failure with that reason', async () => {
  const store = fakeStore()
  await deliverApprovalEmail(applicant, { send: null, saveOutcome: store.saveOutcome }, NOW)
  assert.equal(store.saved[0].record.approvalEmailStatus, 'failed')
  assert.match(store.saved[0].record.approvalEmailError ?? '', /GMAIL_APP_PASSWORD is not set/)
})

test('a failed status write does not throw (approval must not become a 500)', async () => {
  const sent: any[] = []
  const result = await deliverApprovalEmail(applicant, {
    send: okSender(sent),
    saveOutcome: async () => { throw new Error('db down') },
  }, NOW)
  assert.equal(result.outcome.status, 'sent')
  assert.equal(result.persisted, false)
})

test('resend after a failed send re-sends and flips the status to sent', async () => {
  const store = fakeStore()
  await deliverApprovalEmail(applicant, { send: gmailRejects, saveOutcome: store.saveOutcome }, NOW)

  const sent: any[] = []
  const res = await resendApprovalEmail(applicant, { send: okSender(sent), saveOutcome: store.saveOutcome }, LATER)

  assert.equal(res.status, 200)
  assert.equal(sent.length, 1)
  assert.deepEqual(store.saved.map((s) => s.record.approvalEmailStatus), ['failed', 'sent'])
  assert.deepEqual(store.saved[1].record, {
    approvalEmailStatus: 'sent', approvalEmailError: null, approvalEmailSentAt: LATER,
  })
  assert.equal(res.body.emailed, true)
  assert.equal(res.body.approvalEmailStatus, 'sent')
})

test('resend that fails again returns 200 with the new error recorded', async () => {
  const store = fakeStore()
  const res = await resendApprovalEmail(applicant, { send: gmailRejects, saveOutcome: store.saveOutcome }, LATER)
  assert.equal(res.status, 200)
  assert.equal(res.body.emailed, false)
  assert.match(String(res.body.approvalEmailError), /Username and Password not accepted/)
  assert.equal(store.saved[0].record.approvalEmailStatus, 'failed')
})

test('resend refuses unknown (404) and not-yet-approved (409) applications without sending', async () => {
  const store = fakeStore()
  const sent: any[] = []
  const deps = { send: okSender(sent), saveOutcome: store.saveOutcome }

  assert.equal((await resendApprovalEmail(null, deps)).status, 404)
  assert.equal((await resendApprovalEmail({ ...applicant, approvedAt: null }, deps)).status, 409)
  assert.equal(sent.length, 0)
  assert.equal(store.saved.length, 0)
})
