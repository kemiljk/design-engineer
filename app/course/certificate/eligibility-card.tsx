"use client";

import { useState } from "react";
import { CheckCircle, Circle, Award, Loader2 } from "lucide-react";
import type { CertificateEligibility, CertificateTrack } from "@/lib/types";
import { useRouter } from "next/navigation";

interface EligibilityCardProps {
  eligibility: CertificateEligibility;
}

const platformTitles = {
  web: "Web Design Engineer",
  ios: "iOS Design Engineer",
  android: "Android Design Engineer",
};

export function EligibilityCard({ eligibility }: EligibilityCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [claimingTrack, setClaimingTrack] = useState<CertificateTrack | null>(null);
  const router = useRouter();
  
  const { platform, eligible, designComplete, engineeringComplete, convergenceComplete } = eligibility;

  if (eligibility.certificate) {
    return (
      <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-5 w-5 text-swiss-red" />
          <h3 className="font-bold">{platformTitles[platform]}</h3>
        </div>
        <p className="text-sm text-green-600 dark:text-green-400">
          ✓ Certificate earned
        </p>
      </div>
    );
  }

  const handleClaimMaster = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/course/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });
      
      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to claim certificate");
      }
    } catch (error) {
      console.error("Error claiming certificate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimTrack = async (track: CertificateTrack) => {
    setClaimingTrack(track);
    try {
      const response = await fetch("/api/course/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, track }),
      });
      
      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to claim certificate");
      }
    } catch (error) {
      console.error("Error claiming track certificate:", error);
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
      name: "Design Track", 
      track: "design",
      complete: designComplete, 
      progress: eligibility.designProgress,
      certificate: eligibility.designCertificate,
    },
    { 
      name: "Engineering Track", 
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

  return (
    <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-bold mb-3">{platformTitles[platform]}</h3>
      
      <div className="space-y-2 mb-4">
        {tracks.map((track) => (
          <div key={track.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {track.certificate ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : track.complete ? (
                <CheckCircle className="h-4 w-4 text-swiss-red" />
              ) : (
                <Circle className="h-4 w-4 text-neutral-300" />
              )}
              <span className={track.certificate ? "text-green-600 dark:text-green-400" : track.complete ? "text-swiss-red" : ""}>
                {track.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {track.certificate ? (
                <span className="text-xs text-green-600 dark:text-green-400">✓</span>
              ) : track.complete ? (
                <button
                  onClick={() => handleClaimTrack(track.track)}
                  disabled={claimingTrack !== null}
                  className="text-xs text-swiss-red hover:underline disabled:opacity-50"
                >
                  {claimingTrack === track.track ? "..." : "Claim"}
                </button>
              ) : (
                <span className="text-xs text-neutral-500">
                  {track.progress.completed}/{track.progress.total}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {eligible ? (
        <button
          onClick={handleClaimMaster}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-swiss-red px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900 disabled:opacity-50"
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
        <div className="text-center text-sm text-neutral-500">
          Complete all tracks for the full certificate
        </div>
      )}
    </div>
  );
}
