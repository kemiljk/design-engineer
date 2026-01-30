import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TouchTargetCalculator from "./calculator";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Touch Target Calculator | Design Engineer",
  description: "Validate touch target sizes against iOS, Android, and WCAG accessibility guidelines.",
};

export default function TouchTargetPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Touch Target Calculator"
        description="Check if your interactive elements meet accessibility guidelines for iOS, Android, and web."
      />
      <div className="container-page py-12">
        <TouchTargetCalculator />
        <div className="mx-auto max-w-2xl">
          <ToolCourseCTA href="/course/engineering-track">
            Accessibility is just the start. The Engineering Track covers building
            production-ready mobile interfaces.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
