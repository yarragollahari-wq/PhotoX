"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  adminKpis,
  approvals as approvalsData,
  campaigns,
  eventPerformance,
  orders,
  payouts,
  photographerNav,
  placements,
  salesSummary,
  upload,
  zar,
} from "@/data/dashboard";
import { photographers } from "@/data/gallery";
import { ArrowRightIcon, ArrowUpRightIcon, CameraIcon, MegaphoneIcon } from "./icons";
import { ActionButton, UnderlineLink, useHover } from "./primitives";
import { Appear, Button, Card, Chip, Initials, Stat, Status, Table } from "./ui";

const fmt = (n: number) => n.toLocaleString("en-ZA").replace(/,/g, " ");

/* ------------------------------------------------------------------ */
/* Sidebar item — same text-swap language as the nav                    */
/* ------------------------------------------------------------------ */
function SideItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const { hovered, bind } = useHover();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      {...bind}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderRadius: 12,
        background: active ? "var(--text)" : hovered ? "var(--card-hover)" : "var(--card)",
        color: active ? "var(--bg)" : "var(--text)",
        transition: "background-color 0.2s ease, color 0.2s ease",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span className="t-body">{label}</span>
      <span style={{ width: 14, height: 14, display: "block", opacity: active ? 1 : 0.5 }}>
        <ArrowRightIcon />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 3 — Photographer dashboard                                    */
/* ------------------------------------------------------------------ */
export function PhotographerDashboard() {
  const [section, setSection] = useState<(typeof photographerNav)[number]>("Uploads");
  const me = photographers[0];

  return (
    <div className="dash">
      <aside className="dash-side" aria-label="Dashboard navigation">
        <Card style={{ display: "flex", alignItems: "center", gap: 12, padding: 20, gridColumn: "1 / -1" }}>
          <Initials initials={me.initials} color={me.base} size={40} />
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            <span className="t-body" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {me.name}
            </span>
            <span className="t-body" style={{ color: "var(--muted)" }}>
              Approved photographer · Pretoria
            </span>
          </div>
        </Card>
        {photographerNav.map((n) => (
          <SideItem key={n} label={n} active={section === n} onClick={() => setSection(n)} />
        ))}
      </aside>

      <div className="dash-main">
        {/* Upload state — background processing at scale */}
        <Appear>
          <UploadPanel />
        </Appear>

        {/* Sales summary */}
        <div className="grid-4">
          <Stat label="Images sold this month" value={fmt(salesSummary.imagesSold)} delta="+22% vs August" />
          <Stat label="Gross revenue" value={zar(salesSummary.gross)} delta="across 4 events" />
          <Stat label={`PhotoX commission (${salesSummary.commissionRate * 100}%)`} value={zar(salesSummary.commission)} delta="calculated automatically" />
          <Stat label="Your payout" value={zar(salesSummary.payout)} delta="next payout Fri 12 Sep" />
        </div>

        {/* Payout table */}
        <Card style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <h2 className="t-name" style={{ margin: 0 }}>
              Payouts
            </h2>
            <UnderlineLink label="Download statement (PDF)" href="#statement" />
          </div>
          <Table
            columns={["Date", "Event", "Images sold", "Gross", "Commission", "Net payout", "Status"]}
            align={["left", "left", "right", "right", "right", "right", "left"]}
            rows={payouts.map((p) => [p.date, p.event, fmt(p.sold), zar(p.gross), `${p.rate}%`, <strong key="n" style={{ fontWeight: 500 }}>{zar(p.net)}</strong>, <Status key="s" value={p.status} />])}
          />
        </Card>

        {/* Per-event performance */}
        <Card style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <h2 className="t-name" style={{ margin: 0 }}>
              Per-event performance
            </h2>
            <span className="t-body" style={{ color: "var(--muted)" }}>
              Conversion = orders ÷ gallery views
            </span>
          </div>
          <Table
            columns={["Event", "Images uploaded", "Views", "Conversion", "Revenue"]}
            align={["left", "right", "right", "right", "right"]}
            rows={eventPerformance.map((e) => [e.event, fmt(e.uploaded), fmt(e.views), `${e.conversion.toFixed(1)}%`, zar(e.revenue)])}
          />
        </Card>

        <div className="grid-4">
          <ActionButton label="Create an event" href="#new-event" icon={<CameraIcon />} />
          <ActionButton label="Set pricing" href="#pricing" icon={<ArrowUpRightIcon />} />
          <ActionButton label="Edit public profile" href="#profile" icon={<ArrowUpRightIcon />} />
          <ActionButton label="Analytics" href="#analytics" icon={<ArrowUpRightIcon />} />
        </div>
      </div>
    </div>
  );
}

