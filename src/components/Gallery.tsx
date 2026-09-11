"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ageGroups,
  faceResult,
  featuredEvent,
  otherEvents,
  periods,
  photographers,
  photos,
  priceTiers,
  teams,
  type Photo,
  type Photographer,
} from "@/data/gallery";
import { zar } from "@/data/dashboard";
import { springLayout } from "@/lib/motion";
import { ConsentModal } from "./Consent";
import { ArrowRightIcon, ArrowUpRightIcon, HashIcon, MegaphoneIcon, UserFocusIcon } from "./icons";
import { Notch } from "./Notch";
import { ActionButton, UnderlineLink, useHover } from "./primitives";
import { Button, Card, Chip, Initials, Modal } from "./ui";

type Mode = "number" | "face" | "browse";

export function EventGallery() {
  const params = useSearchParams();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>(params.get("face") ? "face" : "number");
  const [num, setNum] = useState(params.get("n") ?? "");
  const [faceState, setFaceState] = useState<"idle" | "consent" | "results">(params.get("face") ? "results" : "idle");
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [team, setTeam] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);
  const [detail, setDetail] = useState<Photo | null>(null);

  useEffect(() => {
    const n = params.get("n");
    if (n) setNum(n);
  }, [params]);

  const n = num ? Number(num) : null;

  const visible = useMemo(() => {
    return photos.filter((p) => {
      if (mode === "face" && faceState === "results" && !p.face) return false;
      if (mode === "number" && n !== null && p.number !== n) return false;
      if (photographer && p.photographer.id !== photographer.id) return false;
      if (age && p.ageGroup !== age) return false;
      if (team && p.team !== team) return false;
      if (period && p.period !== period) return false;
      return true;
    });
  }, [mode, faceState, n, photographer, age, team, period]);

  const clearAll = () => {
    setNum("");
    setPhotographer(null);
    setAge(null);
    setTeam(null);
    setPeriod(null);
    setFaceState("idle");
    router.replace("/events");
  };

  const filtersActive = !!(photographer || age || team || period || (mode === "number" && n !== null) || (mode === "face" && faceState === "results"));

  return (
    <>
      {/* Event header */}
      <Card style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
            <p className="t-body" style={{ margin: 0, color: "var(--muted)" }}>
              {featuredEvent.sport} · {featuredEvent.date} · {featuredEvent.venue}
            </p>
            <h1 style={{ margin: 0, fontSize: 24, lineHeight: "28.8px", fontWeight: 400 }}>{featuredEvent.title}</h1>
            <p className="t-body" style={{ margin: 0 }}>
              {featuredEvent.photographers} photographers · {featuredEvent.photos.toLocaleString("en-ZA").replace(/,/g, " ")} photos
            </p>
          </div>

          {/* Photographer row — click to filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span className="t-body" style={{ color: "var(--muted)" }}>
              Shot by
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {photographers.map((p) => (
                <PhotographerChip key={p.id} p={p} selected={photographer?.id === p.id} onClick={() => setPhotographer(photographer?.id === p.id ? null : p)} />
              ))}
            </div>
          </div>
        </div>

        {/* Search — the visual centre */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div role="tablist" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip selected={mode === "number"} onClick={() => setMode("number")}>
              <span style={{ width: 14, height: 14, display: "block" }}>
                <HashIcon />
              </span>
              By number
            </Chip>
            <Chip
              selected={mode === "face"}
              onClick={() => {
                setMode("face");
                if (faceState === "idle") setFaceState("consent");
              }}
            >
              <span style={{ width: 14, height: 14, display: "block" }}>
                <UserFocusIcon />
              </span>
              By face
            </Chip>
            <Chip
              selected={mode === "browse"}
              onClick={() => {
                setMode("browse");
                setNum("");
              }}
            >
              Browse all
            </Chip>
          </div>

          {mode === "number" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg)", borderRadius: 12, height: 72, padding: "0 24px" }}>
              <span style={{ fontSize: 24, lineHeight: "28.8px", color: "var(--muted)" }}>#</span>
              <input
                autoFocus
                inputMode="numeric"
                pattern="[0-9]*"
                value={num}
                onChange={(e) => setNum(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
                placeholder="e.g. 14"
                aria-label="Jersey or bib number"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "transparent",
                  border: 0,
                  outline: 0,
                  color: "var(--text)",
                  fontSize: 24,
                  lineHeight: "28.8px",
                  fontFamily: "inherit",
                }}
              />
              <span className="t-body" style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                {n !== null ? `${visible.length} photo${visible.length === 1 ? "" : "s"} of #${num}` : "Jersey or bib — AI-tagged on upload"}
              </span>
            </div>
          ) : mode === "face" ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "var(--bg)", borderRadius: 12, minHeight: 72, padding: "16px 24px", flexWrap: "wrap" }}>
              <span className="t-body">
                {faceState === "results" ? (
                  <>
                    Reference photo matched · <span style={{ color: "var(--muted)" }}>deleted after search</span>
                  </>
                ) : (
                  "Upload a photo of your child — guardian consent is required first (POPIA)."
                )}
              </span>
              <Button primary onClick={() => setFaceState("consent")} arrow>
                {faceState === "results" ? "Search again" : "Upload a photo"}
              </Button>
            </div>
          ) : null}

          {/* Filter row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Chip muted small>
              {featuredEvent.sport}
            </Chip>
            <Divider />
            {ageGroups.map((a) => (
              <Chip key={a} small selected={age === a} onClick={() => setAge(age === a ? null : a)}>
                {a}
              </Chip>
            ))}
            <Divider />
            {teams.map((t) => (
              <Chip key={t} small selected={team === t} onClick={() => setTeam(team === t ? null : t)}>
                {t}
              </Chip>
            ))}
            <Divider />
            {periods.map((p) => (
              <Chip key={p} small selected={period === p} onClick={() => setPeriod(period === p ? null : p)}>
                {p}
              </Chip>
            ))}
            {filtersActive ? (
              <button type="button" onClick={clearAll} className="t-label" style={{ color: "var(--muted)", marginLeft: "auto", textDecoration: "underline" }}>
                Clear all
              </button>
            ) : null}
          </div>
        </div>
      </Card>

      {/* Sponsor placement #1 — between filters and grid */}
      <SponsorBanner />

      {/* Results header (State B) */}
      {mode === "face" && faceState === "results" ? (
        <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <h2 className="t-name" style={{ margin: 0 }}>
              {faceResult.count} photos of #{faceResult.number} — {faceResult.name}
            </h2>
            <Confidence value={faceResult.confidence} />
          </div>
          <UnderlineLink label="Not all of these? Refine" href="#refine" />
        </Card>
      ) : (
        <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h2 className="t-body" style={{ margin: 0 }}>
            {filtersActive ? `${visible.length} matching photos` : `Loaded ${featuredEvent.loaded} of ${featuredEvent.photos.toLocaleString("en-ZA").replace(/,/g, " ")}`}
            <span style={{ color: "var(--muted)" }}> · watermarked previews · every image credited to its photographer</span>
          </h2>
          <UnderlineLink label="Sort: newest" href="#sort" />
        </Card>
      )}

      {/* Grid */}
      <motion.div layout className="gallery-grid">
        <AnimatePresence initial={false}>
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={springLayout}
              style={{ minWidth: 0 }}
            >
              <Thumb photo={p} onOpen={() => setDetail(p)} />
            </motion.div>
          ))}
          {/* Sponsor placement #2 — native card inside results */}
          {visible.length > 7 ? (
            <motion.div key="sponsored" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minWidth: 0, gridColumn: "span 1" }}>
              <SponsoredCard />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 48 }}>
          <p className="t-bio" style={{ margin: 0 }}>
            No photos tagged #{num} yet in the first {featuredEvent.loaded} loaded.
          </p>
          <p className="t-body" style={{ margin: "8px 0 0", color: "var(--muted)" }}>
            AI tagging continues in the background as photographers upload — or try a face search.
          </p>
        </Card>
      ) : (
        <Button href="#more" style={{ width: "100%", height: 34, padding: "10px 14px" }}>
          Load more · {featuredEvent.loaded} of {featuredEvent.photos.toLocaleString("en-ZA").replace(/,/g, " ")}
        </Button>
      )}

      {/* Other events */}
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <h2 className="t-body" style={{ margin: 0 }}>
          More events this month
        </h2>
        <UnderlineLink label="All events" href="/#events" />
      </Card>
      <div className="grid-4">
        {otherEvents.map((e) => (
          <ActionButton key={e.title} label={`${e.title} · ${e.photos.toLocaleString("en-ZA").replace(/,/g, " ")} photos`} href={e.href} icon={<ArrowUpRightIcon />} />
        ))}
      </div>

      <ConsentModal
        open={faceState === "consent"}
        onClose={() => {
          setFaceState("idle");
          if (mode === "face") setMode("number");
        }}
        onConsent={() => setFaceState("results")}
      />

      <DetailModal photo={detail} onClose={() => setDetail(null)} />
    </>
  );
}

