import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";

import { CodeBlock } from "./CodeBlock";
import {
  SketchArrow,
  SketchBox,
  SketchCanvas,
  SketchLabel,
  SketchNote,
} from "@/components/sketch";

/** Linked heading — rehype-slug supplies the id, we add the anchor. */
function AnchoredHeading({
  as: Tag,
  id,
  children,
  ...rest
}: {
  as: "h2" | "h3";
  id?: string;
} & ComponentPropsWithoutRef<"h2">) {
  return (
    <Tag id={id} {...rest}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="heading-anchor ml-2 align-middle text-[0.6em]"
        >
          #
        </a>
      ) : null}
    </Tag>
  );
}

const calloutIcons = {
  note: Info,
  idea: Lightbulb,
  warning: AlertTriangle,
} as const;

type CalloutProps = {
  type?: keyof typeof calloutIcons;
  title?: string;
  children: ReactNode;
};

/** Aside block for context that shouldn't interrupt the main argument. */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const Icon = calloutIcons[type];
  return (
    <aside className="callout">
      <p className="callout-title">
        <Icon className="size-3.5" aria-hidden />
        {title ?? type}
      </p>
      <div className="flex flex-col gap-3">{children}</div>
    </aside>
  );
}

/**
 * Components available inside every article. Markdown maps automatically;
 * the capitalised ones are used as JSX in MDX.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <AnchoredHeading as="h2" {...props} />,
  h3: (props) => <AnchoredHeading as="h3" {...props} />,
  pre: CodeBlock,
  Callout,
  SketchCanvas,
  SketchBox,
  SketchArrow,
  SketchNote,
  SketchLabel,
};
