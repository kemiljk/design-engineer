"use server";

import { createDiscount } from "@/lib/lemonsqueezy";
import { PRODUCT_CONFIG } from "@/lib/lemonsqueezy";
import { cosmic } from "@/lib/cosmic";
import { nanoid } from "nanoid";

export async function claimDuckDuckGoAccess(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email || !email.includes("@duckduckgo.com")) {
    return { error: "Please enter a valid @duckduckgo.com email address" };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // 1. Check if already claimed
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "student-discounts", 
        "metadata.email": trimmedEmail,
      })
      .props("id,metadata")
      .depth(1)
      .limit(1);

    if (objects && objects.length > 0) {
      const existingCode = objects[0].metadata.discount_code;
      if (existingCode) {
         // Return existing code if found
         return { success: true, code: existingCode };
      }
      return { error: "You have already claimed an access code." };
    }
  } catch (error) {
    // Ignore 404
  }

  // 2. Create Discount (100% OFF)
  const code = await createDiscount("DDG", `DDG Team - ${trimmedEmail}`, 100);
  
  if (!code) {
    return { error: "Failed to generate access code. Please try again." };
  }

  // 3. Log in Cosmic
  const slug = `ddg-team-${nanoid(8)}`;
  await cosmic.objects.insertOne({
    type: "student-discounts", 
    title: `DDG Team: ${trimmedEmail}`,
    slug,
    metadata: {
      email: trimmedEmail,
      discount_code: code,
      requested_at: new Date().toISOString(),
      status: "unlocked",
      source: "ddg-team"
    },
  });

  // 4. Return Code
  return { success: true, code };
}
