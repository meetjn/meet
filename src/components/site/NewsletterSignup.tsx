"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

type Variant = "inline" | "compact";

/**
 * Newsletter signup. One email field + one button, on-theme (warm ink + ember,
 * Fraunces display). Mobile-first: the field and button stack on small screens
 * and sit inline from `sm` up.
 *
 * - `inline`  — full editorial block (eyebrow, headline, note). End of an
 *               article or bottom of the homepage list, where intent is highest.
 * - `compact` — tight heading + form, for the footer.
 */
export function NewsletterSignup({
  variant = "inline",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const compact = variant === "compact";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Something went wrong. Try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-start gap-3.5",
          !compact &&
            "rounded-3xl border border-portfolio-ember/40 bg-portfolio-ash/50 p-8 sm:p-10",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-portfolio-ember/15 text-portfolio-ember">
          <Check className="size-4" aria-hidden />
        </span>
        <div>
          <p className="font-display text-lg font-medium italic text-portfolio-white">
            You&rsquo;re in.
          </p>
          <p className="mt-1 font-sans text-[14px] font-light leading-relaxed text-portfolio-cream">
            Check your inbox — I just sent a quick hello. See you in the next
            one.
          </p>
        </div>
      </div>
    );
  }

  const form = (
    <form onSubmit={onSubmit} noValidate className="w-full">
      {/* Honeypot: hidden from humans, catches bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`nl-website-${variant}`}>Leave this empty</label>
        <input
          id={`nl-website-${variant}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-portfolio-mist"
            aria-hidden
          />
          <label htmlFor={`nl-email-${variant}`} className="sr-only">
            Email address
          </label>
          <input
            id={`nl-email-${variant}`}
            type="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            aria-invalid={status === "error"}
            className={cn(
              "h-12 w-full rounded-full border border-portfolio-smoke bg-portfolio-black/40 pl-11 pr-5 font-sans text-[15px] font-light text-portfolio-white outline-none transition-colors",
              "placeholder:text-portfolio-mist",
              "focus:border-portfolio-ember focus:ring-1 focus:ring-portfolio-ember/40",
              "disabled:opacity-60",
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "h-12 shrink-0 gap-2 rounded-full bg-portfolio-ember px-7 font-sans text-[14px] font-medium text-white transition-colors hover:bg-portfolio-ember-glow disabled:opacity-70",
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Subscribing
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </Button>
      </div>

      {(status === "error" || !compact) && (
        <p
          className="mt-3 min-h-[1.25rem] font-sans text-[13px] font-light"
          aria-live="polite"
        >
          {status === "error" ? (
            <span className="text-portfolio-ember">{error}</span>
          ) : (
            <span className="text-portfolio-mist">
              One email when there&rsquo;s something new. No spam, unsubscribe
              anytime.
            </span>
          )}
        </p>
      )}
    </form>
  );

  if (compact) {
    return (
      <div className={cn("relative w-full", className)}>
        <p className="eyebrow mb-3 !text-portfolio-ember">Newsletter</p>
        <p className="mb-4 font-sans text-[13px] font-light text-portfolio-mist">
          New writing, straight to your inbox.
        </p>
        {form}
      </div>
    );
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={cn(
        "relative rounded-3xl border border-portfolio-smoke bg-portfolio-ash/50 p-8 sm:p-12",
        className,
      )}
    >
      <p className="eyebrow mb-5 !text-portfolio-ember">The newsletter</p>
      <h2
        id="newsletter-heading"
        className="max-w-[20ch] font-display text-[clamp(24px,3.4vw,36px)] font-medium leading-[1.12] tracking-[-0.015em] text-portfolio-white"
      >
        Systems, explained — in your inbox.
      </h2>
      <p className="mb-8 mt-4 max-w-[46ch] font-sans text-[15px] font-light leading-[1.8] text-portfolio-cream">
        I write about how backend and payment systems actually work. Subscribe
        and the next one comes straight to you — plain language, real examples,
        a lot of diagrams.
      </p>
      {form}
    </section>
  );
}
