import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createCheckout, PRODUCT_CONFIG } from "@/lib/lemonsqueezy";
import type { ProductKey } from "@/lib/types";
import { requireCourseAvailable } from "@/lib/course-availability";
import { cosmic } from "@/lib/cosmic";

/**
 * Verify that a DDG discount code is being used by the rightful owner.
 * Returns null if valid, or an error message if invalid.
 */
async function verifyDdgDiscountOwnership(
  discountCode: string,
  userEmail: string,
): Promise<string | null> {
  // Only verify DDG discount codes (they start with "DDG" followed by alphanumeric)
  if (!discountCode.startsWith("DDG")) {
    return null; // Not a DDG code, no verification needed
  }

  try {
    // Look up the discount claim in Cosmic
    const { objects } = await cosmic.objects
      .find({
        type: "student-discounts",
        "metadata.discount_code": discountCode,
        "metadata.source": "ddg-team",
      })
      .props("id,metadata")
      .depth(1)
      .limit(1);

    if (!objects || objects.length === 0) {
      return "This discount code is not valid.";
    }

    const claimedEmail = objects[0].metadata.email?.toLowerCase();
    const currentEmail = userEmail.toLowerCase();

    // Check if the Clerk user's email matches the DDG email that claimed the code
    if (claimedEmail !== currentEmail) {
      return `This discount code was generated for ${claimedEmail}. Please sign in with that email address, or sign up using your @duckduckgo.com email.`;
    }

    return null; // Valid!
  } catch {
    // If we can't verify, err on the side of caution
    return "Unable to verify discount code ownership. Please try again.";
  }
}

export async function POST(request: NextRequest) {
  console.log("[Checkout API] POST request received");
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { productKey, discountCode } = body as {
    productKey: ProductKey;
    discountCode?: string;
  };

  if (!productKey || !PRODUCT_CONFIG[productKey]) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const product = PRODUCT_CONFIG[productKey];

  if (!product.variantId) {
    return NextResponse.json(
      { error: "Product not configured" },
      { status: 500 },
    );
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return NextResponse.json({ error: "No email found" }, { status: 400 });
  }

  // Verify DDG discount code ownership
  if (discountCode) {
    const verificationError = await verifyDdgDiscountOwnership(
      discountCode,
      email,
    );
    if (verificationError) {
      return NextResponse.json({ error: verificationError }, { status: 403 });
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectUrl = `${baseUrl}/course?purchase=success`;

  // BYPASS LemonSqueezy for DDG accounts
  if (email.endsWith("@duckduckgo.com") && discountCode?.startsWith("DDG")) {
    try {
      console.log("[Checkout API] Bypassing LemonSqueezy for DDG user:", email);

      const { createEnrollment } = await import("@/lib/course");
      await createEnrollment({
        user_id: userId,
        product_id: "full",
        access_level: "full",
      });

      return NextResponse.json({ redirectUrl: "/course?purchase=success" });
    } catch (error) {
      console.error("[Checkout API] Direct enrollment failed:", error);
      // Fallback to normal flow if direct enrollment fails for some reason
    }
  }

  try {
    const { checkoutUrl } = await createCheckout(
      product.variantId,
      userId,
      email,
      redirectUrl,
      discountCode,
    );

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Checkout creation failed:", error);
    return NextResponse.json(
      {
        error:
          "Failed to create checkout. Please try again or contact support.",
      },
      { status: 500 },
    );
  }
}
