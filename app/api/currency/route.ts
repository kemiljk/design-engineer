import { NextResponse } from "next/server";
import { getExchangeRates, SUPPORTED_CURRENCIES } from "@/lib/currency";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const rates = await getExchangeRates();
    
    if (!rates) {
      return NextResponse.json(
        { error: "Failed to fetch exchange rates" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      base: rates.base,
      date: rates.date,
      rates: rates.rates,
      currencies: SUPPORTED_CURRENCIES,
    });
  } catch (error) {
    console.error("Currency API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
