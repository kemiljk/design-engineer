import "server-only";

import { cosmic } from "./cosmic";
import { nanoid } from "nanoid";
import * as Type from "./types";

export async function submitGalleryProject(
  data: Omit<Type.GalleryProject["metadata"], "status" | "featured_at" | "admin_notes">
): Promise<Type.GalleryProject> {
  const slug = `project-${data.user_id}-${nanoid(8)}`.toLowerCase();
  
  const result = await cosmic.objects.insertOne({
    type: "gallery-projects",
    title: data.description.slice(0, 100),
    slug,
    metadata: {
      ...data,
      status: "pending" as Type.GalleryProjectStatus,
    },
  });

  return result.object;
}

export async function updateGalleryProject(
  projectId: string,
  data: Partial<Type.GalleryProject["metadata"]>
): Promise<Type.GalleryProject> {
  const result = await cosmic.objects.updateOne(projectId, {
    metadata: data,
  });

  return result.object;
}

export async function deleteGalleryProject(projectId: string): Promise<void> {
  await cosmic.objects.deleteOne(projectId);
}

export async function approveGalleryProject(
  projectId: string,
  adminNotes?: string
): Promise<Type.GalleryProject> {
  const result = await cosmic.objects.updateOne(projectId, {
    metadata: {
      status: "approved" as Type.GalleryProjectStatus,
      admin_notes: adminNotes,
    },
  });

  return result.object;
}

export async function featureGalleryProject(
  projectId: string,
  adminNotes?: string
): Promise<Type.GalleryProject> {
  const result = await cosmic.objects.updateOne(projectId, {
    metadata: {
      status: "featured" as Type.GalleryProjectStatus,
      featured_at: new Date().toISOString(),
      admin_notes: adminNotes,
    },
  });

  return result.object;
}

export async function rejectGalleryProject(
  projectId: string,
  adminNotes?: string
): Promise<Type.GalleryProject> {
  const result = await cosmic.objects.updateOne(projectId, {
    metadata: {
      status: "rejected" as Type.GalleryProjectStatus,
      admin_notes: adminNotes,
    },
  });

  return result.object;
}

export function formatProjectPlatform(platform: Type.GalleryProjectPlatform): string {
  const names = { web: "Web", ios: "iOS", android: "Android" };
  return names[platform];
}

export function formatProjectTrack(track: Type.GalleryProjectTrack): string {
  const names = { design: "Design", engineering: "Engineering", convergence: "Convergence" };
  return names[track];
}
