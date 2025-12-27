import React from "react";
import { PageHeader } from "@/app/components/page-header";
import BlendModeExplorer from "./explorer";

export const metadata = {
  title: "Blend Mode Explorer | Design Engineer",
  description: "Learn how CSS blend modes work and experiment with stacking them to create beautiful visual effects.",
};

export default function BlendModeExplorerPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Blend Mode Explorer"
        description="Understand how each blend mode works and experiment with stacking them for beautiful effects."
      />
      <div className="container-page py-12">
        <BlendModeExplorer />
      </div>
    </main>
  );
}
