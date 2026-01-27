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

  // 1. Check if already claimed (optional, but good for tracking)
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
       return { success: true };
    }
  } catch (error) {
    // Ignore 404
  }

  // 2. Log in Cosmic for tracking
  const slug = `ddg-team-${nanoid(8)}`;
  await cosmic.objects.insertOne({
    type: "student-discounts", 
    title: `DDG Team: ${trimmedEmail}`,
    slug,
    metadata: {
      email: trimmedEmail,
      requested_at: new Date().toISOString(),
      status: "unlocked",
      source: "ddg-team"
    },
  });

  // 3. Return Success
  return { success: true };
}
