import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Design Engineer Resources";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Resources",
    description:
      "Curated resources, tools, and learning materials for design engineers.",
    badge: "Resources",
  });
}
