import "server-only";
import crypto from "crypto";
import type { ProductKey, ProductWithPrice } from "./types";

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
const LEMONSQUEEZY_WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

const API_BASE = "https://api.lemonsqueezy.com/v1";

export const PRODUCT_CONFIG = {
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
  },
  full: {
    name: "Convergence: All-Access Pass",
    variantId: process.env.LEMON_PRODUCT_FULL,
    description: "Complete access to everything - all tracks, all platforms, all content",
    features: [
      "✨ ALL 156 LESSONS - EVERYTHING INCLUDED",
      "All Design Track lessons (Web, iOS, Android)",
      "All Engineering Track lessons (Web, iOS, Android)",
      "Exclusive Convergence Track (motion, prototyping, workflow)",
      "All 3 platforms: Web, iOS & Android",
      "All interactive exercises & assessments",
      "Future course updates included forever",
      "Lifetime access - learn at your own pace",
      "Priority support",
    ],
    popular: true,
  },
} as const;

export type { ProductKey, ProductWithPrice } from "./types";

async function lemonFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
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
  redirectUrl: string
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
  signature: string
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
      order_id: number;
      variant_id: number;
      product_id: number;
      created_at: string;
    };
  };
}

export function getProductKeyFromVariantId(variantId: string): ProductKey | null {
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

export async function getVariantPrice(variantId: string): Promise<{ price: number; formattedPrice: string } | null> {
  if (!LEMONSQUEEZY_API_KEY) {
    console.error("Missing LEMONSQUEEZY_API_KEY environment variable");
    return null;
  }
  
  try {
    const response = await lemonFetch<VariantResponse>(`/variants/${variantId}`, {
      next: { revalidate: 3600 },
    });
    
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
      console.warn(`No variantId for product ${key} - check LEMON_PRODUCT_* env vars`);
      continue;
    }
    
    const priceData = await getVariantPrice(config.variantId);
    
    products.push({
      key: key as ProductKey,
      name: config.name,
      description: config.description,
      features: config.features,
      variantId: config.variantId,
      price: priceData?.price ?? 0,
      formattedPrice: priceData?.formattedPrice ?? "N/A",
      popular: "popular" in config ? config.popular : false,
    });
  }
  
  return products;
}

export async function getProductWithPrice(productKey: ProductKey): Promise<ProductWithPrice | null> {
  const config = PRODUCT_CONFIG[productKey];
  
  if (!config.variantId) {
    return null;
  }
  
  const priceData = await getVariantPrice(config.variantId);
  
  return {
    key: productKey,
    name: config.name,
    description: config.description,
    features: config.features,
    variantId: config.variantId,
    price: priceData?.price ?? 0,
    formattedPrice: priceData?.formattedPrice ?? "N/A",
    popular: "popular" in config ? config.popular : false,
  };
}
