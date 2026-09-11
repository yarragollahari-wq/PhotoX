import type { Metadata } from "next";
import { AdminDashboard } from "@/components/Dashboards";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Admin · PhotoX",
  description: "Platform KPIs, photographer approvals, sponsor campaigns, orders and refunds.",
};

export default function AdminPage() {
  return (
    <PageShell>
      <div style={{ height: 48 }} aria-hidden="true" />
      <AdminDashboard />
      <Footer />
    </PageShell>
  );
}
