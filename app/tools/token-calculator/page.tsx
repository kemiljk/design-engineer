import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TokenCalculator from "./calculator";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Design Token Calculator | Design Engineer",
  description: "Generate consistent type and spacing scales for your design system.",
};

export default function TokenCalculatorPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Design Token Calculator"
        description="Create harmonious typography and spacing scales. Export directly to Tailwind, CSS, or SCSS."
      />
      <div className="container-page py-12">
        <TokenCalculator />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/design-track">
            Scaling a design system requires more than just values. The Design Track covers token architecture and documentation.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
