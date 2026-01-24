import { NextRequest, NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  getProductKeyFromVariantId,
  WebhookEvent,
  PRODUCT_CONFIG,
} from "@/lib/lemonsqueezy";
import { createEnrollment } from "@/lib/course";
import { Resend } from "resend";
import { CourseWelcomeEmail } from "@/app/components/email-template";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const payload = await request.text();

  if (!verifyWebhookSignature(payload, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event: WebhookEvent = JSON.parse(payload);
  const eventName = event.meta.event_name;

  if (eventName === "order_created") {
    const { attributes, relationships } = event.data;
    const userId = event.meta.custom_data?.user_id;

    if (!userId) {
      console.error("No user_id in webhook custom data. Event structure:", {
        meta: event.meta,
        dataType: event.data?.type,
        hasAttributes: !!attributes,
        hasRelationships: !!relationships,
      });
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    let variantId: number | string | undefined = attributes?.variant_id;

    if (!variantId && attributes?.first_order_item?.variant_id) {
      variantId = attributes.first_order_item.variant_id;
    }

    if (!variantId && relationships?.["order-items"]?.data) {
      const orderItems = Array.isArray(relationships["order-items"].data)
        ? relationships["order-items"].data
        : [relationships["order-items"].data];

      if (orderItems.length > 0 && orderItems[0].attributes?.variant_id) {
        variantId = orderItems[0].attributes.variant_id;
      }
    }

    if (!variantId) {
      console.warn(
        "Test webhook or missing variant_id - skipping enrollment. Payload structure:",
        {
          eventName,
          userId,
          hasAttributes: !!attributes,
          hasFirstOrderItem: !!attributes?.first_order_item,
          firstOrderItemVariantId: attributes?.first_order_item?.variant_id,
          hasOrderItemsRelationship: !!relationships?.["order-items"],
        },
      );
      return NextResponse.json(
        { received: true, message: "Test webhook received (no variant_id)" },
        { status: 200 },
      );
    }

    const productKey = getProductKeyFromVariantId(String(variantId));

    if (!productKey) {
      console.error(
        "Unknown variant ID:",
        variantId,
        "Available variant IDs:",
        Object.values(PRODUCT_CONFIG).map((p) => p.variantId),
      );
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    // Format date as YYYY-MM-DD for Cosmic's date type
    const purchasedAt = attributes.created_at
      ? new Date(attributes.created_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

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

    // Send welcome email
    if (userEmail) {
      try {
        await resend.emails.send({
          from: "dxe <hello@designengineer.xyz>",
          to: [userEmail],
          subject: "Welcome to the Course!",
          react: CourseWelcomeEmail({ email: userEmail }) as React.ReactElement,
        });
        console.log(`Sent welcome email to ${userEmail}`);
      } catch (error) {
        console.error("Error sending welcome email:", error);
      }
    }
  }

  if (
    eventName === "subscription_cancelled" ||
    eventName === "order_refunded"
  ) {
    console.log(`Handling ${eventName} - implement status update if needed`);
  }

  return NextResponse.json({ received: true });
}
