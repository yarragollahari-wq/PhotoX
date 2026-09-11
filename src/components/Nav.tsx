"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Notch } from "./Notch";
import { TextSwap, useHover, ActionButton } from "./primitives";
import { ArrowRightIcon, CameraIcon, LogoMark } from "./icons";
import { brand, navLinks } from "@/data/site";
import { Avatar } from "./Avatar";

/* ------------------------------------------------------------------ */
/* Viewport frame — four 12px scooped corners, fixed, z 9              */
/* ------------------------------------------------------------------ */
export function ViewportFrame() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9, pointerEvents: "none" }} aria-hidden="true">
      <Notch curve="br" size={12} style={{ top: 12, left: 12 }} />
      <Notch curve="bl" size={12} style={{ top: 12, right: 12 }} />
      <Notch curve="tr" size={12} style={{ bottom: 12, left: 12 }} />
      <Notch curve="tl" size={12} style={{ bottom: 12, right: 12 }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Theme toggle — 30×20 pill, 8px dot. Colours swap instantly.         */
/* ------------------------------------------------------------------ */
function ThemeToggle() {
  const { toggle, theme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      style={{
        display: "flex",
        alignItems: "center",
        width: 30,
        height: 20,
        padding: 6,
        borderRadius: 500,
        background: "var(--toggle-bg)",
      }}
    >
      <span style={{ display: "block", width: 8, height: 8, borderRadius: "100%", background: "var(--text)" }} />
    </button>
  );
}

function Logo() {
  const { hovered, bind } = useHover();
  return (
    <a href="#" {...bind} style={{ display: "flex", alignItems: "center", gap: 6, height: 15 }}>
      <span style={{ display: "block", width: 15, height: 15, color: "var(--text)" }}>
        <LogoMark />
      </span>
      <TextSwap text={brand.logoWord} alt={brand.logoAlt} hovered={hovered} height={15} className="t-logo" />
    </a>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const { hovered, bind } = useHover();
  return (
    <a href={href} {...bind} style={{ display: "block", height: 17 }}>
      <TextSwap text={label} hovered={hovered} height={16.8} className="t-body" align="center" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Header tab shared by desktop + phone: bg page, radius 0 0 20 0,     */
/* padding 4 16 12, plus two 18px scoops hanging off it.                */
/* ------------------------------------------------------------------ */
function HeaderTab({ children, gap }: { children: React.ReactNode; gap: number }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "4px 16px 12px",
        borderRadius: "0 0 20px 0",
        background: "var(--bg)",
        height: 36,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap, height: 20 }}>{children}</div>
      <Notch curve="br" style={{ top: 36, left: 0 }} />
      <Notch curve="br" style={{ top: 0, left: "100%" }} />
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav
        className="hidden desktop:flex"
        style={{ position: "fixed", top: 12, left: 12, zIndex: 8, flexDirection: "column" }}
        aria-label="Primary"
      >
        <HeaderTab gap={20}>
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {navLinks.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </div>
          <ThemeToggle />
        </HeaderTab>
      </nav>

      {/* Phone / tablet nav */}
      <nav
        className="flex desktop:hidden"
        style={{ position: "fixed", top: 12, left: 12, zIndex: 8, flexDirection: "column" }}
        aria-label="Primary"
      >
        <HeaderTab gap={16}>
          <Logo />
          <ThemeToggle />
        </HeaderTab>
      </nav>

      {/* Menu pill — top right, radius bottom-left */}
      <div className="block desktop:hidden" style={{ position: "fixed", top: 12, right: 12, zIndex: 11 }}>
        <MenuPill label={open ? "Close" : "Menu"} onClick={() => setOpen((o) => !o)} />
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ position: "fixed", inset: 0, zIndex: 10, background: "var(--bg)", padding: 12 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                padding: 12,
                borderRadius: 12,
                background: "var(--card)",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 12, width: "100%" }}>
                <Avatar size={60} />
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span className="t-name">{brand.name}</span>
                  <span className="t-body" style={{ color: "var(--muted)" }}>
                    {brand.role}
                  </span>
                </div>
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }} aria-label="Menu">
                {[{ label: "Home", href: "#" }, ...navLinks].map((l) => (
                  <MenuItem key={l.label} {...l} onClick={() => setOpen(false)} />
                ))}
                <ActionButton
                  label="Join as a Photographer"
                  href="#photographers"
                  primary
                  icon={<CameraIcon />}
                  onClick={() => setOpen(false)}
                  style={{ padding: "16px 20px", borderRadius: 10 }}
                />
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MenuPill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px 12px",
        borderRadius: "0 0 0 18px",
        background: "var(--bg)",
      }}
    >
      <span className="t-body">{label}</span>
      <Notch curve="bl" style={{ top: 0, right: "100%" }} />
      <Notch curve="bl" style={{ top: "100%", right: 0 }} />
    </button>
  );
}

function MenuItem({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
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
        padding: "16px 20px",
        borderRadius: 10,
        background: hovered ? "var(--card)" : "var(--card-hover)",
        transition: "background-color 0.2s ease",
      }}
    >
      <span className="t-label" style={{ height: 15, lineHeight: "15px" }}>
        {label}
      </span>
      <span style={{ width: 16, height: 16, display: "block" }}>
        <ArrowRightIcon />
      </span>
    </a>
  );
}