function Divider() {
  return <span aria-hidden="true" style={{ width: 1, height: 20, background: "var(--card-hover)", display: "inline-block" }} />;
}

function PhotographerChip({ p, selected, onClick }: { p: Photographer; selected: boolean; onClick: () => void }) {
  const { hovered, bind } = useHover();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      {...bind}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 12px 6px 6px",
        borderRadius: 500,
        background: selected ? "var(--text)" : hovered ? "var(--card-hover)" : "var(--bg)",
        color: selected ? "var(--bg)" : "var(--text)",
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      <Initials initials={p.initials} color={p.base} size={28} />
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
        <span className="t-label" style={{ lineHeight: "14px" }}>
          {p.name}
        </span>
        <span className="t-label" style={{ fontSize: 12, lineHeight: "12px", opacity: 0.6 }}>
          {p.photos.toLocaleString("en-ZA").replace(/,/g, " ")} photos
        </span>
      </span>
    </button>
  );
}

function Confidence({ value }: { value: number }) {
  return (
    <span className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--muted)" }}>
      <span style={{ width: 64, height: 4, borderRadius: 2, background: "var(--card-hover)", overflow: "hidden", display: "block" }}>
        <motion.span initial={{ width: 0 }} animate={{ width: `${value * 100}%` }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ display: "block", height: "100%", background: "#3cc7a1" }} />
      </span>
      {Math.round(value * 100)}% match confidence
    </span>
  );
}

