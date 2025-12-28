import { notFound } from "next/navigation";
import Link from "next/link";
import { Award, CheckCircle, Calendar, Clock, ExternalLink } from "lucide-react";
import { getCertificateBySlug, getTotalLessonsForPlatform } from "@/lib/certificate";
import { COURSE_STRUCTURE } from "@/lib/course-shared";
import type { CertificatePlatform, CertificateTrack } from "@/lib/types";

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

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Verified Certificate</span>
        </div>

        <div className="border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-swiss-red/10 mb-4">
              <Award className="h-8 w-8 text-swiss-red" />
            </div>
            <h1 className="text-sm font-medium tracking-widest text-swiss-red mb-2">
              DESIGN ENGINEER
            </h1>
            <h2 className="text-2xl font-bold mb-1">
              {isTrackCert ? "Track Certificate" : "Certificate of Completion"}
            </h2>
            <p className="text-neutral-500">The Design Engineer Course</p>
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-neutral-500 mb-2">This certifies that</p>
            <p className="text-3xl font-bold mb-2">{metadata.user_name}</p>
            <p className="text-sm text-neutral-500 mb-4">
              has successfully completed {isTrackCert ? "the" : "all requirements for"}
            </p>
            {isTrackCert && track ? (
              <>
                <p className="text-xl font-bold mb-1">
                  {trackTitles[track]}
                </p>
                <p className="text-swiss-red font-medium">
                  {platformNames[metadata.platform]} Platform
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-swiss-red">
                {platformTitles[metadata.platform]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-neutral-200 dark:border-neutral-800 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Issued</span>
              </div>
              <p className="font-medium text-sm">{issuedDate}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Time Invested</span>
              </div>
              <p className="font-medium text-sm">{formatTime(metadata.total_time_spent_seconds)}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
                <Award className="h-4 w-4" />
                <span className="text-xs">Lessons</span>
              </div>
              <p className="font-medium text-sm">{lessonCount}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs font-mono text-neutral-400 mb-4">
              Certificate #{metadata.certificate_number}
            </p>
            <Link
              href="/course"
              className="inline-flex items-center gap-2 text-sm text-swiss-red hover:underline"
            >
              Learn more about the Design Engineer Course
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
