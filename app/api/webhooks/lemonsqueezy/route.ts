import { NextRequest, NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  getProductKeyFromVariantId,
  WebhookEvent,
} from "@/lib/lemonsqueezy";
import { createEnrollment } from "@/lib/course";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 401 }
    );
  }

  const payload = await request.text();

  if (!verifyWebhookSignature(payload, signature)) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401 }
    );
  }

  const event: WebhookEvent = JSON.parse(payload);
  const eventName = event.meta.event_name;

  if (eventName === "order_created") {
    const { attributes } = event.data;
    const userId = event.meta.custom_data?.user_id;

    if (!userId) {
      console.error("No user_id in webhook custom data");
      return NextResponse.json(
        { error: "Missing user ID" },
        { status: 400 }
      );
    }

    const productKey = getProductKeyFromVariantId(
      String(attributes.variant_id)
    );

    if (!productKey) {
      console.error("Unknown variant ID:", attributes.variant_id);
      return NextResponse.json(
        { error: "Unknown product" },
        { status: 400 }
      );
    }

    // Format date as YYYY-MM-DD for Cosmic's date type
    const purchasedAt = attributes.created_at 
      ? new Date(attributes.created_at).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    // Extract email domain for company logos feature
    const userEmail = attributes.user_email || "";
    const emailDomain = userEmail.includes("@") 
      ? userEmail.split("@")[1]?.toLowerCase() 
      : undefined;

    await createEnrollment({
      user_id: userId,
      lemon_squeezy_customer_id: String(attributes.customer_id),
      lemon_squeezy_order_id: String(attributes.order_id),
      product_id: productKey,
      access_level: productKey,
      purchased_at: purchasedAt,
      email_domain: emailDomain,
      status: "active",
    });

    console.log(`Created enrollment for user ${userId}: ${productKey}`);
  }

  if (eventName === "subscription_cancelled" || eventName === "order_refunded") {
    console.log(`Handling ${eventName} - implement status update if needed`);
  }

  return NextResponse.json({ received: true });
}
