import { config } from "dotenv";
config({ path: ".env.local" });
import { createBucketClient } from "@cosmicjs/sdk";
import satori from "satori";
import sharp from "sharp";
import { readFile } from "fs/promises";
import { join } from "path";

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG as string,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY as string,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY as string,
});

async function loadFonts() {
  // Use TTF format - satori requires OTF or TTF, not WOFF
  const instrumentSerifUrl = "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf";
  const hostGroteskUrl = "https://fonts.gstatic.com/s/hostgrotesk/v5/co3UmWBnlCJ3U42vbbfdwMjzqHAXOdFzqU5PudXOzhY.ttf";

  const [instrumentSerifResponse, hostGroteskResponse] = await Promise.all([
    fetch(instrumentSerifUrl),
    fetch(hostGroteskUrl),
  ]);

  if (!instrumentSerifResponse.ok) {
    throw new Error(`Failed to fetch Instrument Serif: ${instrumentSerifResponse.status}`);
  }
  if (!hostGroteskResponse.ok) {
    throw new Error(`Failed to fetch Host Grotesk: ${hostGroteskResponse.status}`);
  }

  const instrumentSerif = await instrumentSerifResponse.arrayBuffer();
  const hostGrotesk = await hostGroteskResponse.arrayBuffer();

  return { instrumentSerif, hostGrotesk };
}

function createOgImageMarkup(title: string, description: string) {
  const isLongTitle = title.length > 40;

  return {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
        padding: "60px",
        fontFamily: "Host Grotesk",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "auto",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: "16px" },
                  children: [
                    {
                      type: "svg",
                      props: {
                        width: 48,
                        height: 48,
                        viewBox: "0 0 32 32",
                        children: [
                          {
                            type: "rect",
                            props: {
                              x: 0,
                              y: 12,
                              width: 12,
                              height: 8,
                              fill: "#171717",
                              transform: "rotate(45 16 16)",
                            },
                          },
                          {
                            type: "rect",
                            props: {
                              x: 20,
                              y: 12,
                              width: 12,
                              height: 8,
                              fill: "#171717",
                              transform: "rotate(45 16 16)",
                            },
                          },
                          {
                            type: "rect",
                            props: {
                              x: 12,
                              y: 0,
                              width: 8,
                              height: 12,
                              fill: "#171717",
                              transform: "rotate(45 16 16)",
                            },
                          },
                          {
                            type: "rect",
                            props: {
                              x: 12,
                              y: 20,
                              width: 8,
                              height: 12,
                              fill: "#171717",
                              transform: "rotate(45 16 16)",
                            },
                          },
                          {
                            type: "rect",
                            props: {
                              x: 10,
                              y: 10,
                              width: 12,
                              height: 12,
                              fill: "#FF4400",
                              transform: "rotate(45 16 16)",
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "24px",
                          fontWeight: 500,
                          color: "#171717",
                          letterSpacing: "-0.02em",
                        },
                        children: "designengineer.xyz",
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    backgroundColor: "#171717",
                    color: "#fff",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  },
                  children: "Article",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "auto",
              marginBottom: "60px",
            },
            children: [
              {
                type: "h1",
                props: {
                  style: {
                    fontSize: isLongTitle ? "56px" : "72px",
                    fontFamily: "Instrument Serif",
                    fontWeight: 400,
                    color: "#171717",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    maxWidth: "900px",
                  },
                  children: title,
                },
              },
              ...(description
                ? [
                    {
                      type: "p",
                      props: {
                        style: {
                          fontSize: "24px",
                          color: "#737373",
                          lineHeight: 1.4,
                          margin: 0,
                          maxWidth: "800px",
                        },
                        children:
                          description.length > 120
                            ? description.slice(0, 120) + "..."
                            : description,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "100%",
              height: "6px",
              backgroundColor: "#FF4400",
              position: "absolute",
              bottom: 0,
              left: 0,
            },
          },
        },
      ],
    },
  };
}

async function generateOgImage(
  title: string,
  description: string,
  fonts: { instrumentSerif: ArrayBuffer; hostGrotesk: ArrayBuffer }
): Promise<Buffer> {
  const markup = createOgImageMarkup(title, description);

  const svg = await satori(markup as any, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Instrument Serif",
        data: fonts.instrumentSerif,
        weight: 400,
        style: "normal",
      },
      {
        name: "Host Grotesk",
        data: fonts.hostGrotesk,
        weight: 500,
        style: "normal",
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}

async function uploadToCosmicMedia(
  imageBuffer: Buffer,
  filename: string
): Promise<{ id: string; name: string; imgix_url: string }> {
  const result = await cosmic.media.insertOne({
    media: {
      buffer: imageBuffer,
      originalname: filename,
    },
  });

  return {
    id: result.media.id,
    name: result.media.name,
    imgix_url: result.media.imgix_url,
  };
}

async function updatePostWithImage(
  postId: string,
  mediaId: string
): Promise<void> {
  await cosmic.objects.updateOne(postId, {
    metadata: {
      image: mediaId,
    },
  });
}

async function getAllPosts(): Promise<
  Array<{ id: string; slug: string; title: string; metadata: { snippet?: string; image?: { imgix_url: string } } }>
> {
  const { objects } = await cosmic.objects
    .find({ type: "content-posts" })
    .props("id,slug,title,metadata")
    .depth(1);

  return objects;
}

async function main() {
  console.log("🖼️  Starting OG image generation...\n");

  console.log("📦 Loading fonts...");
  const fonts = await loadFonts();
  console.log("✅ Fonts loaded\n");

  console.log("📚 Fetching posts...");
  const posts = await getAllPosts();
  console.log(`✅ Found ${posts.length} posts\n`);

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of posts) {
    const filename = `og-${post.slug}.png`;

    // Check if post already has an image (skip if it looks like a generated OG image)
    if (post.metadata.image?.imgix_url?.includes(`og-${post.slug}`)) {
      console.log(`⏭️  Skipping "${post.title}" - already has generated OG image`);
      skipped++;
      continue;
    }

    try {
      console.log(`🎨 Generating image for "${post.title}"...`);

      const imageBuffer = await generateOgImage(
        post.title,
        post.metadata.snippet || "",
        fonts
      );

      console.log(`📤 Uploading ${filename}...`);
      const media = await uploadToCosmicMedia(imageBuffer, filename);

      console.log(`🔗 Updating post with image...`);
      await updatePostWithImage(post.id, media.id);

      console.log(`✅ Done: ${media.imgix_url}\n`);
      generated++;
    } catch (error) {
      console.error(`❌ Error processing "${post.title}":`, error);
      errors++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

main().catch(console.error);
