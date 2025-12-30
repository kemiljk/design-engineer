type Props = {
  className?: string;
  size?: number;
};

/**
 * Design Engineering Logo/Symbol - The Intersection
 * 
 * A Swiss-inspired X mark. Two diagonal paths cross at a central
 * red diamond - representing where Design and Engineering intersect.
 */
export const Logo = ({ className, size = 32 }: Props) => {
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
      {/* Diagonal arms - rotated 45° */}
      <rect x="0" y="12" width="12" height="8" fill="currentColor" transform="rotate(45 16 16)" />
      <rect x="20" y="12" width="12" height="8" fill="currentColor" transform="rotate(45 16 16)" />
      <rect x="12" y="0" width="8" height="12" fill="currentColor" transform="rotate(45 16 16)" />
      <rect x="12" y="20" width="8" height="12" fill="currentColor" transform="rotate(45 16 16)" />
      
      {/* Center intersection - Swiss red diamond */}
      <rect x="10" y="10" width="12" height="12" className="fill-swiss-red" transform="rotate(45 16 16)" />
    </svg>
  );
};
