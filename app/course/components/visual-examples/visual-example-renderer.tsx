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
import { AutoLayoutDemo, SizingBehaviorsDemo, ConstraintsDemo, HandoffChecklistDemo, AtomicDesignDemo, LayersDemo, FidelityComparisonDemo } from "./design-tools";

// Design Systems
import { TokenExplorerDemo, ComponentVariantsDemo, ComponentStatesDemo } from "./design-systems";

// UX
import { PersonaCardDemo, NavPatternsDemo, IAHierarchyDepthDemo, AffordancesSignifiersDemo, InteractionFeedbackDemo, HeuristicsViolationsDemo } from "./ux";

// Foundations
import { VisualDesignComparisonDemo, IntentionalDesignDemo } from "./foundations";

// Iconography
import { IconSizingDemo, IconTextPairingDemo } from "./iconography";

// Edge Cases
import { EmptyStatesDemo, LoadingStatesDemo, ErrorStatesDemo } from "./edge-cases";

// Motion
import {
  // Lesson 1: Why Motion Matters
  MotionFeedbackDemo,
  MotionRelationshipsDemo,
  MotionAttentionDemo,
  MotionContinuityDemo,
  // Lesson 2: Principles of UI Animation
  BorderBeamDemo,
  EasingPlaygroundDemo,
  TimingComparisonDemo,
  StaggerChoreographyDemo,
  SpringPhysicsDemo,
  DisneyPrinciplesDemo,
  NotificationBellDemo,
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
  ReducedMotionDemo,
} from "./motion";

// Shaders (Creative Visual Effects)
import {
  ShaderGradientDemo,
  ShaderNoiseDemo,
  ShaderNoiseTypesDemo,
  ShaderGrainDemo,
  ShaderMeshGradientDemo,
  ShaderFlowingGradientDemo,
  ShaderSpotlightDemo,
  ShaderGlowDemo,
  ShaderProgressiveBlurDemo,
} from "./shaders";

// React Fundamentals
import {
  FrameworkComparisonDemo,
  JsxVsHtmlDemo,
  PropsFlowDemo,
  StateCounterDemo,
  EffectLifecycleDemo,
  HooksComparisonDemo,
} from "./react";

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
  "atomic-design-demo": AtomicDesignDemo,
  "layers-demo": LayersDemo,
  "fidelity-comparison-demo": FidelityComparisonDemo,
  
  // Design Systems
  "token-explorer-demo": TokenExplorerDemo,
  "component-variants-demo": ComponentVariantsDemo,
  "component-states-demo": ComponentStatesDemo,
  
  // UX
  "persona-card-demo": PersonaCardDemo,
  "nav-patterns-demo": NavPatternsDemo,
  "ia-hierarchy-depth-demo": IAHierarchyDepthDemo,
  "affordances-signifiers-demo": AffordancesSignifiersDemo,
  "interaction-feedback-demo": InteractionFeedbackDemo,
  "heuristics-violations-demo": HeuristicsViolationsDemo,

  // Foundations
  "visual-design-comparison-demo": VisualDesignComparisonDemo,
  "intentional-design-demo": IntentionalDesignDemo,

  // Iconography
  "icon-sizing-demo": IconSizingDemo,
  "icon-text-pairing-demo": IconTextPairingDemo,

  // Edge Cases
  "empty-states-demo": EmptyStatesDemo,
  "loading-states-demo": LoadingStatesDemo,
  "error-states-demo": ErrorStatesDemo,
  
  // Motion - Lesson 1: Why Motion Matters
  "motion-feedback-demo": MotionFeedbackDemo,
  "motion-relationships-demo": MotionRelationshipsDemo,
  "motion-attention-demo": MotionAttentionDemo,
  "motion-continuity-demo": MotionContinuityDemo,
  
  // Motion - Lesson 2: Principles of UI Animation
  "border-beam-demo": BorderBeamDemo,
  "easing-playground-demo": EasingPlaygroundDemo,
  "timing-comparison-demo": TimingComparisonDemo,
  "stagger-choreography-demo": StaggerChoreographyDemo,
  "spring-physics-demo": SpringPhysicsDemo,
  "disney-principles-demo": DisneyPrinciplesDemo,
  "notification-bell-demo": NotificationBellDemo,
  
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
  "reduced-motion-demo": ReducedMotionDemo,
  
  // Shaders - Creative Visual Effects
  "shader-gradient-demo": ShaderGradientDemo,
  "shader-noise-demo": ShaderNoiseDemo,
  "shader-noise-types-demo": ShaderNoiseTypesDemo,
  "shader-grain-demo": ShaderGrainDemo,
  "shader-mesh-gradient-demo": ShaderMeshGradientDemo,
  "shader-flowing-gradient-demo": ShaderFlowingGradientDemo,
  "shader-spotlight-demo": ShaderSpotlightDemo,
  "shader-glow-demo": ShaderGlowDemo,
  "shader-progressive-blur-demo": ShaderProgressiveBlurDemo,
  
  // React Fundamentals
  "framework-comparison-demo": FrameworkComparisonDemo,
  "jsx-vs-html-demo": JsxVsHtmlDemo,
  "props-flow-demo": PropsFlowDemo,
  "state-counter-demo": StateCounterDemo,
  "effect-lifecycle-demo": EffectLifecycleDemo,
  "hooks-comparison-demo": HooksComparisonDemo,
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
