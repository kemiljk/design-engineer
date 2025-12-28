"use client";

import { useState } from "react";
import { Download, Share2, ExternalLink, Award } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { TrackCertificatePDF } from "./track-certificate-pdf";
import type { TrackCertificate, CertificatePlatform, CertificateTrack } from "@/lib/types";

interface TrackCertificateCardProps {
  certificate: TrackCertificate;
}

const platformTitles: Record<CertificatePlatform, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
};

const trackTitles: Record<CertificateTrack, string> = {
  design: "Design Track",
  engineering: "Engineering Track",
  convergence: "Convergence",
};

export function TrackCertificateCard({ certificate }: TrackCertificateCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { metadata } = certificate;
  
  const issuedDate = new Date(metadata.issued_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullTitle = `${platformTitles[metadata.platform]} ${trackTitles[metadata.track]}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await pdf(<TrackCertificatePDF certificate={certificate} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fullTitle.replace(/ /g, "-")}-Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/verify/${certificate.slug}`;
    
    if (navigator.share) {
      await navigator.share({
        title: `${fullTitle} Certificate`,
        text: `I earned my ${fullTitle} certificate from the Design Engineer Course!`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <Award className="h-5 w-5 text-swiss-red" />
          </div>
          <div>
            <h3 className="font-bold">{fullTitle}</h3>
            <p className="text-xs text-neutral-500">Issued {issuedDate}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 mb-3">
        #{metadata.certificate_number}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 text-xs font-medium hover:bg-neutral-200 disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Download className="h-3.5 w-3.5" />
          {isDownloading ? "..." : "PDF"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 text-xs font-medium hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        <a
          href={`/verify/${certificate.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 text-xs font-medium hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View
        </a>
      </div>
    </div>
  );
}

