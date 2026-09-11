// Spring presets sampled from the Framer template (docs/research/BEHAVIORS.md)
export const springSwap = { type: "spring", stiffness: 200, damping: 30, mass: 1 } as const; // text swap, no overshoot ~600ms
export const springIcon = { type: "spring", stiffness: 320, damping: 26, mass: 1 } as const; // icon slide, tiny overshoot ~250ms
export const springLayout = { type: "spring", stiffness: 420, damping: 32, mass: 1 } as const; // label width, ~300ms
export const springSlide = { type: "spring", stiffness: 200, damping: 30, mass: 1 } as const; // hero slide, ~1% overshoot
export const springUnderline = { type: "spring", stiffness: 170, damping: 26, mass: 1 } as const; // underline shrink ~500ms
export const easeAppear = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 } as const;
