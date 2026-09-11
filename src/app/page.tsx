import { HeroSlider } from "@/components/HeroSlider";
import { EventCard, SectionBar } from "@/components/Cards";
import { Finder } from "@/components/Finder";
import { Footer } from "@/components/Footer";
import { ActionButton, PillButton } from "@/components/primitives";
import { Appear, Card, PageShell } from "@/components/ui";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CameraIcon,
  GraduationCapIcon,
  HashIcon,
  MegaphoneIcon,
  UserFocusIcon,
} from "@/components/icons";
import { events, photographersStrip, schools, sponsor, sports, whyPhotoX } from "@/data/site";

export default function Home() {
  return (
    <PageShell>
      {/* 1 · Hero — photo-forward, scrolls with the page */}
      <div className="hero">
        <HeroSlider tag="Live galleries" />
      </div>

      {/* 2 · The Finder — search front and centre */}
      <Finder />

      {/* 3 · Upcoming & recent events */}
      <SectionBar id="events" title="Upcoming & recent events" icon={<ArrowDownIcon />} linkLabel="View all events" linkHref="/events" />
      <SectionBar as="p" eyebrow={sponsor.label} title={sponsor.eyebrow} icon={<MegaphoneIcon />} linkLabel={sponsor.cta} linkHref={sponsor.href} />
      <div className="grid-4">
        {events.slice(0, 8).map((e) => (
          <EventCard key={e.title} {...e} />
        ))}
      </div>
      <PillButton label="All events" href="/events" variant="muted" style={{ width: "100%" }} />

      {/* 4 · Browse by sport */}
      <SectionBar id="sports" title="Browse by sport" icon={<ArrowDownIcon />} linkLabel="All fixtures" linkHref="/events" />
      <section className="grid-4" aria-label="Browse by sport">
        {sports.map((s) => (
          <ActionButton key={s.label} label={s.label} href={s.href} icon={<ArrowUpRightIcon />} />
        ))}
      </section>

      {/* 5 · Browse by school */}
      <SectionBar id="schools" title="Browse by school" icon={<ArrowDownIcon />} linkLabel="All schools" linkHref="/events" />
      <section className="grid-3" aria-label="Browse by school">
        {schools.map((s) => (
          <ActionButton key={s.label} label={s.label} href={s.href} icon={<GraduationCapIcon />} />
        ))}
      </section>

      {/* 6 · Why PhotoX — the five hard parts */}
      <SectionBar id="why" title="Why PhotoX" icon={<ArrowDownIcon />} linkLabel="How search works" linkHref="/events" />
      <div className="grid-4">
        {whyPhotoX.map((w, i) => (
          <Appear key={w.title}>
            <Card hover style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", padding: 32 }}>
              <span style={{ width: 18, height: 18, display: "block", color: "var(--text)" }}>
                {[<CameraIcon key="c" />, <HashIcon key="h" />, <UserFocusIcon key="u" />, <MegaphoneIcon key="m" />][i]}
              </span>
              <h3 className="t-name" style={{ margin: 0 }}>
                {w.title}
              </h3>
              <p className="t-body" style={{ margin: 0, color: "var(--muted)", lineHeight: "20px" }}>
                {w.text}
              </p>
            </Card>
          </Appear>
        ))}
      </div>

      {/* 7 · For photographers */}
      <SectionBar id="photographers" title={photographersStrip.title} icon={<CameraIcon />} linkLabel={photographersStrip.cta} linkHref={photographersStrip.href} />
      <section className="grid-4" aria-label="For photographers">
        <ActionButton label="Bulk upload & AI tagging" href="/photographers" icon={<CameraIcon />} />
        <ActionButton label="Sales, commission & payouts in ZAR" href="/photographers" icon={<ArrowUpRightIcon />} />
        <ActionButton label="Your public profile" href="/photographers" icon={<UserFocusIcon />} />
        <ActionButton label="Sponsor a fixture" href="/sponsors" icon={<MegaphoneIcon />} />
      </section>

      <Footer />
    </PageShell>
  );
}
