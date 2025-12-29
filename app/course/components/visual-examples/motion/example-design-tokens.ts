/**
 * Design Tokens for Course Examples
 *
 * Philosophy: Purposeful color use - each choice teaches a concept
 * - Monochromatic or analogous gradients (same color family)
 * - Medium saturation (50-70%) - sophisticated, not toy-like
 * - Color differentiates concepts: speed (blue), timing (amber), physics (violet)
 * - Minimal decorative elements - every visual serves education
 */

// ============================================================================
// Color Themes (Purposeful, not decorative)
// ============================================================================

export const exampleThemes = {
  // For speed/motion concepts (cool, fast feeling)
  velocity: {
    from: '#3b82f6',  // blue-500
    to: '#0ea5e9',    // sky-500
    label: 'Velocity',
  },

  // For easing/timing (warm, approachable)
  timing: {
    from: '#f59e0b',  // amber-500
    to: '#f97316',    // orange-500
    label: 'Timing',
  },

  // For physics/springs (energetic but controlled)
  physics: {
    from: '#8b5cf6',  // violet-500
    to: '#a855f7',    // purple-500
    label: 'Physics',
  },

  // For comparison/contrast (distinct but harmonious)
  compare: {
    from: '#10b981',  // emerald-500
    to: '#14b8a6',    // teal-500
    label: 'Compare',
  },

  // Accent gradients (use sparingly)
  accent1: {
    from: '#ec4899',  // pink-500
    to: '#d946ef',    // fuchsia-500
    label: 'Accent 1',
  },

  accent2: {
    from: '#6366f1',  // indigo-500
    to: '#8b5cf6',    // violet-500
    label: 'Accent 2',
  },
} as const;

export type ThemeName = keyof typeof exampleThemes;

// ============================================================================
// Gradient Utilities
// ============================================================================

/**
 * Generate a linear gradient CSS string
 * @param theme - Theme name from exampleThemes
 * @param angle - Gradient angle in degrees (default: 135deg)
 * @returns CSS gradient string
 */
export function getThemeGradient(theme: ThemeName, angle: number = 135): string {
  const { from, to } = exampleThemes[theme];
  return `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`;
}

/**
 * Generate a radial gradient for glow effects
 * @param theme - Theme name from exampleThemes
 * @param opacity - Opacity at center (default: 0.3)
 * @returns CSS radial gradient string
 */
export function getRadialGradient(theme: ThemeName, opacity: number = 0.3): string {
  const { from } = exampleThemes[theme];
  return `radial-gradient(circle at center, ${from}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`;
}

/**
 * Generate a conic gradient for rotating borders
 * @param theme - Theme name from exampleThemes
 * @param startAngle - Starting angle in degrees (default: 0)
 * @returns CSS conic gradient string
 */
export function getConicGradient(theme: ThemeName, startAngle: number = 0): string {
  const { from, to } = exampleThemes[theme];
  return `conic-gradient(from ${startAngle}deg, transparent 0%, ${from} 15%, ${to} 50%, ${from} 85%, transparent 100%)`;
}

// ============================================================================
// Shadow & Glow Effects
// ============================================================================

/**
 * Create a colored glow shadow effect
 * @param theme - Theme name from exampleThemes
 * @param intensity - Intensity multiplier 0-1 (default: 0.4)
 * @returns CSS box-shadow string
 */
export function createGlowShadow(theme: ThemeName, intensity: number = 0.4): string {
  const { from } = exampleThemes[theme];
  const size = 20 * intensity;
  const opacity = 0.3 * intensity;

  // Convert hex to rgba for opacity control
  const r = parseInt(from.slice(1, 3), 16);
  const g = parseInt(from.slice(3, 5), 16);
  const b = parseInt(from.slice(5, 7), 16);

  return `0 0 ${size}px rgba(${r}, ${g}, ${b}, ${opacity}), 0 0 ${size * 2}px rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`;
}

/**
 * Create a subtle colored shadow for depth
 * @param theme - Theme name from exampleThemes
 * @returns CSS box-shadow string
 */
export function createSubtleShadow(theme: ThemeName): string {
  const { from } = exampleThemes[theme];
  const r = parseInt(from.slice(1, 3), 16);
  const g = parseInt(from.slice(3, 5), 16);
  const b = parseInt(from.slice(5, 7), 16);

  return `0 4px 6px -1px rgba(${r}, ${g}, ${b}, 0.1), 0 2px 4px -2px rgba(${r}, ${g}, ${b}, 0.1)`;
}

// ============================================================================
// Animation Durations
// ============================================================================

