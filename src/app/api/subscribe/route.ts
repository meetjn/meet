import { Resend } from "resend";

import { insertSubscriber } from "@/lib/db";
import { assertSubscribeRateLimit } from "@/lib/rate-limit";
import { parseSubscriberEmail } from "@/lib/validate-email";

/**
 * POST /api/subscribe — validate email, store subscriber, send welcome note.
 */

export const runtime = "nodejs";

const MAX_BODY_BYTES = 512;

function renderWelcomeEmail(): { html: string; text: string } {
  const text = [
    "Hi,",
    "",
    "Thanks for subscribing — it means a lot that you'd let me into your inbox.",
    "",
    "Here's what to expect: when I publish something new about how backend and payment systems actually work, you'll get it here first. That's the whole deal — no spam, nothing in between.",
    "",
    "I write these the way I'd explain them to a friend: plain language, real examples from production, and a lot of diagrams.",
    "",
    "See you in the next one.",
    "",
    "— Meet",
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#faf7f0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f0;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fffdf8;border:1px solid #e2dbce;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:40px 40px 8px 40px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:13px;letter-spacing:0.02em;color:#ac3e0a;">Meet Jain · Newsletter</div>
                <h1 style="margin:14px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:30px;line-height:1.15;color:#1a1612;">You&rsquo;re in.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px 8px 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.75;color:#4c453c;">
                <p style="margin:0 0 16px 0;">Hi,</p>
                <p style="margin:0 0 16px 0;">Thanks for subscribing &mdash; it means a lot that you&rsquo;d let me into your inbox.</p>
                <p style="margin:0 0 16px 0;">Here&rsquo;s what to expect: when I publish something new about how backend and payment systems actually work, you&rsquo;ll get it here first. That&rsquo;s the whole deal &mdash; no spam, nothing in between.</p>
                <p style="margin:0 0 16px 0;">I write these the way I&rsquo;d explain them to a friend: plain language, real examples from production, and a lot of diagrams.</p>
                <p style="margin:0 0 4px 0;">See you in the next one.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 40px 40px 40px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;color:#1a1612;">
                &mdash; Meet
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;border-top:1px solid #e2dbce;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.6;color:#847b6e;">
                You&rsquo;re getting this because you subscribed at meetjain.xyz.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { html, text };
}

export async function POST(req: Request) {
  const rateLimited = assertSubscribeRateLimit(req);
  if (rateLimited) return rateLimited;

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return Response.json({ error: "Invalid request." }, { status: 415 });
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Invalid request." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return Response.json({ error: "Invalid request." }, { status: 413 });
  }

  let body: { email?: unknown; website?: unknown };
  try {
    body = JSON.parse(rawBody) as { email?: unknown; website?: unknown };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill hidden fields; humans don't. Pretend success, do nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const address = parseSubscriberEmail(body.email);
  if (!address) {
    return Response.json(
      { error: "That email doesn't look right." },
      { status: 400 },
    );
  }

  let isNew = false;
  try {
    const result = await insertSubscriber(address);
    if (!result.ok) {
      console.error("DATABASE_URL is not set");
      return Response.json(
        { error: "Subscriptions are briefly unavailable. Try again soon." },
        { status: 503 },
      );
    }
    isNew = result.isNew;
  } catch (err) {
    console.error("Subscriber insert failed:", err);
    return Response.json(
      { error: "Couldn't save your email. Try again." },
      { status: 503 },
    );
  }

  if (isNew && process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
      const { html, text } = renderWelcomeEmail();
      const { error } = await resend.emails.send({
        from,
        to: address,
        subject: "You're in — thanks for subscribing",
        html,
        text,
      });
      if (error) console.error("Resend send failed:", error);
    } catch (err) {
      console.error("Resend threw:", err);
    }
  }

  return Response.json({ ok: true, alreadySubscribed: !isNew });
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
