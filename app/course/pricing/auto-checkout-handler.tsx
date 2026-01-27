"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import type { ProductKey } from "@/lib/types";

/**
 * This component handles auto-checkout when a user returns from sign-up
 * with discount and product parameters in the URL (from Dive Club or DDG pages).
 */
export function AutoCheckoutHandler() {
  const { isSignedIn, isLoaded } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLoaded || !isSignedIn) return;
    if (isProcessing) return;

    const params = new URLSearchParams(window.location.search);
    const discount = params.get("discount");
    const product = params.get("product") as ProductKey | null;
    const autoCheckout = params.get("auto_checkout");

    // Only trigger if we have the right params
    if (!discount || !product || autoCheckout !== "true") return;

    // Clean up URL immediately
    window.history.replaceState({}, "", window.location.pathname);

    // Trigger checkout
    setIsProcessing(true);
    
    const triggerCheckout = async () => {
      try {
        const response = await fetch("/api/course/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productKey: product, discountCode: discount }),
        });
        const data = await response.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          setError("Failed to start checkout. Your discount code is: " + discount);
          setIsProcessing(false);
        }
      } catch {
        setError("Failed to start checkout. Your discount code is: " + discount);
        setIsProcessing(false);
      }
    };

    // Small delay to ensure page is ready
    const timer = setTimeout(triggerCheckout, 300);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, isProcessing]);

  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-swiss-red border-t-transparent" />
          <p className="text-lg font-medium">Preparing your checkout...</p>
          <p className="text-sm text-neutral-500">You&apos;ll be redirected shortly.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8 rounded-none border border-yellow-200 bg-yellow-50 p-4 text-center dark:border-yellow-800 dark:bg-yellow-950/30">
        <p className="text-yellow-800 dark:text-yellow-200">
          {error}
        </p>
        <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
          You can apply this code manually when checking out below.
        </p>
      </div>
    );
  }

  return null;
}
