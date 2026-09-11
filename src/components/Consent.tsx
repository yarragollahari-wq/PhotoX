"use client";

import { useState } from "react";
import { Button, Modal } from "./ui";

/**
 * POPIA consent gate — fires before any face search runs (brief §2, Screen 2 State A).
 * Biometric data is special personal information; children's data needs guardian consent.
 */
export function ConsentModal({
  open,
  onClose,
  onConsent,
}: {
  open: boolean;
  onClose: () => void;
  onConsent: () => void;
}) {
  const [guardian, setGuardian] = useState(false);
  const [process, setProcess] = useState(false);
  const ready = guardian && process;

  return (
    <Modal open={open} onClose={onClose} title="Before we search by face" width={560}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="t-bio" style={{ margin: 0 }}>
          PhotoX uses facial recognition to find photos of your child. Under <strong style={{ fontWeight: 500 }}>POPIA</strong>, we
          need the consent of a parent or legal guardian to process this information.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Check checked={guardian} onChange={setGuardian} label="I am the parent or legal guardian of the person in this photo" />
          <Check checked={process} onChange={setProcess} label="I consent to PhotoX processing this image to find matching photographs" />
        </div>

        <div
          className="t-body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 16,
            borderRadius: 12,
            background: "var(--bg)",
            color: "var(--muted)",
          }}
        >
          <span>Your reference photo is used only for this search and is deleted immediately afterwards.</span>
          <span>No face template is stored. Matching runs against this event&apos;s gallery only.</span>
          <a href="#popia" style={{ color: "var(--text)", textDecoration: "underline" }}>
            How we handle your data
          </a>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button primary disabled={!ready} onClick={ready ? onConsent : undefined} arrow>
            Search my photos
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: 16,
        borderRadius: 12,
        background: checked ? "var(--card-hover)" : "var(--bg)",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: 2, width: 16, height: 16, accentColor: "var(--text)", flex: "0 0 auto" }}
      />
      <span className="t-body">{label}</span>
    </label>
  );
}
