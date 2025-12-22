import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Design Engineering | Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Design Engineering",
    description:
      "The discipline that bridges design and development—and why it matters.",
    badge: "About",
  });
}
