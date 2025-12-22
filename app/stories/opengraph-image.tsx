import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Design Engineer Stories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Design Engineer Stories",
    description:
      "Conversations with design engineers about their work, process, and career journeys.",
    badge: "Stories",
    badgeColor: "primary",
  });
}
