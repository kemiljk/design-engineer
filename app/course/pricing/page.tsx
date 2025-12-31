import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { NavArrowLeft as ArrowLeft, Check, ShieldCheck, Gift as PartyPopper } from "iconoir-react";
import { StudentDiscountForm } from "./student-discount-form";
import { PricingClientWrapper } from "./pricing-client-wrapper";
import { getUserEnrollment, normalizeAccessLevel } from "@/lib/course";
import { getProductsWithPrices } from "@/lib/lemonsqueezy";
import type { ProductWithPrice } from "@/lib/types";

export const metadata: Metadata = {
  title: "Pricing | Design Engineer Course",
  description: "Choose your path to becoming a Design Engineer. Flexible pricing for individuals and teams.",
};

// Bundle tiers (best value)
const BUNDLE_TIER_KEYS = ["design_full", "engineering_full", "full"] as const;
// Individual platform tracks
const PLATFORM_TIER_KEYS = ["design_web", "design_ios", "design_android", "engineering_web", "engineering_ios", "engineering_android"] as const;

export default async function PricingPage() {
  const { userId } = await auth();
  let currentAccess: string | null = null;
  
  if (userId) {
    const enrollment = await getUserEnrollment(userId);
    currentAccess = normalizeAccessLevel(enrollment?.metadata.access_level);
  }

  // If user has full access, show a simple thank you page
  const hasFullAccess = currentAccess === "full";

  const allProducts = await getProductsWithPrices();
  
  // Bundle tiers (Design Full, Engineering Full, Convergence)
  const bundleTiers = BUNDLE_TIER_KEYS
    .map(key => allProducts.find(p => p.key === key))
    .filter((p): p is ProductWithPrice => p !== undefined);
    
  // Individual platform tracks
  const platformTiers = PLATFORM_TIER_KEYS
    .map(key => allProducts.find(p => p.key === key))
    .filter((p): p is ProductWithPrice => p !== undefined);

  const fullProduct = allProducts.find(p => p.key === "full");
  
  // Calculate savings vs buying all individual tracks
  const individualTrackTotal = platformTiers.reduce((sum, p) => sum + p.price, 0);
  const convergenceSavings = individualTrackTotal > 0 && fullProduct 
    ? individualTrackTotal - fullProduct.price 
    : 0;
  const convergenceSavingsPercent = individualTrackTotal > 0 && fullProduct 
    ? Math.round((convergenceSavings / individualTrackTotal) * 100) 
    : 0;

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 dark:bg-neutral-950">
      <div className="container-page py-12">
        <Link
          href="/course"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        {/* Full Access - Show thank you message instead of pricing */}
        {hasFullAccess ? (
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <PartyPopper className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              You Have Full Access!
            </h1>
            <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
              Thank you for being a Convergence student. You have access to everything—all 
              tracks, all platforms, and all exclusive content. There&apos;s nothing more to buy!
            </p>
            <div className="rounded-none border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
              <p className="text-green-800 dark:text-green-200">
                <Check className="mr-2 inline h-5 w-5" />
                <strong>Convergence: All-Access</strong> — Lifetime access to all current and future content
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/course"
                className="inline-flex items-center justify-center gap-2 bg-swiss-red px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
              >
                Continue Learning
              </Link>
              <Link
                href="/course/dashboard"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 bg-white px-6 py-3 font-medium transition-colors hover:border-swiss-red hover:text-swiss-red dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-swiss-red"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Invest in Your Future
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
                Choose the path that fits your goals. All plans include lifetime access 
                and a 14-day money-back guarantee.
              </p>
            </div>

            {/* Current Access Banner - for partial access */}
            {currentAccess && currentAccess !== "free" && (
              <div className="mb-8 rounded-none border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950/30">
                <p className="text-green-800 dark:text-green-200">
                  <Check className="mr-2 inline h-4 w-4" />
                  You have <strong>{currentAccess.replace(/_/g, " ")}</strong>. 
                  Upgrade below to unlock more content!
                </p>
              </div>
            )}

            {/* Client wrapper for pricing cards */}
            <PricingClientWrapper
              bundleTiers={bundleTiers}
              platformTiers={platformTiers}
              currentAccess={currentAccess}
              userId={userId}
              convergenceSavings={convergenceSavings}
              convergenceSavingsPercent={convergenceSavingsPercent}
              individualTrackTotal={individualTrackTotal}
            />

            {/* Student Discount Form */}
            <div className="mb-8">
              <StudentDiscountForm />
            </div>

            {/* Guarantee */}
            <div className="rounded-none border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-swiss-red/10">
                <ShieldCheck className="h-6 w-6 text-swiss-red" />
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
          </>
        )}
      </div>
    </main>
  );
}
