/**
 * PhotoX homepage content — written from the client brief (Screen 6) and the
 * research pack (01–05). Authentic Pretoria / SA school-sport specificity on purpose.
 */

export const brand = {
  name: "PhotoX",
  logoWord: "photox",
  logoAlt: "guild",
  role: "by PhotoGuild SA · Pretoria",
};

export const search = {
  title: "Find your photos",
  subtitle: "Search by number, face or event",
  placeholder: "Jersey or bib no. e.g. 14",
  helper:
    "Every photographer on the sideline, one gallery. AI-tagged by jersey number and face, so a parent finds their child in seconds — with POPIA guardian consent before any face search runs.",
  cta: "Search",
};

export const navLinks = [
  { label: "Events", href: "#events" },
  { label: "Photographers", href: "#photographers" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Admin", href: "#admin" },
];

export const heroSlides = [
  {
    src: "/images/hero-01.jpg",
    alt: "Pretoria Boys High vs Affies — Rugby Derby, 1st XV",
    href: "#events",
    cta: "Open gallery",
  },
  {
    src: "/images/hero-02.jpg",
    alt: "Lineout under a Pretoria sky — Menlopark Derby Day",
    href: "#events",
    cta: "Open gallery",
  },
  {
    src: "/images/hero-03.jpg",
    alt: "Contested lineout at Loftus — Craven Week",
    href: "#events",
    cta: "Open gallery",
  },
];

export type EventItem = {
  title: string;
  src: string;
  href: string;
  photographers: number;
  photos: number;
  sport: string;
  date: string;
};

export const events: EventItem[] = [
  { title: "Pretoria Boys High vs Affies", src: "/images/event-garsfontein-waterkloof.jpg", href: "#events", photographers: 4, photos: 3847, sport: "Rugby · Derby Day", date: "Sat 6 Sep" },
  { title: "Affies 1st XV Team Day", src: "/images/event-affies-boyshigh.jpg", href: "#events", photographers: 2, photos: 1218, sport: "Rugby · 1st XV", date: "Fri 5 Sep" },
  { title: "Clover 7's", src: "/images/event-clover-7s.jpg", href: "#events", photographers: 5, photos: 6412, sport: "Rugby Sevens · U16", date: "Sat 30 Aug" },
  { title: "Craven Week", src: "/images/event-craven-week.jpg", href: "#events", photographers: 6, photos: 9105, sport: "Rugby · U18", date: "Jul 2026" },
  { title: "Menlopark Derby Day", src: "/images/event-menlopark-derby.jpg", href: "#events", photographers: 3, photos: 2760, sport: "Rugby · U14–1st XV", date: "Sat 23 Aug" },
  { title: "Grey College vs Paul Roos", src: "/images/event-grey-paulroos.jpg", href: "#events", photographers: 4, photos: 4190, sport: "Rugby · Interschools", date: "Sat 16 Aug" },
  { title: "St John's Hockey Festival", src: "/images/event-stjohns-hockey.jpg", href: "#events", photographers: 3, photos: 2034, sport: "Hockey · U15–1st Team", date: "Sat 9 Aug" },
  { title: "Inter-High Athletics", src: "/images/event-interschools-athletics.jpg", href: "#events", photographers: 2, photos: 1587, sport: "Athletics · Bib search", date: "Fri 8 Aug" },
  { title: "U16 Netball League", src: "/images/event-netball-u16.jpg", href: "#events", photographers: 1, photos: 642, sport: "Netball · U16", date: "Wed 6 Aug" },
  { title: "1st XI Cricket — Affies vs Menlopark", src: "/images/event-cricket-1stxi.jpg", href: "#events", photographers: 2, photos: 1104, sport: "Cricket · 1st XI", date: "Sat 2 Aug" },
];

export const sports = [
  { label: "Rugby", href: "#events" },
  { label: "Hockey", href: "#events" },
  { label: "Netball", href: "#events" },
  { label: "Cricket", href: "#events" },
  { label: "Athletics", href: "#events" },
  { label: "Swimming", href: "#events" },
  { label: "Water Polo", href: "#events" },
  { label: "All sports", href: "#events" },
];

export const schools = [
  { label: "Pretoria Boys High", href: "#events" },
  { label: "Afrikaanse Hoër Seunskool (Affies)", href: "#events" },
  { label: "Grey College", href: "#events" },
  { label: "St John's College", href: "#events" },
  { label: "Paul Roos Gimnasium", href: "#events" },
  { label: "Menlopark", href: "#events" },
];

export const sponsor = {
  label: "Sponsored",
  eyebrow: "Derby Day is brought to you by Protea Mutual",
  cta: "Advertise with PhotoX",
  href: "#sponsors",
};

export const photographersStrip = {
  title: "For photographers — join PhotoX",
  cta: "How payouts work",
  href: "#photographers",
  button: "Apply as a PhotoX photographer",
  blurb:
    "Shoot alongside other accredited photographers at the same fixture. Bulk-upload thousands of frames, let AI tag jersey numbers, and track sales, commission and payouts in ZAR — every image stays credited to you.",
};

export const footer = {
  ctaLabel: "Apply as a PhotoX photographer",
  columns: [
    {
      heading: "Platform",
      links: [
        { label: "Home", href: "#" },
        { label: "Event galleries", href: "#events" },
        { label: "Photographer dashboard", href: "#photographers" },
        { label: "Admin", href: "#admin" },
      ],
    },
    {
      heading: "Search",
      links: [
        { label: "By jersey number", href: "#search" },
        { label: "By bib number", href: "#search" },
        { label: "By face (guardian consent)", href: "#search" },
        { label: "By school & team", href: "#schools" },
      ],
    },
    {
      heading: "Trust",
      links: [
        { label: "POPIA & children's data", href: "#popia" },
        { label: "Personal-use licence", href: "#licensing" },
        { label: "Sponsors & advertising", href: "#sponsors" },
      ],
    },
  ],
  sponsorButton: "Sponsor a fixture",
};
