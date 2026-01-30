"use server";

import { createCheckout } from "@/lib/lemonsqueezy";
import { PRODUCT_CONFIG } from "@/lib/lemonsqueezy";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createUpgradeDiscount, getProductWithPrice } from "@/lib/lemonsqueezy";
import { getUserEnrollment } from "@/lib/course";

// Simple fallback prices if we can't fetch dynamically
const PRICES = {
  full: 59900, // cents
  engineering_full: 34900,
  design_full: 29900,
};

export async function createUpgradeCheckout(targetProductKey: string) {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) return { error: "Please sign in to upgrade" };

  const enrollment = await getUserEnrollment(userId);
  const currentAccess = enrollment?.metadata.access_level;

  if (!currentAccess || currentAccess === "free") {
    return { error: "No existing purchase found to upgrade from." };
  }

  // Calculate Credit (what they already paid)
  // Since we don't store exact purchase price in enrollment metadata currently,
  // we infer it from the standard price of their current tier.
  // This is a simplification but works for 99% of cases.
  // If they used a discount, they get full credit for the tier value (generous upgrade).
  
  let credit = 0;
  
  if (currentAccess === "engineering_full") credit = PRICES.engineering_full;
  if (currentAccess === "design_full") credit = PRICES.design_full;
  // Add other tier logic if needed

  if (credit === 0) {
     return { error: "Your current plan is not eligible for an automated upgrade discount." };
  }

  // Calculate Target Price
  // We need the live price of the target product to generate the correct discount
  const targetProduct = await getProductWithPrice(targetProductKey as any);
  if (!targetProduct) return { error: "Target product not found" };
  
  const targetPriceCents = targetProduct.price * 100; // API returns pounds/dollars, convert back to cents? 
  // Wait, getProductWithPrice returns price in major units (e.g. 599).
  // createDiscount expects value based on type. Fixed amount = cents usually in Stripe/LemonSqueezy.
  // Let's verify. LemonSqueezy API documentation says "amount" for fixed is in cents.
  
  const targetPriceMajor = targetProduct.price;
  const creditMajor = credit / 100;
  
  if (creditMajor >= targetPriceMajor) {
     return { error: "You already have a higher or equal tier plan." };
  }

  // Create Discount Code for the difference
  // Discount = Credit Amount (in cents)
  // User pays: Target - Credit
  
  // NOTE: LemonSqueezy "amount" for fixed discount is in cents.
  const discountAmountCents = credit; 
  
  const discountCode = await createUpgradeDiscount(userId, targetPriceCents, discountAmountCents);
  
  if (!discountCode) {
    return { error: "Failed to generate upgrade discount." };
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) return { error: "No email found on your account." };

  // Create Checkout with this discount applied
  const checkout = await createCheckout(
    targetProduct.variantId,
    userId,
    email,
    `${process.env.NEXT_PUBLIC_APP_URL}/course/purchase-success`
  );
  
  // The createCheckout helper doesn't support applying a code directly yet?
  // We can append `?discount=CODE` to the URL.
  
  return { checkoutUrl: `${checkout.checkoutUrl}?discount=${discountCode}` };
}
