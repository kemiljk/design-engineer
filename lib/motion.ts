// Motion Design System for Design Engineer
// A considered, intentional motion language — polish that's felt, not seen.

// Easing curves
export const ease = {
  // For UI feedback (buttons, hovers) — quick and responsive
  out: [0.33, 1, 0.68, 1] as const,

  // For content reveals — quick start, long gentle settle
  outQuint: [0.23, 1, 0.32, 1] as const,

  // For emphasis moments
  outExpo: [0.16, 1, 0.3, 1] as const,

  // For spring-like interactions
  spring: { stiffness: 400, damping: 30 } as const,
};

// Duration tokens (in seconds for motion/react)
export const duration = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
};

// Reusable animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.outQuint },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.outQuint },
  },
};

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outQuint },
  },
};

export const slideInFromRight = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outQuint },
  },
};

// Stagger configuration for parent containers
export const stagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const staggerFast = {
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

export const staggerSlow = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// Combined variants for common patterns
export const fadeUpStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const fadeUpChild = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.outQuint },
  },
};

// Viewport configuration for scroll-triggered animations
export const viewportOnce = {
  once: true,
  margin: "-100px" as const,
};

// Type helpers
export type EaseArray = readonly [number, number, number, number];
export type SpringConfig = { stiffness: number; damping: number };
