import React from "react";
import { PageHeader } from "@/app/components/page-header";
import ColourConverter from "./converter";

export const metadata = {
  title: "Colour Converter | Design Engineer",
  description: "Convert colours between HEX, RGB, HSL, OKLCH, SwiftUI, and Android formats.",
};

export default function ColourConverterPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Colour Converter"
        description="Convert colours between web and native formats. Explore variations and harmonies."
      />
      <div className="container-page py-12">
        <ColourConverter />
      </div>
    </main>
  );
}
