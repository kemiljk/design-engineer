import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, Clock, OpenNewWindow as ExternalLink, NavArrowLeft as ArrowLeft, Medal as Award } from "iconoir-react";
import { getCertificateBySlug, getTotalLessonsForPlatform } from "@/lib/certificate";
import { COURSE_STRUCTURE } from "@/lib/course-shared";
import type { CertificatePlatform, CertificateTrack } from "@/lib/types";
import { CertificateActions } from "./certificate-actions";
import { Logo } from "@/app/components/logo";
import { TrackLogo } from "@/app/components/track-logo";

interface VerifyPageProps {
  params: Promise<{ slug: string }>;
}

const platformTitles: Record<CertificatePlatform, string> = {
  web: "Web Design Engineer",
  ios: "iOS Design Engineer",
  android: "Android Design Engineer",
};

const platformNames: Record<CertificatePlatform, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
};

const trackTitles: Record<CertificateTrack, string> = {
  design: "Design Track",
  engineering: "Engineering Track",
  convergence: "Convergence Track",
};

function getTrackLessonCount(platform: CertificatePlatform, track: CertificateTrack): number {
  const trackMap = {
    design: COURSE_STRUCTURE.design[platform].lessons,
    engineering: COURSE_STRUCTURE.engineering[platform].lessons,
    convergence: COURSE_STRUCTURE.convergence[platform].lessons,
  };
  return trackMap[track];
}

