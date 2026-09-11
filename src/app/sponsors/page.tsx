import type { Metadata } from "next";
import { SponsorsOverview } from "@/components/Dashboards";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sponsors · PhotoX",
  description: "Designed-in, clearly labelled sponsor placements across homepage, search, galleries, image previews and emails.",
};

export default function SponsorsPage() {
  return (
    <PageShell>
      <div style={{ height: 48 }} aria-hidden="true" />
      <SponsorsOverview />
      <Footer />
    </PageShell>
  );
}
