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
 *   - iOS: Curved arc using mask technique (Apple's rounded aesthetic)
 *   - Android: Triangle cut (Angular cuts)
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

  // Generate unique mask ID for each logo instance
  const maskId = `ios-mask-${track}-${platform}-${size}`;

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
          "transition-opacity duration-300",
          !showShape && "opacity-0",
        )}
      >
        <TrackShape track={track} strokeWidth={outerStroke} />
      </g>

      {/* Inner treatment based on platform - only shown if not small */}
      <g
        className={cn(
          "transition-opacity duration-300",
          !showPlatform && "opacity-0",
        )}
      >
        <PlatformTreatment
          platform={platform}
          track={track}
          strokeWidth={innerStroke}
          maskId={maskId}
        />
      </g>

      {/* Center accent - always Swiss Red diamond */}
      <g
        className={cn(
          "transition-opacity duration-300",
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
  maskId,
}: {
  platform: Platform;
  track: Track;
  strokeWidth: number;
  maskId: string;
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
      // Curved arc using mask technique - EXACT coordinates from user's SVGs
      // Scale factor from 42px to 32px: 32/42 ≈ 0.762
      const iosScale = 32 / 42;

      // All three tracks use the same iOS arc (curved half-circle in top half)
      // Original SVG path from user (42px viewBox):
      // Outer arc: M6 21 C6 17.0218, 7.58035 13.2064, 10.3934 10.3934 C13.2064 7.58035, 17.0217 6, 21 6 C24.9782 6, 28.7935 7.58035, 31.6066 10.3934 C34.4196 13.2064, 36 17.0217, 36 21
      // Inner arc: L33.0344 21 C33.0344 17.8083, 31.7665 14.7473, 29.5096 12.4904 C27.2527 10.2335, 24.1917 8.96556, 21 8.96556 C17.8083 8.96556, 14.7473 10.2335, 12.4904 12.4904 C10.2335 14.7473, 8.96556 17.8083, 8.96556 21 L6 21 Z
      // Original stroke-width: 6 (in 42px), scaled: ~4.57

      // Scale all coordinates exactly
      const s = iosScale;

      // Outer arc control points (scaled exactly from 42px SVG)
      const outerPath = `M ${6 * s} ${21 * s} C ${6 * s} ${17.0218 * s}, ${7.58035 * s} ${13.2064 * s}, ${10.3934 * s} ${10.3934 * s} C ${13.2064 * s} ${7.58035 * s}, ${17.0217 * s} ${6 * s}, ${21 * s} ${6 * s} C ${24.9782 * s} ${6 * s}, ${28.7935 * s} ${7.58035 * s}, ${31.6066 * s} ${10.3934 * s} C ${34.4196 * s} ${13.2064 * s}, ${36 * s} ${17.0217 * s}, ${36 * s} ${21 * s}`;

      // Inner arc control points (scaled exactly)
      const innerPath = `L ${33.0344 * s} ${21 * s} C ${33.0344 * s} ${17.8083 * s}, ${31.7665 * s} ${14.7473 * s}, ${29.5096 * s} ${12.4904 * s} C ${27.2527 * s} ${10.2335 * s}, ${24.1917 * s} ${8.96556 * s}, ${21 * s} ${8.96556 * s} C ${17.8083 * s} ${8.96556 * s}, ${14.7473 * s} ${10.2335 * s}, ${12.4904 * s} ${12.4904 * s} C ${10.2335 * s} ${14.7473 * s}, ${8.96556 * s} ${17.8083 * s}, ${8.96556 * s} ${21 * s} L ${6 * s} ${21 * s} Z`;

      const fullPath = outerPath + " " + innerPath;

      // Original stroke-width was 6 in 42px, with mask technique
      // Scaled: 6 * 0.762 ≈ 4.57
      const arcStrokeWidth = 6 * s;

      return (
        <>
          <defs>
            <mask id={maskId} fill="white">
              <path d={fullPath} />
            </mask>
          </defs>
          <path
            d={fullPath}
            stroke="currentColor"
            strokeWidth={arcStrokeWidth}
            mask={`url(#${maskId})`}
            fill="none"
          />
        </>
      );

    case "android":
      // Filled Triangle - "Angular cuts"
      // EXACT coordinates from user's SVGs, scaled from 42px to 32px
      // Scale factor: 32/42 = 0.762
      const androidScale = 32 / 42;

      if (track === "design") {
        // Design Android: triangle in bottom-left corner
        // Original SVG path: M12.5 40L1.5 29V40H12.5Z (42px viewBox)
        // Triangle creates a "cut" effect without touching the circle
        return (
          <path
            d={`M ${12.5 * androidScale} ${40 * androidScale} L ${1.5 * androidScale} ${29 * androidScale} L ${1.5 * androidScale} ${40 * androidScale} Z`}
            fill="currentColor"
            stroke="none"
          />
        );
      } else if (track === "engineering") {
        // Engineering Android: triangle in bottom-left corner
        // Original SVG path: M17 36L6 25V36H17Z (42px viewBox)
        return (
          <path
            d={`M ${17 * androidScale} ${36 * androidScale} L ${6 * androidScale} ${25 * androidScale} L ${6 * androidScale} ${36 * androidScale} Z`}
            fill="currentColor"
            stroke="none"
          />
        );
      } else {
        // Convergence: perfect right triangle, nudged inward to clear rounded corner
        // Equal legs of 8 units each (isoceles right triangle)
        // Triangle in 42px coords: tip at (11, 23), base at y=31, 8x8 triangle
        return (
          <path
            d={`M ${19 * androidScale} ${31 * androidScale} L ${11 * androidScale} ${23 * androidScale} L ${11 * androidScale} ${31 * androidScale} Z`}
            fill="currentColor"
            stroke="none"
          />
        );
      }
  }
}

// ============================================================================
// Utility exports for standalone use
// ============================================================================

export type { Track, Platform, TrackLogoProps };
