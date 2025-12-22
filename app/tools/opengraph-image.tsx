import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Design Engineering Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Design Engineering Tools",
    description:
      "Free utilities for animation, colour, typography, and cross-platform development.",
    badge: "Tools",
    badgeColor: "primary",
  });
}
