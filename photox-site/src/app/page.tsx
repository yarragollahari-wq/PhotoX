import { Nav, ViewportFrame } from "@/components/Nav";
import { HeroSlider } from "@/components/HeroSlider";
import { EventCard, SearchCard, SectionBar } from "@/components/Cards";
import { ActionButton, PillButton } from "@/components/primitives";
import { Footer } from "@/components/Footer";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CameraIcon,
  GraduationCapIcon,
  HashIcon,
  MegaphoneIcon,
  UserFocusIcon,
  InstagramIcon,
} from "@/components/icons";
import { events, photographersStrip, schools, sponsor, sports } from "@/data/site";

export default function Home() {
  return (
    <>
      <ViewportFrame />
      <Nav />

      <div className="page-wrap">
        <main className="main">
          {/* Left — sticky hero (multi-photographer event galleries) */}
          <div className="left">
            <HeroSlider tag="Live galleries" />
          </div>

          {/* Right — scrolling column */}
          <div className="right">
            {/* 1 · Hero search + search modes */}
            <div className="top-grid" id="search">
              <SearchCard />
              <div className="actions">
                <ActionButton label="Search by jersey number" href="#search" icon={<HashIcon />} />
                <ActionButton label="Search by bib number" href="#search" icon={<HashIcon />} />
                <ActionButton label="Search by face" href="#search" icon={<UserFocusIcon />} />
                <ActionButton label="Browse by school" href="#schools" icon={<GraduationCapIcon />} />
                <ActionButton label="Browse all events" href="#events" primary icon={<ArrowUpRightIcon />} />
              </div>
            </div>

            {/* 2 · Upcoming & recent events */}
            <SectionBar id="events" title="Upcoming & recent events" icon={<ArrowDownIcon />} linkLabel="View all events" linkHref="#events" />

            {/* Sponsor placement #1 — designed-in, clearly labelled */}
            <SectionBar
              id="sponsors"
              as="p"
              eyebrow={sponsor.label}
              title={sponsor.eyebrow}
              icon={<MegaphoneIcon />}
              linkLabel={sponsor.cta}
              linkHref={sponsor.href}
            />

            <div className="events">
              {events.map((e) => (
                <EventCard key={e.title} {...e} />
              ))}
            </div>

            <PillButton label="All events" href="#events" variant="muted" style={{ width: "100%" }} />

            {/* 3 · Browse by sport */}
            <SectionBar id="sports" title="Browse by sport" icon={<ArrowDownIcon />} linkLabel="All fixtures" linkHref="#events" />
            <section className="sports" aria-label="Browse by sport">
              {sports.map((s) => (
                <ActionButton key={s.label} label={s.label} href={s.href} icon={<ArrowUpRightIcon />} />
              ))}
            </section>

            {/* 4 · Browse by school */}
            <SectionBar id="schools" title="Browse by school" icon={<ArrowDownIcon />} linkLabel="All schools" linkHref="#events" />
            <section className="sports" aria-label="Browse by school">
              {schools.map((s) => (
                <ActionButton key={s.label} label={s.label} href={s.href} icon={<GraduationCapIcon />} />
              ))}
            </section>

            {/* 5 · For photographers strip */}
            <SectionBar
              id="photographers"
              title={photographersStrip.title}
              icon={<CameraIcon />}
              linkLabel={photographersStrip.cta}
              linkHref={photographersStrip.href}
            />
            <section className="sports" aria-label="For photographers">
              <ActionButton label="Bulk upload & AI tagging" href="#photographers" icon={<CameraIcon />} />
              <ActionButton label="Sales, commission & payouts in ZAR" href="#photographers" icon={<ArrowUpRightIcon />} />
              <ActionButton label="Follow @ishootstories" href="https://www.instagram.com/ishootstories" icon={<InstagramIcon />} />
              <ActionButton label="Sponsor a fixture" href="#sponsors" icon={<MegaphoneIcon />} />
            </section>

            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
