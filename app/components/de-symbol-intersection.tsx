"use client";

interface DESymbolProps {
  size?: number;
  className?: string;
}

/**
 * Design Engineering Symbol - Intersection Concept
 * 
 * Two paths crossing to form an intersection.
 * The red square at the center represents where Design and Engineering meet.
 */
export function DEIntersection({ size = 32, className = "" }: DESymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Design Engineer"
    >
      {/* Horizontal path - Engineering */}
      <rect x="0" y="12" width="32" height="8" fill="currentColor" />
      
      {/* Vertical path - Design */}
      <rect x="12" y="0" width="8" height="32" fill="currentColor" />
      
      {/* Intersection - Swiss red */}
      <rect x="12" y="12" width="8" height="8" fill="#FF0000" className="fill-swiss-red" />
    </svg>
  );
}

/**
 * Offset cross - more dynamic intersection
 */
export function DEIntersectionOffset({ size = 32, className = "" }: DESymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Design Engineer"
    >
      {/* Horizontal bar - slightly offset */}
      <rect x="0" y="14" width="32" height="6" fill="currentColor" />
      
      {/* Vertical bar - slightly offset */}
      <rect x="14" y="0" width="6" height="32" fill="currentColor" />
      
      {/* Intersection square - emphasized */}
      <rect x="11" y="11" width="10" height="10" fill="#FF0000" className="fill-swiss-red" />
    </svg>
  );
}

/**
 * Corner intersection - two L-shapes meeting
 */
export function DECornerMeet({ size = 32, className = "" }: DESymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Design Engineer"
    >
      {/* Top-left L shape */}
      <path d="M4 4H14V14H4V4Z" fill="currentColor" />
      <path d="M4 4H4V18H10V10H18V4H4Z" fill="currentColor" />
      
      {/* Bottom-right L shape */}
      <path d="M14 14H28V28H22V20H14V14Z" fill="currentColor" />
      
      {/* Intersection */}
      <rect x="14" y="14" width="8" height="8" fill="#FF0000" className="fill-swiss-red" />
    </svg>
  );
}

/**
 * Minimal X intersection - two diagonal paths
 */
export function DECrossroads({ size = 32, className = "" }: DESymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Design Engineer"
    >
      {/* Four arms extending from center */}
      <rect x="0" y="13" width="13" height="6" fill="currentColor" />
      <rect x="19" y="13" width="13" height="6" fill="currentColor" />
      <rect x="13" y="0" width="6" height="13" fill="currentColor" />
      <rect x="13" y="19" width="6" height="13" fill="currentColor" />
      
      {/* Center intersection - larger red square */}
      <rect x="10" y="10" width="12" height="12" fill="#FF0000" className="fill-swiss-red" />
    </svg>
  );
}

/**
 * Overlapping squares - two forms intersecting
 */
export function DEOverlap({ size = 32, className = "" }: DESymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Design Engineer"
    >
      {/* First square - Design (top-left) */}
      <rect x="2" y="2" width="18" height="18" fill="currentColor" />
      
      {/* Second square - Engineering (bottom-right) */}
      <rect x="12" y="12" width="18" height="18" fill="currentColor" />
      
      {/* Intersection - where they overlap */}
      <rect x="12" y="12" width="8" height="8" fill="#FF0000" className="fill-swiss-red" />
    </svg>
  );
}

/**
 * Plus sign with emphasized center
 */
export function DEPlus({ size = 32, className = "" }: DESymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Design Engineer"
    >
      {/* Horizontal bar */}
      <rect x="2" y="11" width="28" height="10" fill="currentColor" />
      
      {/* Vertical bar */}
      <rect x="11" y="2" width="10" height="28" fill="currentColor" />
      
      {/* Center emphasis - red square */}
      <rect x="11" y="11" width="10" height="10" fill="#FF0000" className="fill-swiss-red" />
    </svg>
  );
}
