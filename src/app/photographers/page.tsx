import type { Metadata } from "next";
import { PhotographerDashboard } from "@/components/Dashboards";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Photographer dashboard · PhotoX",
  description: "Bulk uploads with AI tagging, sales, commission and payouts in ZAR, per-event performance.",
};

export default function PhotographersPage() {
  return (
    <PageShell>
      <div style={{ height: 48 }} aria-hidden="true" />
      <PhotographerDashboard />
      <Footer />
    </PageShell>
  );
}
