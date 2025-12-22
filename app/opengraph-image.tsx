import { generateOGImage } from "@/lib/og-image";

export const alt = "Design Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Design Engineer",
    description:
      "Bridge the gap between design and engineering. Master the skills to build world-class digital products.",
  });
}
