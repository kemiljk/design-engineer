import React from "react";
import { PageHeader } from "@/app/components/page-header";
import CornerRadiusCalculator from "./calculator";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Corner Radius Calculator | Design Engineer",
  description: "Calculate harmonious nested corner radii for optically perfect UI components. Based on Apple's containerRelative approach.",
};

export default function CornerRadiusPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Corner Radius Calculator"
        description="Calculate harmonious inner radii for nested elements. Achieve optical perfection with Apple-style continuous corners."
      />
      <div className="container-page py-12">
        <CornerRadiusCalculator />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/design-track">
            Learn the math behind beautiful interfaces. The Design Track covers optical adjustments, spacing scales, and layout harmony.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
