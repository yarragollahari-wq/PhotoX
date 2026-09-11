# Hanssen template — Behavior Bible (extracted 2026-09-11 via Chrome DevTools)

Source: https://hanssen-template.framer.website/  — all values are `getComputedStyle()` / sampled runtime values.
Framer animates with JS (motion), NOT CSS transitions — every transition below was sampled frame-by-frame.

## Global
- Font: **DM Sans** 400/500 (Google Fonts). Body text 14px/16.8px (120%). Names 18px/21.6px. Bio 15px/24px. Footer name 24px/28.8px. Footer column headings 16px/22.4px. Logo 15px/15px 500. Button labels 14px/14px (100%).
- Dark theme tokens: bg `#0e1011`, text `#fff`, muted text `rgba(255,255,255,.6)` (#fff9), card `rgba(255,255,255,.07)` (#ffffff12), card-hover `rgba(255,255,255,.11)` (#ffffff1c), toggle bg `rgba(255,255,255,.11)`, primary button `#fff` with text `#0e1011`.
- Light theme tokens: bg `#fff`, text `#0e1011`, muted `rgba(14,16,17,.6)` (#0e101199), card `#f6f6f6`, card-hover `#ececec`, toggle bg `#ececec` with `#0e1011` dot, primary button `#0e1011` with text `#fff`.
- Theme switch is **instant** (no color transition). Toggle dot does NOT move; only colors swap.
- Page wrapper: `padding: 0 12px`, bg = page token. Main: `display:flex; gap:12px; align-items:flex-start; width:100%`.
- Fixed viewport frame (z 9): four 12px inverted-corner SVGs at each viewport corner, 12px inset (`M0 0 L0 12 C0 5.373 5.373 0 12 0 Z`, fill = page bg), so the whole viewport reads as a rounded 12px window.
- Breakpoints: Desktop ≥1200px · Tablet 810–1199px · Phone ≤809px.
- Scrollbar native. No smooth-scroll library.

## Layout (desktop)
- Left column: `position: sticky; top:0; height:100vh; padding:12px 0; flex:1 0 0` → hero fills viewport height (12px margins), `border-radius:12px; overflow:hidden`.
- Right column: `flex:1 0 0; flex-direction:column; gap:12px; padding:12px 0`.
- Tablet/Phone: main becomes column; Left `position: relative`, hero `aspect-ratio: 0.871429/1` (744×854 @768, 476×546 @500); right column below with gap 12.

## Nav (fixed, z 8, top 12 left 12)
- Header: `bg: page; padding: 4px 16px 12px; border-radius: 0 0 20px 0; gap 8px; height 36px`.
- Two 18px inverted corners hanging off it: one below at `top:36px; left:0` (svg `M0 0 L0 18 C0 8.059 8.059 0 18 0 Z`), one to the right at `left:100%; top:0`. Fill = page bg. The corners make the nav look "cut out" of the hero image.
- Logo: 15px circle icon + text 15px/15px 500. **Logo hover:** text-swap — a hidden alt word ("ema") sits above the visible word ("hanssen") in a 15px-tall overflow-hidden box; on hover both translate up by 100% (spring, ~600ms, no overshoot) so the alt word shows.
- Menu links (Work/About/Blog/Contact) 14px/16.8px, gap 20px. **Hover:** each link is 17px tall overflow-hidden with two stacked copies of the text; on hover both translate `y: -16.8px` (spring: 0→16px in ~350ms, settles by ~600ms, no overshoot). Leave reverses identically.
- Theme toggle: 30×20 pill, `border-radius 500px; padding 6px`, 8px dot `border-radius:100%`. Click → instant theme switch.
- Phone/Tablet nav: header only has logo + toggle (`gap 16px`). Separate fixed "Menu" pill at `top:12 right:12`: `padding 8px 16px 12px; border-radius 0 0 0 18px; bg page` with two 18px inverted corners (left side and bottom) rotated 180°. Click → full-screen overlay (see Mobile Menu).

## Hero slider (Left)
- Infinite loop, 3 slides, `cursor: grab`, draggable, **autoplay every 5s**. Slide transition: spring translateX (~600ms, ~1% overshoot then settle) → `spring { stiffness: 200, damping: 30 }` approximates.
- Image `object-fit: cover; object-position: 50% 0%`.
- Prev/Next: 40×40 buttons, `border-radius 4px; bg rgba(14,16,17,.2)`, 32px from left/right edges, vertically centered; chevron icons white. No hover change.
- Dots pill: `70×30; border-radius 50px; bg rgba(0,0,0,.2)`, bottom 30px, horizontally centred (`left:50%; translateX(-50%)`). 3 buttons each with 10px white dot; inactive opacity .5, active 1. Padding: first `10px 5px 10px 10px`, middle `10px 5px`, last `10px 10px 10px 5px`. **Hidden on phone.**
- "View Project ↗" button: `absolute; left:32px; bottom:32px; padding:10px 12px 10px 14px; gap 4px; border-radius 6px; bg rgba(14,16,17,.2)`; text 14px/14px white + 14px arrow-up-right icon (Phosphor light). No hover change.
- "Selected Work" tag: `absolute; right:0; bottom:0; padding: 12px 16px 8px; border-radius: 18px 0 0 0; bg page`, text 14px/16.8px. Two 18px inverted corners: left of it (`left:-18px; bottom:0`) and above it (`right:0; top:-18px`), both using `M0 18 L18 18 C8.059 18 0 9.941 0 0 Z` rotated -90°. Fill = page bg.

## Profile card (Right, top-left, flex 1)
- `<a>` `padding 40px; gap 96px; border-radius 12px; bg card; flex-direction column`.
- Row: 60px round avatar + (name 18px/21.6px, role 14px/16.8px muted) with gap 16px / 2px.
- Bio 15px/24px.
- **Hover:** bg card → card-hover (~200ms). Hidden 16px arrow-up-right icon at `top:32px; right:32px` fades 0→1 and slides from `translate(-7px, 7px)` → `(0,0)` (spring, ~250ms, tiny overshoot).
- Tablet/Phone variant: `padding 32px; gap 48px`.

## Social/action buttons (Right, top-right column, max-width 300px, flex 1, gap 12)
- Each `<a>`: `padding 20px; border-radius 12px; bg card; justify-content space-between; align-items center; height ≈56.8px`. Text 14px/16.8px. Icon Wrapper 18×18 `overflow:hidden` containing **two stacked 18px icons**.
- **Hover:** bg card → card-hover over ~200ms; both icons translate `y: -18px` with spring (~250ms, ~1.5% overshoot) so the second copy slides in from below.
- Primary variant ("Contact Me"): bg `#fff`, text/icon `#0e1011` (inverse in light). Same hover slide.
- Icons: Phosphor "light" weight (Instagram, Pinterest, Behance, Twitter, Envelope).
- Not rendered in top grid on tablet/phone (only the bottom 2-col grid remains).

## "Latest Work ↓ / View All" bar
- `padding 24px; border-radius 12px; bg card; justify-content space-between; align-items center`.
- Left: h2 14px/16.8px + 14px arrow-down icon, gap 8px.
- Right link: text 14px/14px + 1px underline div (`position absolute; top 15px; width 100%; bg text`). **Hover:** underline shrinks from 100% → 20px, anchored **left** (scaleX with origin left, spring ~500ms). Leave grows back.

## Project cards grid
- Desktop: `display:grid; grid-template-columns: 1fr 1fr; gap 12px`. Card `aspect-ratio: 0.75/1; border-radius 12px; overflow hidden`.
- Tablet: 2 columns `repeat(2, minmax(50px,1fr))`. Phone: single column (flex column), card full width.
- Image wrapper is inset **-1%** (scaled 1.02) so blur edges never show: `position:absolute; inset:-1%`. `object-fit cover; object-position 50% 0%`.
- Label ("Content") top-left: `padding 8px 16px 12px; gap 8px; border-radius 0 0 18px 0; bg page`; h3 14px/16.8px. Two 18px inverted corners: one below (`top:100%; left:0`) and one to the right (`left:100%; top:0`), path `M0 18 L18 18 C8.059 18 0 9.941 0 0 Z` rotated +90°.
- **Hover:** image `filter: blur(7px)` (0→7 in ~200ms ease-out, back in ~200ms); a 13px arrow-right icon appears inside the label after the title (label width grows +21px with layout spring ~300ms, slight overshoot).
- **Appear:** each card starts `opacity:0; translateY(20px)`; when it enters the viewport → `opacity 1; y 0` over 500ms ease-out (starts ~200ms after intersecting). Once.

## "All Projects" button
- `<a>` full width `padding 10px 14px; border-radius 6px; bg card; justify-content center`, text 14px/14px. Hover bg → card-hover.

## Bottom socials grid
- `display:grid; grid-template-columns: 1fr 1fr; gap 12px` (phone: still 2 cols `repeat(2,minmax(50px,1fr))`). Same button component as above (58px tall).

## Footer
- Wrapper `flex column; gap 12px`. First child: full-width Primary button ("Contact Me", 58px).
- White card: `padding 64px 64px 48px; gap 64px; border-radius 12px; bg = text color (#fff dark / #0e1011 light)`, text colour inverted.
  - Top row `justify-content space-between; align-items center`: avatar 60 + name 24px/28.8px + role 14px muted; right: dark pill button `padding 10px 12px 10px 14px; gap 4px; radius 6px; bg #0e1011` with text 14px/14px + 14px icon (Icon Inner 14×14 overflow hidden, stacked icons slide up on hover).
  - Columns row `gap 64px`, each column `flex 1 0 0; gap 32px`: heading 16px/22.4px; nav `gap 20px`; links 14px/15px with **text-swap hover** (Nav Item Inner 15px overflow hidden, two copies, gap 1px, slide up).
  - Copyright 14px/16.8px muted; inline links underlined, full text colour.
- Tablet/Phone: `padding 40px; gap 48px`, top row → column `gap 32px; align-items center`, columns stacked `gap 48px`.

## Mobile menu overlay (phone/tablet)
- Fixed full-screen `z 10; bg page; padding 12px`. Inner `border-radius 12px; bg card; padding 12px; justify-content space-between; column`.
- Top: avatar 60 + name 18px + role (padding 12px, gap 16px).
- Bottom: nav `gap 8px`; items `padding 16px 20px; border-radius 10px; bg card-hover (rgba(255,255,255,.11))`, text 14px/15px, 16px arrow-right icon; last item Primary (bg #fff, dark text).
- "Close" pill replaces "Menu" pill at top-right (same geometry).
