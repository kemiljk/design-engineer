import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { PricingCard, PlatformTierCard } from "./pricing-card";
import { StudentDiscountForm } from "./student-discount-form";
import { getUserEnrollment } from "@/lib/course";
import { getProductsWithPrices } from "@/lib/lemonsqueezy";
import type { ProductWithPrice } from "@/lib/types";

export const metadata: Metadata = {
  title: "Pricing | Design Engineer Course",
  description: "Choose your path to becoming a Design Engineer. Flexible pricing for individuals and teams.",
};

const MAIN_TIER_KEYS = ["design_web", "engineering_web", "full"] as const;
const PLATFORM_TIER_KEYS = ["design_ios", "design_android", "engineering_ios", "engineering_android"] as const;

export default async function PricingPage() {
  const { userId } = await auth();
  let currentAccess: string | null = null;
  
  if (userId) {
    const enrollment = await getUserEnrollment(userId);
    currentAccess = enrollment?.metadata.access_level || null;
  }

  const allProducts = await getProductsWithPrices();
  
  const mainTiers = MAIN_TIER_KEYS
    .map(key => allProducts.find(p => p.key === key))
    .filter((p): p is ProductWithPrice => p !== undefined);
    
  const platformTiers = PLATFORM_TIER_KEYS
    .map(key => allProducts.find(p => p.key === key))
    .filter((p): p is ProductWithPrice => p !== undefined);

  const fullProduct = allProducts.find(p => p.key === "full");
  const individualTotal = allProducts
    .filter(p => p.key !== "full")
    .reduce((sum, p) => sum + p.price, 0);
  const savings = individualTotal > 0 && fullProduct ? individualTotal - fullProduct.price : 0;
  const savingsPercent = individualTotal > 0 && fullProduct 
    ? Math.round((savings / individualTotal) * 100) 
    : 0;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link
          href="/course"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Invest in Your Future
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Choose the path that fits your goals. All plans include lifetime access 
            and a 14-day money-back guarantee.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-swiss-red bg-swiss-red/5 px-6 py-3 text-sm font-medium text-swiss-red dark:bg-swiss-red/10">
            <Sparkles className="h-4 w-4" />
            <span>Best Value: Convergence includes ALL tracks + exclusive advanced content</span>
          </div>
        </div>

        {/* Current Access Banner */}
        {currentAccess && currentAccess !== "free" && (
          <div className="mb-8 rounded-none border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950/30">
            <p className="text-green-800 dark:text-green-200">
              <Check className="mr-2 inline h-4 w-4" />
              You have <strong>{currentAccess === "full" ? "Full Access" : currentAccess}</strong>. 
              Thank you for being a student!
            </p>
          </div>
        )}

        {/* Value Comparison */}
        {savings > 0 && (
          <div className="mb-12 rounded-none border-2 border-swiss-red bg-swiss-red/5 p-8 dark:bg-swiss-red/10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-2xl font-bold">
                <span className="text-swiss-red">Convergence All-Access</span> = Everything Included
              </h2>
              <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                Get complete access to all Design, Engineering, and Convergence content across Web, iOS, and Android 
                - at a fraction of the cost of buying tracks individually.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-none border border-neutral-300 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
                  <p className="mb-2 text-sm font-medium text-neutral-500">Individual Tracks Total</p>
                  <p className="mb-1 text-3xl font-bold line-through opacity-50">
                    {new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(individualTotal)}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Buying all 6 tracks separately
                  </p>
                </div>
                <div className="rounded-none border-2 border-swiss-red bg-white p-6 dark:bg-neutral-900">
                  <p className="mb-2 text-sm font-medium text-swiss-red">Convergence All-Access Price</p>
                  <p className="mb-1 text-3xl font-bold text-swiss-red">
                    {fullProduct?.formattedPrice}
                  </p>
                  <p className="text-xs font-bold text-green-600 dark:text-green-400">
                    SAVE {savingsPercent}% (
                    {new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(savings)})
                  </p>
                </div>
              </div>
              <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
                💡 <strong>Students save even more</strong> - email us for a 30% discount code
              </div>
            </div>
          </div>
        )}

        {/* Main Pricing Cards */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {mainTiers.map((product) => (
            <PricingCard
              key={product.key}
              product={product}
              currentAccess={currentAccess}
              userId={userId}
            />
          ))}
        </div>

        {/* Platform-specific tiers */}
        {platformTiers.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-6 text-center text-xl font-bold">
              Or choose a specific platform
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Student Discount Form */}
        <div className="mb-8">
          <StudentDiscountForm />
        </div>

        {/* Guarantee */}
        <div className="rounded-none border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-swiss-red/10">
            <Sparkles className="h-6 w-6 text-swiss-red" />
          </div>
          <h2 className="mb-2 text-xl font-bold">14-Day Money-Back Guarantee</h2>
          <p className="mx-auto max-w-xl text-neutral-600 dark:text-neutral-400">
            Try the course risk-free. If you&apos;re not completely satisfied within 14 days 
            of purchase, email us and we&apos;ll refund you in full—no questions asked.
          </p>
          <Link
            href="/course/refund-policy"
            className="mt-4 inline-block text-sm text-swiss-red hover:underline"
          >
            Read our refund policy →
          </Link>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Have questions?{" "}
            <Link href="/course/faq" className="text-swiss-red hover:underline">
              Check our FAQ
            </Link>{" "}
            or{" "}
            <a href="mailto:hello@designengineer.xyz" className="text-swiss-red hover:underline">
              contact us
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
