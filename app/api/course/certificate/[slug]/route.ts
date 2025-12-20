import { NextRequest, NextResponse } from "next/server";
import { getCertificateBySlug } from "@/lib/certificate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const certificate = await getCertificateBySlug(slug);
  
  if (!certificate) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }
  
  return NextResponse.json({ certificate });
}
