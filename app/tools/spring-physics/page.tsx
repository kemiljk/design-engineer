import React from "react";
import { PageHeader } from "@/app/components/page-header";
import SpringPhysicsPlayground from "./playground";
import { ToolCourseCTA } from "@/app/components/tool-course-cta";

export const metadata = {
  title: "Spring Physics Playground | Design Engineer",
  description: "Visualize and generate spring physics for Motion, CSS, and SwiftUI.",
};

export default function SpringPhysicsPage() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Spring Physics Playground"
        description="Experiment with spring parameters to create organic animations. Export to code instantly."
      />
      <div className="container-page py-12">
        <SpringPhysicsPlayground />
        <div className="mx-auto max-w-3xl">
          <ToolCourseCTA href="/course/engineering-track">
            Want to master animation physics? The Engineering Track covers spring
            dynamics and platform-native implementations.
          </ToolCourseCTA>
        </div>
      </div>
    </main>
  );
}
