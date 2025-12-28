import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { 
  checkCertificateEligibility,
  checkTrackCertificateEligibility,
  getUserCertificates,
  getUserTrackCertificates,
  issueCertificate,
  issueTrackCertificate,
} from "@/lib/certificate";
import type { CertificatePlatform, CertificateTrack } from "@/lib/types";
import { requireCourseAvailable } from "@/lib/course-availability";

export async function GET(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform") as CertificatePlatform | null;
  const track = searchParams.get("track") as CertificateTrack | null;
  
  // Check specific track eligibility
  if (platform && track) {
    if (!['web', 'ios', 'android'].includes(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }
    if (!['design', 'engineering', 'convergence'].includes(track)) {
      return NextResponse.json({ error: "Invalid track" }, { status: 400 });
    }
    
    const eligibility = await checkTrackCertificateEligibility(userId, platform, track);
    return NextResponse.json({ eligibility });
  }
  
  // Check platform eligibility (includes track certificates)
  if (platform) {
    if (!['web', 'ios', 'android'].includes(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }
    
    const eligibility = await checkCertificateEligibility(userId, platform);
    return NextResponse.json({ eligibility });
  }
  
  // Get all certificates
  const [certificates, trackCertificates] = await Promise.all([
    getUserCertificates(userId),
    getUserTrackCertificates(userId),
  ]);
  
  const [webEligibility, iosEligibility, androidEligibility] = await Promise.all([
    checkCertificateEligibility(userId, 'web'),
    checkCertificateEligibility(userId, 'ios'),
    checkCertificateEligibility(userId, 'android'),
  ]);
  
  return NextResponse.json({
    certificates,
    trackCertificates,
    eligibility: {
      web: webEligibility,
      ios: iosEligibility,
      android: androidEligibility,
    },
  });
}

export async function POST(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const { platform, track } = body as { platform: CertificatePlatform; track?: CertificateTrack };
  
  if (!platform || !['web', 'ios', 'android'].includes(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }
  
  try {
    const userName = user.fullName || user.firstName || 'Student';
    const userEmail = user.emailAddresses[0]?.emailAddress || '';
    
    // Issue track certificate if track is specified
    if (track) {
      if (!['design', 'engineering', 'convergence'].includes(track)) {
        return NextResponse.json({ error: "Invalid track" }, { status: 400 });
      }
      
      const certificate = await issueTrackCertificate(userId, userName, userEmail, platform, track);
      return NextResponse.json({ certificate }, { status: 201 });
    }
    
    // Issue master certificate (requires all tracks)
    const certificate = await issueCertificate(userId, userName, userEmail, platform);
    
    return NextResponse.json({ certificate }, { status: 201 });
  } catch (error) {
    console.error("Error issuing certificate:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to issue certificate" },
      { status: 400 }
    );
  }
}
