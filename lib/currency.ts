/**
 * Currency Conversion Utilities
 * 
 * Uses the Frankfurter API (free, no API key required)
 * https://www.frankfurter.app/
 * 
 * Rates are cached for 1 hour to reduce API calls.
 */

const FRANKFURTER_API = "https://api.frankfurter.app";

// Supported currencies for conversion
export const SUPPORTED_CURRENCIES = [
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
] as const;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number]["code"];

interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

// In-memory cache for exchange rates
let ratesCache: {
  data: ExchangeRates | null;
  fetchedAt: number;
} = {
  data: null,
  fetchedAt: 0,
};

const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fetch exchange rates from Frankfurter API
 * Base currency is GBP (our default pricing currency)
 */
export async function getExchangeRates(): Promise<ExchangeRates | null> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (ratesCache.data && now - ratesCache.fetchedAt < CACHE_DURATION_MS) {
    return ratesCache.data;
  }
  
  try {
    const currencies = SUPPORTED_CURRENCIES
      .filter(c => c.code !== "GBP")
      .map(c => c.code)
      .join(",");
    
    const response = await fetch(
      `${FRANKFURTER_API}/latest?from=GBP&to=${currencies}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour in Next.js
    );
    
    if (!response.ok) {
      console.error("Failed to fetch exchange rates:", response.status);
      return ratesCache.data; // Return stale cache if available
    }
    
    const data: ExchangeRates = await response.json();
    
    // Add GBP rate (1:1)
    data.rates.GBP = 1;
    
    // Update cache
    ratesCache = {
      data,
      fetchedAt: now,
    };
    
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return ratesCache.data; // Return stale cache if available
  }
}

/**
 * Convert a price from GBP to another currency
 */
export function convertPrice(
  priceInGBP: number,
  targetCurrency: SupportedCurrency,
  rates: ExchangeRates
): number {
  if (targetCurrency === "GBP") {
    return priceInGBP;
  }
  
  const rate = rates.rates[targetCurrency];
  if (!rate) {
    console.warn(`No exchange rate for ${targetCurrency}, returning GBP price`);
    return priceInGBP;
  }
  
  return priceInGBP * rate;
}

/**
 * Format a price in the specified currency
 */
export function formatPrice(
  amount: number,
  currency: SupportedCurrency
): string {
  const currencyConfig = SUPPORTED_CURRENCIES.find(c => c.code === currency);
  
  // Special handling for currencies without decimal places
  const noDecimalCurrencies = ["JPY", "KRW"];
  const minimumFractionDigits = noDecimalCurrencies.includes(currency) ? 0 : 0;
  const maximumFractionDigits = noDecimalCurrencies.includes(currency) ? 0 : 2;
  
  // Round to sensible price points
  let roundedAmount = amount;
  if (currency === "JPY") {
    roundedAmount = Math.round(amount / 100) * 100; // Round to nearest 100 yen
  } else if (currency === "INR") {
    roundedAmount = Math.round(amount / 10) * 10; // Round to nearest 10 rupees
  } else {
    roundedAmount = Math.round(amount); // Round to nearest whole number
  }
  
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(roundedAmount);
}

/**
 * Get currency info from code
 */
export function getCurrencyInfo(code: SupportedCurrency) {
  return SUPPORTED_CURRENCIES.find(c => c.code === code);
}

/**
 * Detect user's likely currency based on locale/timezone
 * This is a best-effort guess and should be overridable by user preference
 */
export function detectUserCurrency(): SupportedCurrency {
  if (typeof window === "undefined") {
    return "GBP"; // Default for SSR
  }
  
  // Try to detect from browser locale
  const locale = navigator.language || "en-GB";
  
  const localeToCountry: Record<string, SupportedCurrency> = {
    "en-US": "USD",
    "en-GB": "GBP",
    "en-AU": "AUD",
    "en-CA": "CAD",
    "en-NZ": "NZD",
    "en-SG": "SGD",
    "en-HK": "HKD",
    "en-IN": "INR",
    "de-DE": "EUR",
    "de-AT": "EUR",
    "fr-FR": "EUR",
    "es-ES": "EUR",
    "it-IT": "EUR",
    "nl-NL": "EUR",
    "pt-PT": "EUR",
    "ja-JP": "JPY",
    "zh-HK": "HKD",
    "zh-SG": "SGD",
    "sv-SE": "SEK",
    "de-CH": "CHF",
    "fr-CH": "CHF",
    "pl-PL": "PLN",
    "pt-BR": "BRL",
    "es-MX": "MXN",
  };
  
  return localeToCountry[locale] || "GBP";
}

export interface ConvertedPrice {
  original: {
    amount: number;
    formatted: string;
    currency: "GBP";
  };
  converted: {
    amount: number;
    formatted: string;
    currency: SupportedCurrency;
  };
  rate: number;
  ratesDate: string;
}

/**
 * Get both original and converted price
 */
export async function getPriceWithConversion(
  priceInGBP: number,
  targetCurrency: SupportedCurrency
): Promise<ConvertedPrice> {
  const rates = await getExchangeRates();
  
  const originalFormatted = formatPrice(priceInGBP, "GBP");
  
  if (!rates || targetCurrency === "GBP") {
    return {
      original: {
        amount: priceInGBP,
        formatted: originalFormatted,
        currency: "GBP",
      },
      converted: {
        amount: priceInGBP,
        formatted: originalFormatted,
        currency: "GBP",
      },
      rate: 1,
      ratesDate: new Date().toISOString().split("T")[0],
    };
  }
  
  const convertedAmount = convertPrice(priceInGBP, targetCurrency, rates);
  const convertedFormatted = formatPrice(convertedAmount, targetCurrency);
  
  return {
    original: {
      amount: priceInGBP,
      formatted: originalFormatted,
      currency: "GBP",
    },
    converted: {
      amount: convertedAmount,
      formatted: convertedFormatted,
      currency: targetCurrency,
    },
    rate: rates.rates[targetCurrency] || 1,
    ratesDate: rates.date,
  };
}
