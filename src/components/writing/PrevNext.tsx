import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Article } from "@/lib/articles";

type PrevNextProps = {
  newer: Article | undefined;
  older: Article | undefined;
};

function NeighbourCard({
  article,
  direction,
}: {
  article: Article;
  direction: "newer" | "older";
}) {
  const isNewer = direction === "newer";
  return (
    <Link
      href={`/writing/${article.slug}`}
      className={`group flex flex-col gap-3 rounded-2xl border border-portfolio-smoke bg-portfolio-ash/50 p-7 transition-colors hover:border-portfolio-mist ${
        isNewer ? "items-start text-left" : "items-end text-right"
      }`}
    >
      <span className="eyebrow flex items-center gap-2 !text-portfolio-ember">
        {isNewer ? <ArrowLeft className="size-3" aria-hidden /> : null}
        {isNewer ? "Newer" : "Older"}
        {isNewer ? null : <ArrowRight className="size-3" aria-hidden />}
      </span>
      <span className="font-display text-xl font-medium leading-snug tracking-[-0.01em] text-portfolio-white transition-colors group-hover:text-portfolio-ember">
        {article.title}
      </span>
    </Link>
  );
}

export function PrevNext({ newer, older }: PrevNextProps) {
  if (!newer && !older) return null;
  return (
    <nav aria-label="More articles" className="mt-20 grid gap-4 sm:grid-cols-2">
      {newer ? (
        <NeighbourCard article={newer} direction="newer" />
      ) : (
        <span aria-hidden />
      )}
      {older ? <NeighbourCard article={older} direction="older" /> : null}
    </nav>
  );
}
