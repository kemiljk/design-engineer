import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createCheckout, PRODUCT_CONFIG } from "@/lib/lemonsqueezy";
import type { ProductKey } from "@/lib/types";
import { requireCourseAvailable } from "@/lib/course-availability";

export async function POST(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { productKey } = body as { productKey: ProductKey };

  if (!productKey || !PRODUCT_CONFIG[productKey]) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const product = PRODUCT_CONFIG[productKey];

  if (!product.variantId) {
    return NextResponse.json(
      { error: "Product not configured" },
      { status: 500 }
    );
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return NextResponse.json({ error: "No email found" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectUrl = `${baseUrl}/course?purchase=success`;

  const { checkoutUrl } = await createCheckout(
    product.variantId,
    userId,
    email,
    redirectUrl
  );

  return NextResponse.json({ checkoutUrl });
}
