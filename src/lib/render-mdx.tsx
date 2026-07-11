import * as jsxRuntime from "react/jsx-runtime";
import type { ReactElement } from "react";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

import { mdxComponents } from "@/components/writing/mdx-components";

/**
 * Compile + render an article's MDX body on the server (at build time for
 * static pages).
 *
 * We call @mdx-js/mdx directly instead of a wrapper library on purpose: the
 * JSX runtime is imported *statically here*, so the bundler aliases it to the
 * same React instance the app renders with. Wrappers that `require("react")`
 * at runtime resolve to the npm copy instead of Next's vendored RSC React,
 * and client-component props are silently dropped during flight
 * serialization.
 */
export async function renderArticleMdx(source: string): Promise<ReactElement> {
  const { default: MdxContent } = await evaluate(source, {
    ...jsxRuntime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        { theme: "vesper", keepBackground: false, defaultLang: "text" },
      ],
    ],
  });

  return <MdxContent components={mdxComponents} />;
}
