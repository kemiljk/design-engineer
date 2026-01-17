import React from "react";
import { PageHeader } from "@/app/components/page-header";
import FrameworkConverter from "./converter";

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
      </div>
    </main>
  );
}
