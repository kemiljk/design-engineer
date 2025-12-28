/**
 * Script to create the gallery-projects object type in Cosmic
 * 
 * Run with: npx tsx scripts/setup-gallery-object-type.ts
 */

import { createBucketClient } from "@cosmicjs/sdk";

const BUCKET_SLUG = process.env.NEXT_PUBLIC_BUCKET_SLUG || "designengineerxyz-production";
const READ_KEY = process.env.NEXT_PUBLIC_BUCKET_READ_KEY || "waxdIpagK8xgwQxjf9Ck7LO0C5oOu7euaUp3nhXlfzJLXi3Ho1";
const WRITE_KEY = process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY || "YEGEIL8qx3cjxGcgvajQGVFNwKbIdKp4nyeH4cTze3rwMQg8IA";

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
  writeKey: WRITE_KEY,
});

const galleryMetafields = [
  {
    key: "user_id",
    title: "User ID",
    type: "text",
    required: true,
  },
  {
    key: "user_name",
    title: "User Name",
    type: "text",
    required: true,
  },
  {
    key: "user_email",
    title: "User Email",
    type: "text",
    required: true,
  },
  {
    key: "platform",
    title: "Platform",
    type: "select-dropdown",
    required: true,
    options: [
      { value: "web", text: "Web" },
      { value: "ios", text: "iOS" },
      { value: "android", text: "Android" },
    ],
  },
  {
    key: "track",
    title: "Track",
    type: "select-dropdown",
    required: true,
    options: [
      { value: "design", text: "Design" },
      { value: "engineering", text: "Engineering" },
      { value: "convergence", text: "Convergence" },
    ],
  },
  {
    key: "description",
    title: "Description",
    type: "textarea",
    required: true,
  },
  {
    key: "thumbnail_url",
    title: "Thumbnail URL",
    type: "text",
    required: true,
  },
  {
    key: "project_url",
    title: "Project URL",
    type: "text",
    required: false,
  },
  {
    key: "github_url",
    title: "GitHub URL",
    type: "text",
    required: false,
  },
  {
    key: "video_url",
    title: "Video URL",
    type: "text",
    required: false,
  },
  {
    key: "technologies",
    title: "Technologies",
    type: "json",
    required: false,
  },
  {
    key: "status",
    title: "Status",
    type: "select-dropdown",
    required: true,
    options: [
      { value: "pending", text: "Pending Review" },
      { value: "approved", text: "Approved" },
      { value: "featured", text: "Featured" },
      { value: "rejected", text: "Rejected" },
    ],
  },
  {
    key: "featured_at",
    title: "Featured At",
    type: "date",
    required: false,
  },
  {
    key: "admin_notes",
    title: "Admin Notes",
    type: "textarea",
    required: false,
  },
];

async function main() {
  console.log("🚀 Setting up gallery-projects object type in Cosmic...\n");
  console.log(`Bucket: ${BUCKET_SLUG}`);
  
  try {
    // Check if the object type already exists
    let objectTypeExists = false;
    try {
      await cosmic.objectTypes.findOne("gallery-projects");
      objectTypeExists = true;
      console.log("✓ Found existing gallery-projects object type");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        objectTypeExists = false;
        console.log("○ gallery-projects object type does not exist yet");
      } else {
        throw error;
      }
    }

    if (objectTypeExists) {
      // Update existing object type
      console.log("\n📝 Updating existing object type...");
      const updateResult = await cosmic.objectTypes.updateOne("gallery-projects", {
        title: "Gallery Projects",
        singular: "Gallery Project",
        emoji: "🎨",
        metafields: galleryMetafields,
      });
      
      console.log("✓ Updated gallery-projects object type");
      console.log(`  Result: ${JSON.stringify(updateResult).slice(0, 100)}...`);
    } else {
      // Create new object type
      console.log("\n📝 Creating new object type...");
      const createResult = await cosmic.objectTypes.insertOne({
        title: "Gallery Projects",
        slug: "gallery-projects",
        singular: "Gallery Project",
        emoji: "🎨",
        metafields: galleryMetafields,
      });
      
      console.log("✓ Created gallery-projects object type");
      console.log(`  Result: ${JSON.stringify(createResult).slice(0, 100)}...`);
    }

    console.log("\n✅ Gallery setup complete!");
    console.log("\nThe gallery-projects object type has been created/updated with the following fields:");
    console.log("  - user_id, user_name, user_email (text)");
    console.log("  - platform (select: web, ios, android)");
    console.log("  - track (select: design, engineering, convergence)");
    console.log("  - description (textarea)");
    console.log("  - thumbnail_url, project_url, github_url, video_url (text)");
    console.log("  - technologies (json array)");
    console.log("  - status (select: pending, approved, featured, rejected)");
    console.log("  - featured_at (date)");
    console.log("  - admin_notes (textarea)");
    
  } catch (error) {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
  }
}

main();
