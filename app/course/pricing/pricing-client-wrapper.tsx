"use client";

import { useState, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { CurrencySelector } from "./currency-selector";
import { PricingCard, PlatformTierCard, BundleCard } from "./pricing-card";
import type { ProductWithPrice } from "@/lib/types";
import type { SupportedCurrency } from "@/lib/currency";

interface PricingClientWrapperProps {
  bundleTiers: ProductWithPrice[];
  platformTiers: ProductWithPrice[];
  currentAccess: string | null;
  userId: string | null;
  convergenceSavings: number;
  convergenceSavingsPercent: number;
  individualTrackTotal: number;
}

function formatPrice(amount: number, currency: SupportedCurrency): string {
  const noDecimalCurrencies = ["JPY"];
  const minimumFractionDigits = noDecimalCurrencies.includes(currency) ? 0 : 0;
  const maximumFractionDigits = noDecimalCurrencies.includes(currency) ? 0 : 0;
  
  // Round to sensible price points
  let roundedAmount = amount;
  if (currency === "JPY") {
    roundedAmount = Math.round(amount / 100) * 100;
  } else if (currency === "INR") {
    roundedAmount = Math.round(amount / 10) * 10;
  } else {
    roundedAmount = Math.round(amount);
  }
  
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(roundedAmount);
}

export function PricingClientWrapper({
  bundleTiers,
  platformTiers,
  currentAccess,
  userId,
  convergenceSavings,
  convergenceSavingsPercent,
  individualTrackTotal,
}: PricingClientWrapperProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>("GBP");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ GBP: 1 });

  const handleCurrencyChange = useCallback((currency: SupportedCurrency, rates: Record<string, number>) => {
    setSelectedCurrency(currency);
    setExchangeRates(rates);
  }, []);

  const convertAmount = (gbpAmount: number): number => {
    const rate = exchangeRates[selectedCurrency] || 1;
    return gbpAmount * rate;
  };

  const getConvertedPrice = (gbpAmount: number): string => {
    return formatPrice(convertAmount(gbpAmount), selectedCurrency);
  };

  const fullProduct = bundleTiers.find(p => p.key === "full");

  return (
    <>
      {/* Currency Selector */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span>Prices shown in:</span>
        </div>
        <CurrencySelector onCurrencyChange={handleCurrencyChange} />
      </div>

      {/* Value Comparison Banner */}
      {convergenceSavings > 0 && fullProduct && (
        <div className="mb-12 rounded-none border-2 border-swiss-red bg-swiss-red/5 p-8 dark:bg-swiss-red/10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-swiss-red bg-white px-4 py-2 text-sm font-bold text-swiss-red dark:bg-neutral-900">
              <Sparkles className="h-4 w-4" />
              Best Value
            </div>
            <h2 className="mb-4 text-2xl font-bold">
              <span className="text-swiss-red">Convergence: All-Access</span> = Everything Included
            </h2>
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              Get complete access to all Design, Engineering, and exclusive Convergence content across Web, iOS, and Android 
              — at a fraction of the cost of buying tracks individually.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-none border border-neutral-300 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
                <p className="mb-2 text-sm font-medium text-neutral-500">Individual Tracks Total</p>
                <p className="mb-1 text-3xl font-bold line-through opacity-50">
                  {getConvertedPrice(individualTrackTotal)}
                </p>
                <p className="text-xs text-neutral-500">
                  Buying all 6 platform tracks separately
                </p>
              </div>
              <div className="rounded-none border-2 border-swiss-red bg-white p-6 dark:bg-neutral-900">
                <p className="mb-2 text-sm font-medium text-swiss-red">Convergence All-Access Price</p>
                <p className="mb-1 text-3xl font-bold text-swiss-red">
                  {getConvertedPrice(fullProduct.price)}
                </p>
                <p className="text-xs font-bold text-green-600 dark:text-green-400">
                  SAVE {convergenceSavingsPercent}% ({getConvertedPrice(convergenceSavings)})
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
              💡 <strong>Students save even more</strong> — scroll down for 30% off
            </div>
          </div>
        </div>
      )}

      {/* Bundle Pricing Cards (Design Full, Engineering Full, Convergence) */}
      <div className="mb-8">
        <h2 className="mb-6 text-center text-xl font-bold">
          Recommended: Full Track Access
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {bundleTiers.map((product) => (
            <BundleCard
              key={product.key}
              product={product}
              currentAccess={currentAccess}
              userId={userId}
              convertedPrice={getConvertedPrice(product.price)}
              currency={selectedCurrency}
            />
          ))}
        </div>
      </div>

      {/* Individual Platform Tracks */}
      {platformTiers.length > 0 && (
        <div className="mb-16 mt-16">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold">
              Or choose a single platform
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Focus on one platform if you know exactly what you need
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformTiers.map((product) => (
              <PlatformTierCard
                key={product.key}
                product={product}
                currentAccess={currentAccess}
                userId={userId}
                convertedPrice={getConvertedPrice(product.price)}
                currency={selectedCurrency}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
