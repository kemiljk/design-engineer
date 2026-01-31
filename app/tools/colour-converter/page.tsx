import React from "react";
import { PageHeader } from "@/app/components/page-header";
import ColourConverter from "./converter";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Colour Converter | Design Engineer",
  description: "Convert colours between HEX, RGB, HSL, OKLCH, SwiftUI, and Android formats.",
};

export default function ColourConverterPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Colour Converter"
        description="Convert colours between web and native formats. Explore variations and harmonies."
      />
      <div className="container-page py-12">
        <ColourConverter />
        <div className="mx-auto max-w-4xl">
          <ToolCourseCTA href="/course/design-track">
            Master colour theory and systems across all platforms. The Design Track covers everything from OKLCH to P3 gamuts.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
