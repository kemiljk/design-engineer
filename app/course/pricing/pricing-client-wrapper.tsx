"use client";

import { Crown } from "iconoir-react";
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

// Check if user already owns a specific product based on their access level
function isProductOwned(productKey: string, currentAccess: string | null): boolean {
  if (!currentAccess || currentAccess === "free") return false;
  if (currentAccess === "full") return true;
  
  // Direct match
  if (currentAccess === productKey) return true;
  
  // If user has design_full, they own all design_* products
  if (currentAccess === "design_full" && productKey.startsWith("design_")) return true;
  
  // If user has engineering_full, they own all engineering_* products
  if (currentAccess === "engineering_full" && productKey.startsWith("engineering_")) return true;
  
  return false;
}

// Check if a bundle would be a meaningful upgrade
function isBundleRelevant(bundleKey: string, currentAccess: string | null): boolean {
  if (!currentAccess || currentAccess === "free") return true;
  if (currentAccess === "full") return false;
  
  // If user has design_full, don't show design_full again, but show engineering_full and full
  if (currentAccess === "design_full") {
    return bundleKey === "engineering_full" || bundleKey === "full";
  }
  
  // If user has engineering_full, don't show engineering_full again, but show design_full and full
  if (currentAccess === "engineering_full") {
    return bundleKey === "design_full" || bundleKey === "full";
  }
  
  // If user has a single platform track (e.g., design_web), show all bundles
  return true;
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
  
  // Filter bundles to only show relevant upsells
  const relevantBundles = bundleTiers.filter(p => isBundleRelevant(p.key, currentAccess));
  
  // Filter platform tiers to only show ones user doesn't own
  const availablePlatformTiers = platformTiers.filter(p => !isProductOwned(p.key, currentAccess));
  
  // Check if user has any paid access (for messaging)
  const hasPartialAccess = currentAccess && currentAccess !== "free" && currentAccess !== "full";
  
  // Don't show value comparison banner if user already has significant access
  const showValueBanner = convergenceSavings > 0 && fullProduct && !hasPartialAccess;

  return (
    <>
      {/* Value Comparison Banner - only for new users */}
      {showValueBanner && (
        <div className="mb-12 rounded-none border-2 border-swiss-red bg-swiss-red/[0.025] p-8 dark:bg-swiss-red/5">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-swiss-red bg-white px-4 py-2 text-sm font-bold text-swiss-red dark:bg-neutral-900">
              <Crown className="h-4 w-4" />
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

      {/* Bundle Pricing Cards - filtered to relevant upsells */}
      {relevantBundles.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-6 text-center text-xl font-bold">
            {hasPartialAccess ? "Upgrade Your Access" : "Recommended: Full Track Access"}
          </h2>
          <div className={`grid gap-8 ${relevantBundles.length === 1 ? "max-w-md mx-auto" : relevantBundles.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"}`}>
            {relevantBundles.map((product) => (
              <BundleCard
                key={product.key}
                product={product}
                currentAccess={currentAccess}
                userId={userId}
              />
            ))}
          </div>
        </div>
      )}

      {/* Individual Platform Tracks - only show tracks user doesn't own */}
      {availablePlatformTiers.length > 0 && (
        <div className="mb-16 mt-16">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold">
              {hasPartialAccess ? "Or add individual platforms" : "Or choose a single platform"}
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              {hasPartialAccess 
                ? "Expand your access with additional platform tracks"
                : "Focus on one platform if you know exactly what you need"
              }
            </p>
          </div>
          <div className={`grid gap-4 ${availablePlatformTiers.length <= 2 ? "sm:grid-cols-2 max-w-2xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {availablePlatformTiers.map((product) => (
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
