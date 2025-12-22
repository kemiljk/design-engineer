import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "About Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "About Design Engineer",
    description:
      "Learn about our mission to bridge the gap between design and engineering.",
    badge: "About",
  });
}
