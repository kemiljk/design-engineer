import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The Intersection: X mark with central diamond */}
        {/* Diagonal arms - rotated 45° */}
        <rect
          x="0"
          y="12"
          width="12"
          height="8"
          fill="black"
          transform="rotate(45 16 16)"
        />
        <rect
          x="20"
          y="12"
          width="12"
          height="8"
          fill="black"
          transform="rotate(45 16 16)"
        />
        <rect
          x="12"
          y="0"
          width="8"
          height="12"
          fill="black"
          transform="rotate(45 16 16)"
        />
        <rect
          x="12"
          y="20"
          width="8"
          height="12"
          fill="black"
          transform="rotate(45 16 16)"
        />

        {/* Center intersection - Swiss red diamond */}
        <rect
          x="10"
          y="10"
          width="12"
          height="12"
          fill="#FF4400"
          transform="rotate(45 16 16)"
        />
      </svg>
    ),
    {
      ...size,
    }
  );
}
