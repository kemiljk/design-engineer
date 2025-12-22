import { generateOGImage } from "@/lib/og-image";
import { getStory } from "@/lib/cosmic";

export const runtime = "edge";
export const alt = "Design Engineer Story";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStory(slug);
  const name = story?.metadata?.design_engineer?.title || "Design Engineer";
  const role = story?.metadata?.design_engineer?.metadata?.role || "";

  return generateOGImage({
    title: name,
    description: role,
    badge: "Story",
    badgeColor: "primary",
  });
}
