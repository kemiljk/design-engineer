/**
 * Platform Icon Components
 * SVG icons matching the platform treatments used in TrackLogo
 */

type Platform = "web" | "ios" | "android";

interface PlatformIconProps {
  platform: Platform;
  className?: string;
  size?: number;
}

export function PlatformIcon({ platform, size = 20, className }: PlatformIconProps) {
  switch (platform) {
    case "web":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Two horizontal lines */}
          <line x1="4" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    
    case "ios":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Single thick curved arc in top half - matches TrackLogo iOS treatment */}
          <path 
            d="M 3 10 C 3 6, 6 3, 10 3 C 14 3, 17 6, 17 10" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
          />
        </svg>
      );
    
    case "android":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Solid triangle in bottom-left */}
          <path d="M 3 17 L 11 17 L 3 9 Z" fill="currentColor" />
        </svg>
      );
  }
}