function UploadPanel() {
  const [uploaded, setUploaded] = useState(upload.uploaded);
  const [processed, setProcessed] = useState(upload.processed);
  const [tagged, setTagged] = useState(upload.tagged);

  // Fake background processing so the panel feels alive
  useEffect(() => {
    const id = setInterval(() => {
      setUploaded((u) => Math.min(upload.total, u + Math.round(Math.random() * 3)));
      setProcessed((p) => Math.min(uploaded, p + Math.round(Math.random() * 2)));
      setTagged((t) => Math.min(processed, t + Math.round(Math.random() * 2)));
    }, 900);
    return () => clearInterval(id);
  }, [uploaded, processed]);

  const pct = (n: number) => `${Math.round((n / upload.total) * 100)}%`;

  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: 24, padding: 32 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="t-body" style={{ color: "var(--muted)" }}>
            Bulk upload · {upload.event}
          </span>
          <h2 className="t-name" style={{ margin: 0 }}>
            {fmt(uploaded)} of {fmt(upload.total)} uploaded · {fmt(processed)} processed · AI tagging in progress
          </h2>
        </div>
        <Status value={uploaded >= upload.total ? "Ready" : "Processing"} />
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: 32,
          borderRadius: 12,
          border: "1px dashed var(--card-hover)",
          background: "var(--bg)",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        <span style={{ width: 18, height: 18, display: "block" }}>
          <CameraIcon />
        </span>
        <span className="t-body">
          Drop RAW/JPEG files or a whole folder here — <span style={{ color: "var(--muted)" }}>thousands at a time. Thumbnails, watermarks and AI tags are generated in the background.</span>
        </span>
        <input type="file" multiple style={{ display: "none" }} />
      </label>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Progress label="Uploaded to cloud storage" value={uploaded} total={upload.total} pct={pct(uploaded)} />
        <Progress label="Thumbnails · watermark · CDN" value={processed} total={upload.total} pct={pct(processed)} />
        <Progress label="AI tagging (jersey / bib numbers, faces)" value={tagged} total={upload.total} pct={pct(tagged)} accent />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Chip small muted>
          Originals encrypted at rest
        </Chip>
        <Chip small muted>
          Watermarked previews only
        </Chip>
        <Chip small muted>
          Numbers detected: 1–15, 16–23 bench
        </Chip>
        <Chip small muted>
          Faces indexed for consented search only
        </Chip>
      </div>
    </Card>
  );
}

