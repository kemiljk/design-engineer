import React from "react";
import { PageHeader } from "@/app/components/page-header";
import IconGenerator from "./generator";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "App Icon Sizes | Design Engineer",
  description: "Generate all required app icon sizes for iOS, Android, macOS, and web platforms.",
};

export default function IconGeneratorPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="App Icon Sizes"
        description="Reference guide for all required app icon dimensions across iOS, Android, macOS, and web."
      />
      <div className="container-page py-12">
        <IconGenerator />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/design-track">
            Designing for mobile requires precision. The Design Track covers platform guidelines, export workflows, and asset management.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
