"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { springIcon, springSwap, springUnderline } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Hover-driven text swap (nav links, footer links, logo)               */
/* Two stacked copies inside an overflow-hidden box; both slide up.    */
/* ------------------------------------------------------------------ */
export function TextSwap({
  text,
  alt,
  hovered,
  height,
  className,
  gap = 0,
  align = "flex-start",
}: {
  text: string;
  alt?: string;
  hovered: boolean;
  height: number; // line box height in px (16.8 nav, 15 footer/logo)
  className?: string;
  gap?: number;
  align?: CSSProperties["alignItems"];
}) {
  const shift = height + gap;
  return (
    <span
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        height,
        overflow: "hidden",
        gap,
      }}
    >
      <motion.span
        animate={{ y: hovered ? -shift : 0 }}
        transition={springSwap}
        style={{ display: "block", height, whiteSpace: "nowrap" }}
      >
        {text}
      </motion.span>
      <motion.span
        animate={{ y: hovered ? -shift : 0 }}
        transition={springSwap}
        style={{ display: "block", height, whiteSpace: "nowrap" }}
        aria-hidden="true"
      >
        {alt ?? text}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Icon slide — two stacked icons; on hover both translate up by size */
/* ------------------------------------------------------------------ */
export function IconSlide({
  icon,
  hovered,
  size = 18,
}: {
  icon: ReactNode;
  hovered: boolean;
  size?: number;
}) {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        width: size,
        height: size,
        overflow: "hidden",
        flex: "0 0 auto",
      }}
      aria-hidden="true"
    >
      <motion.span
        animate={{ y: hovered ? -size : 0 }}
        transition={springIcon}
        style={{ display: "block", width: size, height: size, flex: "0 0 auto" }}
      >
        {icon}
      </motion.span>
      <motion.span
        animate={{ y: hovered ? -size : 0 }}
        transition={springIcon}
        style={{ display: "block", width: size, height: size, flex: "0 0 auto" }}
      >
        {icon}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Card-style anchor: bg card → card-hover on hover (~200ms)          */
/* ------------------------------------------------------------------ */
export function useHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    bind: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setHovered(true),
      onBlur: () => setHovered(false),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Action / social button — padding 20, radius 12, text + sliding icon */
/* ------------------------------------------------------------------ */
export function ActionButton({
  label,
  icon,
  href,
  primary = false,
  style,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  href: string;
  primary?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const { hovered, bind } = useHover();
  return (
    <a
      href={href}
      onClick={onClick}
      {...bind}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 12,
        background: primary ? "var(--text)" : hovered ? "var(--card-hover)" : "var(--card)",
        color: primary ? "var(--bg)" : "var(--text)",
        transition: "background-color 0.2s ease",
        width: "100%",
        ...style,
      }}
    >
      <span className="t-body">{label}</span>
      <IconSlide icon={icon} hovered={hovered} size={18} />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Underline link — 1px rule shrinks from 100% → 20px anchored left    */
/* ------------------------------------------------------------------ */
export function UnderlineLink({ label, href }: { label: string; href: string }) {
  const { hovered, bind } = useHover();
  const ref = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    if (ref.current) setW(ref.current.getBoundingClientRect().width);
  }, [label]);
  const target = w > 0 ? 20 / w : 1;
  return (
    <a
      href={href}
      {...bind}
      style={{ position: "relative", display: "flex", flexDirection: "column", paddingBottom: 2 }}
    >
      <span ref={ref} className="t-label" style={{ display: "block", height: 14 }}>
        {label}
      </span>
      <motion.span
        aria-hidden="true"
        animate={{ scaleX: hovered ? target : 1 }}
        transition={springUnderline}
        style={{
          position: "absolute",
          top: 15,
          left: 0,
          width: "100%",
          height: 1,
          background: "currentColor",
          originX: 0,
          zIndex: 1,
        }}
      />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Small pill button (View Project / More Templates)                    */
/* ------------------------------------------------------------------ */
export function PillButton({
  label,
  icon,
  href,
  variant = "overlay",
  style,
}: {
  label: string;
  icon?: ReactNode;
  href: string;
  variant?: "overlay" | "inverse" | "muted";
  style?: CSSProperties;
}) {
  const { hovered, bind } = useHover();
  const bg =
    variant === "overlay"
      ? "var(--overlay)"
      : variant === "inverse"
        ? "var(--bg)"
        : hovered
          ? "var(--card-hover)"
          : "var(--card)";
  const color = variant === "overlay" ? "#fff" : "var(--text)";
  return (
    <a
      href={href}
      {...bind}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: icon ? "10px 12px 10px 14px" : "10px 14px",
        borderRadius: 6,
        background: bg,
        color,
        transition: "background-color 0.2s ease",
        ...style,
      }}
    >
      <span className="t-label" style={{ display: "block", height: 14 }}>
        {label}
      </span>
      {icon ? <IconSlide icon={icon} hovered={variant === "overlay" ? false : hovered} size={14} /> : null}
    </a>
  );
}