function Progress({ label, value, total, pct, accent = false }: { label: string; value: number; total: number; pct: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <span className="t-body">{label}</span>
        <span className="t-body" style={{ color: "var(--muted)" }}>
          {fmt(value)} / {fmt(total)} · {pct}
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "var(--bg)", overflow: "hidden" }}>
        <motion.div
          animate={{ width: pct }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
          style={{ height: "100%", background: accent ? "#3cc7a1" : "var(--text)", borderRadius: 3 }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 5 — Admin overview                                            */
/* ------------------------------------------------------------------ */
export function AdminDashboard() {
  const [queue, setQueue] = useState(approvalsData.map((a) => ({ ...a, decision: null as null | "approved" | "rejected" })));
  const decide = (id: number, decision: "approved" | "rejected") => setQueue((q) => q.map((a) => (a.id === id ? { ...a, decision } : a)));

  return (
    <div className="dash-main">
      <div className="grid-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {adminKpis.map((k) => (
          <Stat key={k.label} {...k} />
        ))}
      </div>

      <Card style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h2 className="t-name" style={{ margin: 0 }}>
            Pending photographer approvals
          </h2>
          <span className="t-body" style={{ color: "var(--muted)" }}>
            {queue.filter((q) => !q.decision).length} waiting · SARU / school accreditation checked on apply
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {queue.map((a) => (
            <motion.div
              key={a.id}
              layout
              animate={{ opacity: a.decision ? 0.55 : 1 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: 16, borderRadius: 12, background: "var(--bg)", flexWrap: "wrap" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <Initials initials={a.name.split(" ").map((s) => s[0]).join("")} color="#5b7cfa" size={36} />
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span className="t-body">{a.name}</span>
                  <span className="t-body" style={{ color: "var(--muted)" }}>
                    {a.location} · {a.sports} · {a.portfolio} portfolio images · applied {a.applied}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {a.decision ? (
                  <Status value={a.decision === "approved" ? "Approved" : "Rejected"} />
                ) : (
                  <>
                    <Button onClick={() => decide(a.id, "rejected")}>Reject</Button>
                    <Button primary onClick={() => decide(a.id, "approved")}>
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h2 className="t-name" style={{ margin: 0 }}>
            Sponsor campaigns
          </h2>
          <UnderlineLink label="New campaign" href="/sponsors" />
        </div>
        <Table
          columns={["Campaign", "Placements", "Impressions", "Clicks", "CTR", "Status", "Schedule"]}
          align={["left", "left", "right", "right", "right", "left", "left"]}
          rows={campaigns.map((c) => [
            c.name,
            <span key="p" style={{ color: "var(--muted)" }}>{c.placements}</span>,
            fmt(c.impressions),
            fmt(c.clicks),
            `${((c.clicks / c.impressions) * 100).toFixed(2)}%`,
            <Status key="s" value={c.status} />,
            c.schedule,
          ])}
        />
      </Card>

      <Card style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h2 className="t-name" style={{ margin: 0 }}>
            Recent orders & refund requests
          </h2>
          <span className="t-body" style={{ color: "var(--muted)" }}>
            PayFast · Peach Payments · Paystack
          </span>
        </div>
        <Table
          columns={["Order", "Buyer", "Item", "Event", "Amount", "Gateway", "Status"]}
          align={["left", "left", "left", "left", "right", "left", "left"]}
          rows={orders.map((o) => [o.id, o.buyer, o.item, o.event, zar(o.amount), o.gateway, <Status key="s" value={o.status} />])}
        />
      </Card>

      <div className="grid-4">
        <ActionButton label="Photographers & users" href="#users" icon={<ArrowUpRightIcon />} />
        <ActionButton label="Events, galleries & images" href="/events" icon={<ArrowUpRightIcon />} />
        <ActionButton label="Coupons & refunds" href="#coupons" icon={<ArrowUpRightIcon />} />
        <ActionButton label="Sponsors & advertising" href="/sponsors" icon={<MegaphoneIcon />} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sponsors — placements, performance, rate card                        */
/* ------------------------------------------------------------------ */
export function SponsorsOverview() {
  return (
    <div className="dash-main">
      <Card style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        <span className="t-body" style={{ color: "var(--muted)" }}>
          Sponsor system
        </span>
        <h1 style={{ margin: 0, fontSize: 24, lineHeight: "28.8px", fontWeight: 400 }}>
          Reach parents at the exact moment they’re looking at their own child.
        </h1>
        <p className="t-bio" style={{ margin: 0, maxWidth: 720 }}>
          PhotoX placements are designed-in and clearly labelled — never bolted on. Target by school, sport, region or a single derby day, schedule campaigns, and see impressions, clicks and CTR per placement.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button primary href="#enquire" arrow>
            Sponsor a fixture
          </Button>
          <Button href="/events">See a live placement</Button>
        </div>
      </Card>

      <div className="grid-3">
        {placements.map((p) => (
          <Appear key={p.surface}>
            <Card hover style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%", padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span className="t-body" style={{ color: "var(--muted)" }}>
                  Sponsored
                </span>
                <span style={{ width: 14, height: 14, display: "block", color: "var(--muted)" }}>
                  <MegaphoneIcon />
                </span>
              </div>
              <h3 className="t-name" style={{ margin: 0 }}>
                {p.surface}
              </h3>
              <p className="t-body" style={{ margin: 0, color: "var(--muted)", lineHeight: "20px" }}>
                {p.slot}
                <br />
                {p.format}
              </p>
              <span className="t-body" style={{ marginTop: "auto" }}>
                from {zar(p.rate)} <span style={{ color: "var(--muted)" }}>/ event</span>
              </span>
            </Card>
          </Appear>
        ))}
      </div>

      <Card style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h2 className="t-name" style={{ margin: 0 }}>
            Live campaign performance
          </h2>
          <span className="t-body" style={{ color: "var(--muted)" }}>
            Updated hourly · exportable CSV
          </span>
        </div>
        <Table
          columns={["Campaign", "Placements", "Impressions", "Clicks", "CTR", "Status", "Schedule"]}
          align={["left", "left", "right", "right", "right", "left", "left"]}
          rows={campaigns.map((c) => [
            c.name,
            <span key="p" style={{ color: "var(--muted)" }}>{c.placements}</span>,
            fmt(c.impressions),
            fmt(c.clicks),
            `${((c.clicks / c.impressions) * 100).toFixed(2)}%`,
            <Status key="s" value={c.status} />,
            c.schedule,
          ])}
        />
      </Card>

      <div className="grid-2">
        <Card style={{ display: "flex", flexDirection: "column", gap: 12, padding: 28 }}>
          <h3 className="t-name" style={{ margin: 0 }}>
            Sponsor-branded free downloads
          </h3>
          <p className="t-body" style={{ margin: 0, color: "var(--muted)", lineHeight: "20px" }}>
            Every parent can take a free 1500px social version of their photo carrying your mark. It’s the placement parents actually share — on WhatsApp school groups, Instagram and Facebook — and every share is logged.
          </p>
        </Card>
        <Card id="enquire" style={{ display: "flex", flexDirection: "column", gap: 12, padding: 28 }}>
          <h3 className="t-name" style={{ margin: 0 }}>
            Enquire
          </h3>
          <p className="t-body" style={{ margin: 0, color: "var(--muted)", lineHeight: "20px" }}>
            Tell us the school, sport or fixture you want and we’ll send a schedule and rate card in ZAR.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip small>Pretoria Boys High</Chip>
            <Chip small>Affies</Chip>
            <Chip small>Derby Day</Chip>
            <Chip small>Craven Week</Chip>
          </div>
          <Button primary href="mailto:sponsors@photox.co.za" arrow style={{ alignSelf: "flex-start" }}>
            sponsors@photox.co.za
          </Button>
        </Card>
      </div>
    </div>
  );
}
