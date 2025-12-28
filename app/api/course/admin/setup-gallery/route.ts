import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cosmic } from "@/lib/cosmic";

// Only available in development mode
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const ADMIN_USER_ID = "user_2YUTxqEjj0tI9pYSqmlE1fweQ4J";

export async function POST() {
  const { userId } = await auth();
  
  // In development, allow unauthenticated access for setup scripts
  // In production, require admin user
  if (!IS_DEVELOPMENT) {
    if (userId !== ADMIN_USER_ID) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
  }

  const results: { steps: string[]; errors: string[] } = {
    steps: [],
    errors: [],
  };

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
      type: "repeater",
      required: false,
      repeater_fields: [
        {
          title: "Technology",
          key: "technology",
          type: "text",
        },
      ],
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

  try {
    // Check if the object type exists
    let objectTypeExists = false;
    try {
      await cosmic.objectTypes.findOne("gallery-projects");
      objectTypeExists = true;
      results.steps.push("Found existing gallery-projects object type");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        objectTypeExists = false;
        results.steps.push("gallery-projects object type does not exist");
      } else {
        throw error;
      }
    }

    if (objectTypeExists) {
      // Update existing object type
      const updateResult = await cosmic.objectTypes.updateOne("gallery-projects", {
        title: "Gallery Projects",
        singular: "Gallery Project",
        emoji: "🎨",
        metafields: galleryMetafields,
      });
      
      results.steps.push("Updated gallery-projects object type with new metafields");
      results.steps.push(`Update result: ${JSON.stringify(updateResult).slice(0, 100)}...`);
    } else {
      // Create new object type
      const createResult = await cosmic.objectTypes.insertOne({
        title: "Gallery Projects",
        slug: "gallery-projects",
        singular: "Gallery Project",
        emoji: "🎨",
        metafields: galleryMetafields,
      });
      
      results.steps.push("Created gallery-projects object type");
      results.steps.push(`Create result: ${JSON.stringify(createResult).slice(0, 100)}...`);
    }

    return NextResponse.json({
      message: results.errors.length === 0 ? "Gallery setup complete!" : "Setup completed with errors",
      ...results,
    });
  } catch (error) {
    console.error("Gallery setup error:", error);
    return NextResponse.json(
      { error: "Setup failed", details: String(error), steps: results.steps },
      { status: 500 }
    );
  }
}
