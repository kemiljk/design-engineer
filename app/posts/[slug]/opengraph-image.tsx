import { ImageResponse } from "next/og";
import { getPost } from "@/lib/cosmic";
import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Design Engineer Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  // If post has a pre-generated OG image in Cosmic, use it
  if (post?.metadata?.image?.imgix_url) {
    const imageUrl = `${post.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format`;
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Fallback: Generate image on the fly
  const title = post?.title || "Post";
  const description = post?.metadata?.snippet || "";

  return generateOGImage({
    title,
    description,
    badge: "Article",
  });
}
