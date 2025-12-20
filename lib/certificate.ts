import "server-only";

import { cosmic } from "./cosmic";
import { nanoid } from "nanoid";
import * as Type from "./types";
import { getUserProgress, getOrderedLessons, COURSE_STRUCTURE } from "./course";

// Platform lesson requirements
const PLATFORM_REQUIREMENTS = {
  web: {
    design: { track: 'design-track', platform: 'web', total: COURSE_STRUCTURE.design.web.lessons },
    engineering: { track: 'engineering-track', platform: 'web', total: COURSE_STRUCTURE.engineering.web.lessons },
    convergence: { track: 'convergence', platform: 'web', total: COURSE_STRUCTURE.convergence.web.lessons },
  },
  ios: {
    design: { track: 'design-track', platform: 'ios', total: COURSE_STRUCTURE.design.ios.lessons },
    engineering: { track: 'engineering-track', platform: 'ios', total: COURSE_STRUCTURE.engineering.ios.lessons },
    convergence: { track: 'convergence', platform: 'ios', total: COURSE_STRUCTURE.convergence.ios.lessons },
  },
  android: {
    design: { track: 'design-track', platform: 'android', total: COURSE_STRUCTURE.design.android.lessons },
    engineering: { track: 'engineering-track', platform: 'android', total: COURSE_STRUCTURE.engineering.android.lessons },
    convergence: { track: 'convergence', platform: 'android', total: COURSE_STRUCTURE.convergence.android.lessons },
  },
} as const;

export async function getTrackCompletionStatus(
  userId: string,
  track: string,
  platform: string
): Promise<{ completed: number; total: number; completedAt?: string }> {
  const progress = await getUserProgress(userId);
  const lessons = await getOrderedLessons(track, platform);
  const total = lessons.length;
  
  if (!progress) {
    return { completed: 0, total };
  }
  
  const lessonProgress = progress.metadata.lessons || {};
  
  let completed = 0;
  let latestCompletedAt: string | undefined;
  
  for (const lesson of lessons) {
    const lessonData = lessonProgress[lesson.path];
    if (lessonData?.status === 'completed') {
      completed++;
      if (lessonData.completed_at && (!latestCompletedAt || lessonData.completed_at > latestCompletedAt)) {
        latestCompletedAt = lessonData.completed_at;
      }
    }
  }
  
  return { completed, total, completedAt: latestCompletedAt };
}

export async function checkCertificateEligibility(
  userId: string,
  platform: Type.CertificatePlatform
): Promise<Type.CertificateEligibility> {
  const requirements = PLATFORM_REQUIREMENTS[platform];
  
  const [designStatus, engineeringStatus, convergenceStatus, existingCert] = await Promise.all([
    getTrackCompletionStatus(userId, requirements.design.track, requirements.design.platform),
    getTrackCompletionStatus(userId, requirements.engineering.track, requirements.engineering.platform),
    getTrackCompletionStatus(userId, requirements.convergence.track, requirements.convergence.platform),
    getUserCertificate(userId, platform),
  ]);
  
  const designComplete = designStatus.completed >= requirements.design.total;
  const engineeringComplete = engineeringStatus.completed >= requirements.engineering.total;
  const convergenceComplete = convergenceStatus.completed >= requirements.convergence.total;
  
  return {
    platform,
    eligible: designComplete && engineeringComplete && convergenceComplete,
    designComplete,
    engineeringComplete,
    convergenceComplete,
    designProgress: { completed: designStatus.completed, total: requirements.design.total },
    engineeringProgress: { completed: engineeringStatus.completed, total: requirements.engineering.total },
    convergenceProgress: { completed: convergenceStatus.completed, total: requirements.convergence.total },
    certificate: existingCert || undefined,
  };
}

export async function getUserCertificate(
  userId: string,
  platform: Type.CertificatePlatform
): Promise<Type.Certificate | null> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "course-certificates",
        "metadata.user_id": userId,
        "metadata.platform": platform,
      })
      .props("id,slug,title,created_at,metadata")
      .depth(1)
      .limit(1);
    
    return objects?.[0] || null;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      return null;
    }
    console.error("Error fetching certificate:", error);
    return null;
  }
}

export async function getUserCertificates(userId: string): Promise<Type.Certificate[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "course-certificates",
        "metadata.user_id": userId,
      })
      .props("id,slug,title,created_at,metadata")
      .depth(1);
    
    return objects || [];
  } catch (error: unknown) {
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      return [];
    }
    console.error("Error fetching certificates:", error);
    return [];
  }
}

export async function getCertificateBySlug(slug: string): Promise<Type.Certificate | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: "course-certificates",
        slug,
      })
      .props("id,slug,title,created_at,metadata")
      .depth(1);
    
    return object || null;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      return null;
    }
    console.error("Error fetching certificate:", error);
    return null;
  }
}

function generateCertificateNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = nanoid(6).toUpperCase();
  return `DE-${timestamp}-${random}`;
}

export async function issueCertificate(
  userId: string,
  userName: string,
  userEmail: string,
  platform: Type.CertificatePlatform
): Promise<Type.Certificate> {
  const eligibility = await checkCertificateEligibility(userId, platform);
  
  if (!eligibility.eligible) {
    throw new Error(`User is not eligible for ${platform} certificate`);
  }
  
  if (eligibility.certificate) {
    return eligibility.certificate;
  }
  
  const requirements = PLATFORM_REQUIREMENTS[platform];
  const [designStatus, engineeringStatus, convergenceStatus] = await Promise.all([
    getTrackCompletionStatus(userId, requirements.design.track, requirements.design.platform),
    getTrackCompletionStatus(userId, requirements.engineering.track, requirements.engineering.platform),
    getTrackCompletionStatus(userId, requirements.convergence.track, requirements.convergence.platform),
  ]);
  
  const progress = await getUserProgress(userId);
  const totalTimeSpent = progress?.metadata.total_time_spent_seconds || 0;
  
  const certificateNumber = generateCertificateNumber();
  const slug = `cert-${platform}-${userId}-${nanoid(8)}`.toLowerCase();
  const today = new Date().toISOString().split('T')[0];
  
  const platformTitles = {
    web: 'Web',
    ios: 'iOS',
    android: 'Android',
  };
  
  const result = await cosmic.objects.insertOne({
    type: "course-certificates",
    title: `${platformTitles[platform]} Design Engineer Certificate - ${userName}`,
    slug,
    metadata: {
      user_id: userId,
      user_name: userName,
      user_email: userEmail,
      platform,
      issued_at: today,
      certificate_number: certificateNumber,
      design_completed_at: designStatus.completedAt || today,
      engineering_completed_at: engineeringStatus.completedAt || today,
      convergence_completed_at: convergenceStatus.completedAt || today,
      total_time_spent_seconds: totalTimeSpent,
    },
  });
  
  return result.object;
}

export function formatPlatformName(platform: Type.CertificatePlatform): string {
  const names = { web: 'Web', ios: 'iOS', android: 'Android' };
  return names[platform];
}

export function getTotalLessonsForPlatform(platform: Type.CertificatePlatform): number {
  const req = PLATFORM_REQUIREMENTS[platform];
  return req.design.total + req.engineering.total + req.convergence.total;
}
