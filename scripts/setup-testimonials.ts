#!/usr/bin/env tsx
/**
 * Setup script for the Testimonials object type in Cosmic
 * 
 * Run with: pnpm setup:testimonials
 * 
 * This creates the "testimonials" object type with all required metafields
 * for collecting and displaying student testimonials.
 */

import { createBucketClient } from "@cosmicjs/sdk";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const BUCKET_SLUG = process.env.NEXT_PUBLIC_BUCKET_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_BUCKET_READ_KEY;
const WRITE_KEY = process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY;

if (!BUCKET_SLUG || !READ_KEY || !WRITE_KEY) {
  console.error("❌ Missing required environment variables:");
  console.error("   - NEXT_PUBLIC_BUCKET_SLUG");
  console.error("   - NEXT_PUBLIC_BUCKET_READ_KEY");
  console.error("   - NEXT_PUBLIC_BUCKET_WRITE_KEY");
  process.exit(1);
}

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
  writeKey: WRITE_KEY,
});

async function setupTestimonialsObjectType() {
  console.log("🚀 Setting up Testimonials object type in Cosmic...\n");

  try {
    // Check if object type already exists
    const existingTypes = await cosmic.objectTypes.find();
    const testimonialsExists = existingTypes.object_types?.some(
      (type: { slug: string }) => type.slug === "testimonials"
    );

    if (testimonialsExists) {
      console.log("⚠️  Object type 'testimonials' already exists.");
      console.log("   Delete it manually in Cosmic dashboard if you want to recreate it.\n");
      return;
    }

    // Create the testimonials object type
    const result = await cosmic.objectTypes.insertOne({
      title: "Testimonials",
      slug: "testimonials",
      singular: "Testimonial",
      emoji: "⭐",
      metafields: [
        {
          title: "User ID",
          key: "user_id",
          type: "text",
          required: true,
        },
        {
          title: "User Name",
          key: "user_name",
          type: "text",
          required: true,
        },
        {
          title: "User Email",
          key: "user_email",
          type: "text",
          required: true,
        },
        {
          title: "User Photo URL",
          key: "user_photo_url",
          type: "text",
          required: false,
        },
        {
          title: "Role",
          key: "user_role",
          type: "text",
          required: false,
        },
        {
          title: "Company",
          key: "user_company",
          type: "text",
          required: false,
        },
        {
          title: "Content",
          key: "content",
          type: "textarea",
          required: true,
        },
        {
          title: "Track Completed",
          key: "track_completed",
          type: "select-dropdown",
          required: true,
          options: [
            { key: "design", value: "design" },
            { key: "engineering", value: "engineering" },
            { key: "convergence", value: "convergence" },
          ],
        },
        {
          title: "Platform Completed",
          key: "platform_completed",
          type: "select-dropdown",
          required: true,
          options: [
            { key: "web", value: "web" },
            { key: "ios", value: "ios" },
            { key: "android", value: "android" },
          ],
        },
        {
          title: "Rating",
          key: "rating",
          type: "number",
          required: false,
        },
        {
          title: "Status",
          key: "status",
          type: "select-dropdown",
          required: true,
          options: [
            { key: "pending", value: "pending" },
            { key: "approved", value: "approved" },
            { key: "featured", value: "featured" },
            { key: "rejected", value: "rejected" },
          ],
        },
        {
          title: "Featured At",
          key: "featured_at",
          type: "date",
          required: false,
        },
        {
          title: "Admin Notes",
          key: "admin_notes",
          type: "textarea",
          required: false,
        },
      ],
    });

    console.log("✅ Testimonials object type created successfully!");
    console.log(`   ID: ${result.object_type?.id}`);
    console.log(`   Slug: ${result.object_type?.slug}`);
    console.log("\n📝 Metafields created:");
    console.log("   - user_id (text, required)");
    console.log("   - user_name (text, required)");
    console.log("   - user_email (text, required)");
    console.log("   - user_photo_url (text)");
    console.log("   - user_role (text)");
    console.log("   - user_company (text)");
    console.log("   - content (textarea, required)");
    console.log("   - track_completed (select: design/engineering/convergence)");
    console.log("   - platform_completed (select: web/ios/android)");
    console.log("   - rating (number)");
    console.log("   - status (select: pending/approved/featured/rejected)");
    console.log("   - featured_at (date)");
    console.log("   - admin_notes (textarea)");
    console.log("\n🎉 Setup complete! You can now collect testimonials.");

  } catch (error) {
    console.error("❌ Error setting up testimonials object type:", error);
    process.exit(1);
  }
}

setupTestimonialsObjectType();

