/**
 * PhotoX brand avatar — replaces the template's 60px portrait.
 * A circular mark: page-coloured disc with the X monogram cut from an aperture ring.
 */
export function Avatar({ size = 60, inverse = false }: { size?: number; inverse?: boolean }) {
  const fg = inverse ? "var(--bg)" : "var(--text)";
  const bg = inverse ? "var(--text)" : "var(--bg)";
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width: size,
        height: size,
        borderRadius: 500,
        overflow: "hidden",
        flex: "0 0 auto",
        background: fg,
      }}
    >
      <svg viewBox="0 0 60 60" width={size} height={size} style={{ display: "block" }}>
        <circle cx="30" cy="30" r="30" fill={fg} />
        <circle cx="30" cy="30" r="21" fill="none" stroke={bg} strokeWidth="2.5" />
        <path
          d="M21.5 21.5 L38.5 38.5 M38.5 21.5 L21.5 38.5"
          stroke={bg}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="30" cy="30" r="3" fill={bg} />
      </svg>
    </span>
  );
}
