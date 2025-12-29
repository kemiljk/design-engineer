"use client";

import { Sparkles } from "lucide-react";
import { PlatformTierCard, BundleCard } from "./pricing-card";
import type { ProductWithPrice } from "@/lib/types";

interface PricingClientWrapperProps {
  bundleTiers: ProductWithPrice[];
  platformTiers: ProductWithPrice[];
  currentAccess: string | null;
  userId: string | null;
  convergenceSavings: number;
  convergenceSavingsPercent: number;
  individualTrackTotal: number;
}

function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
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
  const fullProduct = bundleTiers.find(p => p.key === "full");

  return (
    <>
      {/* Value Comparison Banner */}
      {convergenceSavings > 0 && fullProduct && (
        <div className="mb-12 rounded-none border-2 border-swiss-red bg-swiss-red/[0.025] p-8 dark:bg-swiss-red/5">
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
                  {formatGBP(individualTrackTotal)}
                </p>
                <p className="text-xs text-neutral-500">
                  Buying all 6 platform tracks separately
                </p>
              </div>
              <div className="rounded-none border-2 border-swiss-red bg-white p-6 dark:bg-neutral-900">
                <p className="mb-2 text-sm font-medium text-swiss-red">Convergence All-Access Price</p>
                <p className="mb-1 text-3xl font-bold text-swiss-red">
                  {fullProduct.formattedPrice}
                </p>
                <p className="text-xs font-bold text-green-600 dark:text-green-400">
                  SAVE {convergenceSavingsPercent}% ({formatGBP(convergenceSavings)})
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
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
