import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cosmic } from "@/lib/cosmic";

// Only available in development or with admin token
const ALLOW_ADMIN = process.env.NODE_ENV === "development" || process.env.ADMIN_API_KEY;

export async function POST(request: Request) {
  // Check for admin API key header (for production use)
  const adminKey = request.headers.get("x-admin-api-key");
  const isAdminKeyValid = adminKey && adminKey === process.env.ADMIN_API_KEY;
  
  if (!ALLOW_ADMIN && !isAdminKeyValid) {
    return NextResponse.json({ error: "Admin not available" }, { status: 403 });
  }

  // In development, also check for authenticated user
  if (process.env.NODE_ENV === "development") {
    const { userId } = await auth();
    if (!userId && !isAdminKeyValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const results: { steps: string[]; errors: string[] } = {
    steps: [],
    errors: [],
  };

  // Updated metafields with new access levels (design_full, engineering_full)
  const enrollmentMetafields = [
    {
      key: "user_id",
      title: "User ID",
      type: "text",
      required: true,
    },
    {
      key: "lemon_squeezy_customer_id",
      title: "LemonSqueezy Customer ID",
      type: "text",
      required: false,
    },
    {
      key: "lemon_squeezy_order_id",
      title: "LemonSqueezy Order ID",
      type: "text",
      required: false,
    },
    {
      key: "product_id",
      title: "Product ID",
      type: "text",
      required: true,
    },
    {
      key: "access_level",
      title: "Access Level",
      type: "select",
      required: true,
      options: [
        { value: "free", title: "Free" },
        { value: "design_web", title: "Design (Web)" },
        { value: "design_ios", title: "Design (iOS)" },
        { value: "design_android", title: "Design (Android)" },
        { value: "design_full", title: "Design (Full Access)" },
        { value: "engineering_web", title: "Engineering (Web)" },
        { value: "engineering_ios", title: "Engineering (iOS)" },
        { value: "engineering_android", title: "Engineering (Android)" },
        { value: "engineering_full", title: "Engineering (Full Access)" },
        { value: "full", title: "Convergence (All Access)" },
      ],
    },
    {
      key: "purchased_at",
      title: "Purchased At",
      type: "date",
      required: false,
    },
    {
      key: "expires_at",
      title: "Expires At",
      type: "date",
      required: false,
    },
    {
      key: "email_domain",
      title: "Email Domain",
      type: "text",
      required: false,
    },
    {
      key: "status",
      title: "Status",
      type: "select",
      required: true,
      options: [
        { value: "active", title: "Active" },
        { value: "expired", title: "Expired" },
        { value: "refunded", title: "Refunded" },
      ],
    },
  ];

  try {
    // Check if the object type exists
    let objectTypeExists = false;
    try {
      await cosmic.objectTypes.findOne("course-enrollments");
      objectTypeExists = true;
      results.steps.push("Found existing course-enrollments object type");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        objectTypeExists = false;
        results.steps.push("course-enrollments object type does not exist");
      } else {
        throw error;
      }
    }

    if (objectTypeExists) {
      // Update existing object type
      const updateResult = await cosmic.objectTypes.updateOne("course-enrollments", {
        title: "Course Enrollments",
        singular: "Course Enrollment",
        emoji: "🎓",
        metafields: enrollmentMetafields,
      });
      
      results.steps.push("Updated course-enrollments object type with new access levels");
      results.steps.push(`Added: design_full, engineering_full access levels`);
      results.steps.push(`Update result: ${JSON.stringify(updateResult).slice(0, 200)}...`);
    } else {
      // Create new object type
      const createResult = await cosmic.objectTypes.insertOne({
        title: "Course Enrollments",
        slug: "course-enrollments",
        singular: "Course Enrollment",
        emoji: "🎓",
        metafields: enrollmentMetafields,
      });
      
      results.steps.push("Created course-enrollments object type");
      results.steps.push(`Create result: ${JSON.stringify(createResult).slice(0, 200)}...`);
    }

    return NextResponse.json({
      message: results.errors.length === 0 ? "Schema update complete!" : "Update completed with errors",
      accessLevels: [
        "free",
        "design_web", "design_ios", "design_android", "design_full",
        "engineering_web", "engineering_ios", "engineering_android", "engineering_full",
        "full",
      ],
      ...results,
    });
  } catch (error) {
    console.error("Schema update error:", error);
    return NextResponse.json(
      { error: "Schema update failed", details: String(error), steps: results.steps },
      { status: 500 }
    );
  }
}

// GET endpoint to check current schema
export async function GET() {
  try {
    const objectType = await cosmic.objectTypes.findOne("course-enrollments");
    
    return NextResponse.json({
      exists: true,
      objectType: {
        title: objectType.title,
        slug: objectType.slug,
        metafields: objectType.metafields,
      },
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      return NextResponse.json({ exists: false });
    }
    return NextResponse.json(
      { error: "Failed to check schema", details: String(error) },
      { status: 500 }
    );
  }
}
