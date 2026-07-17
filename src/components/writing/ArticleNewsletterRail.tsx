"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

type ArticleNewsletterRailProps = {
  className?: string;
  variant?: "rail" | "card";
  inputId?: string;
};

export function ArticleNewsletterRail({
  className,
  variant = "rail",
  inputId = "article-sidebar-email",
}: ArticleNewsletterRailProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

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
        throw new Error(data.error ?? "Something went wrong.");
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
          variant === "card"
            ? "text-center"
            : "border-t border-portfolio-smoke/50 pt-8",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <p className="font-sans text-[12px] font-light text-portfolio-mist">
          You&rsquo;re in. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "card" ? "" : "border-t border-portfolio-smoke/50 pt-8",
        className,
      )}
    >
      <p
        className={cn(
          "font-sans text-[11px] font-light leading-snug text-portfolio-mist",
          variant === "card" && "text-center",
        )}
      >
        New post in your inbox when I publish.
      </p>

      <form onSubmit={onSubmit} noValidate className="relative mt-4">
        <div
          aria-hidden
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
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
          className="h-9 w-full rounded-md border border-portfolio-smoke bg-portfolio-black/30 px-3 font-sans text-[12px] font-light text-portfolio-white outline-none placeholder:text-portfolio-mist focus:border-portfolio-ember/60"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 w-full rounded-full border border-portfolio-smoke px-4 py-1.5 font-sans text-[12px] font-medium text-portfolio-cream transition-[color,border-color] duration-[60ms] hover:border-portfolio-ember/50 hover:text-portfolio-white disabled:opacity-60"
        >
          {status === "loading" ? (
            <span className="inline-flex items-center justify-center gap-1.5">
              <Loader2 className="size-3 animate-spin" aria-hidden />
              Subscribing
            </span>
          ) : (
            "Subscribe"
          )}
        </button>

        {status === "error" ? (
          <p className="mt-2 font-sans text-[11px] text-portfolio-ember">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
