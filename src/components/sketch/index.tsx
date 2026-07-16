"use client";

import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  createRng,
  sketchArrowhead,
  sketchCurve,
  sketchRect,
} from "@/lib/sketch";

/**
 * Hand-drawn diagram system. Compose primitives inside a SketchCanvas:
 *
 *   <SketchCanvas viewBox="0 0 720 300" title="Request flow">
 *     <SketchBox x={40} y={90} width={160} height={70} label="Client" />
 *     <SketchArrow from={[200, 125]} to={[320, 125]} label="HTTPS" />
 *     <SketchBox x={320} y={90} width={160} height={70} label="API" accent />
 *     <SketchNote x={330} y={210}>the interesting part</SketchNote>
 *   </SketchCanvas>
 *
 * Strokes ink themselves in when the diagram scrolls into view (skipped under
 * prefers-reduced-motion via CSS). Wobble is seeded — see src/lib/sketch.ts.
 */

/*
 * Theme tokens. SVG presentation attributes can't resolve CSS var(), so
 * every color below is applied via `style`, which can.
 */
const INK = "rgb(var(--ink-2))";
const MUTED = "rgb(var(--ink-3))";
const EMBER = "rgb(var(--accent-bright))";

/**
 * SVG <text> can't render block elements, and MDX wraps multi-line JSX
 * children in <p> — flatten whatever the author wrote down to plain text so
 * notes and labels always draw.
 */
function textContent(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (isValidElement(node))
    return textContent((node.props as { children?: ReactNode }).children);
  return "";
}

type SketchCanvasProps = {
  /** SVG coordinate space, e.g. "0 0 720 320". */
  viewBox: string;
  /** Accessible one-line description of what the diagram shows. */
  title: string;
  caption?: ReactNode;
  /**
   * Below this width (px) the diagram scrolls horizontally instead of
   * shrinking text into illegibility on small screens.
   */
  minWidth?: number;
  children: ReactNode;
};

export function SketchCanvas({
  viewBox,
  title,
  caption,
  minWidth = 560,
  children,
}: SketchCanvasProps) {
  const figureRef = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = figureRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // Ancient-browser fallback: flip the attribute directly rather than
      // setState synchronously inside the effect.
      node.dataset.drawn = "true";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figureRef} data-drawn={drawn} className="sketch-figure">
      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={title}
          className="h-auto w-full"
          style={{ minWidth }}
        >
          {children}
        </svg>
      </div>
      {caption ? (
        <figcaption className="sketch-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

type StrokeProps = {
  d: string;
  color: string;
  delay: number;
  dashed?: boolean;
};

/** Double-pass ink stroke — the faint offset second pass sells "freehand". */
function InkStroke({ d, color, delay, dashed }: StrokeProps) {
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeDasharray={dashed ? "0.04 0.025" : undefined}
      className="sketch-stroke"
      style={{ stroke: color, transitionDelay: `${delay}ms` }}
    />
  );
}

type SketchBoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  /** Smaller second line under the label. */
  sub?: string;
  /** Ember outline for the box the diagram is "about". */
  accent?: boolean;
  dashed?: boolean;
  /** Stagger offset in ms for the draw-in. */
  delay?: number;
  /** Override the wobble seed; defaults to label + geometry. */
  seed?: string;
};

export function SketchBox({
  x,
  y,
  width,
  height,
  label,
  sub,
  accent = false,
  dashed = false,
  delay = 0,
  seed,
}: SketchBoxProps) {
  const rngSeed = seed ?? `box:${label ?? ""}:${x},${y},${width},${height}`;
  const first = sketchRect(x, y, width, height, createRng(rngSeed));
  const second = sketchRect(
    x,
    y,
    width,
    height,
    createRng(`${rngSeed}:pass2`),
    2.4,
  );
  const color = accent ? EMBER : INK;
  const centerX = x + width / 2;

  return (
    <g>
      <InkStroke d={first} color={color} delay={delay} dashed={dashed} />
      <path
        d={second}
        pathLength={1}
        fill="none"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.35}
        className="sketch-stroke"
        style={{ stroke: color, transitionDelay: `${delay + 120}ms` }}
      />
      {label ? (
        <text
          x={centerX}
          y={y + height / 2 + (sub ? -4 : 4)}
          textAnchor="middle"
          className="sketch-label sketch-fade"
          style={{ fill: INK, transitionDelay: `${delay + 240}ms` }}
        >
          {label}
        </text>
      ) : null}
      {sub ? (
        <text
          x={centerX}
          y={y + height / 2 + 15}
          textAnchor="middle"
          className="sketch-sublabel sketch-fade"
          style={{ fill: MUTED, transitionDelay: `${delay + 300}ms` }}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

type SketchArrowProps = {
  from: [number, number];
  to: [number, number];
  /** Perpendicular bend; positive arcs to the right of travel direction. */
  bow?: number;
  label?: string;
  /** Nudge the label from the curve midpoint. */
  labelOffset?: [number, number];
  labelAnchor?: "start" | "middle" | "end";
  accent?: boolean;
  dashed?: boolean;
  delay?: number;
  seed?: string;
};

export function SketchArrow({
  from,
  to,
  bow = 0,
  label,
  labelOffset = [0, -10],
  labelAnchor = "middle",
  accent = false,
  dashed = false,
  delay = 0,
  seed,
}: SketchArrowProps) {
  const rngSeed = seed ?? `arrow:${label ?? ""}:${from.join()}->${to.join()}`;
  const body = sketchCurve(from, to, createRng(rngSeed), bow);

  // Tangent of the bowed curve at t=1 gives the arrowhead direction.
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const angle = Math.atan2(dy - 4 * bow * ny, dx - 4 * bow * nx);
  const head = sketchArrowhead(to, angle, createRng(`${rngSeed}:head`));

  const color = accent ? EMBER : INK;
  const midX = (from[0] + to[0]) / 2 + nx * bow + labelOffset[0];
  const midY = (from[1] + to[1]) / 2 + ny * bow + labelOffset[1];

  return (
    <g>
      <InkStroke d={body} color={color} delay={delay} dashed={dashed} />
      <InkStroke d={head} color={color} delay={delay + 260} />
      {label ? (
        <text
          x={midX}
          y={midY}
          textAnchor={labelAnchor}
          className="sketch-sublabel sketch-fade"
          style={{ fill: MUTED, transitionDelay: `${delay + 320}ms` }}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

type SketchNoteProps = {
  x: number;
  y: number;
  /** Degrees of casual tilt. */
  angle?: number;
  delay?: number;
  children: ReactNode;
};

/** Handwritten ember margin-note, the "pen annotation" voice of a diagram. */
export function SketchNote({
  x,
  y,
  angle = -2,
  delay = 0,
  children,
}: SketchNoteProps) {
  return (
    <text
      x={x}
      y={y}
      transform={`rotate(${angle} ${x} ${y})`}
      className="sketch-note sketch-fade"
      style={{ fill: EMBER, transitionDelay: `${delay}ms` }}
    >
      {textContent(children)}
    </text>
  );
}

type SketchLabelProps = {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  muted?: boolean;
  delay?: number;
  children: ReactNode;
};

/** Free-floating technical label in the diagram's mono voice. */
export function SketchLabel({
  x,
  y,
  anchor = "start",
  muted = false,
  delay = 0,
  children,
}: SketchLabelProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`${muted ? "sketch-sublabel" : "sketch-label"} sketch-fade`}
      style={{ fill: muted ? MUTED : INK, transitionDelay: `${delay}ms` }}
    >
      {textContent(children)}
    </text>
  );
}
