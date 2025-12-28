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

// Design Tools
import { AutoLayoutDemo, SizingBehaviorsDemo, ConstraintsDemo, HandoffChecklistDemo } from "./design-tools";

// Design Systems
import { TokenExplorerDemo } from "./design-systems";

// UX
import { PersonaCardDemo } from "./ux";

// Motion
import {
  // Lesson 1: Why Motion Matters
  MotionFeedbackDemo,
  MotionRelationshipsDemo,
  MotionAttentionDemo,
  MotionContinuityDemo,
  // Lesson 2: Principles of UI Animation
  EasingPlaygroundDemo,
  TimingComparisonDemo,
  StaggerChoreographyDemo,
  SpringPhysicsDemo,
  DisneyPrinciplesDemo,
  // Lesson 3: Micro-interactions
  ButtonStatesDemo,
  FloatingLabelDemo,
  ToggleSwitchDemo,
  LikeButtonDemo,
  SkeletonLoadingDemo,
  FormValidationDemo,
  // Lesson 4: Page Transitions
  PageTransitionTypesDemo,
  SharedElementDemo,
  NavigationDirectionDemo,
  // Lesson 5: Scroll-Based Animation
  ScrollRevealDemo,
  ParallaxLayersDemo,
  ScrollProgressDemo,
  ScrollLinkedHeaderDemo,
  // Lesson 6: Implementing Motion
  CssVsJsDemo,
  AnimatePresenceDemo,
  GestureAnimationDemo,
  LayoutAnimationDemo,
  ReducedMotionDemo,
} from "./motion";

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
  
  // Design Tools
  "auto-layout-demo": AutoLayoutDemo,
  "sizing-behaviors-demo": SizingBehaviorsDemo,
  "constraints-demo": ConstraintsDemo,
  "handoff-checklist-demo": HandoffChecklistDemo,
  
  // Design Systems
  "token-explorer-demo": TokenExplorerDemo,
  
  // UX
  "persona-card-demo": PersonaCardDemo,
  
  // Motion - Lesson 1: Why Motion Matters
  "motion-feedback-demo": MotionFeedbackDemo,
  "motion-relationships-demo": MotionRelationshipsDemo,
  "motion-attention-demo": MotionAttentionDemo,
  "motion-continuity-demo": MotionContinuityDemo,
  
  // Motion - Lesson 2: Principles of UI Animation
  "easing-playground-demo": EasingPlaygroundDemo,
  "timing-comparison-demo": TimingComparisonDemo,
  "stagger-choreography-demo": StaggerChoreographyDemo,
  "spring-physics-demo": SpringPhysicsDemo,
  "disney-principles-demo": DisneyPrinciplesDemo,
  
  // Motion - Lesson 3: Micro-interactions
  "button-states-demo": ButtonStatesDemo,
  "floating-label-demo": FloatingLabelDemo,
  "toggle-switch-demo": ToggleSwitchDemo,
  "like-button-demo": LikeButtonDemo,
  "skeleton-loading-demo": SkeletonLoadingDemo,
  "form-validation-demo": FormValidationDemo,
  
  // Motion - Lesson 4: Page Transitions
  "page-transition-types-demo": PageTransitionTypesDemo,
  "shared-element-demo": SharedElementDemo,
  "navigation-direction-demo": NavigationDirectionDemo,
  
  // Motion - Lesson 5: Scroll-Based Animation
  "scroll-reveal-demo": ScrollRevealDemo,
  "parallax-layers-demo": ParallaxLayersDemo,
  "scroll-progress-demo": ScrollProgressDemo,
  "scroll-linked-header-demo": ScrollLinkedHeaderDemo,
  
  // Motion - Lesson 6: Implementing Motion
  "css-vs-js-demo": CssVsJsDemo,
  "animate-presence-demo": AnimatePresenceDemo,
  "gesture-animation-demo": GestureAnimationDemo,
  "layout-animation-demo": LayoutAnimationDemo,
  "reduced-motion-demo": ReducedMotionDemo,
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
