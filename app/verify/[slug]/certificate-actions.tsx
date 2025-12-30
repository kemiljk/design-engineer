"use client";

import { useState, useEffect, useRef } from "react";
import { Share2, Printer, Copy, Check, Linkedin } from "lucide-react";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface CertificateActionsProps {
  certificateTitle: string;
  userName: string;
}

export function CertificateActions({ certificateTitle, userName }: CertificateActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenu]);
  const shareText = `I earned my ${certificateTitle} certificate from the Design Engineer Course!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userName}'s ${certificateTitle} Certificate`,
          text: shareText,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or share failed, show menu instead
        setShowShareMenu(!showShareMenu);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 rounded-none border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        title="Print certificate"
      >
        <Printer className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Print</span>
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 rounded-none border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        title="Copy link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-600" />
            <span className="hidden sm:inline text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>

      <div className="relative" ref={menuRef}>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-none bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-900"
          title="Share certificate"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {showShareMenu && (
          <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-none border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            <button
              onClick={shareToLinkedIn}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <Linkedin className="h-4 w-4" />
              Share on LinkedIn
            </button>
            <button
              onClick={shareToTwitter}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <XLogo className="h-4 w-4" />
              Share on X
            </button>
            <button
              onClick={() => {
                handleCopyLink();
                setShowShareMenu(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

