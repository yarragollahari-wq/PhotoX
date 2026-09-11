"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties, type FormEvent } from "react";
import { events, schools, sports } from "@/data/site";
import { ConsentModal } from "./Consent";
import { HashIcon, MagnifyingGlassIcon, UserFocusIcon, ArrowUpRightIcon } from "./icons";
import { Button, Card, Chip } from "./ui";

type Mode = "number" | "face" | "browse";

const selectStyle: CSSProperties = {
  appearance: "none",
  WebkitAppearance: "none",
  background: "var(--bg)",
  color: "var(--text)",
  border: 0,
  outline: 0,
  borderRadius: 12,
  padding: "0 40px 0 20px",
  height: 57,
  font: "inherit",
  fontSize: 14,
  lineHeight: "16.8px",
  minWidth: 0,
  width: "100%",
  cursor: "pointer",
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='%23999'><path d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 16px center",
  backgroundSize: 14,
};

/**
 * The Finder — Saatchi-style structured search bar, front and centre under the hero.
 * Three modes (brief Screen 1/6): by number · by face (POPIA gate) · browse.
 */
export function Finder({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("number");
  const [num, setNum] = useState("");
  const [event, setEvent] = useState(events[0].title);
  const [sport, setSport] = useState("Rugby");
  const [school, setSchool] = useState(schools[0].label);
  const [consent, setConsent] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const go = (q: string) => router.push(`/events${q}`);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "number") go(num ? `?n=${num}` : "");
    else if (mode === "browse") go("");
    else setConsent(true);
  };

  return (
    <Card id="search" style={{ padding: compact ? 24 : 32, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h2 className="t-name" style={{ margin: 0 }}>
            Find your photos
          </h2>
          <p className="t-body" style={{ margin: 0, color: "var(--muted)" }}>
            Search by number, face or event — across every photographer at the fixture.
          </p>
        </div>
        <div role="tablist" aria-label="Search mode" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Chip selected={mode === "number"} onClick={() => setMode("number")}>
            <span style={{ width: 14, height: 14, display: "block" }}>
              <HashIcon />
            </span>
            By number
          </Chip>
          <Chip selected={mode === "face"} onClick={() => setMode("face")}>
            <span style={{ width: 14, height: 14, display: "block" }}>
              <UserFocusIcon />
            </span>
            By face
          </Chip>
          <Chip selected={mode === "browse"} onClick={() => setMode("browse")}>
            <span style={{ width: 14, height: 14, display: "block" }}>
              <ArrowUpRightIcon />
            </span>
            Browse all
          </Chip>
        </div>
      </div>

      <form onSubmit={submit} className="finder-row" role="search" aria-label="Find your photos">
        {mode === "number" ? (
          <>
            <Field label="I’m looking for">
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg)", borderRadius: 12, height: 57, padding: "0 20px" }}>
                <span className="t-body" style={{ color: "var(--muted)" }}>
                  #
                </span>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={num}
                  onChange={(e) => setNum(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
                  placeholder="jersey or bib number, e.g. 14"
                  aria-label="Jersey or bib number"
                  className="t-body"
                  style={{ flex: 1, minWidth: 0, background: "transparent", border: 0, outline: 0, color: "var(--text)", font: "inherit" }}
                />
              </div>
            </Field>
            <Field label="at">
              <select value={event} onChange={(e) => setEvent(e.target.value)} style={selectStyle} aria-label="Event">
                {events.map((ev) => (
                  <option key={ev.title}>{ev.title}</option>
                ))}
              </select>
            </Field>
            <Field label="in">
              <select value={sport} onChange={(e) => setSport(e.target.value)} style={selectStyle} aria-label="Sport">
                {sports.slice(0, 7).map((s) => (
                  <option key={s.label}>{s.label}</option>
                ))}
              </select>
            </Field>
          </>
        ) : mode === "face" ? (
          <>
            <Field label="Upload a photo of your child" grow={2}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  height: 57,
                  padding: "0 20px",
                  borderRadius: 12,
                  background: "var(--bg)",
                  cursor: "pointer",
                  border: "1px dashed var(--card-hover)",
                }}
              >
                <span className="t-body" style={{ color: fileName ? "var(--text)" : "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {fileName ?? "Choose a clear, front-facing photo — used only for this search, then deleted"}
                </span>
                <span style={{ width: 18, height: 18, display: "block", flex: "0 0 auto" }}>
                  <UserFocusIcon />
                </span>
                <input type="file" accept="image/*" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} style={{ display: "none" }} />
              </label>
            </Field>
            <Field label="at">
              <select value={event} onChange={(e) => setEvent(e.target.value)} style={selectStyle} aria-label="Event">
                {events.map((ev) => (
                  <option key={ev.title}>{ev.title}</option>
                ))}
              </select>
            </Field>
          </>
        ) : (
          <>
            <Field label="School">
              <select value={school} onChange={(e) => setSchool(e.target.value)} style={selectStyle} aria-label="School">
                {schools.map((s) => (
                  <option key={s.label}>{s.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Sport">
              <select value={sport} onChange={(e) => setSport(e.target.value)} style={selectStyle} aria-label="Sport">
                {sports.slice(0, 7).map((s) => (
                  <option key={s.label}>{s.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Event">
              <select value={event} onChange={(e) => setEvent(e.target.value)} style={selectStyle} aria-label="Event">
                {events.map((ev) => (
                  <option key={ev.title}>{ev.title}</option>
                ))}
              </select>
            </Field>
          </>
        )}

        <div className="finder-submit">
          <Button primary type="submit" style={{ height: 57, width: "100%", borderRadius: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 16, height: 16, display: "block" }}>
                <MagnifyingGlassIcon />
              </span>
              {mode === "face" ? "Search my photos" : mode === "browse" ? "Browse gallery" : num ? `Find #${num}` : "Search"}
            </span>
          </Button>
        </div>
      </form>

      <p className="t-body" style={{ margin: 0, color: "var(--muted)" }}>
        {mode === "face"
          ? "Face search asks for parent/guardian consent first (POPIA). Your photo is deleted the moment the search completes."
          : "AI reads jersey and bib numbers on every upload, so #14 finds every frame of #14 — from all four photographers."}
      </p>

      <ConsentModal
        open={consent}
        onClose={() => setConsent(false)}
        onConsent={() => {
          setConsent(false);
          go("?face=1");
        }}
      />
    </Card>
  );
}

function Field({ label, children, grow = 1 }: { label: string; children: React.ReactNode; grow?: number }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8, flex: `${grow} 1 0px`, minWidth: 0 }}>
      <span className="t-body" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}
