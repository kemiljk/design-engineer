"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrders, getProductKeyFromVariantId } from "@/lib/lemonsqueezy";
import { createEnrollment, getUserEnrollment } from "@/lib/course";
import { revalidatePath } from "next/cache";

export async function verifyPurchase() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return { error: "Unauthorized" };
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return { error: "No email found" };
  }

  // 1. Check if already enrolled (fast path)
  const existingEnrollment = await getUserEnrollment(userId);
  if (existingEnrollment) {
    return { success: true, message: "Already enrolled" };
  }

  // 2. Fetch orders from Lemon Squeezy
  const orders = await getOrders(email);

  if (!orders || orders.length === 0) {
    return { error: "No recent orders found." };
  }

  // 3. Find valid order
  // Look for any order that has a status of 'paid' and a valid product variant
  const validOrder = orders.find((order) => {
    return order.attributes.status === "paid";
  });

  if (!validOrder) {
    return { error: "No valid paid orders found." };
  }

  // 4. Determine variant ID
  let variantId = validOrder.attributes.variant_id;

  // Sometimes variant_id is on the first_order_item or relationship
  if (!variantId && validOrder.attributes.first_order_item?.variant_id) {
    variantId = validOrder.attributes.first_order_item.variant_id;
  }

  // Check relationships if not found above (fallback logic similar to webhook)
  if (
    !variantId &&
    validOrder.relationships?.["order-items"]?.data?.length > 0
  ) {
    const item = validOrder.relationships["order-items"].data[0];
    if (item.attributes?.variant_id) {
      variantId = item.attributes.variant_id;
    }
  }

  if (!variantId) {
    return { error: "Order found but product could not be identified." };
  }

  const productKey = getProductKeyFromVariantId(String(variantId));
  if (!productKey) {
    return { error: "Unknown product in order." };
  }

  // 5. Create Enrollment
  const purchasedAt = validOrder.attributes.created_at
    ? new Date(validOrder.attributes.created_at).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const emailDomain = email.includes("@")
    ? email.split("@")[1]?.toLowerCase()
    : undefined;

  await createEnrollment({
    user_id: userId,
    lemon_squeezy_customer_id: String(validOrder.attributes.customer_id),
    lemon_squeezy_order_id: String(validOrder.attributes.order_number), // Use order number or identifier
    product_id: productKey,
    access_level: productKey,
    purchased_at: purchasedAt,
    email_domain: emailDomain,
    status: "active",
  });

  console.log(
    `[Verify Purchase] Manually enrolled user ${userId} for ${productKey}`,
  );

  revalidatePath("/course");
  revalidatePath("/course/dashboard");

  return { success: true };
}
