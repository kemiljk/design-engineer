"use client";

import React from "react";

// Design Principles
import { HierarchyDemo, ContrastDemo, BalanceDemo, ProximityDemo, AlignmentDemo, RepetitionDemo } from "./design-principles";

// Gestalt Principles
import { GestaltSimilarityDemo, GestaltContinuityDemo, GestaltClosureDemo, GestaltCommonRegionDemo, GestaltFigureGroundDemo } from "./gestalt-principles";

// Typography
import { TypeScaleDemo, LineHeightDemo, MeasureDemo, TypographicShowcaseDemo, FontPairingDemo, FontComparisonDemo } from "./typography";

// Colour
import { Colour603010Demo, ContrastCheckerDemo } from "./colour";

// Spacing
import { SpacingScaleDemo, WhitespaceDemo } from "./spacing";

// Layout
import { GridColumnsDemo, ResponsiveLayoutDemo } from "./layout";

export const VISUAL_EXAMPLE_MAP: Record<string, React.ComponentType> = {
  // Design Principles
  "hierarchy-demo": HierarchyDemo,
  "contrast-demo": ContrastDemo,
  "balance-demo": BalanceDemo,
  "proximity-demo": ProximityDemo,
  "alignment-demo": AlignmentDemo,
  "repetition-demo": RepetitionDemo,
  
  // Gestalt Principles
  "gestalt-similarity-demo": GestaltSimilarityDemo,
  "gestalt-continuity-demo": GestaltContinuityDemo,
  "gestalt-closure-demo": GestaltClosureDemo,
  "gestalt-common-region-demo": GestaltCommonRegionDemo,
  "gestalt-figure-ground-demo": GestaltFigureGroundDemo,
  
  // Typography
  "type-scale-demo": TypeScaleDemo,
  "line-height-demo": LineHeightDemo,
  "measure-demo": MeasureDemo,
  "typographic-showcase-demo": TypographicShowcaseDemo,
  "font-pairing-demo": FontPairingDemo,
  "font-comparison-demo": FontComparisonDemo,
  
  // Colour
  "colour-60-30-10-demo": Colour603010Demo,
  "contrast-checker-demo": ContrastCheckerDemo,
  
  // Spacing
  "spacing-scale-demo": SpacingScaleDemo,
  "whitespace-demo": WhitespaceDemo,
  
  // Layout
  "grid-columns-demo": GridColumnsDemo,
  "responsive-layout-demo": ResponsiveLayoutDemo,
};

interface VisualExampleRendererProps {
  type: string;
}

export function VisualExampleRenderer({ type }: VisualExampleRendererProps) {
  const Component = VISUAL_EXAMPLE_MAP[type];

  if (!Component) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="my-8 rounded-lg border-2 border-dashed border-yellow-400 bg-yellow-50 p-4 text-center dark:border-yellow-600 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Unknown visual example: <code className="font-mono">{type}</code>
          </p>
          <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-500">
            Available examples: {Object.keys(VISUAL_EXAMPLE_MAP).join(", ")}
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="my-8">
      <Component />
    </div>
  );
}