function SponsorBanner() {
  return (
    <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <span className="t-body" style={{ color: "var(--muted)", paddingRight: 12, borderRight: "1px solid var(--card-hover)" }}>
          Sponsored
        </span>
        <span aria-hidden="true" style={{ width: 28, height: 28, borderRadius: 6, background: "var(--text)", color: "var(--bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 500, fontSize: 12 }}>
          PM
        </span>
        <p className="t-body" style={{ margin: 0 }}>
          {featuredEvent.sponsor.line}
          <span style={{ color: "var(--muted)" }}> — every parent gets a free sponsor-branded social download.</span>
        </p>
      </div>
      <UnderlineLink label="Why sponsor school sport?" href="/sponsors" />
    </Card>
  );
}

function SponsoredCard() {
  const { hovered, bind } = useHover();
  return (
    <a
      href="/sponsors"
      {...bind}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: 8,
        aspectRatio: "0.75 / 1",
        borderRadius: 12,
        padding: 24,
        background: hovered ? "var(--card-hover)" : "var(--card)",
        transition: "background-color 0.2s ease",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, padding: "8px 16px 12px", borderRadius: "0 0 18px 0", background: "var(--bg)" }}>
        <span className="t-body" style={{ color: "var(--muted)" }}>
          Sponsored
        </span>
        <Notch curve="br" style={{ top: "100%", left: 0 }} />
        <Notch curve="br" style={{ top: 0, left: "100%" }} />
      </div>
      <span style={{ width: 40, height: 40, display: "block", color: "var(--text)" }}>
        <MegaphoneIcon />
      </span>
      <h3 className="t-name" style={{ margin: 0 }}>
        Protea Mutual
      </h3>
      <p className="t-body" style={{ margin: 0, color: "var(--muted)" }}>
        Proud supporter of Pretoria school rugby. Get your free sponsor-branded match photo.
      </p>
      <span className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        Learn more
        <span style={{ width: 13, height: 13, display: "block" }}>
          <ArrowRightIcon />
        </span>
      </span>
    </a>
  );
}

