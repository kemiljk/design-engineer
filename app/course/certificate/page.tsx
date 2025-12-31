import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Medal } from "iconoir-react";
import { getUserCertificates, getUserTrackCertificates, checkCertificateEligibility } from "@/lib/certificate";
import { CertificateCard } from "./certificate-card";
import { TrackCertificateCard } from "./track-certificate-card";
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
  
  const [certificates, trackCertificates, webEligibility, iosEligibility, androidEligibility] = await Promise.all([
    getUserCertificates(userId),
    getUserTrackCertificates(userId),
    checkCertificateEligibility(userId, 'web'),
    checkCertificateEligibility(userId, 'ios'),
    checkCertificateEligibility(userId, 'android'),
  ]);
  
  const eligibilities = [webEligibility, iosEligibility, androidEligibility];
  const hasAnyCertificates = certificates.length > 0 || trackCertificates.length > 0;

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

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Medal className="h-8 w-8 text-swiss-red" />
            <h1 className="text-3xl font-bold">Your Certificates</h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Earn track certificates as you complete each track, and unlock your 
            Design Engineer certificate by completing all three tracks for a platform.
          </p>
        </div>

        {certificates.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Design Engineer Certificates</h2>
            <p className="text-sm text-neutral-500 mb-4">
              Earned by completing all three tracks (Design, Engineering, Convergence) for a platform.
            </p>
            <div className="grid gap-4">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          </section>
        )}

        {trackCertificates.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Track Certificates</h2>
            <p className="text-sm text-neutral-500 mb-4">
              Earned by completing individual tracks.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trackCertificates.map((cert) => (
                <TrackCertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-4">
            {hasAnyCertificates ? "Progress Towards Certificates" : "Available Certificates"}
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
