const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_LENGTH = 64;
const MAX_DOMAIN_LENGTH = 253;

/** Characters that must never appear in a valid email address. */
const FORBIDDEN_CHARS_RE = /[\x00-\x1f\x7f<>'"\\();]/;

/** Belt-and-suspenders: reject obvious injection tokens in the raw string. */
const INJECTION_PATTERNS_RE =
  /(--|\/\*|\*\/|\b(select|insert|update|delete|drop|union|exec|truncate|alter)\b)/i;

const LOCAL_PART_RE = /^[a-z0-9._%+-]+$/;
const DOMAIN_PART_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;

/**
 * Parse and validate an email for newsletter signup. Returns a normalized
 * lowercase address, or null if the input is not a plain email.
 */
export function parseSubscriberEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;

  const normalized = input.trim().toLowerCase();

  if (normalized.length === 0 || normalized.length > MAX_EMAIL_LENGTH) {
    return null;
  }

  if (FORBIDDEN_CHARS_RE.test(normalized)) return null;
  if (INJECTION_PATTERNS_RE.test(normalized)) return null;

  const at = normalized.lastIndexOf("@");
  if (at < 1 || at === normalized.length - 1) return null;
  if (normalized.indexOf("@") !== at) return null;

  const local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);

  if (local.length > MAX_LOCAL_LENGTH || domain.length > MAX_DOMAIN_LENGTH) {
    return null;
  }

  if (!LOCAL_PART_RE.test(local)) return null;
  if (!DOMAIN_PART_RE.test(domain)) return null;

  const tld = domain.split(".").pop();
  if (!tld || tld.length < 2) return null;

  return normalized;
}
