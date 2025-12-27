import React from "react";
import { PageHeader } from "@/app/components/page-header";
import IconGenerator from "./generator";

export const metadata = {
  title: "App Icon Sizes | Design Engineer",
  description: "Generate all required app icon sizes for iOS, Android, macOS, and web platforms.",
};

export default function IconGeneratorPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="App Icon Sizes"
        description="Reference guide for all required app icon dimensions across iOS, Android, macOS, and web."
      />
      <div className="container-page py-12">
        <IconGenerator />
      </div>
    </main>
  );
}
