import React from "react";
import { PageHeader } from "@/app/components/page-header";
import FrameworkConverter from "./converter";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Framework Converter | Design Engineer",
  description: "Convert component code between React, Vue, Svelte, Astro, and Solid.",
};

export default function FrameworkConverterPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Framework Converter"
        description="Convert component syntax between popular JavaScript frameworks. Handles common patterns like state, events, and templating."
      />
      <div className="container-page py-12">
        <FrameworkConverter />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/engineering-track">
            Learn the mental models behind each framework—not just the syntax.
            Explore the Engineering Track.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
