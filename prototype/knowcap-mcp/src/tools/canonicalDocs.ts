/**
 * MCP tools for canonical-document auto-update.
 *
 * Registers four tools that expose the loop to an external Claude/agent over MCP.
 * Follows the exact registration pattern of tools/memories.ts: one
 * server.registerTool per verb, zod inputSchema, safeCall → jsonResult,
 * everything routed through KnowcapClient (X-API-Key + x-knowcap-org headers).
 *
 * TRUST CONTRACT — encoded the same way update_memory_review encodes it:
 *   - list_canonical_documents / list_document_edit_proposals = read-only.
 *   - confirm_document_edit is the ONLY mutating tool, and on the server it maps
 *     to the named-human confirm + Google Docs write-back. An agent calling it
 *     is acting AS the authenticated human (the API key is user-scoped), so the
 *     "named human confirmed" provenance holds — there is no autonomous-write
 *     path. An agent CANNOT propose-and-apply in one shot.
 *
 * Wire-up (one line, same as every other registrar) in src/server-factory.ts:
 *     import { registerCanonicalDocTools } from './tools/canonicalDocs.js'
 *     registerCanonicalDocTools(server, client, cfg)
 *
 * And the thin client wrappers this expects, added to src/client.ts after
 * searchMemories(...) — each a one-liner over the existing get/post:
 *
 *     listCanonicalDocuments(organizationId?: string) {
 *       const qs = organizationId ? `?organizationId=${organizationId}` : ''
 *       return this.get(`/api/hierarchy/canonical-docs${qs}`, organizationId)
 *     }
 *     listDocEditProposals(docId: string, organizationId?: string) {
 *       return this.get(`/api/hierarchy/canonical-docs/${docId}/proposals`, organizationId)
 *     }
 *     confirmDocEdit(proposalId: string, organizationId?: string) {
 *       return this.post(`/api/hierarchy/canonical-docs/${proposalId}/confirm`, {}, organizationId)
 *     }
 *     reviewDocEdit(proposalId: string, action: 'reject' | 'snooze', organizationId?: string) {
 *       return this.post(`/api/hierarchy/canonical-docs/${proposalId}/${action}`, {}, organizationId)
 *     }
 */

import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { KnowcapClient } from '../client.js'
import type { Config } from '../config.js'
import { jsonResult, safeCall } from './helpers.js'

export function registerCanonicalDocTools(server: McpServer, client: KnowcapClient, _cfg: Config) {
  server.registerTool(
    'list_canonical_documents',
    {
      title: 'List linked canonical documents',
      description:
        'List the company canonical documents (strategy / positioning / brand etc.) that have been linked from Google Drive into Knowcap and are eligible for decision-driven auto-update. Returns each doc with its section map and the external revision Knowcap last saw.',
      inputSchema: {
        organizationId: z.string().uuid().optional().describe('Scope to one org. Omit for the caller default.'),
      },
    },
    async ({ organizationId }) =>
      safeCall(async () => jsonResult(await client.listCanonicalDocuments(organizationId))),
  )

  server.registerTool(
    'list_document_edit_proposals',
    {
      title: 'List pending edits proposed for a canonical document',
      description:
        'List the PENDING edits a confirmed decision proposed for a canonical document. Each proposal carries the target section, the current block (before), the proposed rewrite, a one-line diff summary, and the triggering decision as evidence. These are PROPOSED ONLY — nothing is written to the real Google Doc until a named human confirms.',
      inputSchema: {
        documentId: z.string().uuid(),
        organizationId: z.string().uuid().optional(),
      },
    },
    async ({ documentId, organizationId }) =>
      safeCall(async () => jsonResult(await client.listDocEditProposals(documentId, organizationId))),
  )

  server.registerTool(
    'confirm_document_edit',
    {
      title: 'Confirm a proposed edit and write it back to the Google Doc',
      description:
        'Confirm a single pending edit. On confirm the server (1) re-checks the doc has not changed since the proposal was drafted, then (2) writes the approved block back into the real Google Doc in-place, scoped to that section only, with optimistic-concurrency protection and the doc\'s native version history as the undo. This is a named-human action: the API key is user-scoped, so confirming IS the human confirmation — there is no autonomous propose-and-apply. Org owner/admin only; returns the new Google Docs revision id.',
      inputSchema: {
        proposalId: z.string().uuid(),
        organizationId: z.string().uuid().optional(),
      },
    },
    async ({ proposalId, organizationId }) =>
      safeCall(async () => jsonResult(await client.confirmDocEdit(proposalId, organizationId))),
  )

  server.registerTool(
    'review_document_edit',
    {
      title: 'Reject or snooze a proposed document edit',
      description:
        'Reject (the decision does not actually change this section) or snooze (revisit in 7 days) a pending proposed edit. Never writes to the doc. Org owner/admin only.',
      inputSchema: {
        proposalId: z.string().uuid(),
        action: z.enum(['reject', 'snooze']),
        organizationId: z.string().uuid().optional(),
      },
    },
    async ({ proposalId, action, organizationId }) =>
      safeCall(async () => jsonResult(await client.reviewDocEdit(proposalId, action, organizationId))),
  )
}
