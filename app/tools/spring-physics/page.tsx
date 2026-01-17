import React from "react";
import { PageHeader } from "@/app/components/page-header";
import SpringPhysicsPlayground from "./playground";

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
      </div>
    </main>
  );
}
