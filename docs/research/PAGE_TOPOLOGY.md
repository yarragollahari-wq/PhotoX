# PhotoX Homepage — Page Topology (cloned from Hanssen, re-skinned for PhotoX)

Template section → PhotoX content. Every interaction is preserved 1:1 (see BEHAVIORS.md).

| # | Template section | Layer | Interaction model | PhotoX content |
|---|---|---|---|---|
| 0 | Viewport rounded frame (4 corner SVGs) | fixed z9 | static | same |
| 1 | Nav (logo, 4 links, theme toggle) | fixed z8 | hover text-swap; click toggle | logo "photox" (alt-word "guild"), links Events / Search / Photographers / Sponsors |
| 1b | Phone "Menu" pill + full-screen menu | fixed z8/z10 | click | same, PhotoX links |
| 2 | Left sticky hero slider | sticky, 100vh | time (5s autoplay) + click arrows/dots + drag | 3 school-rugby action slides, "View Gallery ↗", tag "Live Galleries" |
| 3 | Profile card | flow | hover | PhotoX intro: avatar mark, "PhotoX", "by PhotoGuild SA", tagline bio |
| 4 | Action buttons column (4 + primary) | flow | hover icon-slide | Find by Jersey Number · Find by Face · Browse by School · Instagram · **Join as a Photographer** (primary) |
| 5 | "Latest Work ↓ / View All" bar | flow | hover underline | "Recent Events ↓ / View All Events" |
| 6 | Project grid (10 cards) | flow | hover blur + arrow; appear on scroll | 10 event galleries (Garsfontein vs Waterkloof, Affies vs Boys High, Clover 7's, Craven Week, …) |
| 7 | "All Projects" muted button | flow | hover | "All Events" |
| 7b | *(added, reuses #5 bar style)* Sponsor bar | flow | hover underline | "Sponsored · Derby Day brought to you by Protea Mutual" |
| 8 | Bottom 2×2 button grid | flow | hover icon-slide | Browse by sport: Rugby · Hockey · Netball · Cricket |
| 9 | Footer: primary button + white card | flow | hover text-swap / icon-slide | "Join PhotoX as a Photographer"; card: PhotoX / PhotoGuild SA, "Sponsor with us ↗", columns Pages / Search / Trust |

Layout: `body` padding 0 12px → `main` flex row gap 12 → Left (sticky, flex 1) + Right (flex 1 column gap 12). ≤1199px: column; hero aspect 0.871429.
