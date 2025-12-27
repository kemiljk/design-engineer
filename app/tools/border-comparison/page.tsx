import React from "react";
import { PageHeader } from "@/app/components/page-header";
import BorderComparison from "./comparison";

export const metadata = {
  title: "Border Comparison | Design Engineer",
  description:
    "Compare grey inner borders vs semi-transparent outer borders on colourful backgrounds. Understand which approach works best for floating UI elements.",
};

export default function BorderComparisonPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Border Comparison"
        description="See why semi-transparent borders often look better than solid grey borders on colourful backgrounds."
      />
      <div className="container-page py-12">
        <BorderComparison />
      </div>
    </main>
  );
}
