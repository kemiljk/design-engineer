import { config } from "dotenv";
config({ path: ".env.local" });
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG!,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY!,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY!,
});

interface Post {
  id: string;
  slug: string;
  title: string;
  thumbnail?: string;
  metadata: {
    image?: {
      imgix_url: string;
    };
  };
}

interface Media {
  id: string;
  name: string;
  original_name: string;
  imgix_url: string;
}

async function getAllPosts(): Promise<Post[]> {
  const { objects } = await cosmic.objects
    .find({ type: "content-posts" })
    .props("id,slug,title,thumbnail,metadata")
    .depth(1);

  return objects;
}

async function getAllOgMedia(): Promise<Media[]> {
  // Use fetch directly since SDK method seems to have issues
  const baseUrl = `https://api.cosmicjs.com/v3/buckets/${process.env.NEXT_PUBLIC_BUCKET_SLUG}/media`;
  const allMedia: Media[] = [];
  let skip = 0;
  const limit = 100;

  while (true) {
    const url = `${baseUrl}?read_key=${process.env.NEXT_PUBLIC_BUCKET_READ_KEY}&limit=${limit}&skip=${skip}&props=id,name,original_name,imgix_url`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.media || data.media.length === 0) break;

    // Filter to only OG images
    const ogMedia = data.media.filter((m: Media) =>
      m.original_name?.startsWith("og-")
    );
    allMedia.push(...ogMedia);

    skip += limit;
    if (skip >= data.total) break;
  }

  return allMedia;
}

function slugFromOriginalName(originalName: string): string {
  // original_name format: og-{slug}.png
  return originalName.replace(/^og-/, "").replace(/\.png$/, "");
}

async function updatePostWithImage(
  postId: string,
  mediaName: string
): Promise<void> {
  // Both thumbnail and metadata.image expect the 'name' field of media
  await cosmic.objects.updateOne(postId, {
    thumbnail: mediaName,
    metadata: {
      image: mediaName,
    },
  });
}

async function main() {
  console.log("🔗 Assigning OG images to posts...\n");

  console.log("📚 Fetching posts...");
  const posts = await getAllPosts();
  console.log(`✅ Found ${posts.length} posts\n`);

  console.log("🖼️  Fetching OG media...");
  const ogMedia = await getAllOgMedia();
  console.log(`✅ Found ${ogMedia.length} OG images\n`);

  // Create a map of slug -> media for quick lookup
  const mediaBySlug = new Map<string, Media>();
  for (const media of ogMedia) {
    const slug = slugFromOriginalName(media.original_name);
    mediaBySlug.set(slug, media);
  }

  let updated = 0;
  let skipped = 0;
  let notFound = 0;
  let errors = 0;

  for (const post of posts) {
    const media = mediaBySlug.get(post.slug);

    if (!media) {
      console.log(`⚠️  No OG image found for "${post.title}" (${post.slug})`);
      notFound++;
      continue;
    }

    // Check if already correctly assigned
    if (
      post.thumbnail === media.imgix_url &&
      post.metadata.image?.imgix_url === media.imgix_url
    ) {
      console.log(`⏭️  "${post.title}" already has correct image`);
      skipped++;
      continue;
    }

    try {
      console.log(`🔗 Assigning image to "${post.title}"...`);
      await updatePostWithImage(post.id, media.name);
      console.log(`   ✅ thumbnail & image: ${media.name}`);
      updated++;
    } catch (error) {
      console.error(`❌ Error updating "${post.title}":`, error);
      errors++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped (already set): ${skipped}`);
  console.log(`   Not found: ${notFound}`);
  console.log(`   Errors: ${errors}`);
}

main().catch(console.error);
