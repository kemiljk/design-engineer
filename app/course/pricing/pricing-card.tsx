"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
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
            <Star className="h-3 w-3 fill-current" />
            Best Value - Save Big!
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {product.description}
        </p>
        {product.key === "full" && (
          <div className="mt-3 rounded-none border border-green-600 bg-green-50 px-3 py-2 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            🎉 Complete course access - Design + Engineering + Convergence across all platforms!
          </div>
        )}
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

interface PlatformTierCardProps {
  product: ProductWithPrice;
  currentAccess: string | null;
  userId: string | null;
}

export function PlatformTierCard({ product, currentAccess, userId }: PlatformTierCardProps) {
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
    <div className="rounded-none border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="mb-1 font-bold">{product.name}</h3>
      <p className="mb-3 text-sm text-neutral-500">{product.description}</p>
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
