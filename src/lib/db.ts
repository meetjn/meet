import { neon } from "@neondatabase/serverless";

import { parseSubscriberEmail } from "@/lib/validate-email";

/**
 * Neon Postgres over HTTP — one round trip per query, no connection pool to
 * manage, which suits serverless route handlers on Vercel.
 *
 * `sql` is not exported. All database access goes through typed helpers so
 * callers cannot run arbitrary queries.
 */
const url = process.env.DATABASE_URL;
if (!url) {
  console.warn("DATABASE_URL is not set — subscriber storage is disabled.");
}

const sql = url ? neon(url) : null;

let tableReady = false;

async function ensureSubscribersTable() {
  if (!sql || tableReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      email      text PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  tableReady = true;
}

/**
 * Insert a validated email. Uses parameterized queries only — the address is
 * never interpolated into SQL as a string.
 */
export async function insertSubscriber(
  email: string,
): Promise<{ ok: true; isNew: boolean } | { ok: false; reason: "unavailable" }> {
  if (!sql) return { ok: false, reason: "unavailable" };

  // Defense in depth: re-validate before any DB write.
  const address = parseSubscriberEmail(email);
  if (!address) {
    throw new Error("insertSubscriber called with invalid email");
  }

  await ensureSubscribersTable();

  const rows = await sql`
    INSERT INTO subscribers (email) VALUES (${address})
    ON CONFLICT (email) DO NOTHING
    RETURNING email
  `;

  return { ok: true, isNew: rows.length > 0 };
}
