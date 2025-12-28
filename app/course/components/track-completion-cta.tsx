"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, ArrowRight, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { CertificatePlatform, CertificateEligibility } from "@/lib/types";

interface TrackCompletionCTAProps {
  lessonPath: string;
  isLoggedIn: boolean;
}

function extractTrackInfo(lessonPath: string): { track: string; platform: CertificatePlatform } | null {
  const parts = lessonPath.split("/");
  if (parts.length < 2) return null;

  const track = parts[0];
  const platformPart = parts[1];

  if (!["design-track", "engineering-track", "convergence"].includes(track)) {
    return null;
  }

  if (!["web", "ios", "android"].includes(platformPart)) {
    return null;
  }

  return { track, platform: platformPart as CertificatePlatform };
}

export function TrackCompletionCTA({ lessonPath, isLoggedIn }: TrackCompletionCTAProps) {
  const [eligibility, setEligibility] = useState<CertificateEligibility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const trackInfo = extractTrackInfo(lessonPath);
  const platform = trackInfo?.platform;
  const currentTrack = trackInfo?.track;

  useEffect(() => {
    if (!platform || !isLoggedIn) {
      setIsLoading(false);
      return;
    }

    async function fetchEligibility() {
      try {
        const response = await fetch(`/api/course/certificate?platform=${platform}`);
        if (response.ok) {
          const data = await response.json();
          setEligibility(data.eligibility);
        }
      } catch (error) {
        console.error("Error fetching eligibility:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEligibility();
  }, [platform, isLoggedIn]);

  const handleClaimCertificate = async () => {
    if (!platform) return;

    setIsClaiming(true);
    try {
      const response = await fetch("/api/course/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });

      if (response.ok) {
        setClaimed(true);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to claim certificate");
      }
    } catch (error) {
      console.error("Error claiming certificate:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  if (!trackInfo || !platform) {
    return null;
  }

  // Not logged in - prompt to sign in
  if (!isLoggedIn) {
    return (
      <Link
        href={`/sign-in?redirect_url=/course/certificate`}
        className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-swiss-red bg-swiss-red/5 p-4 transition-all hover:bg-swiss-red hover:text-white"
      >
        <div className="flex items-center justify-end gap-2 text-xs text-swiss-red group-hover:text-white mb-1">
          <span>Track Complete!</span>
          <Award className="h-3 w-3" />
        </div>
        <p className="text-sm font-medium text-right">
          Sign In for Certificate
        </p>
      </Link>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
          <span className="text-sm text-neutral-500">Checking progress...</span>
        </div>
      </div>
    );
  }

  // Already claimed or just claimed
  if (claimed || eligibility?.certificate) {
    return (
      <Link
        href="/course/certificate"
        className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-green-500 bg-green-50 p-4 transition-all hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900"
      >
        <div className="flex items-center justify-end gap-2 text-xs text-green-600 dark:text-green-400 mb-1">
          <span>Certificate Earned!</span>
          <CheckCircle className="h-3 w-3" />
        </div>
        <p className="text-sm font-medium text-right text-green-700 dark:text-green-300">
          View Your Certificate
        </p>
      </Link>
    );
  }

  // Eligible for certificate - show claim button
  if (eligibility?.eligible) {
    return (
      <motion.button
        onClick={handleClaimCertificate}
        disabled={isClaiming}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-swiss-red bg-swiss-red p-4 text-white transition-all hover:bg-neutral-900 disabled:opacity-70"
      >
        <div className="flex items-center justify-end gap-2 text-xs opacity-90 mb-1">
          <Sparkles className="h-3 w-3" />
          <span>Congratulations!</span>
        </div>
        <p className="text-sm font-medium text-right flex items-center justify-end gap-2">
          {isClaiming ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Claiming...
            </>
          ) : (
            <>
              <Award className="h-4 w-4" />
              Get Your Certificate
            </>
          )}
        </p>
      </motion.button>
    );
  }

  // Not eligible yet - show what's next
  // Determine which track to recommend next
  const getNextTrackRecommendation = () => {
    if (!eligibility) return null;

    // If they just completed convergence but not everything else
    if (currentTrack === "convergence") {
      if (!eligibility.designComplete) {
        return {
          href: `/course/design-track/${platform}`,
          label: "Continue to Design Track",
          sublabel: `${eligibility.designProgress.completed}/${eligibility.designProgress.total} complete`,
        };
      }
      if (!eligibility.engineeringComplete) {
        return {
          href: `/course/engineering-track/${platform}`,
          label: "Continue to Engineering Track",
          sublabel: `${eligibility.engineeringProgress.completed}/${eligibility.engineeringProgress.total} complete`,
        };
      }
    }

    // If they completed design track
    if (currentTrack === "design-track") {
      if (!eligibility.engineeringComplete) {
        return {
          href: `/course/engineering-track/${platform}`,
          label: "Continue to Engineering Track",
          sublabel: "Build what you design",
        };
      }
      if (!eligibility.convergenceComplete) {
        return {
          href: `/course/convergence/${platform}`,
          label: "Continue to Convergence",
          sublabel: "Bring it all together",
        };
      }
    }

    // If they completed engineering track
    if (currentTrack === "engineering-track") {
      if (!eligibility.designComplete) {
        return {
          href: `/course/design-track/${platform}`,
          label: "Continue to Design Track",
          sublabel: "Learn to design what you build",
        };
      }
      if (!eligibility.convergenceComplete) {
        return {
          href: `/course/convergence/${platform}`,
          label: "Continue to Convergence",
          sublabel: "Bring it all together",
        };
      }
    }

    return null;
  };

  const nextTrack = getNextTrackRecommendation();

  if (nextTrack) {
    return (
      <Link
        href={nextTrack.href}
        className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-swiss-red bg-swiss-red/5 p-4 transition-all hover:bg-swiss-red hover:text-white"
      >
        <div className="flex items-center justify-end gap-2 text-xs text-swiss-red group-hover:text-white mb-1">
          <span>{nextTrack.sublabel}</span>
          <ArrowRight className="h-3 w-3" />
        </div>
        <p className="text-sm font-medium text-right">
          {nextTrack.label}
        </p>
      </Link>
    );
  }

  // Fallback - show certificate page link
  return (
    <Link
      href="/course/certificate"
      className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-neutral-300 bg-neutral-50 p-4 transition-all hover:border-swiss-red hover:bg-swiss-red/5 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div className="flex items-center justify-end gap-2 text-xs text-neutral-500 group-hover:text-swiss-red mb-1">
        <span>Track Complete!</span>
        <Award className="h-3 w-3" />
      </div>
      <p className="text-sm font-medium text-right">
        View Certificate Progress
      </p>
    </Link>
  );
}

