"use client";

import { Check, VideoCamera } from "iconoir-react";

interface PortfolioReviewProps {
  reviewEligible: boolean;
  reviewComplete: boolean;
}

export function PortfolioReview({
  reviewEligible,
  reviewComplete,
}: PortfolioReviewProps) {
  if (!reviewEligible) return null;

  if (reviewComplete) {
    return (
      <div className="flex items-center gap-4 border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <Check className="h-6 w-6 text-neutral-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-400">
            Early Supporter Perk
          </p>
          <p className="font-bold text-neutral-500">Session Booked</p>
          <p className="text-sm text-neutral-400">
            Your portfolio feedback session has been completed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-2 border-swiss-red bg-swiss-red/5 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-swiss-red text-white">
          <VideoCamera className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-swiss-red">
            Early Supporter Perk
          </p>
          <p className="text-lg font-bold">Portfolio Feedback Session</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Book a free 60-minute 1:1 session to get feedback on your portfolio
            or project.
          </p>
        </div>
      </div>
      <a
        href="https://cal.com/karlkoch"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-swiss-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-swiss-red/90"
      >
        Book Your Session
      </a>
    </div>
  );
}
