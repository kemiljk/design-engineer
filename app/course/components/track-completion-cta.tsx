"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Medal as Award, NavArrowRight as ArrowRight, CheckCircle, RefreshDouble as Loader2, Gift as PartyPopper } from "iconoir-react";
import { motion } from "motion/react";
import type { CertificatePlatform, CertificateEligibility, CertificateTrack } from "@/lib/types";

interface TrackCompletionCTAProps {
  lessonPath: string;
  isLoggedIn: boolean;
}

const trackTitles: Record<CertificateTrack, string> = {
  design: "Design Track",
  engineering: "Engineering Track",
  convergence: "Convergence",
};

function extractTrackInfo(lessonPath: string): { 
  track: string; 
  platform: CertificatePlatform;
  certificateTrack: CertificateTrack;
} | null {
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

  // Map track folder name to certificate track type
  const certificateTrackMap: Record<string, CertificateTrack> = {
    "design-track": "design",
    "engineering-track": "engineering",
    "convergence": "convergence",
  };

  return { 
    track, 
    platform: platformPart as CertificatePlatform,
    certificateTrack: certificateTrackMap[track],
  };
}

export function TrackCompletionCTA({ lessonPath, isLoggedIn }: TrackCompletionCTAProps) {
  const [eligibility, setEligibility] = useState<CertificateEligibility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedType, setClaimedType] = useState<"track" | "master" | null>(null);

  const trackInfo = extractTrackInfo(lessonPath);
  const platform = trackInfo?.platform;
  const currentTrack = trackInfo?.track;
  const certificateTrack = trackInfo?.certificateTrack;

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

  const handleClaimTrackCertificate = async () => {
    if (!platform || !certificateTrack) return;

    setIsClaiming(true);
    try {
      const response = await fetch("/api/course/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, track: certificateTrack }),
      });

      if (response.ok) {
        setClaimedType("track");
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

  const handleClaimMasterCertificate = async () => {
    if (!platform) return;

    setIsClaiming(true);
    try {
      const response = await fetch("/api/course/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });

      if (response.ok) {
        setClaimedType("master");
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

  if (!trackInfo || !platform || !certificateTrack) {
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

  // Get current track's certificate status
  const getCurrentTrackCertificate = () => {
    if (!eligibility) return null;
    switch (certificateTrack) {
      case "design": return eligibility.designCertificate;
      case "engineering": return eligibility.engineeringCertificate;
      case "convergence": return eligibility.convergenceCertificate;
    }
  };

  const isCurrentTrackComplete = () => {
    if (!eligibility) return false;
    switch (certificateTrack) {
      case "design": return eligibility.designComplete;
      case "engineering": return eligibility.engineeringComplete;
      case "convergence": return eligibility.convergenceComplete;
    }
  };

  const trackCertificate = getCurrentTrackCertificate();
  const trackComplete = isCurrentTrackComplete();

  // Just claimed a certificate - show success
  if (claimedType) {
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

  // Master certificate already earned
  if (eligibility?.certificate) {
    return (
      <Link
        href="/course/certificate"
        className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-green-500 bg-green-50 p-4 transition-all hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900"
      >
        <div className="flex items-center justify-end gap-2 text-xs text-green-600 dark:text-green-400 mb-1">
          <span>Design Engineer Certificate!</span>
          <CheckCircle className="h-3 w-3" />
        </div>
        <p className="text-sm font-medium text-right text-green-700 dark:text-green-300">
          View Your Certificate
        </p>
      </Link>
    );
  }

  // Eligible for master certificate (all 3 tracks complete)
  if (eligibility?.eligible) {
    // If they also haven't claimed the track certificate, show that first
    if (!trackCertificate && trackComplete) {
      return (
        <motion.button
          onClick={handleClaimMasterCertificate}
          disabled={isClaiming}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-swiss-red bg-swiss-red p-4 text-white transition-all hover:bg-neutral-900 disabled:opacity-70"
        >
          <div className="flex items-center justify-end gap-2 text-xs opacity-90 mb-1">
            <PartyPopper className="h-3 w-3" />
            <span>All Tracks Complete!</span>
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
                Get Design Engineer Certificate
              </>
            )}
          </p>
        </motion.button>
      );
    }
    
    // They have their track cert, now offer master
    return (
      <motion.button
        onClick={handleClaimMasterCertificate}
        disabled={isClaiming}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-swiss-red bg-swiss-red p-4 text-white transition-all hover:bg-neutral-900 disabled:opacity-70"
      >
        <div className="flex items-center justify-end gap-2 text-xs opacity-90 mb-1">
          <PartyPopper className="h-3 w-3" />
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
              Get Design Engineer Certificate
            </>
          )}
        </p>
      </motion.button>
    );
  }

  // Track is complete - offer track certificate
  if (trackComplete && !trackCertificate) {
    return (
      <motion.button
        onClick={handleClaimTrackCertificate}
        disabled={isClaiming}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex-1 max-w-[50%] md:max-w-[45%] md:order-3 rounded-none border-2 border-swiss-red bg-swiss-red p-4 text-white transition-all hover:bg-neutral-900 disabled:opacity-70"
      >
        <div className="flex items-center justify-end gap-2 text-xs opacity-90 mb-1">
          <PartyPopper className="h-3 w-3" />
          <span>{trackTitles[certificateTrack]} Complete!</span>
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
              Get Track Certificate
            </>
          )}
        </p>
      </motion.button>
    );
  }

  // Track certificate already claimed - show what's next
  if (trackCertificate) {
    // Determine which track to recommend next
    const getNextTrackRecommendation = () => {
      if (!eligibility) return null;

      // If they completed convergence, suggest design or engineering
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

    // All done - show certificate page
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
          View Your Certificates
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
