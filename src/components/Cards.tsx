"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { EventItem } from "@/data/site";
import { easeAppear, springLayout } from "@/lib/motion";
import { ArrowRightIcon } from "./icons";
import { Notch } from "./Notch";
import { UnderlineLink, useHover } from "./primitives";

/* ------------------------------------------------------------------ */
/* Section bar — "Recent Events ↓ ........ View All"                      */
/* ------------------------------------------------------------------ */
export function SectionBar({
  title,
  icon,
  linkLabel,
  linkHref,
  id,
  eyebrow,
  as: Tag = "h2",
}: {
  title: string;
  icon: ReactNode;
  linkLabel: string;
  linkHref: string;
  id?: string;
  eyebrow?: string;
  as?: "h2" | "p";
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
        {eyebrow ? (
          <span
            className="t-body"
            style={{
              color: "var(--muted)",
              flex: "0 0 auto",
              paddingRight: 8,
              borderRight: "1px solid var(--card-hover)",
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        <Tag
          className="t-body"
          style={{ margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {title}
        </Tag>
        <span style={{ width: 14, height: 14, display: "block", flex: "0 0 auto" }}>{icon}</span>
      </div>
      <UnderlineLink label={linkLabel} href={linkHref} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Event card — 3:4, blur(7px) + arrow reveal on hover, appear on view. */
/* Title tab top-left (template) + meta tab bottom-right (hero tab).    */
/* ------------------------------------------------------------------ */
const fmt = new Intl.NumberFormat("en-ZA");

export function EventCard({ title, src, href, photographers, photos }: EventItem) {
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
        aria-label={`${title} — ${photographers} photographers, ${fmt.format(photos)} photos`}
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

        {/* Title tab — top-left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            maxWidth: "calc(100% - 18px)",
            display: "flex",
            alignItems: "center",
            padding: "8px 16px 12px",
            borderRadius: "0 0 18px 0",
            background: "var(--bg)",
          }}
        >
          <h3 className="t-body" style={{ margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {title}
          </h3>
          <motion.span
            aria-hidden="true"
            animate={{ width: hovered ? 21 : 0, opacity: hovered ? 1 : 0 }}
            transition={springLayout}
            style={{ display: "flex", justifyContent: "flex-end", overflow: "hidden", height: 13, flex: "0 0 auto" }}
          >
            <span style={{ display: "block", width: 13, height: 13, flex: "0 0 auto" }}>
              <ArrowRightIcon />
            </span>
          </motion.span>
          <Notch curve="br" style={{ top: "100%", left: 0 }} />
          <Notch curve="br" style={{ top: 0, left: "100%" }} />
        </div>

        {/* Meta tab — bottom-right, same geometry as the hero's "Live Galleries" tab */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px 8px",
            borderRadius: "18px 0 0 0",
            background: "var(--bg)",
          }}
        >
          <p className="t-body" style={{ margin: 0, whiteSpace: "nowrap" }}>
            <span>{photographers} photographer{photographers === 1 ? "" : "s"}</span>
            <span style={{ color: "var(--muted)" }}> · </span>
            <span>{fmt.format(photos)} photos</span>
          </p>
          <Notch curve="tl" style={{ right: "100%", bottom: 0 }} />
          <Notch curve="tl" style={{ right: 0, bottom: "100%" }} />
        </div>
      </a>
    </motion.div>
  );
}
