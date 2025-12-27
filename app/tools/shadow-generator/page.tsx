import React from "react";
import { PageHeader } from "@/app/components/page-header";
import ShadowGenerator from "./generator";

export const metadata = {
  title: "Shadow Generator | Design Engineer",
  description: "Create and export box shadows for CSS, Tailwind, SwiftUI, Android, and React Native.",
};

export default function ShadowGeneratorPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Shadow Generator"
        description="Design beautiful shadows and export them for web and mobile platforms."
      />
      <div className="container-page py-12">
        <ShadowGenerator />
      </div>
    </main>
  );
}
