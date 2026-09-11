"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Nav, ViewportFrame } from "./Nav";
import { Notch } from "./Notch";
import { useHover } from "./primitives";
import { ArrowRightIcon } from "./icons";
import { easeAppear } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Page shell — fixed nav + frame, single scrolling column            */
/* ------------------------------------------------------------------ */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ViewportFrame />
      <Nav />
      <div className="page-wrap">
        <main className="page-col">{children}</main>
      </div>
    </>
  );
}

/* Card surface — same chrome as the template's cards */
export function Card({
  children,
  style,
  className,
  id,
  hover = false,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  id?: string;
  hover?: boolean;
}) {
  const { hovered, bind } = useHover();
  return (
    <div
      id={id}
      className={className}
      {...(hover ? bind : {})}
      style={{
        borderRadius: 12,
        background: hover && hovered ? "var(--card-hover)" : "var(--card)",
        transition: "background-color 0.2s ease",
        padding: 24,
        width: "100%",
        minWidth: 0,
        scrollMarginTop: 12,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Scroll-appear wrapper (template: opacity 0 / y 20 → 1 / 0, 500ms) */
export function Appear({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={easeAppear}
      style={{ width: "100%", minWidth: 0, ...style }}
    >
      {children}
    </motion.div>
  );
}

/* Page title tab — notched, like the hero's "Live galleries" tab */
export function TitleTab({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        [right ? "right" : "left"]: 0,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px 12px",
        borderRadius: right ? "0 0 0 18px" : "0 0 18px 0",
        background: "var(--bg)",
        maxWidth: "calc(100% - 18px)",
      }}
    >
      <span className="t-body" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {children}
      </span>
      {right ? (
        <>
          <Notch curve="bl" style={{ top: 0, right: "100%" }} />
          <Notch curve="bl" style={{ top: "100%", right: 0 }} />
        </>
      ) : (
        <>
          <Notch curve="br" style={{ top: "100%", left: 0 }} />
          <Notch curve="br" style={{ top: 0, left: "100%" }} />
        </>
      )}
    </div>
  );
}

/* KPI stat card */
export function Stat({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <Card hover style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span className="t-body" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      <span style={{ fontSize: 24, lineHeight: "28.8px", fontWeight: 400 }}>{value}</span>
      {delta ? (
        <span className="t-body" style={{ color: "var(--muted)" }}>
          {delta}
        </span>
      ) : null}
    </Card>
  );
}

/* Chip — filter / tag pill. Selected = inverse. */
export function Chip({
  children,
  selected = false,
  onClick,
  small = false,
  muted = false,
  style,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  small?: boolean;
  muted?: boolean;
  style?: CSSProperties;
}) {
  const { hovered, bind } = useHover();
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-pressed={onClick ? selected : undefined}
      {...(onClick ? bind : {})}
      className="t-label"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "6px 10px" : "10px 14px",
        borderRadius: 6,
        background: selected ? "var(--text)" : hovered ? "var(--card-hover)" : muted ? "transparent" : "var(--card)",
        color: selected ? "var(--bg)" : muted ? "var(--muted)" : "var(--text)",
        border: muted && !selected ? "1px solid var(--card-hover)" : "1px solid transparent",
        transition: "background-color 0.2s ease, color 0.2s ease",
        whiteSpace: "nowrap",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* Data table in card chrome */
export function Table({
  columns,
  rows,
  align = [],
}: {
  columns: string[];
  rows: ReactNode[][];
  align?: ("left" | "right")[];
}) {
  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={c}
                className="t-body"
                style={{
                  textAlign: align[i] ?? "left",
                  fontWeight: 400,
                  color: "var(--muted)",
                  padding: "0 12px 16px 0",
                  borderBottom: "1px solid var(--card-hover)",
                  whiteSpace: "nowrap",
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  className="t-body"
                  style={{
                    textAlign: align[ci] ?? "left",
                    padding: "16px 12px 16px 0",
                    borderBottom: ri === rows.length - 1 ? 0 : "1px solid var(--card-hover)",
                    whiteSpace: "nowrap",
                    verticalAlign: "middle",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Status pill */
export function Status({ value }: { value: string }) {
  const good = /paid|live|approved|ready/i.test(value);
  const warn = /pending|scheduled|processing|requested/i.test(value);
  return (
    <span
      className="t-label"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 6,
        background: "var(--card-hover)",
        color: good ? "var(--text)" : "var(--muted)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: good ? "#3cc7a1" : warn ? "#f5b73c" : "var(--muted)",
          display: "inline-block",
        }}
      />
      {value}
    </span>
  );
}

/* Initials avatar for photographers */
export function Initials({ initials, color, size = 36, selected = false }: { initials: string; color: string; size?: number; selected?: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 500,
        background: color,
        color: "#fff",
        fontSize: Math.round(size * 0.36),
        fontWeight: 500,
        flex: "0 0 auto",
        outline: selected ? "2px solid var(--text)" : "2px solid transparent",
        outlineOffset: 2,
        transition: "outline-color 0.2s ease",
      }}
    >
      {initials}
    </span>
  );
}

/* Modal — backdrop + notched card */
export function Modal({
  open,
  onClose,
  title,
  children,
  width = 560,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;
  // Portal to <body> so the modal escapes .page-col's stacking context and sits above the fixed nav
  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20,
            background: "rgba(14,16,17,0.72)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: width,
              maxHeight: "calc(100vh - 24px)",
              overflowY: "auto",
              borderRadius: 12,
              background: "var(--bg)",
              color: "var(--text)",
              padding: 12,
            }}
          >
            <div style={{ position: "relative", borderRadius: 12, background: "var(--card)", padding: "56px 32px 32px" }}>
              <TitleTab>{title}</TitleTab>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="t-body"
                style={{ position: "absolute", top: 12, right: 16, color: "var(--muted)" }}
              >
                Close
              </button>
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/* Solid button (primary/secondary), matching the template's button geometry */
export function Button({
  children,
  onClick,
  href,
  primary = false,
  disabled = false,
  style,
  arrow = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  arrow?: boolean;
  type?: "button" | "submit";
}) {
  const { hovered, bind } = useHover();
  const common: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "12px 16px",
    borderRadius: 6,
    background: primary ? "var(--text)" : hovered ? "var(--card-hover)" : "var(--card)",
    color: primary ? "var(--bg)" : "var(--text)",
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 0.2s ease, opacity 0.2s ease",
    ...style,
  };
  const inner = (
    <>
      <span className="t-label">{children}</span>
      {arrow ? (
        <span style={{ width: 14, height: 14, display: "block" }}>
          <ArrowRightIcon />
        </span>
      ) : null}
    </>
  );
  if (href) {
    return (
      <a href={href} {...bind} style={common}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} {...bind} style={common}>
      {inner}
    </button>
  );
}