/* Thumbnail — watermarked, AI tag badge, photographer credit on hover (blur+arrow like template cards) */
function Thumb({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  const { hovered, bind } = useHover();
  return (
    <button
      type="button"
      onClick={onOpen}
      {...bind}
      aria-label={`Open photo ${photo.id}${photo.number ? ` tagged #${photo.number}` : ""} by ${photo.photographer.name}`}
      style={{ position: "relative", display: "block", width: "100%", aspectRatio: "0.75 / 1", borderRadius: 12, overflow: "hidden", textAlign: "left", background: "var(--card)" }}
    >
      <div style={{ position: "absolute", inset: "-1%", filter: hovered ? "blur(7px)" : "blur(0px)", transition: "filter 0.2s ease-out" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: photo.pos }} />
        <div className="watermark" />
      </div>

      {photo.number !== null ? (
        <div style={{ position: "absolute", top: 0, left: 0, padding: "8px 16px 12px", borderRadius: "0 0 18px 0", background: "var(--bg)", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 12, height: 12, display: "block", color: "var(--muted)" }}>
            <HashIcon />
          </span>
          <span className="t-body">{photo.number}</span>
          <Notch curve="br" style={{ top: "100%", left: 0 }} />
          <Notch curve="br" style={{ top: 0, left: "100%" }} />
        </div>
      ) : null}

      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={springLayout}
        style={{ position: "absolute", right: 0, bottom: 0, display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 8px", borderRadius: "18px 0 0 0", background: "var(--bg)" }}
      >
        <Initials initials={photo.photographer.initials} color={photo.photographer.base} size={20} />
        <span className="t-body" style={{ whiteSpace: "nowrap" }}>
          {photo.photographer.name}
        </span>
        <Notch curve="tl" style={{ right: "100%", bottom: 0 }} />
        <Notch curve="tl" style={{ right: 0, bottom: "100%" }} />
      </motion.div>
    </button>
  );
}

/* Screen 4 — Image detail + purchase panel */
function DetailModal({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
  const [tier, setTier] = useState(0);
  const [branded, setBranded] = useState(false);
  const open = photo !== null;
  return (
    <Modal open={open} onClose={onClose} title={photo ? `Photo ${photo.id} · ${featuredEvent.title}` : ""} width={1040}>
      {photo ? (
        <div className="detail" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 1fr)", gap: 24 }}>
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "0.75 / 1", background: "var(--bg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: photo.pos }} />
            <div className="watermark" />
            <div style={{ position: "absolute", right: 0, bottom: 0, display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 8px", borderRadius: "18px 0 0 0", background: "var(--bg)" }}>
              <Initials initials={photo.photographer.initials} color={photo.photographer.base} size={20} />
              <a href="/photographers" className="t-body" style={{ textDecoration: "underline" }}>
                {photo.photographer.name}
              </a>
              <Notch curve="tl" style={{ right: "100%", bottom: 0 }} />
              <Notch curve="tl" style={{ right: 0, bottom: "100%" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {photo.number !== null ? <Chip small>#{photo.number}</Chip> : null}
              <Chip small>{featuredEvent.sport}</Chip>
              <Chip small>{photo.ageGroup}</Chip>
              <Chip small>{photo.period}</Chip>
              <Chip small>{photo.team}</Chip>
              <Chip small muted>
                AI-detected
              </Chip>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {priceTiers.map((t, i) => {
                const selected = tier === i;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTier(i)}
                    aria-pressed={selected}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "14px 16px",
                      borderRadius: 12,
                      background: selected ? "var(--text)" : "var(--bg)",
                      color: selected ? "var(--bg)" : "var(--text)",
                      textAlign: "left",
                      transition: "background-color 0.2s ease, color 0.2s ease",
                    }}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <span className="t-body">{t.label}</span>
                      <span className="t-body" style={{ opacity: 0.6 }}>
                        {t.note}
                      </span>
                    </span>
                    <span className="t-name">{zar(t.price)}</span>
                  </button>
                );
              })}
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: 16,
                borderRadius: 12,
                background: branded ? "var(--card-hover)" : "var(--bg)",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              <input type="checkbox" checked={branded} onChange={(e) => setBranded(e.target.checked)} style={{ marginTop: 2, accentColor: "var(--text)" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="t-body">
                  Free sponsor-branded edition · <span style={{ color: "var(--muted)" }}>R0</span>
                </span>
                <span className="t-body" style={{ color: "var(--muted)" }}>
                  1500px social version with the {featuredEvent.sponsor.brand} mark — share it for free.
                </span>
              </span>
            </label>

            <Button primary arrow style={{ height: 48, borderRadius: 12 }}>
              {branded && tier === 0 ? "Download free edition" : `Add to cart · ${zar(priceTiers[tier].price)}`}
            </Button>

            <p className="t-body" style={{ margin: 0, color: "var(--muted)" }}>
              Personal use. Not for commercial or resale purposes. Paid via PayFast / Peach Payments in ZAR; {photo.photographer.name.split(" ")[0]} receives 75% of this sale.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--card-hover)" }}>
              <span className="t-body" style={{ color: "var(--muted)" }}>
                {featuredEvent.sponsor.line}
              </span>
              <span style={{ width: 14, height: 14, display: "block", color: "var(--muted)" }}>
                <MegaphoneIcon />
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
