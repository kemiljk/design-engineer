import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TintShadeGenerator from "./generator";

export const metadata = {
  title: "Tint & Shade Generator | Design Engineer",
  description: "Generate harmonious colour scales from a single colour using OKLCH for perceptually uniform lightness.",
};

export default function TintShadeGeneratorPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Tint & Shade Generator"
        description="Generate a harmonious colour scale from lightest to darkest using perceptually uniform OKLCH."
      />
      <div className="container mx-auto px-4 py-12">
        <TintShadeGenerator />
      </div>
    </main>
  );
}
