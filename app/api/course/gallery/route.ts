import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserGalleryProjects } from "@/lib/cosmic";
import { submitGalleryProject, updateGalleryProject, deleteGalleryProject } from "@/lib/gallery";
import { requireCourseAvailable } from "@/lib/course-availability";
import { getUserEnrollment } from "@/lib/course";
import type { GalleryProjectPlatform, GalleryProjectTrack } from "@/lib/types";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function GET(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userOnly = searchParams.get("userOnly") === "true";

  if (userOnly) {
    const projects = await getUserGalleryProjects(userId);
    return NextResponse.json({ projects });
  }

  const projects = await getUserGalleryProjects(userId);
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has an enrollment (must be a course student)
  const enrollment = await getUserEnrollment(userId);
  if (!enrollment) {
    return NextResponse.json(
      { error: "You must be enrolled in the course to submit projects" },
      { status: 403 }
    );
  }

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const body = await request.json();
  const { 
    platform, 
    track, 
    description, 
    thumbnailUrl, 
    projectUrl, 
    githubUrl, 
    videoUrl, 
    technologies 
  } = body;

  // Validation
  if (!platform || !["web", "ios", "android"].includes(platform)) {
    return NextResponse.json(
      { error: "Invalid platform. Must be web, ios, or android" },
      { status: 400 }
    );
  }

  if (!track || !["design", "engineering", "convergence"].includes(track)) {
    return NextResponse.json(
      { error: "Invalid track. Must be design, engineering, or convergence" },
      { status: 400 }
    );
  }

  if (!description || description.length < 50) {
    return NextResponse.json(
      { error: "Description must be at least 50 characters" },
      { status: 400 }
    );
  }

  if (!thumbnailUrl) {
    return NextResponse.json(
      { error: "Thumbnail URL is required" },
      { status: 400 }
    );
  }

  const userName = user.fullName || user.firstName || "Anonymous";
  const userEmail = user.emailAddresses[0]?.emailAddress || "";

  const project = await submitGalleryProject({
    user_id: userId,
    user_name: userName,
    user_email: userEmail,
    platform: platform as GalleryProjectPlatform,
    track: track as GalleryProjectTrack,
    description,
    thumbnail_url: thumbnailUrl,
    project_url: projectUrl || undefined,
    github_url: githubUrl || undefined,
    video_url: videoUrl || undefined,
    technologies: technologies || [],
  });

  // Send email notification to admin
  try {
    const platformLabel = { web: "Web", ios: "iOS", android: "Android" }[platform];
    const trackLabel = { design: "Design", engineering: "Engineering", convergence: "Convergence" }[track];

    await resend.emails.send({
      from: "d×e Course <hello@designengineer.xyz>",
      to: ["hello@designengineer.xyz"],
      subject: `🎨 New Gallery Submission: ${platformLabel} ${trackLabel}`,
      text: `
New Capstone Project Submitted

Student: ${userName}
Email: ${userEmail}
Platform: ${platformLabel}
Track: ${trackLabel}

Description:
${description}

Links:
${thumbnailUrl ? `• Thumbnail: ${thumbnailUrl}` : ""}
${projectUrl ? `• Project: ${projectUrl}` : ""}
${githubUrl ? `• GitHub: ${githubUrl}` : ""}
${videoUrl ? `• Video: ${videoUrl}` : ""}

Technologies: ${technologies?.length ? technologies.join(", ") : "None specified"}

---
To approve this project:
1. Go to Cosmic Dashboard → Gallery Projects
2. Find this submission (slug: ${project.slug})
3. Change status from "Pending Review" to "Approved" or "Featured"
4. Save/Publish the changes
      `.trim(),
    });
  } catch (emailError) {
    // Log but don't fail the submission if email fails
    console.error("Failed to send gallery submission notification:", emailError);
  }

  return NextResponse.json({ project }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { projectId, description, thumbnailUrl, projectUrl, githubUrl, videoUrl, technologies } = body;

  if (!projectId) {
    return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
  }

  // Verify ownership
  const userProjects = await getUserGalleryProjects(userId);
  const project = userProjects.find((p) => p.id === projectId);
  
  if (!project) {
    return NextResponse.json(
      { error: "Project not found or you don't have permission to edit it" },
      { status: 404 }
    );
  }

  const updateData: Record<string, unknown> = {};
  if (description !== undefined) updateData.description = description;
  if (thumbnailUrl !== undefined) updateData.thumbnail_url = thumbnailUrl;
  if (projectUrl !== undefined) updateData.project_url = projectUrl;
  if (githubUrl !== undefined) updateData.github_url = githubUrl;
  if (videoUrl !== undefined) updateData.video_url = videoUrl;
  if (technologies !== undefined) updateData.technologies = technologies;

  const updatedProject = await updateGalleryProject(projectId, updateData);

  return NextResponse.json({ project: updatedProject });
}

export async function DELETE(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
  }

  // Verify ownership
  const userProjects = await getUserGalleryProjects(userId);
  const project = userProjects.find((p) => p.id === projectId);
  
  if (!project) {
    return NextResponse.json(
      { error: "Project not found or you don't have permission to delete it" },
      { status: 404 }
    );
  }

  await deleteGalleryProject(projectId);

  return NextResponse.json({ success: true });
}
