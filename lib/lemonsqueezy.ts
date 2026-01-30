// Force rebuild for Vercel cache
import "server-only";
import crypto from "crypto";
import { customAlphabet } from "nanoid";
import type { ProductKey, ProductWithPrice } from "./types";

// LemonSqueezy only allows alphanumeric characters in discount codes
const alphanumericNanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10,
);

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
const LEMONSQUEEZY_WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

const API_BASE = "https://api.lemonsqueezy.com/v1";

export const PRODUCT_CONFIG = {
  // Individual platform tracks
  design_web: {
    name: "Design Track (Web)",
    variantId: process.env.LEMON_PRODUCT_DESIGN_WEB,
    description: "Master visual design principles for the web",
    features: [
      "24 comprehensive lessons",
      "Visual design fundamentals",
      "Design tools mastery (Figma)",
      "Design systems",
      "UX principles",
      "Interactive exercises",
      "Lifetime access",
    ],
    tier: "platform",
  },
  design_ios: {
    name: "Design Track (iOS)",
    variantId: process.env.LEMON_PRODUCT_DESIGN_IOS,
    description: "Master visual design principles for iOS",
    features: [
      "12 comprehensive lessons",
      "iOS design patterns",
      "Human Interface Guidelines",
      "SF Symbols & typography",
      "Interactive exercises",
      "Lifetime access",
    ],
    tier: "platform",
  },
  design_android: {
    name: "Design Track (Android)",
    variantId: process.env.LEMON_PRODUCT_DESIGN_ANDROID,
    description: "Master visual design principles for Android",
    features: [
      "12 comprehensive lessons",
      "Material Design system",
      "Android design patterns",
      "Typography & iconography",
      "Interactive exercises",
      "Lifetime access",
    ],
    tier: "platform",
  },
  engineering_web: {
    name: "Engineering Track (Web)",
    variantId: process.env.LEMON_PRODUCT_ENGINEERING_WEB,
    description: "Learn to build beautiful web interfaces",
    features: [
      "33 comprehensive lessons",
      "HTML & CSS fundamentals",
      "JavaScript essentials",
      "Building components",
      "Design systems in code",
      "Interactive exercises",
      "Lifetime access",
    ],
    tier: "platform",
  },
  engineering_ios: {
    name: "Engineering Track (iOS)",
    variantId: process.env.LEMON_PRODUCT_ENGINEERING_IOS,
    description: "Learn to build beautiful iOS interfaces",
    features: [
      "17 comprehensive lessons",
      "SwiftUI fundamentals",
      "iOS components",
      "Design systems in code",
      "Interactive exercises",
      "Lifetime access",
    ],
    tier: "platform",
  },
  engineering_android: {
    name: "Engineering Track (Android)",
    variantId: process.env.LEMON_PRODUCT_ENGINEERING_ANDROID,
    description: "Learn to build beautiful Android interfaces",
    features: [
      "17 comprehensive lessons",
      "Jetpack Compose",
      "Android components",
      "Design systems in code",
      "Interactive exercises",
      "Lifetime access",
    ],
    tier: "platform",
  },

  // Full track bundles (all platforms within a track)
  design_full: {
    name: "Design: Full Access",
    variantId: process.env.LEMON_PRODUCT_DESIGN_FULL,
    description: "Complete Design Track across all platforms",
    features: [
      "All Design lessons (Web, iOS, Android)",
      "48+ comprehensive lessons",
      "Visual design fundamentals",
      "Platform-specific patterns (HIG, Material)",
      "Design systems architecture",
      "UX principles",
      "All interactive exercises",
      "Lifetime access",
    ],
    tier: "track",
  },
  engineering_full: {
    name: "Engineering: Full Access",
    variantId: process.env.LEMON_PRODUCT_ENGINEERING_FULL,
    description: "Complete Engineering Track across all platforms",
    features: [
      "All Engineering lessons (Web, iOS, Android)",
      "67+ comprehensive lessons",
      "Web: HTML, CSS, JavaScript, React",
      "iOS: Swift & SwiftUI",
      "Android: Kotlin & Compose",
      "Component architecture",
      "All interactive exercises",
      "Lifetime access",
    ],
    tier: "track",
  },

  // Everything bundle
  full: {
    name: "Convergence: All-Access",
    variantId: process.env.LEMON_PRODUCT_FULL,
    description:
      "Everything included — all tracks, all platforms, plus exclusive content",
    features: [
      "✨ ALL LESSONS INCLUDED",
      "Complete Design Track (all platforms)",
      "Complete Engineering Track (all platforms)",
      "Exclusive Convergence content",
      "Advanced motion & prototyping",
      "Accessibility deep-dive",
      "Career & portfolio guidance",
      "All future updates included",
      "Priority support",
    ],
    popular: true,
    tier: "bundle",
  },
} as const;

