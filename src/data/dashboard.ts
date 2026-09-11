/** Photographer dashboard (Screen 3), Admin (Screen 5) and Sponsor data. ZAR throughout. */

export const zar = (n: number) => "R" + n.toLocaleString("en-ZA").replace(/,/g, " ");

export const photographerNav = ["Events", "Galleries", "Uploads", "Sales", "Payouts", "Profile", "Analytics"] as const;

export const upload = {
  event: "Pretoria Boys High vs Affies — Rugby Derby",
  total: 800,
  uploaded: 312,
  processed: 190,
  tagged: 142,
  rate: 6, // files / second (fake)
};

export const salesSummary = {
  imagesSold: 388,
  gross: 12480,
  commissionRate: 0.25,
  commission: 3120,
  payout: 9360,
};

export const payouts = [
  { date: "05 Sep 2026", event: "Menlopark Derby Day", sold: 96, gross: 3240, rate: 25, net: 2430, status: "Pending" },
  { date: "29 Aug 2026", event: "Clover 7's", sold: 142, gross: 4590, rate: 25, net: 3443, status: "Paid" },
  { date: "22 Aug 2026", event: "Grey College vs Paul Roos", sold: 88, gross: 2870, rate: 25, net: 2153, status: "Paid" },
  { date: "15 Aug 2026", event: "St John's Hockey Festival", sold: 62, gross: 1780, rate: 25, net: 1335, status: "Paid" },
] as const;

export const eventPerformance = [
  { event: "Pretoria Boys High vs Affies", uploaded: 1412, views: 18420, conversion: 2.8, revenue: 5230 },
  { event: "Menlopark Derby Day", uploaded: 940, views: 9870, conversion: 2.1, revenue: 3240 },
  { event: "Clover 7's", uploaded: 1310, views: 14210, conversion: 3.2, revenue: 4590 },
  { event: "Grey College vs Paul Roos", uploaded: 780, views: 8120, conversion: 1.9, revenue: 2870 },
];

export const adminKpis = [
  { label: "Active photographers", value: "148", delta: "+12 this month" },
  { label: "Events this month", value: "63", delta: "21 schools" },
  { label: "Images stored", value: "2.4M", delta: "+186k this month" },
  { label: "GMV (30 days)", value: zar(486210), delta: "+18% MoM" },
  { label: "Commission earned", value: zar(121550), delta: "25% avg rate" },
];

export const approvals = [
  { id: 1, name: "Lerato Dlamini", location: "Centurion", sports: "Rugby · Hockey", portfolio: 24, applied: "2 h ago" },
  { id: 2, name: "Pieter Kruger", location: "Bloemfontein", sports: "Rugby · Athletics", portfolio: 40, applied: "5 h ago" },
  { id: 3, name: "Naledi Sithole", location: "Johannesburg", sports: "Netball · Swimming", portfolio: 18, applied: "yesterday" },
];

export const campaigns = [
  { name: "Protea Mutual — Derby Day", placements: "Homepage · Gallery banner · Purchase panel", impressions: 184200, clicks: 3120, status: "Live", schedule: "1 Aug – 30 Sep" },
  { name: "Kalahari Sports — Craven Week", placements: "Search results · Image preview", impressions: 96400, clicks: 1980, status: "Live", schedule: "Jul – Aug" },
  { name: "Boerewors Bros — Clover 7's", placements: "Free sponsor-branded download", impressions: 41250, clicks: 2210, status: "Scheduled", schedule: "From 12 Sep" },
  { name: "Highveld Dairy — Netball League", placements: "Email · Gallery banner", impressions: 22800, clicks: 310, status: "Ended", schedule: "May – Jul" },
];

export const orders = [
  { id: "PX-20931", buyer: "M. van Wyk", item: "Match bundle — #14", event: "Boys High vs Affies", amount: 499, status: "Paid", gateway: "PayFast" },
  { id: "PX-20930", buyer: "S. Pillay", item: "High-res original", event: "Clover 7's", amount: 199, status: "Paid", gateway: "Peach" },
  { id: "PX-20927", buyer: "T. Nkosi", item: "Team bundle", event: "Menlopark Derby Day", amount: 899, status: "Refund requested", gateway: "PayFast" },
  { id: "PX-20925", buyer: "J. Botha", item: "Social size ×3", event: "Inter-High Athletics", amount: 237, status: "Paid", gateway: "Paystack" },
];

export const placements = [
  { surface: "Homepage", slot: "Sponsored bar under events", format: "Text + logo · 1 slot", rate: 8500 },
  { surface: "Search results", slot: "Native card in results grid", format: "Image card · every 12th tile", rate: 6500 },
  { surface: "Event gallery", slot: "Banner between filters and grid", format: "Banner 1200×160", rate: 7500 },
  { surface: "Image preview", slot: "“Brought to you by” under the buy panel", format: "Logo + line", rate: 4500 },
  { surface: "Emails", slot: "Order confirmation & new-gallery alerts", format: "Header logo + footer", rate: 3500 },
  { surface: "Sponsor-branded download", slot: "Free social image with your watermark", format: "1500px, your mark bottom-right", rate: 12000 },
];
