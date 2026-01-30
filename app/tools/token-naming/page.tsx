import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TokenNamingBuilder from "./builder";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Semantic Token Naming Tool | Design Engineer",
  description:
    "Build consistent, well-structured semantic design token names. Generate complete token sets with modifiers and states.",
};

export default function TokenNamingPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Semantic Token Naming"
        description="Build consistent, well-structured design token names. Choose your naming convention, then generate complete token sets with variants and states."
      />
      <div className="container-page py-12">
        <TokenNamingBuilder />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/design-track">
            Build complete design systems from scratch. The Design Track teaches
            semantic naming at scale.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
