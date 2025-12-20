import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { 
  checkCertificateEligibility, 
  getUserCertificates, 
  issueCertificate 
} from "@/lib/certificate";
import type { CertificatePlatform } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform") as CertificatePlatform | null;
  
  if (platform) {
    if (!['web', 'ios', 'android'].includes(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }
    
    const eligibility = await checkCertificateEligibility(userId, platform);
    return NextResponse.json({ eligibility });
  }
  
  const certificates = await getUserCertificates(userId);
  
  const [webEligibility, iosEligibility, androidEligibility] = await Promise.all([
    checkCertificateEligibility(userId, 'web'),
    checkCertificateEligibility(userId, 'ios'),
    checkCertificateEligibility(userId, 'android'),
  ]);
  
  return NextResponse.json({
    certificates,
    eligibility: {
      web: webEligibility,
      ios: iosEligibility,
      android: androidEligibility,
    },
  });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const { platform } = body as { platform: CertificatePlatform };
  
  if (!platform || !['web', 'ios', 'android'].includes(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }
  
  try {
    const userName = user.fullName || user.firstName || 'Student';
    const userEmail = user.emailAddresses[0]?.emailAddress || '';
    
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
