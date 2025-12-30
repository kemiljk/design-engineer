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
  
  const [
    designStatus, 
    engineeringStatus, 
    convergenceStatus, 
    existingCert,
    designTrackCert,
    engineeringTrackCert,
    convergenceTrackCert,
  ] = await Promise.all([
    getTrackCompletionStatus(userId, requirements.design.track, requirements.design.platform),
    getTrackCompletionStatus(userId, requirements.engineering.track, requirements.engineering.platform),
    getTrackCompletionStatus(userId, requirements.convergence.track, requirements.convergence.platform),
    getUserCertificate(userId, platform),
    getUserTrackCertificate(userId, platform, 'design'),
    getUserTrackCertificate(userId, platform, 'engineering'),
    getUserTrackCertificate(userId, platform, 'convergence'),
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
    designCertificate: designTrackCert || undefined,
    engineeringCertificate: engineeringTrackCert || undefined,
    convergenceCertificate: convergenceTrackCert || undefined,
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
    
    // Filter out track certificates (which have a track field)
    const masterCerts = objects?.filter((obj: { metadata: { track?: Type.CertificateTrack } }) => !obj.metadata.track) || [];
    return masterCerts[0] || null;
  } catch {
    // No certificates is an expected state - return null silently
    return null;
  }
}

export async function getUserTrackCertificate(
  userId: string,
  platform: Type.CertificatePlatform,
  track: Type.CertificateTrack
): Promise<Type.TrackCertificate | null> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "course-certificates",
        "metadata.user_id": userId,
        "metadata.platform": platform,
        "metadata.track": track,
      })
      .props("id,slug,title,created_at,metadata")
      .depth(1)
      .limit(1);
    
    return objects?.[0] || null;
  } catch {
    // No certificates is an expected state - return null silently
    return null;
  }
}

export async function getUserTrackCertificates(userId: string): Promise<Type.TrackCertificate[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "course-certificates",
        "metadata.user_id": userId,
      })
      .props("id,slug,title,created_at,metadata")
      .depth(1);
    
    // Filter to only track certificates (which have a track field)
    return objects?.filter((obj: { metadata: { track?: Type.CertificateTrack } }) => obj.metadata.track) || [];
  } catch {
    // No certificates is an expected state - return empty array silently
    return [];
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
    
    // Filter to only master certificates (which don't have a track field)
    return objects?.filter((obj: { metadata: { track?: Type.CertificateTrack } }) => !obj.metadata.track) || [];
  } catch {
    // No certificates is an expected state - return empty array silently
    return [];
  }
}

export async function getCertificateBySlug(slug: string): Promise<Type.Certificate | Type.TrackCertificate | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: "course-certificates",
        slug,
      })
      .props("id,slug,title,created_at,metadata")
      .depth(1);
    
    return object || null;
  } catch {
    // Certificate not found - return null (could be invalid/broken link)
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
    throw new Error(`Complete all three tracks (Design, Engineering, and Convergence) to earn your ${platform} Design Engineer certificate.`);
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

export function formatTrackName(track: Type.CertificateTrack): string {
  const names = { design: 'Design', engineering: 'Engineering', convergence: 'Convergence' };
  return names[track];
}

export function getTotalLessonsForPlatform(platform: Type.CertificatePlatform): number {
  const req = PLATFORM_REQUIREMENTS[platform];
  return req.design.total + req.engineering.total + req.convergence.total;
}

// Check eligibility for a specific track certificate
export async function checkTrackCertificateEligibility(
  userId: string,
  platform: Type.CertificatePlatform,
  track: Type.CertificateTrack
): Promise<Type.TrackCertificateEligibility> {
  const trackMap = {
    design: 'design-track',
    engineering: 'engineering-track',
    convergence: 'convergence',
  } as const;
  
  const [status, existingCert] = await Promise.all([
    getTrackCompletionStatus(userId, trackMap[track], platform),
    getUserTrackCertificate(userId, platform, track),
  ]);
  
  const requirements = PLATFORM_REQUIREMENTS[platform];
  const trackReq = requirements[track];
  
  return {
    platform,
    track,
    eligible: status.completed >= trackReq.total,
    progress: { completed: status.completed, total: trackReq.total },
    certificate: existingCert || undefined,
  };
}

// Issue a track-specific certificate
export async function issueTrackCertificate(
  userId: string,
  userName: string,
  userEmail: string,
  platform: Type.CertificatePlatform,
  track: Type.CertificateTrack
): Promise<Type.TrackCertificate> {
  const eligibility = await checkTrackCertificateEligibility(userId, platform, track);
  
  if (!eligibility.eligible) {
    const trackNames = { design: 'Design Track', engineering: 'Engineering Track', convergence: 'Convergence' };
    throw new Error(`Complete all lessons in the ${trackNames[track]} to earn your certificate. Progress: ${eligibility.progress.completed}/${eligibility.progress.total} lessons.`);
  }
  
  if (eligibility.certificate) {
    return eligibility.certificate;
  }
  
  const trackMap = {
    design: 'design-track',
    engineering: 'engineering-track',
    convergence: 'convergence',
  } as const;
  
  const status = await getTrackCompletionStatus(userId, trackMap[track], platform);
  const progress = await getUserProgress(userId);
  const totalTimeSpent = progress?.metadata.total_time_spent_seconds || 0;
  
  const certificateNumber = generateCertificateNumber();
  const slug = `cert-${platform}-${track}-${userId}-${nanoid(8)}`.toLowerCase();
  const today = new Date().toISOString().split('T')[0];
  
  const platformTitles = { web: 'Web', ios: 'iOS', android: 'Android' };
  const trackTitles = { design: 'Design', engineering: 'Engineering', convergence: 'Convergence' };
  
  const result = await cosmic.objects.insertOne({
    type: "course-certificates",
    title: `${platformTitles[platform]} ${trackTitles[track]} Track Certificate - ${userName}`,
    slug,
    metadata: {
      user_id: userId,
      user_name: userName,
      user_email: userEmail,
      platform,
      track,
      issued_at: today,
      certificate_number: certificateNumber,
      completed_at: status.completedAt || today,
      total_time_spent_seconds: totalTimeSpent,
    },
  });
  
  return result.object;
}
