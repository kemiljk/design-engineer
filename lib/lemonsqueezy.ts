import { ProductKey, ProductWithPrice } from "@/lib/types";
import crypto from "crypto";

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
const LEMONSQUEEZY_WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

export const PRODUCT_CONFIG: Record<ProductKey, {
  variantId: string | undefined;
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
}> = {
  design_web: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_DESIGN_WEB,
    name: "Design for Web",
    description: "Master visual design for the web.",
    features: ["Visual Design Foundations", "Web Typography", "Layout & Grid", "Color Theory"]
  },
  design_ios: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_DESIGN_IOS,
    name: "Design for iOS",
    description: "Learn Apple's Human Interface Guidelines.",
    features: ["iOS Design Philosophy", "Apple Design Resources", "SF Symbols", "Native Components"]
  },
  design_android: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_DESIGN_ANDROID,
    name: "Design for Android",
    description: "Master Material Design 3.",
    features: ["Material Design Philosophy", "Material Theming", "Android UI Components", "Adaptive Layouts"]
  },
  design_full: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_DESIGN_FULL,
    name: "Full Design Track",
    description: "Complete design education across all platforms.",
    features: ["All 3 Design Platforms", "Web, iOS & Android", "Certificate of Completion", "Lifetime Access"],
    popular: true
  },
  engineering_web: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_ENGINEERING_WEB,
    name: "Engineering for Web",
    description: "Build modern web applications.",
    features: ["React & Next.js", "Tailwind CSS", "TypeScript", "Animation Engineering"]
  },
  engineering_ios: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_ENGINEERING_IOS,
    name: "Engineering for iOS",
    description: "Build native iOS apps with SwiftUI.",
    features: ["Swift & SwiftUI", "Xcode Mastery", "Data Flow", "Native Animations"]
  },
  engineering_android: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_ENGINEERING_ANDROID,
    name: "Engineering for Android",
    description: "Build native Android apps with Kotlin.",
    features: ["Kotlin & Jetpack Compose", "Android Studio", "State Management", "Material Motion"]
  },
  engineering_full: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_ENGINEERING_FULL,
    name: "Full Engineering Track",
    description: "Complete engineering education across all platforms.",
    features: ["All 3 Engineering Platforms", "Web, iOS & Android", "Certificate of Completion", "Lifetime Access"]
  },
  full: {
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID_FULL,
    name: "Convergence: All Access",
    description: "The complete design engineering curriculum.",
    features: ["Everything in Design", "Everything in Engineering", "Convergence Modules", "Master Certificate"],
    popular: true
  },
};

