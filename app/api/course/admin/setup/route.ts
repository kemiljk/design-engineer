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

  const results: { steps: string[]; errors: string[] } = {
    steps: [],
    errors: [],
  };

  const newMetafields = [
    {
      key: "user_id",
      title: "User ID",
      type: "text",
      required: true,
    },
    {
      key: "lessons",
      title: "Lessons Progress",
      type: "json",
      required: false,
    },
    {
      key: "total_time_spent_seconds",
      title: "Total Time Spent (seconds)",
      type: "number",
      required: false,
    },
    {
      key: "last_lesson_path",
      title: "Last Lesson Path",
      type: "text",
      required: false,
    },
    {
      key: "last_activity_at",
      title: "Last Activity At",
      type: "date",
      required: false,
    },
  ];

  try {
    // First, check if the object type exists
    let objectTypeExists = false;
    try {
      await cosmic.objectTypes.findOne("course-progress");
      objectTypeExists = true;
      results.steps.push("Found existing course-progress object type");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        objectTypeExists = false;
        results.steps.push("course-progress object type does not exist");
      } else {
        throw error;
      }
    }

    if (objectTypeExists) {
      // Update existing object type using SDK
      const updateResult = await cosmic.objectTypes.updateOne("course-progress", {
        title: "Course Progress",
        singular: "Course Progress",
        emoji: "📊",
        metafields: newMetafields,
      });
      
      results.steps.push("Updated course-progress object type with new metafields");
      results.steps.push(`Update result: ${JSON.stringify(updateResult).slice(0, 100)}...`);
    } else {
      // Create new object type using SDK
      const createResult = await cosmic.objectTypes.insertOne({
        title: "Course Progress",
        slug: "course-progress",
        singular: "Course Progress",
        emoji: "📊",
        metafields: newMetafields,
      });
      
      results.steps.push("Created course-progress object type");
      results.steps.push(`Create result: ${JSON.stringify(createResult).slice(0, 100)}...`);
    }

    return NextResponse.json({
      message: results.errors.length === 0 ? "Setup complete!" : "Setup completed with errors",
      ...results,
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Setup failed", details: String(error), steps: results.steps },
      { status: 500 }
    );
  }
}
