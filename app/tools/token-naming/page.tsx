import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TokenNamingBuilder from "./builder";

export const metadata = {
  title: "Semantic Token Naming Tool | Design Engineer",
  description:
    "Build consistent, well-structured semantic design token names. Generate complete token sets with modifiers and states.",
};

export default function TokenNamingPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Semantic Token Naming"
        description="Build consistent, well-structured design token names. Choose your naming convention, then generate complete token sets with variants and states."
      />
      <div className="container-page py-12">
        <TokenNamingBuilder />
      </div>
    </main>
  );
}
