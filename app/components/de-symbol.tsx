"use client";

interface DESymbolProps {
  size?: number;
  className?: string;
}

/**
 * Design Engineering Symbol
 * 
 * A Swiss-inspired monogram combining "D" and "E" letterforms.
 * The design uses bold geometric shapes with a distinctive 
 * red accent representing the intersection of disciplines.
 */
export function DESymbol({ size = 32, className = "" }: DESymbolProps) {
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
      {/* D shape - left half */}
      <path
        d="M4 4H14C19.5228 4 24 8.47715 24 14V14C24 19.5228 19.5228 24 14 24H4V4Z"
        fill="currentColor"
      />
      
      {/* Negative space - creates the D bowl */}
      <path
        d="M10 10H14C16.2091 10 18 11.7909 18 14V14C18 16.2091 16.2091 18 14 18H10V10Z"
        fill="var(--background, white)"
        className="fill-white dark:fill-black"
      />
      
      {/* E horizontal bars - right side */}
      <rect x="20" y="4" width="8" height="5" fill="currentColor" />
      <rect x="20" y="13.5" width="8" height="5" fill="var(--swiss-red, #ff0000)" className="fill-swiss-red" />
      <rect x="20" y="23" width="8" height="5" fill="currentColor" />
      
      {/* E vertical stem */}
      <rect x="20" y="4" width="4" height="24" fill="currentColor" />
    </svg>
  );
}

/**
 * Simplified square version for favicon
 */
export function DESymbolSquare({ size = 32, className = "" }: DESymbolProps) {
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
      {/* Background */}
      <rect width="32" height="32" fill="currentColor" />
      
      {/* D curve - negative space */}
      <path
        d="M4 4H12C17.5228 4 22 8.47715 22 14C22 19.5228 17.5228 24 12 24H4V4Z"
        fill="var(--background, white)"
        className="fill-white dark:fill-black"
      />
      
      {/* Inner D - fills back */}
      <path
        d="M4 8H11C14.3137 8 17 10.6863 17 14C17 17.3137 14.3137 20 11 20H4V8Z"
        fill="currentColor"
      />
      
      {/* Red accent bar */}
      <rect x="22" y="13" width="10" height="6" fill="var(--swiss-red, #ff0000)" className="fill-swiss-red" />
    </svg>
  );
}

/**
 * Minimal mark version - just the essential intersection concept
 */
export function DEMark({ size = 32, className = "" }: DESymbolProps) {
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
      {/* Two overlapping rectangles representing D(esign) and E(ngineering) */}
      {/* Vertical bar - Design */}
      <rect x="4" y="4" width="12" height="24" fill="currentColor" />
      
      {/* Horizontal bars - Engineering */}
      <rect x="16" y="4" width="12" height="6" fill="currentColor" />
      <rect x="16" y="22" width="12" height="6" fill="currentColor" />
      
      {/* Intersection - the red accent */}
      <rect x="16" y="13" width="12" height="6" fill="var(--swiss-red, #ff0000)" className="fill-swiss-red" />
    </svg>
  );
}
