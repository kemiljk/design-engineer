import { HierarchyStack } from "./concepts/hierarchy-stack";
import { ContrastPairs } from "./concepts/contrast-pairs";
import { GestaltProximity } from "./concepts/gestalt-proximity";
import { GridOverlay } from "./concepts/grid-overlay";
import { SpacingScale } from "./concepts/spacing-scale";
import { TypeScale } from "./concepts/type-scale";
import { ColorPalette } from "./concepts/color-palette";
import { BoxModel } from "./concepts/box-model";
import { ComponentAnatomy } from "./concepts/component-anatomy";
import { FlowDiagram } from "./concepts/flow-diagram";
import { AlignmentGrid } from "./concepts/alignment-grid";
import { BalanceTypes } from "./concepts/balance-types";
import { DesignSystemLayers } from "./concepts/design-system-layers";
import { ComponentStates } from "./concepts/component-states";
import { EasingCurves } from "./concepts/easing-curves";
import { ResponsiveBreakpoints } from "./concepts/responsive-breakpoints";
import { TokenHierarchy } from "./concepts/token-hierarchy";
import { MicroInteractionAnatomy } from "./concepts/micro-interaction-anatomy";
import { FlexboxAxes } from "./concepts/flexbox-axes";
import { CssCascade } from "./concepts/css-cascade";
import { SkeletonLoading } from "./concepts/skeleton-loading";
import { FigureGround } from "./concepts/figure-ground";
import { ClosurePrinciple } from "./concepts/closure-principle";
import { GridTemplateAreas } from "./concepts/grid-template-areas";
import { ColorWheel } from "./concepts/color-wheel";
import { AtomicDesign } from "./concepts/atomic-design";
import { FocusOrder } from "./concepts/focus-order";
import { PrototypeFidelity } from "./concepts/prototype-fidelity";
import { IaHierarchy } from "./concepts/ia-hierarchy";
import { EmptyStateAnatomy } from "./concepts/empty-state-anatomy";
import { LoadingDuration } from "./concepts/loading-duration";
import { AffordanceSignifier } from "./concepts/affordance-signifier";
import { ContrastRatio } from "./concepts/contrast-ratio";
import { HtmlCssJsLayers } from "./concepts/html-css-js-layers";
import { JsDataTypes } from "./concepts/js-data-types";
import { ScrollAnimationTypes } from "./concepts/scroll-animation-types";
import { IconSizing } from "./concepts/icon-sizing";
import { PolishChecklist } from "./concepts/polish-checklist";
import { EventBubbling } from "./concepts/event-bubbling";
import { FormValidationStates } from "./concepts/form-validation-states";
import { NavigationPatterns } from "./concepts/navigation-patterns";
import { DarkModeMapping } from "./concepts/dark-mode-mapping";
import { IosAccessibilityFocus } from "./concepts/ios-accessibility-focus";
import { AndroidAccessibilityFocus } from "./concepts/android-accessibility-focus";
import { IosSpringAnimation } from "./concepts/ios-spring-animation";
import { MaterialMotionSystem } from "./concepts/material-motion-system";
import { AppleDeviceFamily } from "./concepts/apple-device-family";
import { AndroidDeviceFamily } from "./concepts/android-device-family";
import { MaterialDynamicColor } from "./concepts/material-dynamic-color";
import { DesignHandoffFlow } from "./concepts/design-handoff-flow";
import { TokenPipeline } from "./concepts/token-pipeline";
import { TokenFileStructure } from "./concepts/token-file-structure";
import { FeedbackLoop } from "./concepts/feedback-loop";
import { TouchTargetSizes } from "./concepts/touch-target-sizes";
import { FalseHiddenAffordances } from "./concepts/false-hidden-affordances";
import { SignifierStrength } from "./concepts/signifier-strength";
import { HeuristicsGrid } from "./concepts/heuristics-grid";
import { SeverityScale } from "./concepts/severity-scale";
import { ContentExtremes } from "./concepts/content-extremes";
import { PermissionStates } from "./concepts/permission-states";
import { HierarchyDepth } from "./concepts/hierarchy-depth";
import { OrganizationSchemes } from "./concepts/organization-schemes";
import { UserJourneyMap } from "./concepts/user-journey-map";
import { UxTraps } from "./concepts/ux-traps";
import { DesignTrackHero } from "./heroes/design-track-hero";
import { EngineeringTrackHero } from "./heroes/engineering-track-hero";
import { ConvergenceTrackHero } from "./heroes/convergence-track-hero";

