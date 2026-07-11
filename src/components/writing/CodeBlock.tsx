"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Check, Copy } from "lucide-react";

/** `pre` override for MDX code fences — adds a copy-to-clipboard affordance. */
export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = preRef.current?.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (permissions / insecure context) — do nothing.
    }
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-3 top-3 z-10 rounded-lg border border-[#2c2620] bg-[#1a1714] p-2 text-[#98908f] opacity-0 transition-opacity hover:text-[#f6f2ea] focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="size-3.5 text-portfolio-ember-glow" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
      <pre ref={preRef} {...props} />
    </div>
  );
}
