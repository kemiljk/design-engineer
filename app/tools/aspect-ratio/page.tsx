import React from "react";
import { PageHeader } from "@/app/components/page-header";
import AspectRatioCalculator from "./calculator";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Aspect Ratio Calculator | Design Engineer",
  description: "Calculate dimensions and generate aspect ratio CSS.",
};

export default function AspectRatioPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Aspect Ratio Calculator"
        description="Calculate dimensions and ratios for responsive media."
      />
      <div className="container-page py-12">
        <AspectRatioCalculator />
        <div className="mx-auto max-w-2xl">
          <ToolCourseCTA href="/course/design-track">
            Learn responsive layout principles. The Design Track covers grids, fluid typography, and intrinsic web design.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
