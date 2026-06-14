import { Layers } from "lucide-react";

import { stackGroups } from "@/content/site";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

export function StackSection() {
  // return (
  //   <section className="section-pad bg-portfolio-ash">
  //     <SectionHeader
  //       label={
  //         <span className="flex items-center gap-2">
  //           <Layers className="size-3" />
  //           Technical depth
  //         </span>
  //       }
  //       title="The arsenal"
  //     />

  //     <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
  //       {stackGroups.map((group, index) => (
  //         <ScrollReveal
  //           key={group.title}
  //           delay={index * 60}
  //           className="bg-portfolio-black p-7 sm:p-8"
  //         >
  //           <h3 className="stack-group-title mb-5 border-b border-portfolio-smoke pb-3">
  //             {group.title}
  //           </h3>
  //           <ul className="flex flex-col gap-2.5">
  //             {group.items.map((item) => (
  //               <li key={item} className="stack-item flex items-center gap-2.5">
  //                 <span className="size-1 shrink-0 rounded-full bg-portfolio-ember-dim" />
  //                 {item}
  //               </li>
  //             ))}
  //           </ul>
  //         </ScrollReveal>
  //       ))}
  //     </div>
  //   </section>
  // );
}
