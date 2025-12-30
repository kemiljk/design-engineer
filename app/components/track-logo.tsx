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
 *   - Convergence: Cross/Plus (intersection of both)
 * 
 * Platform Treatment (inner detail):
 *   - Web: Horizontal lines (layers, responsive)
 *   - iOS: Two curved arcs (Apple's rounded aesthetic)
 *   - Android: Four corner marks (Material's geometric precision)
 */

type Track = "design" | "engineering" | "convergence";
type Platform = "web" | "ios" | "android";

interface TrackLogoProps {
  track: Track;
  platform: Platform;
  size?: number;
  className?: string;
}

// Consistent dimensions for visual balance (at 32px base)
const BASE_STROKE_WIDTH = 2;
const BASE_INNER_STROKE = 1.5;
const CENTER_SIZE = 6; // Red diamond/dot size
const INNER_OFFSET = 7; // How far inner elements are from center

// Size thresholds
const SMALL_THRESHOLD = 24; // Below this, hide inner details
const LARGE_THRESHOLD = 96; // Above this, refine stroke weights

export function TrackLogo({ track, platform, size = 32, className }: TrackLogoProps) {
  // Responsive logic
  const isSmall = size < SMALL_THRESHOLD;
  const isLarge = size >= LARGE_THRESHOLD;

  // Refine stroke weights for large display sizes to prevent "chunkiness"
  // At large sizes, we want strokes to feel thinner relative to the container
  const outerStroke = isLarge ? 1.5 : BASE_STROKE_WIDTH;
  const innerStroke = isLarge ? 1.0 : BASE_INNER_STROKE;

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
      <TrackShape track={track} strokeWidth={outerStroke} />
      
      {/* Inner treatment based on platform - only shown if not small */}
      {!isSmall && (
        <PlatformTreatment 
          platform={platform} 
          track={track} 
          strokeWidth={innerStroke} 
        />
      )}
      
      {/* Center accent - always Swiss Red diamond */}
      <rect 
        x={16 - CENTER_SIZE/2} 
        y={16 - CENTER_SIZE/2} 
        width={CENTER_SIZE} 
        height={CENTER_SIZE} 
        className="fill-swiss-red" 
        transform="rotate(45 16 16)" 
      />
    </svg>
  );
}

// ============================================================================
// TRACK SHAPES - Consistent stroke, no fill
// ============================================================================

function TrackShape({ track, strokeWidth }: { track: Track, strokeWidth: number }) {
  switch (track) {
    case "design":
      return (
        <circle 
          cx="16" 
          cy="16" 
          r="13" 
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
      // X/cross shape - rotated 45° to match main logo
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} fill="none" transform="rotate(45 16 16)">
          {/* Vertical bar */}
          <rect x="12" y="3" width="8" height="26" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
          {/* Horizontal bar */}
          <rect x="3" y="12" width="26" height="8" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
        </g>
      );
  }
}

// ============================================================================
// PLATFORM TREATMENTS - Consistent visual weight across all
// ============================================================================

function PlatformTreatment({ platform, track, strokeWidth }: { platform: Platform; track: Track; strokeWidth: number }) {
  // Adjust treatment position based on track shape
  const inset = track === "convergence" ? 0 : INNER_OFFSET;
  
  switch (platform) {
    case "web":
      // Horizontal lines - representing layers/responsive
      if (track === "convergence") {
        // For convergence, use lines that work with the rotated X
        return (
          <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
            <line x1="9" y1="10" x2="23" y2="10" />
            <line x1="9" y1="22" x2="23" y2="22" />
          </g>
        );
      }
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
          <line x1={16 - inset} y1="10" x2={16 + inset} y2="10" />
          <line x1={16 - inset} y1="22" x2={16 + inset} y2="22" />
        </g>
      );
    
    case "ios":
      // Two curved arcs - Apple's rounded aesthetic
      if (track === "convergence") {
        // For convergence, use arcs that work with the rotated X
        return (
          <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
            <path d="M 10 10 Q 16 6, 22 10" />
            <path d="M 10 22 Q 16 26, 22 22" />
          </g>
        );
      }
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
          <path d={`M ${16 - inset} 11 Q 16 8, ${16 + inset} 11`} />
          <path d={`M ${16 - inset} 21 Q 16 24, ${16 + inset} 21`} />
        </g>
      );
    
    case "android":
      // Four corner marks - Material's geometric precision
      const cornerSize = 4;
      const cornerInset = track === "engineering" ? 6 : 7;
      
      if (track === "convergence") {
        // For convergence, use marks at the four cardinal points of the X
        return (
          <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" fill="none">
            {/* Top */}
            <path d="M 13 6 L 16 3 L 19 6" />
            {/* Right */}
            <path d="M 26 13 L 29 16 L 26 19" />
            {/* Bottom */}
            <path d="M 19 26 L 16 29 L 13 26" />
            {/* Left */}
            <path d="M 6 19 L 3 16 L 6 13" />
          </g>
        );
      }
      
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square">
          {/* Top-left */}
          <path d={`M ${cornerInset} ${cornerInset + cornerSize} L ${cornerInset} ${cornerInset} L ${cornerInset + cornerSize} ${cornerInset}`} fill="none" />
          {/* Top-right */}
          <path d={`M ${32 - cornerInset - cornerSize} ${cornerInset} L ${32 - cornerInset} ${cornerInset} L ${32 - cornerInset} ${cornerInset + cornerSize}`} fill="none" />
          {/* Bottom-right */}
          <path d={`M ${32 - cornerInset} ${32 - cornerInset - cornerSize} L ${32 - cornerInset} ${32 - cornerInset} L ${32 - cornerInset - cornerSize} ${32 - cornerInset}`} fill="none" />
          {/* Bottom-left */}
          <path d={`M ${cornerInset + cornerSize} ${32 - cornerInset} L ${cornerInset} ${32 - cornerInset} L ${cornerInset} ${32 - cornerInset - cornerSize}`} fill="none" />
        </g>
      );
  }
}

// ============================================================================
// Utility exports for standalone use
// ============================================================================

export type { Track, Platform, TrackLogoProps };