export type { ProductKey, ProductWithPrice } from "./types";

async function lemonFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${LEMONSQUEEZY_API_KEY}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LemonSqueezy API error: ${error}`);
  }

  return response.json() as Promise<T>;
}

export async function createCheckout(
  variantId: string,
  userId: string,
  email: string,
  redirectUrl: string,
): Promise<{ checkoutUrl: string }> {
  const response = (await lemonFetch("/checkouts", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email,
            custom: {
              user_id: userId,
            },
          },
          product_options: {
            redirect_url: redirectUrl,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: LEMONSQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: variantId,
            },
          },
        },
      },
    }),
  })) as { data: { attributes: { url: string } } };

  return { checkoutUrl: response.data.attributes.url };
}

export function verifyWebhookSignature(
  payload: string,
  signature: string,
): boolean {
  if (!LEMONSQUEEZY_WEBHOOK_SECRET) {
    console.error("Missing LEMONSQUEEZY_WEBHOOK_SECRET");
    return false;
  }

  const hmac = crypto.createHmac("sha256", LEMONSQUEEZY_WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export interface WebhookEvent {
  meta: {
    event_name: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      status: string;
      user_email: string;
      customer_id: number;
      order_id?: number;
      variant_id?: number;
      product_id?: number;
      created_at: string;
      first_order_item?: {
        id: number;
        variant_id: number;
        product_id: number;
        order_id: number;
        price: number;
        quantity: number;
        product_name?: string;
        variant_name?: string;
      };
    };
    relationships?: {
      "order-items"?: {
        data?: Array<{
          id: string;
          attributes?: {
            variant_id?: number;
          };
        }>;
      };
    };
  };
}

export function getProductKeyFromVariantId(
  variantId: string,
): ProductKey | null {
  for (const [key, product] of Object.entries(PRODUCT_CONFIG)) {
    if (product.variantId === variantId) {
      return key as ProductKey;
    }
  }
  return null;
}

interface VariantResponse {
  data: {
    id: string;
    attributes: {
      name: string;
      price: number;
    };
  };
}

function formatPrice(priceInCents: number): string {
  const price = priceInCents / 100;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

const FALLBACK_PRICES: Record<
  ProductKey,
  { price: number; formattedPrice: string }
> = {
  design_web: { price: 129, formattedPrice: "£129.00" },
  design_ios: { price: 99, formattedPrice: "£99.00" },
  design_android: { price: 99, formattedPrice: "£99.00" },
  engineering_web: { price: 149, formattedPrice: "£149.00" },
  engineering_ios: { price: 129, formattedPrice: "£129.00" },
  engineering_android: { price: 129, formattedPrice: "£129.00" },
  design_full: { price: 299, formattedPrice: "£299.00" },
  engineering_full: { price: 349, formattedPrice: "£349.00" },
  full: { price: 599, formattedPrice: "£599.00" },
};

export async function getVariantPrice(
  variantId: string,
): Promise<{ price: number; formattedPrice: string } | null> {
  if (!LEMONSQUEEZY_API_KEY) {
    console.error("Missing LEMONSQUEEZY_API_KEY environment variable");
    return null;
  }

  try {
    const response = await lemonFetch<VariantResponse>(
      `/variants/${variantId}`,
      {
        next: { revalidate: 3600 },
      },
    );

    const priceInCents = response.data.attributes.price;

    return {
      price: priceInCents / 100,
      formattedPrice: formatPrice(priceInCents),
    };
  } catch (error) {
    console.error(`Error fetching variant ${variantId}:`, error);
    return null;
  }
}

export async function getProductsWithPrices(): Promise<ProductWithPrice[]> {
  const products: ProductWithPrice[] = [];

  for (const [key, config] of Object.entries(PRODUCT_CONFIG)) {
    if (!config.variantId) {
      console.warn(
        `No variantId for product ${key} - check LEMON_PRODUCT_* env vars`,
      );
      continue;
    }

    const priceData = await getVariantPrice(config.variantId);
    const productKey = key as ProductKey;
    const fallbackPrice = FALLBACK_PRICES[productKey];

    products.push({
      key: productKey,
      name: config.name,
      description: config.description,
      features: config.features,
      variantId: config.variantId,
      price: priceData?.price ?? fallbackPrice.price,
      formattedPrice: priceData?.formattedPrice ?? fallbackPrice.formattedPrice,
      popular: "popular" in config ? config.popular : false,
    });
  }

  return products;
}

export async function getProductWithPrice(
  productKey: ProductKey,
): Promise<ProductWithPrice | null> {
  const config = PRODUCT_CONFIG[productKey];

  if (!config.variantId) {
    return null;
  }

  const priceData = await getVariantPrice(config.variantId);
  const fallbackPrice = FALLBACK_PRICES[productKey];

  return {
    key: productKey,
    name: config.name,
    description: config.description,
    features: config.features,
    variantId: config.variantId,
    price: priceData?.price ?? fallbackPrice.price,
    formattedPrice: priceData?.formattedPrice ?? fallbackPrice.formattedPrice,
    popular: "popular" in config ? config.popular : false,
  };
}

interface CreateDiscountResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      code: string;
      amount: number;
      amount_type: string;
    };
  };
}

export async function createDiscount(
  prefix: string,
  name: string,
  amount: number,
  amountType: "percent" | "fixed" = "percent",
  maxRedemptions: number = 1,
): Promise<string | null> {
  if (!LEMONSQUEEZY_API_KEY || !LEMONSQUEEZY_STORE_ID) {
    console.error("Missing LemonSqueezy credentials");
    return null;
  }

  try {
    const uniqueCode = `${prefix}${alphanumericNanoid()}`;

    const response = await lemonFetch<CreateDiscountResponse>("/discounts", {
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "discounts",
          attributes: {
            name: `${name}`,
            code: uniqueCode,
            amount: amount,
            amount_type: amountType,
            is_limited_redemptions: true,
            max_redemptions: maxRedemptions,
            starts_at: new Date().toISOString(),
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: LEMONSQUEEZY_STORE_ID,
              },
            },
          },
        },
      }),
    });

    return response.data.attributes.code;
  } catch (error) {
    console.error("Error creating discount:", error);
    return null;
  }
}

export async function createUpgradeDiscount(
  userId: string,
  targetProductPrice: number,
  paidAmount: number,
): Promise<string | null> {
  const discountAmount = Math.min(paidAmount, targetProductPrice); // Discount is whatever they already paid

  // Example: Paid £349 (Eng), Upgrade to £599 (Full)
  // Discount = £349. They pay £250.

  return createDiscount(
    "UPGRADE",
    `Upgrade Discount - ${userId}`,
    discountAmount,
    "fixed", // Fixed amount off in cents
    1,
  );
}

interface OrderResponse {
  data: Array<{
    id: string;
    type: string;
    attributes: {
      user_email: string;
      status: string;
      variant_id: number;
      product_id: number;
      created_at: string;
      identifier: string;
      order_number: number;
      customer_id: number;
      first_order_item?: {
        variant_id: number;
      };
    };
    relationships: {
      "order-items": {
        data: Array<{
          attributes: {
            variant_id: number;
          };
        }>;
      };
    };
  }>;
}

export async function getOrders(
  userEmail: string,
): Promise<OrderResponse["data"]> {
  if (!LEMONSQUEEZY_API_KEY || !LEMONSQUEEZY_STORE_ID) {
    console.error("Missing LemonSqueezy credentials");
    return [];
  }

  try {
    // Determine today's date minus a small buffer (e.g. 1 hour or 1 day) if we wanted recent only.
    // For now, let's just fetch last 10 orders for this email.
    // Filter by email is strictly supported? Lemon api doc says filter[email]

    const response = await lemonFetch<OrderResponse>(
      `/orders?filter[user_email]=${encodeURIComponent(userEmail)}&filter[store_id]=${LEMONSQUEEZY_STORE_ID}&page[size]=10&include=order-items`,
      {
        next: { revalidate: 0 }, // Always fetch fresh
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function createStudentDiscount(
  studentEmail: string,
): Promise<string | null> {
  return createDiscount("STUDENT", `Student Discount - ${studentEmail}`, 30);
}
