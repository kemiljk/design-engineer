import React from "react";
import { PageHeader } from "@/app/components/page-header";
import BlendModeExplorer from "./explorer";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Blend Mode Explorer | Design Engineer",
  description: "Learn how CSS blend modes work and experiment with stacking them to create beautiful visual effects.",
};

export default function BlendModeExplorerPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Blend Mode Explorer"
        description="Understand how each blend mode works and experiment with stacking them for beautiful effects."
      />
      <div className="container-page py-12">
        <BlendModeExplorer />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/design-track">
            Go beyond standard overlays. The Design Track covers advanced compositing and visual effects in CSS.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