export const ILLUSTRATION_MAP: Record<string, React.ComponentType> = {
  "hierarchy-stack": HierarchyStack,
  "contrast-pairs": ContrastPairs,
  "gestalt-proximity": GestaltProximity,
  "grid-overlay": GridOverlay,
  "spacing-scale": SpacingScale,
  "type-scale": TypeScale,
  "color-palette": ColorPalette,
  "box-model": BoxModel,
  "component-anatomy": ComponentAnatomy,
  "flow-diagram": FlowDiagram,
  "alignment-grid": AlignmentGrid,
  "balance-types": BalanceTypes,
  "design-system-layers": DesignSystemLayers,
  "component-states": ComponentStates,
  "easing-curves": EasingCurves,
  "responsive-breakpoints": ResponsiveBreakpoints,
  "token-hierarchy": TokenHierarchy,
  "micro-interaction-anatomy": MicroInteractionAnatomy,
  "flexbox-axes": FlexboxAxes,
  "css-cascade": CssCascade,
  "skeleton-loading": SkeletonLoading,
  "figure-ground": FigureGround,
  "closure-principle": ClosurePrinciple,
  "grid-template-areas": GridTemplateAreas,
  "color-wheel": ColorWheel,
  "atomic-design": AtomicDesign,
  "focus-order": FocusOrder,
  "prototype-fidelity": PrototypeFidelity,
  "ia-hierarchy": IaHierarchy,
  "empty-state-anatomy": EmptyStateAnatomy,
  "loading-duration": LoadingDuration,
  "affordance-signifier": AffordanceSignifier,
  "contrast-ratio": ContrastRatio,
  "html-css-js-layers": HtmlCssJsLayers,
  "js-data-types": JsDataTypes,
  "scroll-animation-types": ScrollAnimationTypes,
  "icon-sizing": IconSizing,
  "polish-checklist": PolishChecklist,
  "event-bubbling": EventBubbling,
  "form-validation-states": FormValidationStates,
  "navigation-patterns": NavigationPatterns,
  "dark-mode-mapping": DarkModeMapping,
  "ios-accessibility-focus": IosAccessibilityFocus,
  "android-accessibility-focus": AndroidAccessibilityFocus,
  "ios-spring-animation": IosSpringAnimation,
  "material-motion-system": MaterialMotionSystem,
  "apple-device-family": AppleDeviceFamily,
  "android-device-family": AndroidDeviceFamily,
  "material-dynamic-color": MaterialDynamicColor,
  "design-handoff-flow": DesignHandoffFlow,
  "token-pipeline": TokenPipeline,
  "token-file-structure": TokenFileStructure,
  "feedback-loop": FeedbackLoop,
  "touch-target-sizes": TouchTargetSizes,
  "false-hidden-affordances": FalseHiddenAffordances,
  "signifier-strength": SignifierStrength,
  "heuristics-grid": HeuristicsGrid,
  "severity-scale": SeverityScale,
  "content-extremes": ContentExtremes,
  "permission-states": PermissionStates,
  "hierarchy-depth": HierarchyDepth,
  "organization-schemes": OrganizationSchemes,
  "user-journey-map": UserJourneyMap,
  "ux-traps": UxTraps,
  "design-track-hero": DesignTrackHero,
  "engineering-track-hero": EngineeringTrackHero,
  "convergence-track-hero": ConvergenceTrackHero,
};

interface IllustrationRendererProps {
  type: string;
  caption?: string;
}

export function IllustrationRenderer({
  type,
  caption,
}: IllustrationRendererProps) {
  const Component = ILLUSTRATION_MAP[type];

  if (!Component) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="my-8 rounded-none border-2 border-dashed border-yellow-400 bg-yellow-50 p-4 text-center dark:border-yellow-600 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Unknown illustration: <code className="font-mono">{type}</code>
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <figure className="my-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Component />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
