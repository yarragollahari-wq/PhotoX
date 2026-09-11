"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { brand } from "@/data/site";
import { easeAppear, springIcon, springLayout } from "@/lib/motion";
import { Avatar } from "./Avatar";
import { ArrowRightIcon, ArrowUpRightIcon } from "./icons";
import { Notch } from "./Notch";
import { UnderlineLink, useHover } from "./primitives";

/* ------------------------------------------------------------------ */
/* Profile / intro card — padding 40, gap 96, hidden ↗ reveals on hover */
/* ------------------------------------------------------------------ */
export function ProfileCard() {
  const { hovered, bind } = useHover();
  return (
    <a
      href="#photographers"
      {...bind}
      className="profile-card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: 12,
        background: hovered ? "var(--card-hover)" : "var(--card)",
        transition: "background-color 0.2s ease",
        flex: "1 0 0px",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
        <Avatar size={60} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: "1 0 0px" }}>
          <h1 className="t-name" style={{ margin: 0 }}>
            {brand.name}
          </h1>
          <p className="t-body" style={{ margin: 0, color: "var(--muted)" }}>
            {brand.role}
          </p>
        </div>
      </div>
      <p className="t-bio" style={{ margin: 0 }}>
        {brand.bio}
      </p>
      <motion.span
        aria-hidden="true"
        animate={hovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -7, y: 7 }}
        transition={springIcon}
        style={{ position: "absolute", top: 32, right: 32, width: 16, height: 16, zIndex: 1 }}
      >
        <ArrowUpRightIcon />
      </motion.span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Section bar — "Latest Work ↓ ........ View All"                      */
/* ------------------------------------------------------------------ */
export function SectionBar({
  title,
  icon,
  linkLabel,
  linkHref,
  id,
  muted = false,
}: {
  title: string;
  icon: ReactNode;
  linkLabel: string;
  linkHref: string;
  id?: string;
  muted?: boolean;
}) {
  return (
    <div
      id={id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: 24,
        borderRadius: 12,
        background: "var(--card)",
        width: "100%",
        scrollMarginTop: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden", minWidth: 0 }}>
        <h2
          className="t-body"
          style={{ margin: 0, color: muted ? "var(--muted)" : "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {title}
        </h2>
        <span style={{ width: 14, height: 14, display: "block", flex: "0 0 auto" }}>{icon}</span>
      </div>
      <UnderlineLink label={linkLabel} href={linkHref} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Event card — 3:4, blur(7px) + arrow reveal on hover, appear on view */
/* ------------------------------------------------------------------ */
export function EventCard({ title, src, href }: { title: string; src: string; href: string }) {
  const { hovered, bind } = useHover();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={easeAppear}
      style={{ position: "relative", aspectRatio: "0.75 / 1", width: "100%" }}
    >
      <a
        href={href}
        {...bind}
        style={{ position: "absolute", inset: 0, display: "block", borderRadius: 12, overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-1%",
            filter: hovered ? "blur(7px)" : "blur(0px)",
            transition: "filter 0.2s ease-out",
            willChange: "filter",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={title}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 0%" }}
          />
        </div>

        {/* Label tab */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            padding: "8px 16px 12px",
            borderRadius: "0 0 18px 0",
            background: "var(--bg)",
          }}
        >
          <h3 className="t-body" style={{ margin: 0, whiteSpace: "nowrap" }}>
            {title}
          </h3>
          <motion.span
            aria-hidden="true"
            animate={{ width: hovered ? 21 : 0, opacity: hovered ? 1 : 0 }}
            transition={springLayout}
            style={{ display: "flex", justifyContent: "flex-end", overflow: "hidden", height: 13 }}
          >
            <span style={{ display: "block", width: 13, height: 13, flex: "0 0 auto" }}>
              <ArrowRightIcon />
            </span>
          </motion.span>
          <Notch curve="br" style={{ top: "100%", left: 0 }} />
          <Notch curve="br" style={{ top: 0, left: "100%" }} />
        </div>
      </a>
    </motion.div>
  );
}
