import { Nav, ViewportFrame } from "@/components/Nav";
import { HeroSlider } from "@/components/HeroSlider";
import { EventCard, ProfileCard, SectionBar } from "@/components/Cards";
import { ActionButton, PillButton } from "@/components/primitives";
import { Footer } from "@/components/Footer";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CameraIcon,
  GraduationCapIcon,
  HashIcon,
  InstagramIcon,
  MegaphoneIcon,
  UserFocusIcon,
} from "@/components/icons";
import { events, sponsor, sports } from "@/data/site";

export default function Home() {
  return (
    <>
      <ViewportFrame />
      <Nav />

      <div className="page-wrap">
        <main className="main">
          {/* Left — sticky hero */}
          <div className="left">
            <HeroSlider tag="Live Galleries" />
          </div>

          {/* Right — scrolling column */}
          <div className="right">
            {/* Intro + quick actions */}
            <div className="top-grid" id="search">
              <ProfileCard />
              <div className="actions">
                <ActionButton label="Search by Jersey Number" href="#search" icon={<HashIcon />} />
                <ActionButton label="Search by Face" href="#search" icon={<UserFocusIcon />} />
                <ActionButton label="Browse by School" href="#events" icon={<GraduationCapIcon />} />
                <ActionButton label="Instagram" href="https://www.instagram.com/ishootstories" icon={<InstagramIcon />} />
                <ActionButton label="Join as a Photographer" href="#photographers" primary icon={<CameraIcon />} />
              </div>
            </div>

            <SectionBar id="events" title="Recent Events" icon={<ArrowDownIcon />} linkLabel="View All Events" linkHref="#events" />

            <div className="events">
              {events.map((e) => (
                <EventCard key={e.title} {...e} />
              ))}
            </div>

            <PillButton label="All Events" href="#events" variant="muted" style={{ width: "100%" }} />

            <SectionBar id="sponsors" title={sponsor.eyebrow} icon={<MegaphoneIcon />} linkLabel={sponsor.cta} linkHref={sponsor.href} muted />

            <section className="sports" aria-label="Browse by sport">
              {sports.map((s) => (
                <ActionButton key={s.label} label={s.label} href={s.href} icon={<ArrowUpRightIcon />} />
              ))}
            </section>

            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
