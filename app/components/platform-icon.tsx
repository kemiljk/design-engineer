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
          {/* Concentric arc - semicircle in top half */}
          <path 
            d="M 5.5 10 A 4.5 4.5 0 0 1 14.5 10" 
            stroke="currentColor" 
            strokeWidth="1.5" 
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
          {/* Corner arc - quarter-circle in bottom-left */}
          <path 
            d="M 5 11 A 4 4 0 0 1 9 15" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            fill="none" 
          />
        </svg>
      );
  }
}

