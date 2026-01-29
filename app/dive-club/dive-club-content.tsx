"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { claimDiveClubDiscount } from "./actions";
import { ArrowRight, Check } from "iconoir-react";
import { cn } from "@/lib/utils";
import type { ProductKey } from "@/lib/types";

interface DiveClubContentProps {
  totalLessons: number;
}

export function DiveClubContent({ totalLessons }: DiveClubContentProps) {
  const { isSignedIn } = useUser();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [purchasingProduct, setPurchasingProduct] = useState<string | null>(
    null,
  );

  // Products definition using the prop
  const products = [
    {
      key: "full" as ProductKey,
      name: "Convergence: All-Access",
      description:
        "Everything included — all tracks, all platforms, plus exclusive content",
      price: 599,
      features: [
        `✨ ALL ${totalLessons}+ LESSONS`,
        "Complete Design Track",
        "Complete Engineering Track",
        "Exclusive Convergence content",
      ],
      popular: true,
    },
    {
      key: "engineering_full" as ProductKey,
      name: "Engineering: Full Access",
      description: "Complete Engineering Track across all platforms",
      price: 349,
      features: [
        "All Engineering lessons",
        "Web: React & Next.js",
        "iOS: Swift & SwiftUI",
        "Android: Kotlin & Compose",
      ],
      popular: false,
    },
    {
      key: "design_full" as ProductKey,
      name: "Design: Full Access",
      description: "Complete Design Track across all platforms",
      price: 299,
      features: [
        "All Design lessons",
        "Visual design fundamentals",
        "Platform patterns (HIG, Material)",
        "Design systems",
      ],
      popular: false,
    },
  ];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const emailVal = formData.get("email") as string;
    setEmail(emailVal);

    // Artificial delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = await claimDiveClubDiscount(formData);
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.code) {
      setDiscountCode(result.code);
      setIsLoading(false);
    } else {
      // Fallback error
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  const handlePurchase = async (productKey: ProductKey) => {
    if (!discountCode) return;
    setPurchasingProduct(productKey);

    // If not signed in, redirect to sign-up with return URL
    if (!isSignedIn) {
      const returnUrl = `/course/pricing?discount=${discountCode}&product=${productKey}&auto_checkout=true`;

      // Pass email_address to Clerk's sign-up page
      const signUpUrl = `/sign-up?redirect_url=${encodeURIComponent(returnUrl)}&email_address=${encodeURIComponent(email)}`;

      window.location.href = signUpUrl;
      return;
    }

    // If signed in, go directly to checkout API
    try {
      const response = await fetch("/api/course/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey, discountCode }),
      });
      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError("Failed to start checkout. Please try again.");
        setPurchasingProduct(null);
      }
    } catch {
      setError("Failed to start checkout. Please try again.");
      setPurchasingProduct(null);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-y-auto bg-neutral-50 font-sans text-neutral-900 dark:bg-black dark:text-white">
      {/* Vertical grid lines - positioned so a line falls at viewport center */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px)",
          backgroundSize: "32px 100%",
          backgroundPosition: "calc(50% - 16px) 0",
        }}
      />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-8">
        {/* Narrow container for form, wide for product cards */}
        <div
          className={discountCode ? "w-full max-w-4xl" : "w-[448px] max-w-full"}
        >
          {/* Header */}
          <div className="mx-auto mb-8 max-w-md text-center">
            <div className="bg-swiss-red mb-8 inline-flex h-16 w-16 items-center justify-center text-white">
              <img src="/dive-logo.svg" alt="Dive Club" className="h-8 w-8" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Dive Club Exclusive
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Welcome, Dive Club member. Unlock your exclusive 10% discount on
              any Design Engineer course package.
            </p>
          </div>

          {!discountCode ? (
            <div className="relative w-full border border-neutral-200 bg-white p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
              {/* Decorative Corner */}
              <div className="border-swiss-red absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2" />
              <div className="border-swiss-red absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2" />

              <form onSubmit={onSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block h-8 text-xs font-bold tracking-wider text-neutral-500 uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="you@example.com"
                    className="focus:border-swiss-red h-16 w-full rounded-none border-2 border-transparent bg-neutral-100 px-4 font-medium transition-all outline-none focus:ring-0 dark:bg-neutral-800"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="hover:bg-swiss-red dark:hover:bg-swiss-red flex h-16 w-full items-center justify-center gap-2 bg-black font-bold tracking-wide text-white uppercase shadow-lg transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
                >
                  {isLoading ? "Unlocking..." : "Unlock Discount"}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="mt-8 h-8 text-center text-xs text-neutral-400">
                Discount applies to all course tiers.
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
              <div className="mx-auto max-w-md border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-900/20">
                <p className="flex items-center justify-center gap-2 font-medium text-green-700 dark:text-green-400">
                  <Check className="h-5 w-5" />
                  Discount Unlocked:{" "}
                  <span className="font-mono font-bold">{discountCode}</span>
                </p>
                <p className="mt-1 text-xs text-green-600 dark:text-green-500">
                  (Automatically applied below)
                </p>
              </div>
              {/* 3 cards × 320px (10 grid columns) + 2 gaps × 32px = 1024px = 32 grid units */}
              <div className="flex flex-col justify-center gap-8 md:flex-row">
                {products.map((product) => (
                  <div
                    key={product.key}
                    style={{ width: 320 }}
                    className={cn(
                      "relative flex shrink-0 flex-col border bg-white p-6 dark:bg-neutral-900",
                      product.popular
                        ? "border-swiss-red shadow-lg"
                        : "border-neutral-200 dark:border-neutral-800",
                    )}
                  >
                    {product.popular && (
                      <div className="bg-swiss-red absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                        Best Value
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {product.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          £{Math.round(product.price * 0.9)}
                        </span>
                        <span className="text-lg text-neutral-400 line-through">
                          £{product.price}
                        </span>
                      </div>
                      <p className="text-swiss-red mt-1 text-xs font-medium">
                        10% Dive Club Savings
                      </p>
                    </div>

                    <ul className="mb-8 flex-1 space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="text-swiss-red mt-0.5 h-4 w-4 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePurchase(product.key)}
                      disabled={purchasingProduct === product.key}
                      className={cn(
                        "w-full py-3 text-sm font-medium tracking-wide uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                        product.popular
                          ? "bg-swiss-red text-white hover:bg-black dark:hover:bg-white dark:hover:text-black"
                          : "border border-neutral-300 hover:border-black dark:border-neutral-700 dark:hover:border-white",
                      )}
                    >
                      {purchasingProduct === product.key
                        ? "Redirecting..."
                        : isSignedIn
                          ? "Get Access"
                          : "Create Account & Get Access"}
                    </button>
                  </div>
                ))}
              </div>

              <p className="mx-auto max-w-lg text-center text-sm text-neutral-500">
                Looking for individual platform tracks?{" "}
                <a
                  href="/course/pricing"
                  className="hover:text-swiss-red underline"
                >
                  View full pricing
                </a>
                . (You can use code <strong>{discountCode}</strong> at checkout
                there too).
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
