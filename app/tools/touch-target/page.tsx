import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TouchTargetCalculator from "./calculator";

export const metadata = {
  title: "Touch Target Calculator | Design Engineer",
  description: "Validate touch target sizes against iOS, Android, and WCAG accessibility guidelines.",
};

export default function TouchTargetPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Touch Target Calculator"
        description="Check if your interactive elements meet accessibility guidelines for iOS, Android, and web."
      />
      <div className="container-page py-12">
        <TouchTargetCalculator />
      </div>
    </main>
  );
}
