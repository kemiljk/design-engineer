import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TokenCalculator from "./calculator";

export const metadata = {
  title: "Design Token Calculator | Design Engineer",
  description: "Generate consistent type and spacing scales for your design system.",
};

export default function TokenCalculatorPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Design Token Calculator"
        description="Create harmonious typography and spacing scales. Export directly to Tailwind, CSS, or SCSS."
      />
      <div className="container mx-auto px-4 py-12">
        <TokenCalculator />
      </div>
    </main>
  );
}
