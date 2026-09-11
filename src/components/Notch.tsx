import type { CSSProperties } from "react";

/**
 * Inverted ("scooped") corner — the template's "Rounded Edge" SVG.
 * `curve` names the corner the quarter-circle is centred on, i.e. the direction
 * the concave edge bends toward. The solid part hugs the opposite corner.
 *
 *  curve="br" → fills top-left  (used right/below a top-left tab)
 *  curve="bl" → fills top-right (used left/below a top-right tab)
 *  curve="tr" → fills bottom-left
 *  curve="tl" → fills bottom-right (used left/above a bottom-right tab)
 */
export function Notch({
  curve,
  size = 18,
  color = "var(--bg)",
  style,
  className,
}: {
  curve: "tl" | "tr" | "bl" | "br";
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const s = size;
  const k = +(s * 0.5523).toFixed(3); // circle-to-bezier constant, matches template (8.059 for 18)
  const d = {
    br: `M0 0 L0 ${s} C0 ${s - k} ${s - k} 0 ${s} 0 Z`,
    bl: `M${s} 0 L${s} ${s} C${s} ${s - k} ${k} 0 0 0 Z`,
    tr: `M0 ${s} L0 0 C0 ${k} ${s - k} ${s} ${s} ${s} Z`,
    tl: `M${s} ${s} L${s} 0 C${s} ${k} ${k} ${s} 0 ${s} Z`,
  }[curve];

  return (
    <svg
      viewBox={`0 0 ${s} ${s}`}
      width={s}
      height={s}
      aria-hidden="true"
      className={className}
      style={{ display: "block", position: "absolute", zIndex: 1, ...style }}
    >
      <path d={d} fill={color} />
    </svg>
  );
}
