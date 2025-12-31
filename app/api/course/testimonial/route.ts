import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { submitTestimonial, getUserTestimonial, updateTestimonial } from "@/lib/cosmic";
import type { CertificateTrack, CertificatePlatform } from "@/lib/types";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const testimonial = await getUserTestimonial(userId);
    
    return NextResponse.json({ testimonial });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content, trackCompleted, platformCompleted, role, company } = body;

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { error: "Testimonial must be at least 10 characters" },
        { status: 400 }
      );
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: "Testimonial must be less than 500 characters" },
        { status: 400 }
      );
    }

    // Check if user already has a testimonial
    const existingTestimonial = await getUserTestimonial(userId);
    if (existingTestimonial) {
      // Update existing testimonial
      const updated = await updateTestimonial(existingTestimonial.id, {
        content: content.trim(),
        user_role: role?.trim() || undefined,
        user_company: company?.trim() || undefined,
        status: "pending", // Reset to pending for re-review
      });
      
      return NextResponse.json({ testimonial: updated, updated: true });
    }

    // Get user details from Clerk
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    
    const userName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}`.trim()
      : user.firstName || "Anonymous";
    
    const userEmail = user.emailAddresses[0]?.emailAddress || "";
    const userPhotoUrl = user.imageUrl;

    const testimonial = await submitTestimonial({
      user_id: userId,
      user_name: userName,
      user_email: userEmail,
      user_photo_url: userPhotoUrl,
      user_role: role?.trim() || undefined,
      user_company: company?.trim() || undefined,
      content: content.trim(),
      track_completed: trackCompleted as CertificateTrack,
      platform_completed: platformCompleted as CertificatePlatform,
    });

    return NextResponse.json({ testimonial, created: true });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}

