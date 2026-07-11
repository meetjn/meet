/**
 * Deterministic "hand-drawn ink" path generation for the sketch diagram system.
 *
 * All jitter is driven by a seeded PRNG keyed on a string, so the same seed
 * produces the same wobble on the server and the client — SVG paths are
 * SSR-safe with zero hydration mismatch, and diagrams don't "re-roll" between
 * renders.
 */

/** FNV-1a — cheap, stable string hash to derive a numeric PRNG seed. */
export function hashString(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export type Rng = () => number;

/** mulberry32 — small fast deterministic PRNG, returns floats in [0, 1). */
export function createRng(seed: string): Rng {
  let state = hashString(seed);
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = [number, number];

const SEGMENT_LENGTH = 26;

/**
 * A wobbly stroke between two points: the segment is subdivided and each knot
 * is displaced perpendicular to the travel direction, then joined with a
 * smooth quadratic chain — reads as confident freehand ink, not noise.
 */
export function sketchLine(
  from: Point,
  to: Point,
  rng: Rng,
  roughness = 1.6,
): string {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const steps = Math.max(2, Math.round(length / SEGMENT_LENGTH));

  // Unit normal for perpendicular displacement.
  const nx = length === 0 ? 0 : -dy / length;
  const ny = length === 0 ? 0 : dx / length;

  const points: Point[] = [[x1 + (rng() - 0.5), y1 + (rng() - 0.5)]];
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const wobble = (rng() - 0.5) * 2 * roughness;
    const drift = (rng() - 0.5) * roughness * 0.6;
    points.push([
      x1 + dx * t + nx * wobble + (dx / length || 0) * drift,
      y1 + dy * t + ny * wobble + (dy / length || 0) * drift,
    ]);
  }
  points.push([x2 + (rng() - 0.5), y2 + (rng() - 0.5)]);

  return chainToPath(points);
}

/** Quadratic smoothing through the displaced knots. */
function chainToPath(points: Point[]): string {
  if (points.length < 3) {
    const [a, b] = points;
    return `M ${fmt(a)} L ${fmt(b)}`;
  }
  let d = `M ${fmt(points[0])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const control = points[i];
    const mid: Point = [
      (points[i][0] + points[i + 1][0]) / 2,
      (points[i][1] + points[i + 1][1]) / 2,
    ];
    d += ` Q ${fmt(control)} ${fmt(mid)}`;
  }
  d += ` L ${fmt(points[points.length - 1])}`;
  return d;
}

function fmt([x, y]: Point): string {
  return `${x.toFixed(1)} ${y.toFixed(1)}`;
}

/**
 * A hand-drawn rectangle. Sides slightly overshoot the corners the way a
 * quick marker sketch does.
 */
export function sketchRect(
  x: number,
  y: number,
  width: number,
  height: number,
  rng: Rng,
  roughness = 1.6,
): string {
  const overshoot = () => 1.5 + rng() * 2.5;
  const corners: Array<[Point, Point]> = [
    [
      [x - overshoot(), y],
      [x + width + overshoot(), y],
    ],
    [
      [x + width, y - overshoot()],
      [x + width, y + height + overshoot()],
    ],
    [
      [x + width + overshoot(), y + height],
      [x - overshoot(), y + height],
    ],
    [
      [x, y + height + overshoot()],
      [x, y - overshoot()],
    ],
  ];
  return corners
    .map(([from, to]) => sketchLine(from, to, rng, roughness))
    .join(" ");
}

/**
 * A curved wobbly connector. `bow` bends the line perpendicular to its
 * direction (positive bows right of travel), for arrows that arc between
 * boxes instead of cutting straight.
 */
export function sketchCurve(
  from: Point,
  to: Point,
  rng: Rng,
  bow = 0,
  roughness = 1.4,
): string {
  if (bow === 0) return sketchLine(from, to, rng, roughness);

  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;

  const steps = Math.max(4, Math.round(length / SEGMENT_LENGTH));
  const points: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Quadratic bump peaking mid-curve.
    const bend = bow * 4 * t * (1 - t);
    const wobble = (rng() - 0.5) * 2 * roughness;
    points.push([
      x1 + dx * t + nx * (bend + wobble),
      y1 + dy * t + ny * (bend + wobble),
    ]);
  }
  return chainToPath(points);
}

/** Two short flicked strokes forming an open arrowhead at `tip`. */
export function sketchArrowhead(
  tip: Point,
  angle: number,
  rng: Rng,
  size = 11,
): string {
  const spread = 0.42;
  const wings = [angle + Math.PI - spread, angle + Math.PI + spread];
  return wings
    .map((wingAngle) => {
      const end: Point = [
        tip[0] + Math.cos(wingAngle) * size,
        tip[1] + Math.sin(wingAngle) * size,
      ];
      return sketchLine(tip, end, rng, 0.7);
    })
    .join(" ");
}
