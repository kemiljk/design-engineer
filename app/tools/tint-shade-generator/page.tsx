import React from "react";
import { PageHeader } from "@/app/components/page-header";
import SpectrumGenerator from "./generator";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Spectrum Generator | Design Engineer",
  description: "Generate harmonious colour scales from a single colour using OKLCH for perceptually uniform lightness.",
};

export default function SpectrumGeneratorPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Spectrum Generator"
        description="Generate a harmonious colour scale from any starting colour using perceptually uniform OKLCH."
      />
      <div className="container-page py-12">
        <SpectrumGenerator />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/design-track">
            Stop guessing colours. The Design Track teaches you how to build systematic, accessible colour palettes.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
