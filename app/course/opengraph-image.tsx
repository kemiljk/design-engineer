import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Design Engineer Course";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Become a Design Engineer",
    description:
      "Master the intersection of design and engineering. Build beautiful, functional products for Web, iOS, and Android.",
    badge: "Course",
    badgeColor: "primary",
  });
}
