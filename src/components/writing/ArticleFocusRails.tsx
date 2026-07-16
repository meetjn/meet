"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

function FocusButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Hide side panels and focus on reading"
      className={cn(
        "font-sans text-[11px] font-medium text-portfolio-mist transition-colors duration-[60ms] hover:text-portfolio-ember",
        className,
      )}
    >
      focus
    </button>
  );
}

type ArticleFocusRailsProps = {
  left: ReactNode;
  right: ReactNode;
};

export function ArticleFocusRails({ left, right }: ArticleFocusRailsProps) {
  const [hidden, setHidden] = useState(false);
  const show = () => setHidden(false);
  const hide = () => setHidden(true);

  if (hidden) {
    return (
      <>
        <aside className="hidden xl:col-start-1 xl:row-start-2 xl:block">
          <div className="sticky top-28">
            <FocusButton onClick={show} />
          </div>
        </aside>

        <aside className="hidden xl:col-start-3 xl:row-start-2 xl:block">
          <div className="sticky top-28 flex justify-end pr-10">
            <FocusButton onClick={show} />
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      <aside className="hidden xl:col-start-1 xl:row-start-2 xl:block">
        <div className="sticky top-28">
          <FocusButton onClick={hide} className="mb-3 block" />
          <div className="flex justify-end pr-10">{left}</div>
        </div>
      </aside>

      <aside className="hidden xl:col-start-3 xl:row-start-2 xl:block">
        <div className="sticky top-28 pl-10">
          <div className="flex justify-end">
            <FocusButton onClick={hide} className="mb-3" />
          </div>
          {right}
        </div>
      </aside>
    </>
  );
}