export const animationDurations = {
  // Ultra-fast for instant feedback
  ultraFast: 0.1,

  // Fast interactions
  fast: 0.2,

  // Normal UI transitions
  normal: 0.3,

  // Slow, deliberate
  slow: 0.6,

  // Very slow for emphasis
  slower: 1.0,

  // Ultra slow for ambient effects
  ultraSlow: 2.0,

  // Border beam speeds
  beamFast: 8,
  beamMedium: 15,
  beamSlow: 30,
  beamUltraSlow: 60,
} as const;

// ============================================================================
// Spring Configurations
// ============================================================================

export const springConfigs = {
  // Snappy, responsive (UI interactions)
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },

  // Gentle, comfortable (page transitions)
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 14,
    mass: 1,
  },

  // Bouncy, playful (teaching spring physics)
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 10,
    mass: 1,
  },

  // Stiff, minimal bounce (precise interactions)
  stiff: {
    type: 'spring' as const,
    stiffness: 700,
    damping: 50,
    mass: 1,
  },

  // Wobbly, exaggerated (demonstrations)
  wobbly: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
    mass: 1,
  },

  // Slow, deliberate (focus on motion)
  slow: {
    type: 'spring' as const,
    stiffness: 60,
    damping: 20,
    mass: 1,
  },
} as const;

// ============================================================================
// Spacing & Sizing
// ============================================================================

export const exampleSpacing = {
  // Container widths for full-width demos
  containerWidths: {
    sm: '600px',
    md: '800px',
    lg: '1000px',
    full: '100%',
  },

  // Track heights for racing/animation demos
  trackHeights: {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '32px',
  },

  // Border widths for animated borders
  borderWidths: {
    thin: '1px',
    normal: '2px',
    thick: '4px',
  },

  // Border radius for examples (vs site's sharp edges)
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
} as const;

// ============================================================================
// Gradient Text Utilities
// ============================================================================

/**
 * Create gradient text styling
 * @param theme - Theme name from exampleThemes
 * @returns Object with CSS properties for gradient text
 */
export function getGradientTextStyle(theme: ThemeName): {
  background: string;
  WebkitBackgroundClip: string;
  WebkitTextFillColor: string;
  backgroundClip: string;
} {
  return {
    background: getThemeGradient(theme),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
}

// ============================================================================
// Animated Border Utilities
// ============================================================================

/**
 * Generate animated border style configuration
 * @param theme - Theme name from exampleThemes
 * @param speed - Animation duration in seconds
 * @param width - Border width in pixels
 * @param intensity - Glow intensity 0-1
 * @returns Style object for animated borders
 */
export function getAnimatedBorderStyle(
  theme: ThemeName,
  speed: number = animationDurations.beamMedium,
  width: number = 2,
  intensity: number = 0.4
): {
  background: string;
  boxShadow: string;
  animationDuration: string;
} {
  return {
    background: getConicGradient(theme),
    boxShadow: createGlowShadow(theme, intensity),
    animationDuration: `${speed}s`,
  };
}

// ============================================================================
// Trail & Motion Effects
// ============================================================================

/**
 * Create a motion trail effect configuration
 * @param theme - Theme name from exampleThemes
 * @param opacity - Trail opacity (default: 0.3)
 * @returns CSS gradient for trail effect
 */
export function getMotionTrail(theme: ThemeName, opacity: number = 0.3): string {
  const { from, to } = exampleThemes[theme];
  const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `linear-gradient(90deg, transparent 0%, ${from}${opacityHex} 50%, ${to}${opacityHex} 100%)`;
}

// ============================================================================
// Stagger Animations
// ============================================================================

export const staggerConfig = {
  // Quick succession (list items)
  fast: {
    staggerChildren: 0.03,
    delayChildren: 0.05,
  },

  // Normal pacing (cards, sections)
  normal: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  },

  // Slow, deliberate (teaching concepts)
  slow: {
    staggerChildren: 0.1,
    delayChildren: 0.15,
  },
} as const;

// ============================================================================
// Color Utilities
// ============================================================================

/**
 * Get the primary color from a theme
 * @param theme - Theme name from exampleThemes
 * @returns Hex color string
 */
export function getThemeColor(theme: ThemeName): string {
  return exampleThemes[theme].from;
}

/**
 * Get theme colors as an array for mapping
 * @param theme - Theme name from exampleThemes
 * @returns Array of [from, to] colors
 */
export function getThemeColors(theme: ThemeName): [string, string] {
  const { from, to } = exampleThemes[theme];
  return [from, to];
}
