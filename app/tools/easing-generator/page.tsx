import React from "react";
import { PageHeader } from "@/app/components/page-header";
import EasingGenerator from "./generator";

export const metadata = {
  title: "Easing Curve Generator | Design Engineer",
  description: "Visualize and generate cubic-bezier easing curves for CSS and Motion.",
};

export default function EasingGeneratorPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Easing Generator"
        description="Fine-tune your animations with custom cubic-bezier curves."
      />
      <div className="container-page py-12">
        <EasingGenerator />
      </div>
    </main>
  );
}
