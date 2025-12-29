import type { Transition, Variant } from "motion/react";

// Export design tokens for examples
export * from "./example-design-tokens";

// Common easing presets matching the course content
export const easings = {
  // CSS standard easings
  linear: [0, 0, 1, 1] as const,
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeIn: [0.42, 0, 1, 1] as const,
  easeOut: [0, 0, 0.58, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,

  // Premium easings (Linear/Vercel style)
  snappy: [0.2, 0, 0, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  overshoot: [0.68, -0.6, 0.32, 1.6] as const,

  // Exponential
  expOut: [0.16, 1, 0.3, 1] as const,
  expInOut: [0.87, 0, 0.13, 1] as const,

  // Circular
  circOut: [0, 0.55, 0.45, 1] as const,
  circInOut: [0.85, 0, 0.15, 1] as const,
} as const;

export type EasingName = keyof typeof easings;

// Spring presets
export const springs = {
  // Snappy - quick response, minimal oscillation
  snappy: { type: "spring", stiffness: 400, damping: 30 } as const,
  // Gentle - soft, comfortable feel
  gentle: { type: "spring", stiffness: 120, damping: 14 } as const,
  // Bouncy - playful, noticeable oscillation
  bouncy: { type: "spring", stiffness: 300, damping: 10 } as const,
  // Stiff - almost no bounce
  stiff: { type: "spring", stiffness: 700, damping: 50 } as const,
  // Wobbly - very bouncy
  wobbly: { type: "spring", stiffness: 180, damping: 12 } as const,
  // Slow - deliberate motion
  slow: { type: "spring", stiffness: 60, damping: 20 } as const,
} as const;

export type SpringName = keyof typeof springs;

// Duration presets (in seconds)
export const durations = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
} as const;

// Common animation variants
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies Record<string, Variant>;

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
} satisfies Record<string, Variant>;

export const slideDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
} satisfies Record<string, Variant>;

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
} satisfies Record<string, Variant>;

export const popVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
} satisfies Record<string, Variant>;

// Stagger container variants
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} satisfies Record<string, Variant>;

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
} satisfies Record<string, Variant>;

// Helper to create transition config
export function createTransition(
  duration: number = durations.normal,
  easing: EasingName = "smooth"
): Transition {
  return {
    duration,
    ease: easings[easing],
  };
}

// Helper to create spring transition
export function createSpring(preset: SpringName = "snappy"): Transition {
  return springs[preset];
}

// Format cubic-bezier for CSS output
export function formatCubicBezier(points: readonly [number, number, number, number]): string {
  return `cubic-bezier(${points.join(", ")})`;
}

// Format spring for Motion output
export function formatSpringConfig(config: { stiffness: number; damping: number; mass?: number }): string {
  const { stiffness, damping, mass = 1 } = config;
  return `{ type: "spring", stiffness: ${stiffness}, damping: ${damping}${mass !== 1 ? `, mass: ${mass}` : ""} }`;
}

// Calculate approximate spring duration (for display purposes)
export function approximateSpringDuration(stiffness: number, damping: number, mass: number = 1): number {
  // This is a rough approximation
  const naturalFrequency = Math.sqrt(stiffness / mass);
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  
  if (dampingRatio >= 1) {
    // Overdamped or critically damped
    return 4 / (dampingRatio * naturalFrequency);
  } else {
    // Underdamped
    return 4 / (dampingRatio * naturalFrequency);
  }
}

// Colour utilities for demos
export const demoColors = {
  primary: "#ff4400", // swiss-red
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
} as const;

// Glass effect styles for Linear-style UI
export const glassStyles = {
  light: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  dark: {
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
} as const;

