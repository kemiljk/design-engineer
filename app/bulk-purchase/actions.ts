"use server";

import { createCheckout, createBulkDiscount } from "@/lib/lemonsqueezy";
import { PRODUCT_CONFIG } from "@/lib/lemonsqueezy";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";

// We'll create a special "Bulk Seat" product variant in LemonSqueezy dashboard manually for the seat price,
// OR just use the checkout API to sell N copies of the full course.
// Actually, LemonSqueezy Checkouts support `checkout_data.custom` fields.
// But we need to sell a "Bulk License" product. 
// For now, let's assume we sell them a "Bulk License Pack" which is just a custom variant or we calculate price dynamically.
// LemonSqueezy Checkout API allows `custom_price` if enabled in store settings, but variants are safer.

export async function initiateBulkPurchase(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return { error: "Please sign in to continue" };

  const seats = parseInt(formData.get("seats") as string);
  const companyName = formData.get("companyName") as string;
  const email = formData.get("email") as string;

  if (!seats || seats < 5) return { error: "Minimum 5 seats required for bulk pricing" };
  if (!companyName) return { error: "Company name is required" };

  // Price calculation: 20% off for bulk
  // Full price £599 -> £479 per seat
  // We can't dynamically set price easily without a custom variant for every quantity unless we use 'custom_price'.
  // Simpler approach for MVP:
  // Create a 100% off discount code with `max_redemptions = seats`
  // Sell THAT code for `seats * discounted_price`.
  // But we need a product to sell.
  
  // Strategy:
  // 1. We don't automate the PAYMENT for the bulk purchase right here because of dynamic pricing complexity in LS.
  // 2. Instead, we treat this as a "Request Invoice / Custom Quote" OR
  // 3. We use a fixed "Bulk Seat" product (£479) and add `quantity: seats` to the checkout.
  
  // Let's go with option 3: Checkout with Quantity.
  // We need a variant ID for a "Single Seat (Bulk)" product.
  // Since we don't have that yet, let's use the Full Access variant but applying a bulk discount CODE to the cart?
  // No, that applies to the user buying it.
  
  // BEST MVP:
  // Use the existing "Full Access" variant.
  // Quantity = seats.
  // Apply a dynamic "20% OFF" discount code to THIS checkout session.
  
  const fullAccessVariantId = PRODUCT_CONFIG.full.variantId;
  if (!fullAccessVariantId) return { error: "Product configuration missing" };

  // Create a temporary discount code for this bulk purchase (20% off)
  // This code is for the PURCHASER (McDonald's) to buy the seats cheaper.
  // const purchaseDiscountCode = await createDiscount("BULKBUY", `Bulk Buy ${companyName}`, 20, "percent", 1);
  
  // Actually, LemonSqueezy `createCheckout` allows passing `checkout_options.discount_code`.
  // We can just rely on a standard bulk code if we have one, or create one on the fly.
  
  // Wait, if they buy 50 copies, they get 50 licenses for themselves? 
  // No, LemonSqueezy sends 1 license key usually.
  // We need to intercept the webhook, see "quantity: 50", and then generate a 100% off code with 50 uses.
  
  // So the flow is:
  // 1. User buys 50x "Full Access" (with a 20% discount applied to the cart).
  // 2. Webhook fires -> we see quantity 50.
  // 3. We generate a "BULK-MCDONALDS-XYZ" code with 50 uses.
  // 4. We email that code to the purchaser.
  
  // Action: Create checkout with quantity
  // We need to use the LemonSqueezy API directly for quantity, as my helper `createCheckout` might not expose it.
  // Let's update `createCheckout` or fetch manually here.
  
  // For now, returning a "Contact Us" or manual invoice flow might be safer for a high-value client like McDonald's
  // to avoid payment limit issues (50 * 600 = £30k transaction might block).
  
  return { 
    success: true, 
    message: "For volume purchases (5+ seats), we offer a 20% discount and consolidated billing. Please contact team@designengineer.xyz to arrange an invoice." 
  };
}
