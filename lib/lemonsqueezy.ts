export async function createUpgradeDiscount(
  userId: string,
  targetProductPrice: number,
  paidAmount: number
): Promise<string | null> {
  const discountAmount = Math.min(paidAmount, targetProductPrice); // Discount is whatever they already paid
  
  // Example: Paid £349 (Eng), Upgrade to £599 (Full)
  // Discount = £349. They pay £250.
  
  return createDiscount(
    "UPGRADE",
    `Upgrade Discount - ${userId}`,
    discountAmount,
    "fixed", // Fixed amount off in cents
    1
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