async function lemonFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!LEMONSQUEEZY_API_KEY) {
    console.warn("Missing LemonSqueezy API key");
    // Return a rejected promise or throw
    throw new Error("Missing LemonSqueezy API key");
  }
  const res = await fetch(`https://api.lemonsqueezy.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${LEMONSQUEEZY_API_KEY}`,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`LemonSqueezy API error: ${res.status} ${res.statusText}`, errorText);
    throw new Error(`LemonSqueezy API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function createCheckout(
  variantId: string | number | undefined,
  userId: string,
  userEmail: string,
  redirectUrl: string,
  discountCode?: string
): Promise<{ checkoutUrl: string }> {
  if (!LEMONSQUEEZY_STORE_ID) throw new Error("Missing Store ID");
  if (!variantId) throw new Error("Variant ID is required");

  const payload: any = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
            email: userEmail,
            custom: {
                user_id: userId
            },
        },
        product_options: {
            redirect_url: redirectUrl
        }
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: LEMONSQUEEZY_STORE_ID
          }
        },
        variant: {
          data: {
            type: "variants",
            id: String(variantId)
          }
        }
      }
    }
  };

  if (discountCode) {
      payload.data.attributes.checkout_data.discount_code = discountCode;
  }

  const response = await lemonFetch<{ data: { attributes: { url: string } } }>(
      "/checkouts",
      {
          method: "POST",
          body: JSON.stringify(payload)
      }
  );

  return { checkoutUrl: response.data.attributes.url };
}

export async function createDiscount(
  codePrefix: string,
  name: string,
  amount: number,
  type: "percent" | "fixed" = "percent",
  durationInMonths?: number,
  maxRedemptions?: number
): Promise<string | null> {
    if (!LEMONSQUEEZY_STORE_ID) return null;

    // Generate a somewhat random code
    const code = `${codePrefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const payload = {
        data: {
            type: "discounts",
            attributes: {
                name: name,
                code: code,
                amount: amount,
                amount_type: type,
                duration: durationInMonths ? "repeating" : "once",
                ...(durationInMonths && { duration_in_months: durationInMonths }),
                is_limited_to_products: false,
                is_limited_redemptions: !!maxRedemptions,
                max_redemptions: maxRedemptions || 0,
            },
            relationships: {
                store: {
                    data: {
                        type: "stores",
                        id: LEMONSQUEEZY_STORE_ID
                    }
                }
            }
        }
    };

    try {
        await lemonFetch("/discounts", {
            method: "POST",
            body: JSON.stringify(payload)
        });
        return code;
    } catch (e) {
        console.error("Failed to create discount", e);
        return null;
    }
}


export async function createUpgradeDiscount(
  userId: string,
  targetProductPrice: number,
  paidAmount: number
): Promise<string | null> {
  const discountAmount = Math.min(paidAmount, targetProductPrice);
  
  return createDiscount(
    "UPGRADE",
    `Upgrade Discount - ${userId}`,
    discountAmount,
    "fixed",
    1
  );
}

export async function createStudentDiscount(email: string): Promise<string | null> {
    return createDiscount("STUDENT", `Student Discount - ${email}`, 50);
}

export async function createBulkDiscount(companyName: string, seats: number): Promise<string | null> {
  return createDiscount(
      "BULK",
      `Bulk Access for ${companyName}`,
      100,
      "percent",
      undefined,
      seats
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
    const response = await lemonFetch<OrderResponse>(
      `/orders?filter[user_email]=${encodeURIComponent(userEmail)}&filter[store_id]=${LEMONSQUEEZY_STORE_ID}&page[size]=10&include=order-items`,
      {
        next: { revalidate: 0 },
      } as any
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export function verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!LEMONSQUEEZY_WEBHOOK_SECRET) return false;
    const hmac = crypto.createHmac("sha256", LEMONSQUEEZY_WEBHOOK_SECRET);
    const digest = hmac.update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export function getProductKeyFromVariantId(variantId: string | number): ProductKey | null {
    const vId = String(variantId);
    for (const [key, config] of Object.entries(PRODUCT_CONFIG)) {
        if (config.variantId && String(config.variantId) === vId) {
            return key as ProductKey;
        }
    }
    return null;
}

export async function getProductWithPrice(key: ProductKey): Promise<ProductWithPrice | null> {
    const config = PRODUCT_CONFIG[key];
    if (!config.variantId) return null;

    try {
        const response = await lemonFetch<{ data: { attributes: { price: number; price_formatted: string } } }>(
            `/variants/${config.variantId}`
        );
        return {
            key,
            ...config,
            variantId: config.variantId,
            price: response.data.attributes.price,
            formattedPrice: response.data.attributes.price_formatted
        };
    } catch (e) {
        console.error(`Failed to fetch price for ${key}`, e);
        return {
            key,
            ...config,
             variantId: config.variantId,
            price: 0,
            formattedPrice: "N/A"
        };
    }
}

export async function getProductsWithPrices(): Promise<ProductWithPrice[]> {
    const keys = Object.keys(PRODUCT_CONFIG) as ProductKey[];
    const products = await Promise.all(keys.map(getProductWithPrice));
    return products.filter((p): p is ProductWithPrice => p !== null);
}

export interface WebhookEvent {
    meta: {
        event_name: string;
        custom_data?: {
            user_id: string;
        };
    };
    data: {
        id: string;
        type: string;
        attributes: any;
        relationships: any;
    };
}
