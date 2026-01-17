import React from "react";
import { PageHeader } from "@/app/components/page-header";
import GradientGenerator from "./generator";

export const metadata = {
  title: "Gradient Generator | Design Engineer",
  description: "Create beautiful gradients and export for CSS, Tailwind, SwiftUI, and Android.",
};

export default function GradientGeneratorPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Gradient Generator"
        description="Design linear, radial, and conic gradients with multiple colour stops. Export for web and mobile."
      />
      <div className="container-page py-12">
        <GradientGenerator />
      </div>
    </main>
  );
}
