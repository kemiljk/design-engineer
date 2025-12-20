"use client";

import { useState } from "react";
import { CheckCircle, Circle, Award, Loader2 } from "lucide-react";
import type { CertificateEligibility } from "@/lib/types";
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

  const handleClaim = async () => {
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

  const tracks = [
    { name: "Design Track", complete: designComplete, progress: eligibility.designProgress },
    { name: "Engineering Track", complete: engineeringComplete, progress: eligibility.engineeringProgress },
    { name: "Convergence Track", complete: convergenceComplete, progress: eligibility.convergenceProgress },
  ];

  return (
    <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-bold mb-3">{platformTitles[platform]}</h3>
      
      <div className="space-y-2 mb-4">
        {tracks.map((track) => (
          <div key={track.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {track.complete ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Circle className="h-4 w-4 text-neutral-300" />
              )}
              <span className={track.complete ? "text-green-600 dark:text-green-400" : ""}>
                {track.name}
              </span>
            </div>
            <span className="text-xs text-neutral-500">
              {track.progress.completed}/{track.progress.total}
            </span>
          </div>
        ))}
      </div>

      {eligible ? (
        <button
          onClick={handleClaim}
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
              Claim Certificate
            </>
          )}
        </button>
      ) : (
        <div className="text-center text-sm text-neutral-500">
          Complete all tracks to earn this certificate
        </div>
      )}
    </div>
  );
}
