// Derives the Supabase SESSION pooler URL (port 5432) from DATABASE_URL (which
// points at the TRANSACTION pooler, port 6543). Prisma `db push` / `migrate`
// need a session-level connection to run DDL and take advisory locks — the
// transaction pooler cannot, and hangs. The runtime PrismaClient keeps using
// DATABASE_URL (transaction pooler) unchanged; this URL is used ONLY for the
// build-time `db push` via the datasource `directUrl`.
//
// No secret is hard-coded: same host, user, and password as DATABASE_URL —
// only the port changes and the pgbouncer transaction-mode flags are dropped.

const raw = process.env.DATABASE_URL;
if (!raw) {
  process.stderr.write('[session-url] DATABASE_URL is not set\n');
  process.exit(1);
}

try {
  const u = new URL(raw);
  u.port = '5432'; // transaction pooler :6543 -> session pooler :5432
  u.searchParams.delete('pgbouncer'); // transaction-mode only
  u.searchParams.delete('connection_limit');
  process.stdout.write(u.toString());
} catch (e) {
  process.stderr.write('[session-url] could not parse DATABASE_URL: ' + e.message + '\n');
  process.exit(1);
}
