import { Metadata } from "next";
import Link from "next/link";
import { NavArrowLeft as ArrowLeft, Page as FileText } from "iconoir-react";

export const metadata: Metadata = {
  title: "Terms of Service | Design Engineer Course",
  description: "Terms of Service for the Design Engineer Course.",
};

export default function TermsPage() {
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
            <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <FileText className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Terms of Service</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Last updated: December 2024
              </p>
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Welcome to Design Engineer Course. By accessing or using our website and 
              services, you agree to be bound by these Terms of Service. Please read 
              them carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using designengineer.xyz (&quot;the Service&quot;), you accept 
              and agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Design Engineer Course provides online educational content, including but 
              not limited to video lessons, written tutorials, interactive exercises, 
              and related materials focused on design engineering skills.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of the Service, you must create an account. 
              You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update your account information as needed</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h2>4. Purchases and Payments</h2>
            <p>
              When you purchase access to course content:
            </p>
            <ul>
              <li>All prices are in USD unless otherwise stated</li>
              <li>Payment is processed securely through our payment provider (LemonSqueezy)</li>
              <li>You receive lifetime access to the purchased content</li>
              <li>Prices are subject to change, but purchased access is not affected</li>
            </ul>

            <h2>5. Refund Policy</h2>
            <p>
              We offer a 14-day money-back guarantee on all purchases. If you are not 
              satisfied with your purchase, contact us within 14 days for a full refund. 
              See our{" "}
              <Link href="/course/refund-policy" className="text-swiss-red">
                Refund Policy
              </Link>{" "}
              for complete details.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content provided through the Service, including text, graphics, logos, 
              images, videos, and software, is the property of Design Engineer Course or 
              its content suppliers and is protected by intellectual property laws.
            </p>
            <p>You may:</p>
            <ul>
              <li>Access and view content for personal, non-commercial learning</li>
              <li>Take notes and create personal summaries for your own use</li>
            </ul>
            <p>You may not:</p>
            <ul>
              <li>Copy, reproduce, or distribute course content</li>
              <li>Share your account credentials with others</li>
              <li>Use content for commercial purposes without permission</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>

            <h2>7. User Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with the proper functioning of the Service</li>
              <li>Upload malicious code or content</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties 
              of any kind, either express or implied. We do not guarantee that:
            </p>
            <ul>
              <li>The Service will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The Service is free of viruses or harmful components</li>
              <li>The course will result in specific career outcomes</li>
            </ul>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Design Engineer Course shall not 
              be liable for any indirect, incidental, special, consequential, or punitive 
              damages arising from your use of the Service.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify 
              users of significant changes via email or through the Service. Your 
              continued use of the Service after changes constitutes acceptance of 
              the new Terms.
            </p>

            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service at 
              our discretion, without notice, for conduct that we believe violates 
              these Terms or is harmful to other users, us, or third parties.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the 
              laws of the jurisdiction in which Design Engineer Course operates, 
              without regard to conflict of law principles.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us at{" "}
              <a href="mailto:hello@designengineer.xyz" className="text-swiss-red">
                hello@designengineer.xyz
              </a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