export async function generateMetadata({ params }: VerifyPageProps) {
  const { slug } = await params;
  const certificate = await getCertificateBySlug(slug);
  
  if (!certificate) {
    return { title: "Certificate Not Found" };
  }
  
  const { metadata } = certificate;
  const isTrackCert = 'track' in metadata && metadata.track;
  
  if (isTrackCert) {
    const track = metadata.track as CertificateTrack;
    return {
      title: `${metadata.user_name} - ${platformNames[metadata.platform]} ${trackTitles[track]} | Design Engineer`,
      description: `Verify ${metadata.user_name}'s ${trackTitles[track]} certificate`,
    };
  }
  
  return {
    title: `${metadata.user_name} - ${platformTitles[metadata.platform]} | Design Engineer`,
    description: `Verify ${metadata.user_name}'s Design Engineer certificate`,
  };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { slug } = await params;
  const certificate = await getCertificateBySlug(slug);
  
  if (!certificate) {
    notFound();
  }
  
  const { metadata } = certificate;
  const isTrackCert = 'track' in metadata && metadata.track;
  const track = isTrackCert ? (metadata.track as CertificateTrack) : null;
  
  const issuedDate = new Date(metadata.issued_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const lessonCount = isTrackCert && track
    ? getTrackLessonCount(metadata.platform, track)
    : getTotalLessonsForPlatform(metadata.platform);

  const certificateTitle = isTrackCert && track
    ? `${platformNames[metadata.platform]} ${trackTitles[track]}`
    : platformTitles[metadata.platform];

  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; }
          nav, header, footer, .print\\:hidden { display: none !important; }
          main { padding-top: 0 !important; }
          #certificate-content { 
            border: 2px solid #e5e5e5 !important; 
            box-shadow: none !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-12 print:bg-white print:pt-8">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-6 flex items-center justify-between print:hidden">
            <Link
              href="/course/certificate"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Certificates
            </Link>
            <CertificateActions 
              certificateTitle={certificateTitle}
              userName={metadata.user_name}
            />
          </div>

          <div className="mb-6 flex items-center justify-center gap-2 text-green-600 dark:text-green-400 print:text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Verified Certificate</span>
          </div>

          <div id="certificate-content" className="relative border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 print:dark:bg-white print:dark:border-neutral-200 print:dark:text-black overflow-hidden">
            {/* Corner markers - Swiss style */}
            <div className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-swiss-red print:bg-swiss-red" aria-hidden="true" />
            <div className="absolute right-0 bottom-0 h-3 w-3 translate-x-1/2 translate-y-1/2 bg-swiss-red print:bg-swiss-red" aria-hidden="true" />
            
            {/* Header section with accent and grid */}
            <div className="relative border-b border-neutral-200 dark:border-neutral-800 px-8 pt-8 pb-6 print:border-neutral-200 overflow-hidden">
              {/* Grid lines - Swiss style */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {/* Vertical grid lines */}
                {[0, 25, 50, 75, 100].map((pos) => (
                  <div
                    key={`v-${pos}`}
                    className="absolute top-0 h-full w-px bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100"
                    style={{ left: `${pos}%` }}
                  />
                ))}
                {/* Horizontal grid lines */}
                <div className="absolute left-0 top-0 h-px w-full bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100" />
                <div className="absolute left-0 bottom-0 h-px w-full bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100" />
              </div>
              
              {/* Logo and header content */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Accent bar */}
                  <div className="h-1 w-12 bg-swiss-red mb-6" aria-hidden="true" />
                  
                  {/* Eyebrow */}
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-swiss-red mb-3">
                    Design Engineer
                  </p>
                  
                  {/* Main title */}
                  <h1 className="text-3xl font-bold tracking-tight mb-2 md:text-4xl">
                    {isTrackCert ? "Track Certificate" : "Certificate of Completion"}
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-neutral-500 dark:text-neutral-400 print:text-neutral-500">
                    The Design Engineer Course
                  </p>
                </div>
                
                {/* Logo - Track-specific for track certs, main logo for master cert */}
                <div className="shrink-0">
                  {isTrackCert && track ? (
                    <TrackLogo 
                      track={track} 
                      platform={metadata.platform} 
                      size={56} 
                      className="text-neutral-900 dark:text-white print:text-neutral-900" 
                    />
                  ) : (
                    <Logo size={48} className="text-neutral-900 dark:text-white print:text-neutral-900" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Body content */}
            <div className="p-8">

          <div className="text-center mb-8">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 print:text-neutral-500">This certifies that</p>
              <p className="text-3xl font-bold mb-3 md:text-4xl">{metadata.user_name}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 print:text-neutral-500">
                has successfully completed {isTrackCert ? "the" : "all requirements for"}
              </p>
              {isTrackCert && track ? (
                <>
                  <p className="text-xl font-bold mb-1 md:text-2xl">
                    {trackTitles[track]}
                  </p>
                  <p className="text-swiss-red font-semibold">
                    {platformNames[metadata.platform]} Platform
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-swiss-red md:text-2xl">
                  {platformTitles[metadata.platform]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-neutral-200 dark:border-neutral-800 mb-6 print:border-neutral-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-neutral-500 dark:text-neutral-400 mb-1.5 print:text-neutral-500">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Issued</span>
                </div>
                <p className="font-semibold text-sm">{issuedDate}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-neutral-500 dark:text-neutral-400 mb-1.5 print:text-neutral-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Time</span>
                </div>
                <p className="font-semibold text-sm">{formatTime(metadata.total_time_spent_seconds)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-neutral-500 dark:text-neutral-400 mb-1.5 print:text-neutral-500">
                  <Award className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Lessons</span>
                </div>
                <p className="font-semibold text-sm">{lessonCount}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-4 print:text-neutral-600">
                Certificate #{metadata.certificate_number}
              </p>
              <Link
                href="/course"
                className="inline-flex items-center gap-2 text-sm text-swiss-red hover:underline print:hidden"
              >
                Learn more about the Design Engineer Course
                <ExternalLink className="h-4 w-4" />
              </Link>
              <p className="hidden print:block text-xs text-neutral-500 mt-4">
                Verify at: designengineer.xyz/verify/{certificate.slug}
              </p>
            </div>
            </div>
            
            {/* Bottom accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-swiss-red via-swiss-red/50 to-transparent" aria-hidden="true" />
          </div>
      </div>
    </main>
    </>
  );
}
