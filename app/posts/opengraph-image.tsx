import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Design Engineer Articles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Articles & Insights",
    description:
      "Explore articles on design engineering, UI development, and building better digital products.",
    badge: "Articles",
  });
}
