/**
 * Setup script for course progress
 * 
 * This script:
 * 1. Deletes all old individual lesson progress records
 * 2. Outputs instructions for updating the object type in Cosmic
 * 
 * Run with: npx tsx scripts/setup-course-progress.ts
 */

import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG!,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY!,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY!,
});

async function deleteOldProgressRecords() {
  console.log("🔍 Finding old course-progress records...\n");
  
  let deleted = 0;
  let hasMore = true;
  
  while (hasMore) {
    try {
      const { objects } = await cosmic.objects
        .find({ type: "course-progress" })
        .props("id,slug,title,metadata")
        .limit(100);
      
      if (!objects || objects.length === 0) {
        hasMore = false;
        break;
      }
      
      // Check if these are old-style records (have lesson_path field)
      const oldRecords = objects.filter((obj: any) => 
        obj.metadata?.lesson_path !== undefined
      );
      
      if (oldRecords.length === 0) {
        hasMore = false;
        break;
      }
      
      console.log(`Found ${oldRecords.length} old-style records to delete...`);
      
      for (const record of oldRecords) {
        try {
          await cosmic.objects.deleteOne(record.id);
          deleted++;
          console.log(`  ✓ Deleted: ${record.title}`);
        } catch (err) {
          console.error(`  ✗ Failed to delete ${record.id}:`, err);
        }
      }
      
      // If we deleted all records in this batch, check for more
      if (oldRecords.length < objects.length) {
        hasMore = false;
      }
      
    } catch (error: any) {
      if (error.status === 404) {
        console.log("No course-progress objects found.");
        hasMore = false;
      } else {
        console.error("Error fetching records:", error);
        hasMore = false;
      }
    }
  }
  
  console.log(`\n✅ Deleted ${deleted} old progress records.\n`);
}

function printSetupInstructions() {
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("  COSMIC OBJECT TYPE SETUP INSTRUCTIONS");
  console.log("═══════════════════════════════════════════════════════════════\n");
  
  console.log("Go to your Cosmic dashboard and update the 'course-progress' object type.\n");
  console.log("1. Navigate to: https://app.cosmicjs.com/designengineerxyz-production/object-types");
  console.log("2. Click on 'course-progress' (or create it if it doesn't exist)");
  console.log("3. Remove any old metafields (lesson_path, status, completed_at, time_spent_seconds)");
  console.log("4. Add these new metafields:\n");
  
  console.log("┌─────────────────────────────┬──────────────┬─────────────────────────────────┐");
  console.log("│ Field                       │ Type         │ Description                     │");
  console.log("├─────────────────────────────┼──────────────┼─────────────────────────────────┤");
  console.log("│ user_id                     │ Plain Text   │ Clerk user ID (required)        │");
  console.log("│ lessons                     │ JSON         │ All lesson progress data        │");
  console.log("│ total_time_spent_seconds    │ Number       │ Total time across all lessons   │");
  console.log("│ last_lesson_path            │ Plain Text   │ Last visited lesson             │");
  console.log("│ last_activity_at            │ Date         │ Last activity timestamp         │");
  console.log("└─────────────────────────────┴──────────────┴─────────────────────────────────┘\n");
  
  console.log("The 'lessons' JSON field will store data like:");
  console.log("─────────────────────────────────────────────");
  console.log(`{
  "engineering-track/web/01-html-fundamentals/01-what-is-html": {
    "status": "completed",
    "time_spent_seconds": 120,
    "started_at": "2024-12-20",
    "completed_at": "2024-12-20"
  },
  "design-track/web/01-foundations/01-what-is-visual-design": {
    "status": "in_progress", 
    "time_spent_seconds": 45,
    "started_at": "2024-12-20"
  }
}\n`);
  
  console.log("═══════════════════════════════════════════════════════════════\n");
}

async function main() {
  console.log("\n🚀 Course Progress Setup Script\n");
  console.log("This will clean up old progress records and provide setup instructions.\n");
  
  // Delete old records
  await deleteOldProgressRecords();
  
  // Print setup instructions
  printSetupInstructions();
  
  console.log("✅ Setup script complete!\n");
}

main().catch(console.error);
