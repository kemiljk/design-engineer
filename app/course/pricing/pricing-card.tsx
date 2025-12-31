"use client";

import { useState } from "react";
import { Check, StarSolid, Crown } from "iconoir-react";
import { cn } from "@/lib/utils";
import type { ProductWithPrice } from "@/lib/types";

interface PricingCardProps {
  product: ProductWithPrice;
  currentAccess: string | null;
  userId: string | null;
}

export function PricingCard({ product, currentAccess, userId }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isOwned = currentAccess === product.key || currentAccess === "full";
  
  const handlePurchase = async () => {
    if (!userId) {
      window.location.href = `/sign-in?redirect_url=/course/pricing`;
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/course/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey: product.key }),
      });
      
      const data = await response.json();
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-none border bg-white p-6 dark:bg-neutral-900",
        product.popular
          ? "border-swiss-red shadow-lg"
          : "border-neutral-200 dark:border-neutral-800"
      )}
    >
      {product.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-swiss-red px-3 py-1 text-xs font-medium text-white">
            <StarSolid className="h-3 w-3 fill-current" />
            Best Value
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold">{product.formattedPrice}</span>
      </div>

      <ul className="mb-6 flex-1 space-y-3">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-swiss-red" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handlePurchase}
        disabled={isOwned || isLoading}
        className={cn(
          "w-full rounded-none px-6 py-3 font-medium transition-colors",
          product.popular
            ? "bg-swiss-red text-white hover:bg-neutral-900 disabled:opacity-50 dark:hover:bg-white dark:hover:text-black"
            : "border border-neutral-200 hover:border-swiss-red hover:text-swiss-red disabled:opacity-50 dark:border-neutral-700"
        )}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </span>
        ) : isOwned ? (
          "Already Owned"
        ) : !userId ? (
          "Sign in to Purchase"
        ) : (
          `Get ${product.name}`
        )}
      </button>
    </div>
  );
}

// Bundle Card for track bundles (Design Full, Engineering Full, Convergence)
interface BundleCardProps {
  product: ProductWithPrice;
  currentAccess: string | null;
  userId: string | null;
}

export function BundleCard({ product, currentAccess, userId }: BundleCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user has this or higher access
  const isOwned = currentAccess === product.key || currentAccess === "full" ||
    (product.key === "design_full" && ["design_web", "design_ios", "design_android"].every(k => currentAccess === k)) ||
    (product.key === "engineering_full" && ["engineering_web", "engineering_ios", "engineering_android"].every(k => currentAccess === k));
  
  const handlePurchase = async () => {
    if (!userId) {
      window.location.href = `/sign-in?redirect_url=/course/pricing`;
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/course/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey: product.key }),
      });
      
      const data = await response.json();
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isConvergence = product.key === "full";

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-none border bg-white p-6 dark:bg-neutral-900",
        isConvergence
          ? "border-2 border-swiss-red shadow-lg"
          : "border-neutral-200 dark:border-neutral-800"
      )}
    >
      {isConvergence && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-swiss-red px-4 py-1 text-xs font-bold text-white">
            <Crown className="h-3 w-3" />
            EVERYTHING INCLUDED
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>
        {isConvergence && (
          <div className="mt-3 rounded-none border border-swiss-red/30 bg-swiss-red/[0.025] px-3 py-2 text-xs font-medium text-swiss-red">
            ✨ Includes exclusive Convergence content not available elsewhere
          </div>
        )}
      </div>

      <div className="mb-6">
        <span className={cn(
          "text-4xl font-bold",
          isConvergence && "text-swiss-red"
        )}>
          {product.formattedPrice}
        </span>
        <p className="mt-1 text-xs text-neutral-500">One-time payment · Lifetime access</p>
      </div>

      <ul className="mb-6 flex-1 space-y-2">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-swiss-red" />
            <span className={feature.startsWith("✨") ? "font-medium" : ""}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={handlePurchase}
        disabled={isOwned || isLoading}
        className={cn(
          "w-full rounded-none px-6 py-3 font-medium transition-colors",
          isConvergence
            ? "bg-swiss-red text-white hover:bg-neutral-900 disabled:opacity-50 dark:hover:bg-white dark:hover:text-black"
            : "border-2 border-neutral-900 bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-900 dark:hover:text-white"
        )}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </span>
        ) : isOwned ? (
          "Already Owned"
        ) : !userId ? (
          "Sign in to Purchase"
        ) : isConvergence ? (
          "Get Everything"
        ) : (
          `Get ${product.name}`
        )}
      </button>
    </div>
  );
}

interface PlatformTierCardProps {
  product: ProductWithPrice;
  currentAccess: string | null;
  userId: string | null;
}

export function PlatformTierCard({ product, currentAccess, userId }: PlatformTierCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user owns this specific track or a higher tier that includes it
  const isOwned = currentAccess === product.key || 
    currentAccess === "full" ||
    (product.key.startsWith("design_") && currentAccess === "design_full") ||
    (product.key.startsWith("engineering_") && currentAccess === "engineering_full");
  
  const handlePurchase = async () => {
    if (!userId) {
      window.location.href = `/sign-in?redirect_url=/course/pricing`;
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/course/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey: product.key }),
      });
      
      const data = await response.json();
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine track type for styling
  const isDesign = product.key.startsWith("design_");
  const platform = product.key.includes("web") ? "Web" : product.key.includes("ios") ? "iOS" : "Android";

  return (
    <div className="rounded-none border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-2 flex items-center gap-2">
        <span className={cn(
          "rounded-none px-2 py-0.5 text-xs font-medium",
          isDesign 
            ? "bg-swiss-red/10 text-swiss-red" 
            : "bg-neutral-900/10 text-neutral-900 dark:bg-white/10 dark:text-white"
        )}>
          {isDesign ? "Design" : "Engineering"}
        </span>
        <span className="text-xs text-neutral-400">{platform}</span>
      </div>
      <h3 className="mb-1 font-bold">{product.name}</h3>
      <p className="mb-3 text-xs text-neutral-500">{product.description}</p>
      <div className="mb-4">
        <span className="text-2xl font-bold">{product.formattedPrice}</span>
      </div>
      <button
        onClick={handlePurchase}
        disabled={isOwned || isLoading}
        className="w-full rounded-none border border-neutral-200 px-4 py-2 text-sm font-medium transition-colors hover:border-swiss-red hover:text-swiss-red disabled:opacity-50 dark:border-neutral-700"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        ) : isOwned ? (
          "Owned"
        ) : (
          "Get Access"
        )}
      </button>
    </div>
  );
}
