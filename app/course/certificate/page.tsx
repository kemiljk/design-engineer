import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { getUserCertificates, checkCertificateEligibility } from "@/lib/certificate";
import { CertificateCard } from "./certificate-card";
import { EligibilityCard } from "./eligibility-card";

export const metadata = {
  title: "Your Certificates | Design Engineer Course",
  description: "View and download your Design Engineer certificates",
};

export default async function CertificatesPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in?redirect_url=/course/certificate");
  }
  
  const [certificates, webEligibility, iosEligibility, androidEligibility] = await Promise.all([
    getUserCertificates(userId),
    checkCertificateEligibility(userId, 'web'),
    checkCertificateEligibility(userId, 'ios'),
    checkCertificateEligibility(userId, 'android'),
  ]);
  
  const eligibilities = [webEligibility, iosEligibility, androidEligibility];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/course"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-swiss-red" />
            <h1 className="font-serif text-3xl font-bold">Your Certificates</h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Complete all three tracks (Design, Engineering, Convergence) for a platform 
            to earn your Design Engineer certificate.
          </p>
        </div>

        {certificates.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Earned Certificates</h2>
            <div className="grid gap-4">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-4">
            {certificates.length > 0 ? "Other Certificates" : "Available Certificates"}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {eligibilities.map((eligibility) => (
              <EligibilityCard key={eligibility.platform} eligibility={eligibility} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
