import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | Design Engineer Course",
  description: "Our 14-day money-back guarantee. Learn about our refund policy for the Design Engineer Course.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 dark:bg-neutral-950">
      <div className="container-readable py-12">
        <Link
          href="/course"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        <div className="rounded-none border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 md:p-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-swiss-red/10">
              <Shield className="h-6 w-6 text-swiss-red" />
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Refund Policy</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Last updated: December 2024
              </p>
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>14-Day Money-Back Guarantee</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you&apos;re not 
              happy with the Design Engineer Course for any reason, we offer a full refund 
              within 14 days of your purchase—no questions asked.
            </p>

            <h2>How to Request a Refund</h2>
            <p>To request a refund, simply:</p>
            <ol>
              <li>
                Email us at{" "}
                <a href="mailto:hello@designengineer.xyz" className="text-swiss-red">
                  hello@designengineer.xyz
                </a>{" "}
                within 14 days of your purchase
              </li>
              <li>Include your order number or the email address used for purchase</li>
              <li>Let us know you&apos;d like a refund</li>
            </ol>
            <p>
              We&apos;ll process your refund within 5-7 business days. The refund will be 
              credited to your original payment method.
            </p>

            <h2>What Happens After a Refund</h2>
            <p>
              Once your refund is processed, your access to the paid course content will 
              be revoked. You&apos;ll still have access to any free content available to 
              all users.
            </p>

            <h2>Exceptions</h2>
            <p>
              The 14-day guarantee applies to first-time purchases only. If you&apos;ve 
              previously purchased and received a refund for the same product, subsequent 
              purchases may not be eligible for refund.
            </p>

            <h2>Team and Enterprise Purchases</h2>
            <p>
              For team or enterprise purchases, please contact us directly to discuss 
              refund terms. We&apos;re happy to work with you to ensure satisfaction.
            </p>

            <h2>Questions?</h2>
            <p>
              If you have any questions about our refund policy, please don&apos;t hesitate 
              to reach out at{" "}
              <a href="mailto:hello@designengineer.xyz" className="text-swiss-red">
                hello@designengineer.xyz
              </a>
              . We&apos;re here to help.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Ready to start learning?
          </p>
          <Link
            href="/course/pricing"
            className="inline-flex items-center gap-2 bg-swiss-red px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
