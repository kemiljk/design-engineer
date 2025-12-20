import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cosmic } from "@/lib/cosmic";

// Only available in development
const ALLOW_ADMIN = process.env.NODE_ENV === "development";

export async function POST() {
  if (!ALLOW_ADMIN) {
    return NextResponse.json({ error: "Admin not available" }, { status: 403 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    deletedOldStyle: 0,
    deletedDuplicates: 0,
    kept: 0,
    errors: [] as string[],
  };

  try {
    // Get ALL course-progress records
    const { objects } = await cosmic.objects
      .find({ type: "course-progress" })
      .props("id,slug,title,metadata,created_at")
      .limit(100);

    if (!objects || objects.length === 0) {
      return NextResponse.json({
        message: "No records found to clean up.",
        ...results,
      });
    }

    // Separate old-style (lesson_path) from new-style (lessons) records
    const oldStyleRecords: typeof objects = [];
    const newStyleRecords: typeof objects = [];
    
    for (const obj of objects) {
      const metadata = obj.metadata as Record<string, unknown>;
      if (metadata?.lesson_path !== undefined) {
        oldStyleRecords.push(obj);
      } else if (metadata?.lessons !== undefined) {
        newStyleRecords.push(obj);
      } else {
        // Unknown format, treat as old
        oldStyleRecords.push(obj);
      }
    }

    // Delete ALL old-style records
    for (const record of oldStyleRecords) {
      try {
        await cosmic.objects.deleteOne(record.id);
        results.deletedOldStyle++;
      } catch (err) {
        results.errors.push(`Failed to delete old record ${record.id}: ${err}`);
      }
    }

    // For new-style records, keep only ONE per user (the most recent)
    const userRecords = new Map<string, typeof objects>();
    for (const record of newStyleRecords) {
      const userId = (record.metadata as Record<string, unknown>)?.user_id as string;
      if (!userId) continue;
      
      if (!userRecords.has(userId)) {
        userRecords.set(userId, []);
      }
      userRecords.get(userId)!.push(record);
    }

    // Delete duplicates, keep most recent
    for (const [, records] of userRecords) {
      if (records.length > 1) {
        // Sort by created_at descending
        records.sort((a: { created_at: string }, b: { created_at: string }) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        // Keep the first (most recent), delete the rest
        results.kept++;
        for (let i = 1; i < records.length; i++) {
          try {
            await cosmic.objects.deleteOne(records[i].id);
            results.deletedDuplicates++;
          } catch (err) {
            results.errors.push(`Failed to delete duplicate ${records[i].id}: ${err}`);
          }
        }
      } else {
        results.kept++;
      }
    }

    return NextResponse.json({
      message: `Cleanup complete. Deleted ${results.deletedOldStyle} old-style, ${results.deletedDuplicates} duplicates. Kept ${results.kept} records.`,
      ...results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Cleanup failed", details: String(error) },
      { status: 500 }
    );
  }
}
