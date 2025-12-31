import { cn } from "@/lib/utils";

interface DiamondIconProps {
  className?: string;
  size?: number;
}

/**
 * Diamond Icon - The brand's core symbol
 *
 * A rotated square representing the intersection point from the Design Engineer logo.
 * Uses currentColor by default, so it inherits from parent text color.
 */
export function DiamondIcon({ className, size = 24 }: DiamondIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        fill="currentColor"
        transform="rotate(45 12 12)"
      />
    </svg>
  );
}
