"use client";

import { useState } from "react";
import { claimDiveClubDiscount } from "./actions";
import { Sparks, ArrowRight, Check } from "iconoir-react";
import { cn } from "@/lib/utils";

// Hardcoded for display purposes, matching the main pricing page logic roughly
const PRODUCTS = [
  {
    key: "full",
    name: "Convergence: All-Access",
    description: "Everything included — all tracks, all platforms, plus exclusive content",
    price: 599,
    variantId: process.env.NEXT_PUBLIC_LEMON_PRODUCT_FULL,
    features: ["✨ ALL 156+ LESSONS", "Complete Design Track", "Complete Engineering Track", "Exclusive Convergence content"],
    popular: true
  },
  {
    key: "engineering_full",
    name: "Engineering: Full Access",
    description: "Complete Engineering Track across all platforms",
    price: 349,
    variantId: process.env.NEXT_PUBLIC_LEMON_PRODUCT_ENGINEERING_FULL,
    features: ["All Engineering lessons", "Web: React & Next.js", "iOS: Swift & SwiftUI", "Android: Kotlin & Compose"],
    popular: false
  },
  {
    key: "design_full",
    name: "Design: Full Access",
    description: "Complete Design Track across all platforms",
    price: 299,
    variantId: process.env.NEXT_PUBLIC_LEMON_PRODUCT_DESIGN_FULL,
    features: ["All Design lessons", "Visual design fundamentals", "Platform patterns (HIG, Material)", "Design systems"],
    popular: false
  }
];

export default function DiveClubPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await claimDiveClubDiscount(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.code) {
      setDiscountCode(result.code);
      setIsLoading(false);
    }
  }

  const handlePurchase = (variantId: string | undefined) => {
    if (!variantId || !discountCode) return;
    window.location.href = `https://designengineer.lemonsqueezy.com/checkout/buy/${variantId}?discount=${discountCode}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black font-sans text-neutral-900 dark:text-white flex flex-col relative overflow-y-auto">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none fixed" />

      <main className="flex-1 flex flex-col items-center justify-start p-6 relative z-10 pt-20 pb-20">
        <div className="max-w-4xl w-full">
          
          {/* Header */}
          <div className="mb-12 text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-swiss-red text-white mb-6">
              <Sparks className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Dive Club Exclusive
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Welcome, Dive Club member. Unlock your exclusive 10% discount on any Design Engineer course package.
            </p>
          </div>

          {!discountCode ? (
            <div className="max-w-md mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 shadow-xl relative">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-swiss-red" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-swiss-red" />

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-neutral-100 dark:bg-neutral-800 border-none px-4 py-3 rounded-none focus:ring-2 focus:ring-swiss-red outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-wide hover:bg-swiss-red dark:hover:bg-swiss-red hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? "Unlocking..." : "Unlock Discount"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              
              <p className="mt-4 text-xs text-center text-neutral-400">
                Discount applies to all course tiers.
              </p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 max-w-md mx-auto">
                <p className="text-green-700 dark:text-green-400 font-medium flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Discount Unlocked: <span className="font-mono font-bold">{discountCode}</span>
                </p>
                <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                  (Automatically applied below)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRODUCTS.map((product) => (
                  <div 
                    key={product.key}
                    className={cn(
                      "flex flex-col bg-white dark:bg-neutral-900 border p-6 relative",
                      product.popular 
                        ? "border-swiss-red shadow-lg scale-105 z-10" 
                        : "border-neutral-200 dark:border-neutral-800 opacity-90 hover:opacity-100 transition-opacity"
                    )}
                  >
                    {product.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-swiss-red text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                        Best Value
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{product.description}</p>
                    </div>

                    <div className="mb-6">
                       <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">£{Math.round(product.price * 0.9)}</span>
                        <span className="text-lg text-neutral-400 line-through">£{product.price}</span>
                       </div>
                       <p className="text-xs text-swiss-red font-medium mt-1">10% Dive Club Savings</p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-swiss-red shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePurchase(product.variantId)}
                      className={cn(
                        "w-full py-3 font-medium text-sm uppercase tracking-wide transition-colors",
                        product.popular
                          ? "bg-swiss-red text-white hover:bg-black dark:hover:bg-white dark:hover:text-black"
                          : "border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white"
                      )}
                    >
                      Get Access
                    </button>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-sm text-neutral-500 max-w-lg mx-auto">
                 Looking for individual platform tracks? <a href="/course/pricing" className="underline hover:text-swiss-red">View full pricing</a>. 
                 (You can use code <strong>{discountCode}</strong> at checkout there too).
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
