// Build-time schema-drift guard.
//
// Fails the build if the live database is MISSING any column the Prisma schema
// declares — the exact failure that silently broke beta signups (the DB never
// got the teamSize/topChallenge/... columns, so writes threw P2022 at runtime).
//
// One-directional on purpose: it only checks that every model's scalar columns
// EXIST in the DB. It deliberately ignores extra tables/columns the DB has that
// the schema doesn't (e.g. RecruitmentApplication_seed_backup, legacy columns),
// so it never proposes a destructive change — unlike `prisma db push`.
//
// Read-only: a single information_schema query per table over the normal
// DATABASE_URL (transaction pooler is fine for reads). Fail-OPEN on connection
// errors (don't block deploys on a transient DB blip); fail-CLOSED on real drift.

import pkg from '@prisma/client'
import pg from 'pg'

const { Prisma } = pkg
const { Client } = pg

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.warn('[drift-check] DATABASE_URL not set — skipping (fail-open).')
  process.exit(0)
}

// Prisma DMMF → { table: [columnName, ...] } for scalar fields only.
const models = Prisma.dmmf.datamodel.models
const expected = models.map((m) => ({
  table: m.dbName || m.name,
  columns: m.fields
    .filter((f) => f.kind === 'scalar')
    .map((f) => f.dbName || f.name),
}))

const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
} catch (e) {
  console.warn('[drift-check] could not connect (fail-open):', e.message)
  process.exit(0)
}

let drift = false
try {
  for (const { table, columns } of expected) {
    const res = await client.query(
      'SELECT column_name FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2',
      ['public', table]
    )
    const have = new Set(res.rows.map((r) => r.column_name))
    if (res.rows.length === 0) {
      console.error(`[drift-check] ✖ table "${table}" not found in the database`)
      drift = true
      continue
    }
    const missing = columns.filter((c) => !have.has(c))
    if (missing.length) {
      drift = true
      console.error(`[drift-check] ✖ table "${table}" is missing column(s): ${missing.join(', ')}`)
    }
  }
} catch (e) {
  console.warn('[drift-check] query error (fail-open):', e.message)
  await client.end().catch(() => {})
  process.exit(0)
}

await client.end().catch(() => {})

if (drift) {
  console.error(
    '\n[drift-check] BUILD BLOCKED: the database is missing columns the Prisma schema expects.\n' +
      'Apply the migration to the DB (session pooler, port 5432), e.g.:\n' +
      '  ALTER TABLE "<table>" ADD COLUMN IF NOT EXISTS "<col>" <type>;\n' +
      'then redeploy. This guard prevents shipping code whose writes/reads would fail at runtime.\n'
  )
  process.exit(1)
}

console.log('[drift-check] ✓ all schema columns present in the database.')
process.exit(0)
