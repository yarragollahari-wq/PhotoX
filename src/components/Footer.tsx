"use client";

import { brand, footer } from "@/data/site";
import { Avatar } from "./Avatar";
import { ArrowUpRightIcon, CameraIcon } from "./icons";
import { ActionButton, PillButton, TextSwap, useHover } from "./primitives";

function FooterLink({ label, href }: { label: string; href: string }) {
  const { hovered, bind } = useHover();
  return (
    <a href={href} {...bind} style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: 15 }}>
      <TextSwap text={label} hovered={hovered} height={15} gap={1} className="t-label" />
    </a>
  );
}

export function Footer() {
  return (
    <footer id="photographers" style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", scrollMarginTop: 12 }}>
      <ActionButton label={footer.ctaLabel} href="#photographers" primary icon={<CameraIcon />} />

      <div
        className="footer-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: 12,
          background: "var(--text)",
          color: "var(--bg)",
          width: "100%",
        }}
      >
        {/* Top row */}
        <div className="footer-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "1 0 0px" }}>
            <Avatar size={60} inverse />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <h2 style={{ margin: 0, fontSize: 24, lineHeight: "28.8px", fontWeight: 400 }}>{brand.name}</h2>
              <p className="t-body" style={{ margin: 0, color: "var(--muted-inverse)" }}>
                {brand.role}
              </p>
            </div>
          </div>
          <PillButton label={footer.sponsorButton} href="#sponsors" icon={<ArrowUpRightIcon />} variant="inverse" />
        </div>

        {/* Columns */}
        <div className="footer-cols" style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
          {footer.columns.map((col) => (
            <div key={col.heading} style={{ display: "flex", flexDirection: "column", gap: 32, flex: "1 0 0px" }}>
              <h3 style={{ margin: 0, fontSize: 16, lineHeight: "22.4px", fontWeight: 400 }}>{col.heading}</h3>
              <nav style={{ display: "flex", flexDirection: "column", gap: 20 }} aria-label={col.heading}>
                {col.links.map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </nav>
            </div>
          ))}
        </div>

        <p className="t-body" style={{ margin: 0, color: "var(--muted-inverse)" }}>
          © By{" "}
          <a href="#" style={{ color: "var(--bg)", textDecoration: "underline" }}>
            PhotoGuild SA
          </a>
          . Powered by{" "}
          <a href="#" style={{ color: "var(--bg)", textDecoration: "underline" }}>
            PhotoStories
          </a>
        </p>
      </div>
    </footer>
  );
}
