import { neon } from "@neondatabase/serverless";

import { parseSubscriberEmail } from "@/lib/validate-email";

/**
 * Neon Postgres over HTTP — one round trip per query, no connection pool to
 * manage, which suits serverless route handlers on Vercel.
 *
 * `sql` is not exported. All database access goes through typed helpers so
 * callers cannot run arbitrary queries.
 */

/** Strip whitespace and optional wrapping quotes from Vercel/Neon copy-paste. */
function parseDatabaseUrl(raw: string | undefined): string | null {
  if (!raw) return null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  const unquoted = trimmed.replace(/^['"]+|['"]+$/g, "");

  try {
    const parsed = new URL(unquoted);
    if (parsed.protocol !== "postgresql:" && parsed.protocol !== "postgres:") {
      return null;
    }
    return unquoted;
  } catch {
    return null;
  }
}

const connectionString = parseDatabaseUrl(process.env.DATABASE_URL);

if (process.env.DATABASE_URL && !connectionString) {
  console.warn(
    "DATABASE_URL is set but is not a valid postgres URL — subscriber storage is disabled.",
  );
} else if (!connectionString) {
  console.warn("DATABASE_URL is not set — subscriber storage is disabled.");
}

let sql: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!connectionString) return null;
  if (!sql) sql = neon(connectionString);
  return sql;
}

let tableReady = false;

async function ensureSubscribersTable() {
  const db = getSql();
  if (!db || tableReady) return;
  await db`
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
  const db = getSql();
  if (!db) return { ok: false, reason: "unavailable" };

  // Defense in depth: re-validate before any DB write.
  const address = parseSubscriberEmail(email);
  if (!address) {
    throw new Error("insertSubscriber called with invalid email");
  }

  await ensureSubscribersTable();

  const rows = await db`
    INSERT INTO subscribers (email) VALUES (${address})
    ON CONFLICT (email) DO NOTHING
    RETURNING email
  `;

  return { ok: true, isNew: Array.isArray(rows) && rows.length > 0 };
}
