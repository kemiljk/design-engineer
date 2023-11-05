interface Props {
  className: string;
}

export default function Icon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_15_210)">
        <path
          d="M20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 -1.47557e-07 25.3043 0 20C1.47557e-07 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 -6.32535e-08 20 0V20V40Z"
          fill="currentColor"
        />
        <mask id="path-2-inside-1_15_210" fill="white">
          <path d="M20 40C25.3043 40 30.3914 37.8929 34.1421 34.1421C37.8929 30.3914 40 25.3043 40 20C40 14.6957 37.8929 9.60859 34.1421 5.85786C30.3914 2.10714 25.3043 -6.32535e-08 20 0V20V40Z" />
        </mask>
        <path
          d="M20 40C25.3043 40 30.3914 37.8929 34.1421 34.1421C37.8929 30.3914 40 25.3043 40 20C40 14.6957 37.8929 9.60859 34.1421 5.85786C30.3914 2.10714 25.3043 -6.32535e-08 20 0V20V40Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="2 2"
          mask="url(#path-2-inside-1_15_210)"
        />
      </g>
      <defs>
        <clipPath id="clip0_15_210">
          <rect width="40" height="40" fill="none" />
        </clipPath>
      </defs>
    </svg>
  );
}
