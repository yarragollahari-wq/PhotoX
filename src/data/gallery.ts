/** Fake-but-plausible gallery data for the Event Gallery screen (Screen 1/2/4). */

export type Photographer = {
  id: string;
  name: string;
  initials: string;
  photos: number;
  base: string; // avatar accent
};

export const photographers: Photographer[] = [
  { id: "gvdl", name: "Gerrit van der Linde", initials: "GL", photos: 1412, base: "#5b7cfa" },
  { id: "tm", name: "Thandi Mokoena", initials: "TM", photos: 986, base: "#f58a3c" },
  { id: "rb", name: "Riaan Botha", initials: "RB", photos: 873, base: "#3cc7a1" },
  { id: "an", name: "Ashwin Naidoo", initials: "AN", photos: 576, base: "#e05c8a" },
];

export const featuredEvent = {
  slug: "pretoria-boys-high-vs-affies",
  title: "Pretoria Boys High vs Affies — Rugby Derby",
  date: "Saturday 6 September 2026",
  venue: "Pretoria Boys High, Brooks Field",
  sport: "Rugby",
  photographers: photographers.length,
  photos: 3847,
  loaded: 60,
  sponsor: { brand: "Protea Mutual", line: "This gallery is brought to you by Protea Mutual" },
};

export const ageGroups = ["U14", "U15", "U16", "1st XV"] as const;
export const teams = ["Pretoria Boys High", "Affies"] as const;
export const periods = ["First half", "Second half"] as const;

export type Photo = {
  id: number;
  src: string;
  photographer: Photographer;
  number: number | null;
  ageGroup: (typeof ageGroups)[number];
  team: (typeof teams)[number];
  period: (typeof periods)[number];
  pos: string; // object-position for crop variety
  face: boolean; // matched by the (fake) face search
};

const sources = [
  "/images/event-garsfontein-waterkloof.jpg",
  "/images/event-affies-boyshigh.jpg",
  "/images/event-clover-7s.jpg",
  "/images/event-craven-week.jpg",
  "/images/event-menlopark-derby.jpg",
  "/images/event-grey-paulroos.jpg",
  "/images/hero-01.jpg",
  "/images/hero-02.jpg",
  "/images/hero-03.jpg",
];

const positions = ["50% 0%", "50% 20%", "30% 10%", "70% 15%", "50% 40%", "20% 30%", "80% 0%", "50% 60%"];

// deterministic pseudo-random so SSR and client agree
const seeded = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export const photos: Photo[] = Array.from({ length: featuredEvent.loaded }, (_, i) => {
  const r = seeded(i + 1);
  const r2 = seeded(i + 101);
  const r3 = seeded(i + 211);
  const numbered = r < 0.62;
  const number = numbered ? (i % 7 === 0 ? 14 : 1 + Math.floor(r2 * 15)) : null;
  return {
    id: 1000 + i,
    src: sources[i % sources.length],
    photographer: photographers[Math.floor(r3 * photographers.length)],
    number,
    ageGroup: ageGroups[Math.floor(r2 * ageGroups.length)],
    team: teams[i % 2],
    period: periods[Math.floor(r * 2)],
    pos: positions[i % positions.length],
    face: number === 14 || (r > 0.9 && number !== null),
  };
});

export const faceResult = {
  count: photos.filter((p) => p.face).length,
  number: 14,
  name: "Jason M.",
  confidence: 0.94,
};

export const priceTiers = [
  { label: "Social media size (1500px)", note: "Instagram, WhatsApp, Facebook", price: 79 },
  { label: "Print size (2500px)", note: "Up to A4 at 300dpi", price: 129 },
  { label: "High-resolution original (3500px+)", note: "Full-size file, no watermark", price: 199 },
  { label: "Match bundle — all photos of #14", note: `${faceResult.count} images, every photographer`, price: 499, bundle: true },
  { label: "Team bundle — full match gallery", note: `${featuredEvent.photos.toLocaleString("en-ZA")} images`, price: 899, bundle: true },
];

export const otherEvents = [
  { title: "Menlopark Derby Day", photographers: 3, photos: 2760, href: "/events" },
  { title: "Clover 7's", photographers: 5, photos: 6412, href: "/events" },
  { title: "St John's Hockey Festival", photographers: 3, photos: 2034, href: "/events" },
  { title: "Inter-High Athletics", photographers: 2, photos: 1587, href: "/events" },
];
