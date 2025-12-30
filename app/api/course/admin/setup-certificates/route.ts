import { NextResponse } from "next/server";

// Creates the course-certificates object type in Cosmic
// Run once: curl -X POST http://localhost:3000/api/course/admin/setup-certificates
export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  const bucketSlug = process.env.NEXT_PUBLIC_BUCKET_SLUG;
  const writeKey = process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY;

  if (!bucketSlug || !writeKey) {
    return NextResponse.json(
      { error: "Missing Cosmic credentials" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.cosmicjs.com/v3/buckets/${bucketSlug}/object-types`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${writeKey}`,
        },
        body: JSON.stringify({
          title: "Course Certificates",
          slug: "course-certificates",
          emoji: "🏆",
          singleton: false,
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
              required: false,
            },
            {
              title: "Platform",
              key: "platform",
              type: "text",
              required: true,
            },
            {
              title: "Track",
              key: "track",
              type: "text",
              required: false,
            },
            {
              title: "Issued At",
              key: "issued_at",
              type: "text",
              required: true,
            },
            {
              title: "Certificate Number",
              key: "certificate_number",
              type: "text",
              required: true,
            },
            {
              title: "Completed At",
              key: "completed_at",
              type: "text",
              required: false,
            },
            {
              title: "Design Completed At",
              key: "design_completed_at",
              type: "text",
              required: false,
            },
            {
              title: "Engineering Completed At",
              key: "engineering_completed_at",
              type: "text",
              required: false,
            },
            {
              title: "Convergence Completed At",
              key: "convergence_completed_at",
              type: "text",
              required: false,
            },
            {
              title: "Total Time Spent (seconds)",
              key: "total_time_spent_seconds",
              type: "number",
              required: false,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cosmic API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create object type", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "course-certificates object type created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating object type:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

