import { Layers } from "lucide-react";

import { stackGroups } from "@/content/site";

export function StackSection() {
  return (
    <section className="section-pad bg-portfolio-ash">
      <span className="section-label flex items-center gap-2">
        <Layers className="size-3" />
        Technical depth
      </span>
      <h2 className="section-title mb-12 sm:mb-[60px]">The arsenal</h2>

      <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
        {stackGroups.map((group) => (
          <div key={group.title} className="bg-portfolio-black p-7 sm:p-8">
            <h3 className="mb-5 border-b border-portfolio-smoke pb-3 text-[10px] uppercase tracking-[0.25em] text-portfolio-ember">
              {group.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-portfolio-cream"
                >
                  <span className="size-1 shrink-0 rounded-full bg-portfolio-ember-dim" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
