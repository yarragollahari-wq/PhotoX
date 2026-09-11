export const brand = {
  name: "PhotoX",
  logoWord: "photox",
  logoAlt: "guild",
  role: "by PhotoGuild SA",
  bio: "Every photo tells a story. PhotoX brings every photographer on the sideline into one school-sport gallery — so you can find your child in seconds by jersey number or face.",
};

export const navLinks = [
  { label: "Events", href: "#events" },
  { label: "Search", href: "#search" },
  { label: "Photographers", href: "#photographers" },
  { label: "Sponsors", href: "#sponsors" },
];

export const heroSlides = [
  { src: "/images/hero-01.jpg", alt: "1st XV wing breaking the line — Garsfontein vs Waterkloof", href: "#events" },
  { src: "/images/hero-02.jpg", alt: "Lineout under a Pretoria sky — Affies vs Boys High", href: "#events" },
  { src: "/images/hero-03.jpg", alt: "Contested lineout at Loftus — Craven Week", href: "#events" },
];

export const events = [
  { title: "Garsfontein vs Waterkloof", src: "/images/event-garsfontein-waterkloof.jpg", href: "#events" },
  { title: "Affies vs Boys High", src: "/images/event-affies-boyshigh.jpg", href: "#events" },
  { title: "Clover 7's", src: "/images/event-clover-7s.jpg", href: "#events" },
  { title: "Craven Week", src: "/images/event-craven-week.jpg", href: "#events" },
  { title: "Menlopark Derby Day", src: "/images/event-menlopark-derby.jpg", href: "#events" },
  { title: "Grey College vs Paul Roos", src: "/images/event-grey-paulroos.jpg", href: "#events" },
  { title: "St John's Hockey Festival", src: "/images/event-stjohns-hockey.jpg", href: "#events" },
  { title: "Interschools Athletics", src: "/images/event-interschools-athletics.jpg", href: "#events" },
  { title: "U16 Netball League", src: "/images/event-netball-u16.jpg", href: "#events" },
  { title: "1st XI Cricket", src: "/images/event-cricket-1stxi.jpg", href: "#events" },
];

export const sports = [
  { label: "Rugby", href: "#events" },
  { label: "Hockey", href: "#events" },
  { label: "Netball", href: "#events" },
  { label: "Cricket", href: "#events" },
];

export const sponsor = {
  eyebrow: "Derby Day is brought to you by Protea Mutual",
  cta: "Sponsor with PhotoX",
  href: "#sponsors",
};

export const footer = {
  ctaLabel: "Join PhotoX as a Photographer",
  columns: [
    {
      heading: "Pages",
      links: [
        { label: "Home", href: "#" },
        { label: "Events", href: "#events" },
        { label: "Photographers", href: "#photographers" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      heading: "Search",
      links: [
        { label: "By Jersey Number", href: "#search" },
        { label: "By Face", href: "#search" },
        { label: "By School", href: "#search" },
        { label: "By Sport", href: "#events" },
      ],
    },
    {
      heading: "Trust",
      links: [
        { label: "POPIA & Privacy", href: "#popia" },
        { label: "Licensing", href: "#licensing" },
      ],
    },
  ],
  sponsorButton: "Sponsor with us",
};
