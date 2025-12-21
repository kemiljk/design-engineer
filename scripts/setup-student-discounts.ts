/**
 * Setup script for student discounts object type
 *
 * This script creates the student-discounts object type in Cosmic.
 *
 * Run with: npx tsx scripts/setup-student-discounts.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG!,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY!,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY!,
});

async function setupStudentDiscountsType() {
  console.log("🎓 Setting up student-discounts object type in Cosmic...\n");

  // Check required env vars
  if (!process.env.NEXT_PUBLIC_BUCKET_SLUG) {
    throw new Error("NEXT_PUBLIC_BUCKET_SLUG is not set");
  }
  if (!process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY) {
    throw new Error("NEXT_PUBLIC_BUCKET_WRITE_KEY is not set");
  }

  try {
    // Check if the object type already exists by trying to find objects of that type
    try {
      await cosmic.objects.find({ type: "student-discounts" }).limit(1);
      console.log("✓ student-discounts object type already exists");
      console.log("  Skipping creation...\n");
      return;
    } catch (error: any) {
      // 404 means the type doesn't exist, which is what we want
      if (error.status !== 404) {
        throw error;
      }
    }

    // Create the object type
    const result = await cosmic.objectTypes.insertOne({
      title: "Student Discounts",
      slug: "student-discounts",
      singular: "Student Discount",
      emoji: "🎓",
      metafields: [
        {
          title: "Email",
          key: "email",
          type: "text",
          required: true,
        },
        {
          title: "Discount Code",
          key: "discount_code",
          type: "text",
          required: true,
        },
        {
          title: "Requested At",
          key: "requested_at",
          type: "text",
          required: true,
        },
        {
          title: "Status",
          key: "status",
          type: "select-dropdown",
          required: true,
          options: [
            { key: "sent", value: "Sent" },
            { key: "pending", value: "Pending" },
            { key: "failed", value: "Failed" },
            { key: "used", value: "Used" },
          ],
        },
      ],
    });

    console.log("✓ Successfully created student-discounts object type!");
    console.log("\nObject Type Details:");
    console.log("  Title: Student Discounts");
    console.log("  Slug: student-discounts");
    console.log("  Emoji: 🎓");
    console.log("\nMetafields:");
    console.log("  - email (text, required)");
    console.log("  - discount_code (text, required)");
    console.log("  - requested_at (text, required)");
    console.log("  - status (select-dropdown, required)");
    console.log("\nStatus Options:");
    console.log("  - sent: Code sent successfully");
    console.log("  - pending: Processing");
    console.log("  - failed: Failed to send");
    console.log("  - used: Code has been redeemed");
    console.log(
      "\n✓ Setup complete! The student discount system is ready to use.\n",
    );

    return result;
  } catch (error: any) {
    console.error("\n✗ Error creating object type:");

    if (error?.message) {
      console.error("  Message:", error.message);
    }
    if (error?.status) {
      console.error("  Status:", error.status);
    }

    console.error("\nPlease check:");
    console.error(
      "  1. NEXT_PUBLIC_BUCKET_WRITE_KEY environment variable is set",
    );
    console.error("  2. Write key has proper permissions");
    console.error("  3. NEXT_PUBLIC_BUCKET_SLUG is correct in .env");
    console.error(
      "\nYou can also create this manually in the Cosmic dashboard.\n",
    );

    throw error;
  }
}

// Run the setup
setupStudentDiscountsType()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Setup failed:", error);
    process.exit(1);
  });
