"use client";

import { useState } from "react";
import { Download, Share2, ExternalLink, Award } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { CertificatePDF } from "./certificate-pdf";
import type { Certificate } from "@/lib/types";

interface CertificateCardProps {
  certificate: Certificate;
}

const platformTitles = {
  web: "Web Design Engineer",
  ios: "iOS Design Engineer",
  android: "Android Design Engineer",
};

export function CertificateCard({ certificate }: CertificateCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { metadata } = certificate;
  
  const issuedDate = new Date(metadata.issued_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await pdf(<CertificatePDF certificate={certificate} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${platformTitles[metadata.platform].replace(/ /g, "-")}-Certificate.pdf`;
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
        title: `${platformTitles[metadata.platform]} Certificate`,
        text: `I earned my ${platformTitles[metadata.platform]} certificate from the Design Engineer Course!`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="border border-swiss-red bg-white p-6 dark:bg-neutral-900">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center bg-swiss-red/10">
            <Award className="h-6 w-6 text-swiss-red" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{platformTitles[metadata.platform]}</h3>
            <p className="text-sm text-neutral-500">Issued {issuedDate}</p>
          </div>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          #{metadata.certificate_number}
        </span>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Awarded to <strong>{metadata.user_name}</strong> for completing the Design, 
        Engineering, and Convergence tracks for {platformTitles[metadata.platform].split(" ")[0]}.
      </p>

      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-swiss-red px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Generating..." : "Download PDF"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 border border-neutral-200 px-4 py-2 text-sm font-medium hover:border-swiss-red hover:text-swiss-red dark:border-neutral-700"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
        <a
          href={`/verify/${certificate.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-neutral-200 px-4 py-2 text-sm font-medium hover:border-swiss-red hover:text-swiss-red dark:border-neutral-700"
        >
          <ExternalLink className="h-4 w-4" />
          View
        </a>
      </div>
    </div>
  );
}
