"use client";

import { animate, motion, useMotionValue, type PanInfo } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/site";
import { springSlide } from "@/lib/motion";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { Notch } from "./Notch";
import { PillButton } from "./primitives";

const AUTOPLAY_MS = 5000;
const RANGE = 2; // slides rendered either side of the current page for the infinite loop

const mod = (n: number, m: number) => ((n % m) + m) % m;

export function HeroSlider({ tag = "Live Galleries" }: { tag?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);
  const x = useMotionValue(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = heroSlides.length;

  // Measure the track — the template snaps in whole-slide units.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Spring to the current page (sampled ≈600ms with ~1% overshoot on the template)
  useEffect(() => {
    if (!width) return;
    const controls = animate(x, -page * width, springSlide);
    return () => controls.stop();
  }, [page, width, x]);

  const restartAutoplay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPage((p) => p + 1), AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [page, restartAutoplay]);

  const go = (delta: number) => setPage((p) => p + delta);
  const goTo = (i: number) => setPage((p) => p + (i - mod(p, count)));

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = width * 0.2;
    let next = page;
    if (info.offset.x < -threshold || info.velocity.x < -400) next = page + 1;
    else if (info.offset.x > threshold || info.velocity.x > 400) next = page - 1;
    if (next !== page) setPage(next);
    else animate(x, -page * width, springSlide); // re-snap when the drag didn't cross the threshold
    restartAutoplay();
  };

  const active = mod(page, count);
  const pages = Array.from({ length: RANGE * 2 + 1 }, (_, i) => page - RANGE + i);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--card)",
      }}
    >
      {/* Track */}
      <motion.ul
        drag="x"
        dragMomentum={false}
        dragElastic={0.12}
        onDragEnd={onDragEnd}
        onDragStart={() => timer.current && clearTimeout(timer.current)}
        style={{
          x,
          position: "absolute",
          inset: 0,
          margin: 0,
          padding: 0,
          listStyle: "none",
          cursor: "grab",
          touchAction: "pan-y",
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        {width > 0 &&
          pages.map((p) => {
            const slide = heroSlides[mod(p, count)];
            return (
              <li
                key={p}
                style={{
                  position: "absolute",
                  top: 0,
                  left: p * width,
                  width,
                  height: "100%",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 30%",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                <PillButton
                  label={slide.cta}
                  href={slide.href}
                  icon={<ArrowUpRightIcon />}
                  variant="overlay"
                  style={{ position: "absolute", left: 32, bottom: 32, zIndex: 5 }}
                />
              </li>
            );
          })}
      </motion.ul>

      {/* Prev / Next */}
      <div
        style={{
          position: "absolute",
          inset: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          style={{ width: 40, height: 40, borderRadius: 4, background: "var(--overlay)", overflow: "hidden", pointerEvents: "auto" }}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          style={{ width: 40, height: 40, borderRadius: 4, background: "var(--overlay)", overflow: "hidden", pointerEvents: "auto" }}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Dots — hidden on phone, exactly like the template */}
      <div
        className="hidden tablet:flex"
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          height: 30,
          borderRadius: 50,
          background: "var(--dots-bg)",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Scroll to page ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 30,
              padding: i === 0 ? "10px 5px 10px 10px" : i === count - 1 ? "10px 10px 10px 5px" : "10px 5px",
            }}
          >
            <span
              style={{
                display: "block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#fff",
                opacity: i === active ? 1 : 0.5,
                transition: "opacity 0.2s ease",
              }}
            />
          </button>
        ))}
      </div>

      {/* Top-right tab — active fixture + attribution counts (nav owns top-left) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px 12px",
          borderRadius: "0 0 0 18px",
          background: "var(--bg)",
          maxWidth: "calc(100% - 18px)",
          zIndex: 2,
        }}
      >
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="t-body"
          style={{ margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {heroSlides[active].title}
          <span style={{ color: "var(--muted)" }}> · {heroSlides[active].meta}</span>
        </motion.p>
        <Notch curve="bl" style={{ top: 0, right: "100%" }} />
        <Notch curve="bl" style={{ top: "100%", right: 0 }} />
      </div>

      {/* Bottom-right tab */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px 8px",
          borderRadius: "18px 0 0 0",
          background: "var(--bg)",
        }}
      >
        <p className="t-body" style={{ margin: 0 }}>
          {tag}
        </p>
        <Notch curve="tl" style={{ right: "100%", bottom: 0 }} />
        <Notch curve="tl" style={{ right: 0, bottom: "100%" }} />
      </div>
    </div>
  );
}
