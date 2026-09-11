import { Suspense } from "react";
import type { Metadata } from "next";
import { EventGallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pretoria Boys High vs Affies — Rugby Derby · PhotoX",
  description: "4 photographers · 3 847 photos. Search by jersey number, face (with guardian consent) or browse.",
};

export default function EventsPage() {
  return (
    <PageShell>
      <div style={{ height: 48 }} aria-hidden="true" />
      <Suspense fallback={null}>
        <EventGallery />
      </Suspense>
      <Footer />
    </PageShell>
  );
}
