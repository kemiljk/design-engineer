"use server";

import { createDiscount } from "@/lib/lemonsqueezy";
import { PRODUCT_CONFIG } from "@/lib/lemonsqueezy";
import { cosmic } from "@/lib/cosmic";
import { nanoid } from "nanoid";

export async function claimDiveClubDiscount(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address" };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // 1. Check if already claimed
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "student-discounts", // We can reuse this type or make a new one 'discounts'
        "metadata.email": trimmedEmail,
      })
      .props("id,metadata")
      .depth(1)
      .limit(1);

    if (objects && objects.length > 0) {
      // If they already have one, maybe we can just give them their existing code?
      // For now, let's just error to prevent abuse.
      // actually, if they lost it, giving it back is nice.
      const existingCode = objects[0].metadata.discount_code;
      if (existingCode) {
          const variantId = PRODUCT_CONFIG.full.variantId;
          return { success: true, url: `https://designengineer.lemonsqueezy.com/checkout/buy/${variantId}?discount=${existingCode}` };
      }
      return { error: "You have already claimed a discount code. Check your email or contact support." };
    }
  } catch (error) {
    // Ignore 404
  }

  // 2. Create Discount
  const code = await createDiscount("DIVECLUB", `Dive Club - ${trimmedEmail}`, 20); // 20% OFF
  
  if (!code) {
    return { error: "Failed to generate discount code. Please try again." };
  }

  // 3. Log in Cosmic
  const slug = `dive-club-${nanoid(8)}`;
  await cosmic.objects.insertOne({
    type: "student-discounts", // Reusing this for simplicity, or create new type
    title: `Dive Club: ${trimmedEmail}`,
    slug,
    metadata: {
      email: trimmedEmail,
      discount_code: code,
      requested_at: new Date().toISOString(),
      status: "redirected",
      source: "dive-club"
    },
  });

  // 4. Return URL
  const variantId = PRODUCT_CONFIG.full.variantId;
  const checkoutUrl = `https://designengineer.lemonsqueezy.com/checkout/buy/${variantId}?discount=${code}`;
  
  return { success: true, url: checkoutUrl };
}
