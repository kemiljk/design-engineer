import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Design Engineer Course",
  description: "Privacy Policy for the Design Engineer Course. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-12">
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
              <h1 className="text-2xl font-bold md:text-3xl">Privacy Policy</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Last updated: December 2024
              </p>
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Your privacy is important to us. This Privacy Policy explains how Design 
              Engineer Course (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects 
              your information when you use our website and services.
            </p>

            <h2>1. Information We Collect</h2>
            
            <h3>Information You Provide</h3>
            <p>We collect information you directly provide, including:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, and profile details when you create an account</li>
              <li><strong>Payment Information:</strong> Billing details processed securely by our payment provider (LemonSqueezy)</li>
              <li><strong>Course Progress:</strong> Lessons completed, time spent, and notes you create</li>
              <li><strong>Communications:</strong> Messages you send to us via email or support channels</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <p>When you use our Service, we automatically collect:</p>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, features used, and interactions with content</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
              <li><strong>Log Data:</strong> IP address, access times, and referring URLs</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Provide and maintain the Service</li>
              <li>Process transactions and send related information</li>
              <li>Track your course progress and save your notes</li>
              <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
              <li>Respond to your comments, questions, and support requests</li>
              <li>Monitor and analyse usage patterns to improve the Service</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information 
              only in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> With third parties who assist in operating our Service (e.g., payment processing, hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
            </ul>

            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Clerk:</strong> Authentication and user management</li>
              <li><strong>LemonSqueezy:</strong> Payment processing</li>
              <li><strong>Cosmic:</strong> Content management and data storage</li>
              <li><strong>Vercel:</strong> Website hosting and analytics</li>
            </ul>
            <p>
              Each service has its own privacy policy governing the use of your information. 
              We encourage you to review their policies.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect 
              your personal information, including:
            </p>
            <ul>
              <li>Encryption of data in transit (HTTPS)</li>
              <li>Secure authentication via Clerk</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal data by employees</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100% secure, and 
              we cannot guarantee absolute security.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as 
              needed to provide you services. If you delete your account, we will delete 
              or anonymize your information within 30 days, except where we are required 
              to retain it for legal purposes.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href="mailto:hello@designengineer.xyz" className="text-swiss-red">
                hello@designengineer.xyz
              </a>.
            </p>

            <h2>8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to:
            </p>
            <ul>
              <li>Keep you signed in</li>
              <li>Remember your preferences</li>
              <li>Understand how you use our Service</li>
              <li>Improve your experience</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Note that disabling 
              cookies may affect the functionality of the Service.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              The Service is not intended for children under 13 years of age. We do not 
              knowingly collect personal information from children under 13. If you believe 
              we have collected information from a child under 13, please contact us 
              immediately.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than 
              your own. We ensure appropriate safeguards are in place for such transfers 
              in compliance with applicable data protection laws.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              significant changes by posting the new policy on this page and updating the 
              &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data 
              practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:hello@designengineer.xyz" className="text-swiss-red">
                hello@designengineer.xyz
              </a>
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href="/course/terms"
            className="text-neutral-600 hover:text-swiss-red dark:text-neutral-400"
          >
            Terms of Service →
          </Link>
          <Link
            href="/course/refund-policy"
            className="text-neutral-600 hover:text-swiss-red dark:text-neutral-400"
          >
            Refund Policy →
          </Link>
        </div>
      </div>
    </main>
  );
}
