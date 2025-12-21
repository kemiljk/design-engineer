"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import { Lock, Sparkles, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductKey, ProductWithPrice } from "@/lib/types";

interface UpgradePromptProps {
  currentLessonPath: string;
  requiredAccess: ProductKey;
  trackProduct?: ProductWithPrice | null;
  fullProduct?: ProductWithPrice | null;
}

export function UpgradePrompt({
  currentLessonPath,
  requiredAccess,
  trackProduct,
  fullProduct,
}: UpgradePromptProps) {
  const { isSignedIn, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductKey>(
    requiredAccess === "full" ? "full" : requiredAccess
  );

  const handleCheckout = async () => {
    setError(null);
    
    // If not signed in, redirect to sign-up with return URL
    if (isLoaded && !isSignedIn) {
      const returnUrl = `/course/${currentLessonPath}?checkout=${selectedProduct}`;
      window.location.href = `/sign-up?redirect_url=${encodeURIComponent(returnUrl)}`;
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/course/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey: selectedProduct }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.error) {
        setError(data.error);
        setIsLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };
  
  // Auto-trigger checkout if returning from sign-up with checkout param
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const params = new URLSearchParams(window.location.search);
    const checkoutProduct = params.get("checkout") as ProductKey | null;
    
    if (checkoutProduct && isLoaded && isSignedIn) {
      setSelectedProduct(checkoutProduct);
      // Clean up URL and trigger checkout
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
      
      // Trigger checkout after a brief delay
      const timer = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/course/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productKey: checkoutProduct }),
          });
          const data = await response.json();
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          }
        } catch {
          setError("Something went wrong. Please try again.");
          setIsLoading(false);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn]);

  const getTrackFromPath = (path: string): string => {
    if (path.includes("design-track")) return "Design";
    if (path.includes("engineering-track")) return "Engineering";
    if (path.includes("convergence")) return "Full Course";
    return "Course";
  };

  const getPlatformFromPath = (path: string): string => {
    if (path.includes("/web/")) return "Web";
    if (path.includes("/ios/")) return "iOS";
    if (path.includes("/android/")) return "Android";
    return "";
  };

  const track = getTrackFromPath(currentLessonPath);
  const platform = getPlatformFromPath(currentLessonPath);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl rounded-none border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="mb-6 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center bg-swiss-red text-white">
          <Lock className="h-8 w-8" />
        </div>
      </div>

      <h2 className="mb-2 text-center text-2xl font-bold">
        Unlock {track} {platform && `(${platform})`}
      </h2>
      <p className="mb-8 text-center text-neutral-600 dark:text-neutral-400">
        This lesson requires a paid subscription. Choose your access level below
        to continue learning.
      </p>

      <div className="mb-6 space-y-3">
        {requiredAccess !== "full" && trackProduct && (
          <button
            onClick={() => setSelectedProduct(requiredAccess)}
            className={cn(
              "flex w-full items-center justify-between rounded-none border p-4 text-left transition-all",
              selectedProduct === requiredAccess
                ? "border-swiss-red bg-swiss-red/5"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700"
            )}
          >
            <div>
              <div className="font-semibold">
                {track} Track ({platform})
              </div>
              <div className="text-sm text-neutral-500">
                All {track.toLowerCase()} lessons for {platform}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{trackProduct.formattedPrice}</div>
              <div className="text-xs text-neutral-500">one-time</div>
            </div>
          </button>
        )}

        {fullProduct && (
          <button
            onClick={() => setSelectedProduct("full")}
            className={cn(
              "relative flex w-full items-center justify-between rounded-none border p-4 text-left transition-all",
              selectedProduct === "full"
                ? "border-swiss-red bg-swiss-red/5"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700"
            )}
          >
            <div className="absolute -top-3 left-4">
              <span className="flex items-center gap-1 bg-swiss-red px-2 py-0.5 text-xs font-medium text-white">
                <Sparkles className="h-3 w-3" />
                Best Value
              </span>
            </div>
            <div>
              <div className="font-semibold">Convergence: All-Access Pass</div>
              <div className="text-sm text-neutral-500">
                EVERYTHING - All Design + Engineering + Convergence tracks, all platforms
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{fullProduct.formattedPrice}</div>
              <div className="text-xs text-neutral-500">one-time</div>
            </div>
          </button>
        )}
      </div>

      <div className="mb-6 bg-neutral-100 p-4 dark:bg-neutral-800">
        <h4 className="mb-3 font-semibold">What&apos;s included:</h4>
        <ul className="space-y-2 text-sm">
          {selectedProduct === "full" && fullProduct ? (
            fullProduct.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-swiss-red" />
                {feature}
              </li>
            ))
          ) : trackProduct ? (
            trackProduct.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-swiss-red" />
                {feature}
              </li>
            ))
          ) : (
            <>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-swiss-red" />
                All {track.toLowerCase()} lessons for {platform}
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-swiss-red" />
                Practical exercises and projects
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-swiss-red" />
                Lifetime access + future updates
              </li>
            </>
          )}
        </ul>
      </div>

      {error && (
        <div className="mb-4 rounded-none border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isLoading || !isLoaded}
        className="flex w-full items-center justify-center gap-2 bg-swiss-red px-6 py-4 font-semibold text-white transition-all hover:bg-neutral-900 disabled:opacity-50 dark:hover:bg-white dark:hover:text-black"
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : isLoaded && !isSignedIn ? (
          <>
            Sign Up to Purchase
            <ArrowRight className="h-5 w-5" />
          </>
        ) : (
          <>
            Get Access Now
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-neutral-500">
        Secure payment via LemonSqueezy. 14-day money-back guarantee.
      </p>
    </motion.div>
  );
}
