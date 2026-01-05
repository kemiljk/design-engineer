/**
 * Track Logo System - Bauhaus-inspired geometric logos
 *
 * A unified logo system for tracks and platforms with consistent visual weight.
 *
 * Design Principles:
 * 1. All outer shapes use consistent 2px stroke weight (at 32px base)
 * 2. All inner treatments have equal visual presence
 * 3. Swiss Red center accent is proportionally consistent
 * 4. Each logo has similar overall "ink density"
 *
 * Track Shape (outer form):
 *   - Design: Circle (organic, creative)
 *   - Engineering: Square (structured, logical)
 *   - Convergence: Rounded Square (geometric blend of both)
 *
 * Platform Treatment (inner detail):
 *   - Web: Horizontal lines (layers, responsive)
 *   - iOS: Concentric arc (Apple's rounded, circular aesthetic)
 *   - Android: Corner arc (Material Design's rounded corners)
 */

import { cn } from "@/lib/utils";

type Track = "design" | "engineering" | "convergence";
type Platform = "web" | "ios" | "android";
type LogoLayer = "all" | "shape" | "platform" | "core" | "track";

interface TrackLogoProps {
  track: Track;
  platform?: Platform;
  size?: number;
  className?: string;
  /** 
   * Which layers to show:
   * - "all": shape + platform + core
   * - "track": shape + core only (no platform treatment)
   * - "shape": outer shape only
   * - "platform": platform treatment only
   * - "core": red diamond only
   */
  showLayer?: LogoLayer;
}

// Consistent dimensions for visual balance (at 32px base)
const BASE_STROKE_WIDTH = 2;
const BASE_INNER_STROKE = 1.5;
const CENTER_SIZE = 6; // Red diamond/dot size
const INNER_OFFSET = 7; // How far inner elements are from center

// Circle dimensions for Design track
const CIRCLE_RADIUS = 13;
const CIRCLE_CENTER = 16;

// Size thresholds
const SMALL_THRESHOLD = 24; // Below this, hide inner details
const LARGE_THRESHOLD = 96; // Above this, refine stroke weights

export function TrackLogo({
  track,
  platform = "web",
  size = 32,
  className,
  showLayer = "all",
}: TrackLogoProps) {
  // Responsive logic
  const isSmall = size < SMALL_THRESHOLD;
  const isLarge = size >= LARGE_THRESHOLD;

  // Refine stroke weights for large display sizes to prevent "chunkiness"
  // At large sizes, we want strokes to feel thinner relative to the container
  const outerStroke = isLarge ? 1.5 : BASE_STROKE_WIDTH;
  const innerStroke = isLarge ? 1.0 : BASE_INNER_STROKE;

  // "track" mode shows shape + core only (no platform treatment)
  const showShape = showLayer === "all" || showLayer === "shape" || showLayer === "track";
  const showPlatform =
    (showLayer === "all" || showLayer === "platform") && !isSmall;
  const showCore = showLayer === "all" || showLayer === "core" || showLayer === "track";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${track} ${platform}`}
    >
      {/* Outer shape based on track */}
      <g
        className={cn(
          "transition-opacity duration-300 motion-reduce:transition-none",
          !showShape && "opacity-0",
        )}
      >
        <TrackShape track={track} strokeWidth={outerStroke} />
      </g>

      {/* Inner treatment based on platform - only shown if not small */}
      <g
        className={cn(
          "transition-opacity duration-300 motion-reduce:transition-none",
          !showPlatform && "opacity-0",
        )}
      >
        <PlatformTreatment
          platform={platform}
          track={track}
          strokeWidth={innerStroke}
        />
      </g>

      {/* Center accent - always Swiss Red diamond */}
      <g
        className={cn(
          "transition-opacity duration-300 motion-reduce:transition-none",
          !showCore && "opacity-0",
        )}
      >
        <rect
          x={16 - CENTER_SIZE / 2}
          y={16 - CENTER_SIZE / 2}
          width={CENTER_SIZE}
          height={CENTER_SIZE}
          className="fill-swiss-red"
          transform="rotate(45 16 16)"
        />
      </g>
    </svg>
  );
}

// ============================================================================
// TRACK SHAPES - Consistent stroke, no fill
// ============================================================================

function TrackShape({
  track,
  strokeWidth,
}: {
  track: Track;
  strokeWidth: number;
}) {
  switch (track) {
    case "design":
      return (
        <circle
          cx={CIRCLE_CENTER}
          cy={CIRCLE_CENTER}
          r={CIRCLE_RADIUS}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />
      );

    case "engineering":
      return (
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />
      );

    case "convergence":
      // Rounded square (squircle) - geometric convergence of circle + square
      // Same bounds as square (3,3 to 29,29) with rounded corners
      const cornerRadius = 8; // Smooth blend between circle and square
      return (
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          rx={cornerRadius}
          ry={cornerRadius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />
      );
  }
}

// ============================================================================
// PLATFORM TREATMENTS - Consistent visual weight across all
// ============================================================================

function PlatformTreatment({
  platform,
  track,
  strokeWidth,
}: {
  platform: Platform;
  track: Track;
  strokeWidth: number;
}) {
  // All tracks now use the same inset (rounded square has same bounds as square)
  const inset = INNER_OFFSET;

  switch (platform) {
    case "web":
      // Horizontal lines - representing layers/responsive
      // Only 3 lines total: Top, Middle (Red Core), Bottom
      // So we render Top and Bottom lines.

      // All tracks use the same horizontal line positions
      return (
        <g
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        >
          {/* Top Line */}
          <line x1={16 - inset} y1="10" x2={16 + inset} y2="10" />
          {/* Bottom Line */}
          <line x1={16 - inset} y1="22" x2={16 + inset} y2="22" />
          {/* Middle line is implied by the red core */}
        </g>
      );

    case "ios":
      // Concentric Arc - Apple's rounded, concentric design language
      // A semicircle in the top half, referencing iOS's love of circles and concentricity
      //
      // Arc specification (32px viewBox):
      //   - Radius: 7 units (matches INNER_OFFSET for visual consistency)
      //   - Centre: (16, 16) - logo centre
      //   - Start: (9, 16) - left point at centre height
      //   - End: (23, 16) - right point at centre height
      //   - Creates a 180° arc through the top half
      return (
        <path
          d="M 9 16 A 7 7 0 0 1 23 16"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      );

    case "android":
      // Corner Arc - Material Design 3's signature rounded corner
      // A quarter-circle stroke representing the rounded corner that defines every Material surface
      //
      // Arc specification (32px viewBox):
      //   - Radius: 6 units
      //   - Centre: (8, 24) - bottom-left corner point
      //   - Start: (8, 18) - top of arc
      //   - End: (14, 24) - right of arc
      //   - Creates a 90° arc resembling a rounded corner
      return (
        <path
          d="M 8 18 A 6 6 0 0 1 14 24"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      );
  }
}

// ============================================================================
// Utility exports for standalone use
// ============================================================================

export type { Track, Platform, TrackLogoProps };
