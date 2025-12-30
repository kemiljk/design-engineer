"use client";

import { useState } from "react";
import { CheckCircle, Circle, Award, Loader2 } from "lucide-react";
import type { CertificateEligibility, CertificateTrack } from "@/lib/types";
import { useRouter } from "next/navigation";

interface EligibilityCardProps {
  eligibility: CertificateEligibility;
}

const platformTitles = {
  web: "Web",
  ios: "iOS",
  android: "Android",
};

export function EligibilityCard({ eligibility }: EligibilityCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [claimingTrack, setClaimingTrack] = useState<CertificateTrack | null>(null);
  const router = useRouter();
  
  const { platform, eligible, designComplete, engineeringComplete, convergenceComplete } = eligibility;

  // Already has the full certificate - show simple success state
  if (eligibility.certificate) {
    return (
      <div className="border-2 border-green-500 bg-green-50 p-4 dark:bg-green-950/30">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h3 className="font-bold">{platformTitles[platform]} Design Engineer</h3>
        </div>
        <p className="text-sm text-green-600 dark:text-green-400">
          ✓ Full certificate earned
        </p>
      </div>
    );
  }

  const handleClaimMaster = async () => {
    if (!eligible) return; // Safety check
    setIsLoading(true);
    try {
      const response = await fetch("/api/course/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });
      
      // Always refresh to resync UI with server state
      router.refresh();
      
      if (!response.ok) {
        const data = await response.json();
        console.error("Certificate claim failed:", data.error);
      }
    } catch (error) {
      console.error("Error claiming certificate:", error);
      router.refresh(); // Refresh on error too
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimTrack = async (track: CertificateTrack, isComplete: boolean) => {
    if (!isComplete) return; // Safety check - don't claim if not complete
    setClaimingTrack(track);
    try {
      const response = await fetch("/api/course/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, track }),
      });
      
      // Always refresh to resync UI with server state
      router.refresh();
      
      if (!response.ok) {
        const data = await response.json();
        console.error("Track certificate claim failed:", data.error);
      }
    } catch (error) {
      console.error("Error claiming track certificate:", error);
      router.refresh(); // Refresh on error too
    } finally {
      setClaimingTrack(null);
    }
  };

  const tracks: { 
    name: string; 
    track: CertificateTrack;
    complete: boolean; 
    progress: { completed: number; total: number };
    certificate: typeof eligibility.designCertificate;
  }[] = [
    { 
      name: "Design", 
      track: "design",
      complete: designComplete, 
      progress: eligibility.designProgress,
      certificate: eligibility.designCertificate,
    },
    { 
      name: "Engineering", 
      track: "engineering",
      complete: engineeringComplete, 
      progress: eligibility.engineeringProgress,
      certificate: eligibility.engineeringCertificate,
    },
    { 
      name: "Convergence", 
      track: "convergence",
      complete: convergenceComplete, 
      progress: eligibility.convergenceProgress,
      certificate: eligibility.convergenceCertificate,
    },
  ];

  // Calculate overall progress
  const totalCompleted = eligibility.designProgress.completed + eligibility.engineeringProgress.completed + eligibility.convergenceProgress.completed;
  const totalLessons = eligibility.designProgress.total + eligibility.engineeringProgress.total + eligibility.convergenceProgress.total;
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">{platformTitles[platform]}</h3>
        <span className="text-xs text-neutral-500">{progressPercent}% complete</span>
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 mb-4 overflow-hidden">
        <div 
          className="h-full bg-swiss-red transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      
      <div className="space-y-3">
        {tracks.map((track) => {
          const trackPercent = track.progress.total > 0 
            ? Math.round((track.progress.completed / track.progress.total) * 100) 
            : 0;
          const canClaim = track.complete && !track.certificate;
          
          return (
            <div key={track.name} className="text-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {track.certificate ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : track.complete ? (
                    <CheckCircle className="h-4 w-4 text-swiss-red" />
                  ) : (
                    <Circle className="h-4 w-4 text-neutral-300 dark:text-neutral-600" />
                  )}
                  <span className={
                    track.certificate 
                      ? "text-green-600 dark:text-green-400" 
                      : track.complete 
                        ? "text-swiss-red font-medium" 
                        : "text-neutral-600 dark:text-neutral-400"
                  }>
                    {track.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {track.certificate ? (
                    <span className="text-xs text-green-600 dark:text-green-400">✓ Earned</span>
                  ) : canClaim ? (
                    <button
                      onClick={() => handleClaimTrack(track.track, track.complete)}
                      disabled={claimingTrack !== null}
                      className="text-xs font-medium text-swiss-red hover:underline disabled:opacity-50"
                    >
                      {claimingTrack === track.track ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        "Claim Certificate"
                      )}
                    </button>
                  ) : (
                    <span className="text-xs text-neutral-500">
                      {track.progress.completed}/{track.progress.total}
                    </span>
                  )}
                </div>
              </div>
              {/* Individual track progress bar */}
              {!track.certificate && (
                <div className="ml-6 h-1 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${track.complete ? 'bg-swiss-red' : 'bg-neutral-300 dark:bg-neutral-600'}`}
                    style={{ width: `${trackPercent}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Master certificate section */}
      <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        {eligible ? (
          <button
            onClick={handleClaimMaster}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-swiss-red px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-900 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Claiming...
              </>
            ) : (
              <>
                <Award className="h-4 w-4" />
                Claim Design Engineer Certificate
              </>
            )}
          </button>
        ) : (
          <div className="text-center text-xs text-neutral-500">
            Complete all three tracks to unlock the Design Engineer certificate
          </div>
        )}
      </div>
    </div>
  );
}
