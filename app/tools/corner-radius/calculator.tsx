"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";
import { Info, AlertCircle } from "lucide-react";

type Platform = "css" | "tailwind" | "swift" | "android";

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "css", label: "CSS" },
  { value: "tailwind", label: "Tailwind" },
  { value: "swift", label: "SwiftUI" },
  { value: "android", label: "Android" },
];

type CalculationMode = "standard" | "optical" | "proportional" | "custom";

const CALCULATION_MODES: { value: CalculationMode; label: string; description: string }[] = [
  { 
    value: "standard", 
    label: "Standard", 
    description: "Inner = Outer − Gap (Apple's approach)" 
  },
  { 
    value: "optical", 
    label: "Optical", 
    description: "Applies perceptual correction for visual harmony" 
  },
  { 
    value: "proportional", 
    label: "Proportional", 
    description: "Maintains ratio based on element sizes" 
  },
  { 
    value: "custom", 
    label: "Custom Offset", 
    description: "Add a manual adjustment for optical tuning" 
  },
];

/**
 * Calculate optical offset for harmonious corner radii.
 * 
 * The offset compensates for visual perception: larger corner radii carry more
 * visual "weight" and can appear too prominent on nested elements. This formula
 * accounts for:
 * 
 * 1. Outer radius size - larger radii need more correction
 * 2. Gap proportion - smaller gaps relative to radius need more correction
 * 3. Continuous corner compensation - squircles extend further than circular arcs
 * 
 * Formula: offset = (innerRadius × curveFactor) + continuousCornerCompensation
 * 
 * Where:
 * - curveFactor = 0.08-0.12 based on the radius/gap ratio
 * - continuousCornerCompensation = ~1-2px for squircle shapes
 */
function calculateOpticalOffset(
  outerRadius: number, 
  gap: number, 
  useContinuousCorners: boolean
): number {
  const standardInner = outerRadius - gap;
  
  // If already at 0, no offset needed
  if (standardInner <= 0) return 0;
  
  // Base curve factor - how much the inner curve "pulls" visually
  // Higher values when the gap is small relative to the radius
  const gapRatio = gap / outerRadius;
  const curveFactor = 0.06 + (1 - gapRatio) * 0.06; // 0.06-0.12 range
  
  // Base optical correction
  let offset = standardInner * curveFactor;
  
  // Continuous corners (squircles) extend slightly further than circular arcs
  // at the same nominal radius, requiring additional compensation
  if (useContinuousCorners) {
    // Squircle compensation: ~1px base + scaled by radius
    const squircleCompensation = 1 + (outerRadius / 48);
    offset += squircleCompensation;
  }
  
  // Minimum perceptible offset is ~1px
  // Maximum offset shouldn't exceed 20% of the inner radius
  const minOffset = standardInner > 8 ? 1 : 0;
  const maxOffset = standardInner * 0.2;
  
  return Math.round(Math.max(minOffset, Math.min(offset, maxOffset)));
}

type RadiusPreset = {
  name: string;
  outerRadius: number;
  padding: number;
};

const PRESETS: RadiusPreset[] = [
  { name: "Card", outerRadius: 16, padding: 12 },
  { name: "Modal", outerRadius: 24, padding: 16 },
  { name: "Button", outerRadius: 12, padding: 8 },
  { name: "iOS App", outerRadius: 22, padding: 6 },
  { name: "Android Card", outerRadius: 12, padding: 16 },
  { name: "Large Card", outerRadius: 32, padding: 24 },
];

export default function CornerRadiusCalculator() {
  const [outerRadius, setOuterRadius] = useState(24);
  const [padding, setPadding] = useState(16);
  const [customOffset, setCustomOffset] = useState(0);
  const [mode, setMode] = useState<CalculationMode>("standard");
  const [platform, setPlatform] = useState<Platform>("css");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showBorders, setShowBorders] = useState(true);
  const [useContinuousCorners, setUseContinuousCorners] = useState(true);

  // Calculate the suggested optical offset
  const suggestedOffset = useMemo(() => {
    return calculateOpticalOffset(outerRadius, padding, useContinuousCorners);
  }, [outerRadius, padding, useContinuousCorners]);

  // Calculate inner radius based on mode
  const innerRadius = useMemo(() => {
    let calculated: number;

    switch (mode) {
      case "standard":
        // Apple's approach: inner = outer - gap
        calculated = outerRadius - padding;
        break;
      case "optical":
        // Apply perceptual correction
        calculated = outerRadius - padding - suggestedOffset;
        break;
      case "proportional":
        // Proportional: maintains visual ratio
        // This keeps the corner curve looking proportional to the element size
        const outerSize = 280; // Preview container size
        const innerSize = outerSize - padding * 2;
        calculated = outerRadius * (innerSize / outerSize);
        break;
      case "custom":
        // Standard with custom offset
        calculated = outerRadius - padding - customOffset;
        break;
      default:
        calculated = outerRadius - padding;
    }

    // Never return negative radius
    return Math.max(0, Math.round(calculated * 100) / 100);
  }, [outerRadius, padding, customOffset, mode, suggestedOffset]);

  // Check if inner radius would be negative without clamping
  const wouldBeNegative = useMemo(() => {
    switch (mode) {
      case "standard":
        return outerRadius - padding < 0;
      case "optical":
        return outerRadius - padding - suggestedOffset < 0;
      case "custom":
        return outerRadius - padding - customOffset < 0;
      default:
        return false;
    }
  }, [outerRadius, padding, customOffset, mode, suggestedOffset]);

  // Calculate the standard inner radius for comparison
  const standardInnerRadius = Math.max(0, outerRadius - padding);

  const handlePresetClick = (preset: RadiusPreset) => {
    setOuterRadius(preset.outerRadius);
    setPadding(preset.padding);
    setActivePreset(preset.name);
  };

  const handleSliderChange = () => {
    setActivePreset(null);
  };

  // Generate code for each platform
  const generateCSS = () => {
    return `/* Outer container */
.card {
  border-radius: ${outerRadius}px;
  padding: ${padding}px;
}

/* Inner element */
.card-image {
  border-radius: ${innerRadius}px;
}

/* CSS Custom Properties approach */
:root {
  --card-radius: ${outerRadius}px;
  --card-padding: ${padding}px;
  --card-inner-radius: calc(var(--card-radius) - var(--card-padding));
}`;
  };

  const generateTailwind = () => {
    // Try to find closest Tailwind value
    const findClosestTailwind = (value: number): string => {
      const tailwindRadii: Record<string, number> = {
        "none": 0,
        "sm": 2,
        "": 4,
        "md": 6,
        "lg": 8,
        "xl": 12,
        "2xl": 16,
        "3xl": 24,
        "full": 9999,
      };

      let closest = "none";
      let minDiff = Infinity;

      for (const [name, val] of Object.entries(tailwindRadii)) {
        const diff = Math.abs(val - value);
        if (diff < minDiff) {
          minDiff = diff;
          closest = name;
        }
      }

      if (minDiff > 2) {
        return `[${value}px]`;
      }

      return closest === "" ? "" : `-${closest}`;
    };

    const outerClass = findClosestTailwind(outerRadius);
    const innerClass = findClosestTailwind(innerRadius);

    return `/* Using Tailwind classes */
<div class="rounded${outerClass} p-[${padding}px]">
  <img class="rounded${innerClass}" />
</div>

/* Tailwind v4 with CSS variables */
@theme {
  --radius-card: ${outerRadius}px;
  --radius-card-inner: ${innerRadius}px;
  --spacing-card: ${padding}px;
}

<div class="rounded-card p-card">
  <img class="rounded-card-inner" />
</div>`;
  };

  const generateSwiftUI = () => {
    const continuousNote = useContinuousCorners 
      ? `
// Using continuous corners (Apple's default)
// This creates smoother, more organic corners`
      : "";

    return `// Outer container${continuousNote}
RoundedRectangle(cornerRadius: ${outerRadius}${useContinuousCorners ? ", style: .continuous" : ""})
    .padding(${padding})

// Inner element
RoundedRectangle(cornerRadius: ${innerRadius}${useContinuousCorners ? ", style: .continuous" : ""})

// As a reusable view
struct HarmoniousCard<Content: View>: View {
    let outerRadius: CGFloat = ${outerRadius}
    let padding: CGFloat = ${padding}
    
    var innerRadius: CGFloat {
        max(0, outerRadius - padding)
    }
    
    let content: () -> Content
    
    var body: some View {
        VStack {
            content()
        }
        .padding(padding)
        .background(.white)
        .clipShape(RoundedRectangle(cornerRadius: outerRadius${useContinuousCorners ? ", style: .continuous" : ""}))
    }
}

// iOS 17+ with containerRelativeFrame
Image("photo")
    .containerRelativeFrame(.horizontal)
    .clipShape(.rect(cornerRadius: ${innerRadius}${useContinuousCorners ? ", style: .continuous" : ""}))`;
  };

  const generateAndroid = () => {
    return `<!-- XML Layout -->
<androidx.cardview.widget.CardView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:cardCornerRadius="${outerRadius}dp"
    app:contentPadding="${padding}dp">
    
    <ImageView
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:scaleType="centerCrop"
        app:shapeAppearanceOverlay="@style/InnerRadius" />
        
</androidx.cardview.widget.CardView>

<!-- In styles.xml -->
<style name="InnerRadius">
    <item name="cornerSize">${innerRadius}dp</item>
</style>

/* Jetpack Compose */
@Composable
fun HarmoniousCard(
    outerRadius: Dp = ${outerRadius}.dp,
    padding: Dp = ${padding}.dp,
    content: @Composable () -> Unit
) {
    val innerRadius = maxOf(0.dp, outerRadius - padding)
    
    Card(
        shape = RoundedCornerShape(outerRadius),
        modifier = Modifier.padding(padding)
    ) {
        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(innerRadius))
        ) {
            content()
        }
    }
}`;
  };

  const getCode = () => {
    switch (platform) {
      case "css":
        return generateCSS();
      case "tailwind":
        return generateTailwind();
      case "swift":
        return generateSwiftUI();
      case "android":
        return generateAndroid();
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-8 sm:p-6">
          {/* Presets */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Presets</h2>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetClick(preset)}
                  className={clsx(
                    "rounded-none px-4 py-2 text-sm font-medium transition-colors",
                    activePreset === preset.name
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                  )}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Mode */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Calculation Mode</h2>
            <div className="space-y-2">
              {CALCULATION_MODES.map((modeOption) => (
                <label
                  key={modeOption.value}
                  className={clsx(
                    "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                    mode === modeOption.value
                      ? "border-swiss-red bg-swiss-red/5 dark:border-swiss-red/50"
                      : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
                  )}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={modeOption.value}
                    checked={mode === modeOption.value}
                    onChange={() => setMode(modeOption.value)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <div>
                    <span className="font-medium">{modeOption.label}</span>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {modeOption.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Configuration</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Outer Radius
                  </label>
                  <span className="font-mono text-sm">{outerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="64"
                  value={outerRadius}
                  onChange={(e) => {
                    setOuterRadius(Number(e.target.value));
                    handleSliderChange();
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Padding / Gap
                  </label>
                  <span className="font-mono text-sm">{padding}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={padding}
                  onChange={(e) => {
                    setPadding(Number(e.target.value));
                    handleSliderChange();
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
                />
              </div>

              {mode === "custom" && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Optical Offset
                    </label>
                    <span className="font-mono text-sm">{customOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="-8"
                    max="8"
                    value={customOffset}
                    onChange={(e) => setCustomOffset(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
                  />
                  <p className="text-xs text-neutral-500">
                    Positive values reduce the inner radius further, negative values increase it.
                  </p>
                </div>
              )}
            </div>

            {/* Result */}
            <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Calculated Inner Radius
                </span>
                <span className="text-2xl font-bold tabular-nums text-swiss-red">
                  {innerRadius}px
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-neutral-500">
                {mode === "standard" && `${outerRadius} − ${padding} = ${innerRadius}`}
                {mode === "optical" && `${outerRadius} − ${padding} − ${suggestedOffset} = ${innerRadius}`}
                {mode === "proportional" && `${outerRadius} × ratio = ${innerRadius}`}
                {mode === "custom" && `${outerRadius} − ${padding} − ${customOffset} = ${innerRadius}`}
              </p>
              
              {/* Show optical offset details when in optical mode */}
              {mode === "optical" && suggestedOffset > 0 && (
                <div className="mt-3 rounded-md bg-swiss-red/5 p-3 dark:bg-swiss-red/10">
                  <p className="text-xs font-medium text-swiss-red">
                    Optical correction: −{suggestedOffset}px
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Standard would be {standardInnerRadius}px — reduced by {suggestedOffset}px for visual harmony
                  </p>
                </div>
              )}
              
              {/* Show suggested offset when in custom mode */}
              {mode === "custom" && (
                <div className="mt-3 rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    💡 Suggested optical offset: <strong>{suggestedOffset}px</strong>
                  </p>
                </div>
              )}
              
              {wouldBeNegative && (
                <div className="mt-2 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Result clamped to 0 (padding exceeds outer radius)</span>
                </div>
              )}
            </div>
            
            {/* Optical Offset Formula Explanation */}
            {mode === "optical" && (
              <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                <p className="mb-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Optical Offset Formula
                </p>
                <p className="font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                  offset = (inner × curveFactor) + squircleCompensation
                </p>
                <div className="mt-2 space-y-1 text-[11px] text-neutral-500">
                  <p>• <strong>curveFactor</strong>: {(0.06 + (1 - padding / outerRadius) * 0.06).toFixed(2)} (based on gap/radius ratio)</p>
                  {useContinuousCorners && (
                    <p>• <strong>squircleCompensation</strong>: {(1 + outerRadius / 48).toFixed(1)}px (for continuous corners)</p>
                  )}
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showBorders}
                  onChange={(e) => setShowBorders(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Show corner radius guides
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useContinuousCorners}
                  onChange={(e) => setUseContinuousCorners(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Use continuous corners (squircle)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <div className="flex min-h-[400px] flex-1 items-center justify-center rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200 p-8 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800">
            <div className="relative">
              {/* Outer container - the card */}
              <motion.div
                layout
                className={clsx(
                  "relative bg-white shadow-xl dark:bg-neutral-800",
                  showBorders && "ring-2 ring-swiss-red/30 ring-offset-2 ring-offset-transparent"
                )}
                style={{
                  width: 280,
                  borderRadius: outerRadius,
                  padding: padding,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Outer radius indicator */}
                {showBorders && outerRadius > 0 && (
                  <div
                    className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-swiss-red px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
                  >
                    {outerRadius}
                  </div>
                )}

                {/* Inner element - the image */}
                <motion.div
                  layout
                  className={clsx(
                    "relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-swiss-red to-orange-400",
                    showBorders && "ring-2 ring-blue-500/30"
                  )}
                  style={{
                    borderRadius: innerRadius,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* Placeholder image content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  {/* Inner radius indicator */}
                  {showBorders && innerRadius > 0 && (
                    <div
                      className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
                    >
                      {innerRadius}
                    </div>
                  )}
                </motion.div>

                {/* Card content */}
                <div className="mt-3 space-y-1.5">
                  <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-3 w-full rounded bg-neutral-100 dark:bg-neutral-700/50" />
                  <div className="h-3 w-2/3 rounded bg-neutral-100 dark:bg-neutral-700/50" />
                </div>
              </motion.div>

              {/* Padding indicator */}
              {showBorders && padding > 0 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-neutral-500">
                  padding: {padding}px
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          {showBorders && (
            <div className="mt-4 flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm ring-2 ring-swiss-red/30" />
                <span className="text-neutral-500">Outer radius</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm ring-2 ring-blue-500/30" />
                <span className="text-neutral-500">Inner radius</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Understanding the Problem */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">The Problem: Visual Tension in Nested Corners</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="prose prose-neutral max-w-none text-sm dark:prose-invert">
            <p>
              When you place a rounded element inside another rounded element, using the same 
              corner radius for both creates <strong>visual tension</strong>. The inner corners 
              appear disproportionately round because the eye perceives the relationship between 
              the curves and the gap between them.
            </p>
            <p>
              This is particularly noticeable in cards with images, buttons with icons, or any 
              nested UI component. The effect worsens as the outer radius increases or the 
              padding decreases.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div
                className="bg-neutral-200 dark:bg-neutral-700"
                style={{ borderRadius: 24, padding: 12, width: 100 }}
              >
                <div
                  className="aspect-square w-full bg-red-400"
                  style={{ borderRadius: 24 }}
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">Same radius</p>
              <p className="text-[10px] text-red-500">Looks wrong</p>
            </div>
            <div className="text-2xl text-neutral-300">→</div>
            <div className="text-center">
              <div
                className="bg-neutral-200 dark:bg-neutral-700"
                style={{ borderRadius: 24, padding: 12, width: 100 }}
              >
                <div
                  className="aspect-square w-full bg-green-400"
                  style={{ borderRadius: 10 }}
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">Adjusted radius</p>
              <p className="text-[10px] text-green-600">Harmonious</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Standard Formula */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">The Standard Formula</h2>
        <div className="mb-4 flex items-center justify-center rounded-lg bg-neutral-100 p-6 dark:bg-neutral-800">
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
              inner = outer − gap
            </p>
            <p className="mt-2 text-sm text-neutral-500">Apple&apos;s containerRelative approach</p>
          </div>
        </div>
        <div className="prose prose-neutral max-w-none text-sm dark:prose-invert">
          <p>
            Apple popularised this formula with their &quot;continuous corners&quot; (squircle) design 
            language. The idea is simple: the inner radius should account for the space between 
            the elements. If you have a 24px outer radius and 16px of padding, the inner radius 
            should be 8px.
          </p>
          <p>
            This formula works well in most cases and is mathematically precise. SwiftUI&apos;s 
            <code>.containerRelativeFrame()</code> modifier uses this exact calculation.
          </p>
        </div>
      </div>

      {/* Why Optical Offset */}
      <div className="rounded-xl border border-swiss-red/20 bg-swiss-red/5 p-4 dark:border-swiss-red/30 dark:bg-swiss-red/10 sm:p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-swiss-red" />
          <div>
            <h2 className="mb-2 text-lg font-bold">Why the Optical Offset?</h2>
            <div className="prose prose-neutral max-w-none text-sm dark:prose-invert">
              <p>
                The standard formula is mathematically correct but doesn&apos;t account for 
                <strong> human visual perception</strong>. Our eyes don&apos;t process geometry 
                objectively—we perceive curves, weight, and relationships differently than a 
                computer calculates them.
              </p>
              
              <h3 className="text-base font-semibold">Three Perceptual Factors</h3>
              
              <div className="not-prose my-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="mb-2 text-2xl">📐</div>
                  <h4 className="font-semibold">Curve Weight</h4>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    Larger radii carry more visual &quot;mass&quot;. The inner curve competes for 
                    attention with the outer curve, creating tension.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="mb-2 text-2xl">👁️</div>
                  <h4 className="font-semibold">Gap Perception</h4>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    When the gap is small relative to the radius, the inner curve appears more 
                    prominent and needs more reduction.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="mb-2 text-2xl">◯</div>
                  <h4 className="font-semibold">Squircle Extension</h4>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    Continuous corners (superellipse) extend further into the corner than circular 
                    arcs, requiring ~1-2px additional compensation.
                  </p>
                </div>
              </div>

              <h3 className="text-base font-semibold">The Optical Formula</h3>
              <div className="not-prose my-4 rounded-lg bg-neutral-900 p-4 dark:bg-neutral-950">
                <pre className="text-xs text-neutral-300">
{`// Calculate optical offset
curveFactor = 0.06 + (1 - gap/outer) × 0.06  // 6-12%
squircleBonus = useContinuous ? 1 + outer/48 : 0

offset = standardInner × curveFactor + squircleBonus
opticalInner = outer - gap - offset`}
                </pre>
              </div>
              
              <p>
                The curve factor scales between 6% and 12% based on how small the gap is relative 
                to the outer radius. Smaller gaps mean the inner curve is more visible and needs 
                more correction. The squircle compensation adds ~1-2px for continuous corners.
              </p>

              <h3 className="text-base font-semibold">When to Use It</h3>
              <ul>
                <li>
                  <strong>Hero UI elements:</strong> Cards, modals, and featured content where 
                  visual polish matters most
                </li>
                <li>
                  <strong>Large radii:</strong> The effect is most noticeable with radii &gt;16px
                </li>
                <li>
                  <strong>Tight padding:</strong> When the gap is less than half the outer radius
                </li>
                <li>
                  <strong>Brand-sensitive contexts:</strong> Marketing pages, app stores, portfolios
                </li>
              </ul>
              
              <p>
                For systematic design systems where consistency across platforms matters more than 
                pixel-perfect optical tuning, the standard formula is often preferred.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Output */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">Code Output</h2>
          <div className="relative flex bg-neutral-100 p-1 dark:bg-neutral-800">
            {PLATFORM_OPTIONS.map((option) => {
              const isSelected = platform === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setPlatform(option.value)}
                  className={clsx(
                    "relative z-10 flex-1 px-3 py-1.5 text-xs font-medium transition-colors sm:px-4",
                    isSelected
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="corner-radius-platform-indicator"
                      className="absolute inset-0 bg-white shadow-sm dark:bg-neutral-700"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <CodeBlock 
          label={PLATFORM_OPTIONS.find((p) => p.value === platform)?.label || ""} 
          code={getCode()} 
        />
      </div>

      {/* Visual Comparison */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-6 text-lg font-bold">Visual Comparison</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Wrong - Same radius */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                ✗ Same radius
              </span>
            </div>
            <div
              className="mx-auto bg-neutral-100 dark:bg-neutral-800"
              style={{
                width: 180,
                borderRadius: outerRadius,
                padding: padding,
              }}
            >
              <div
                className="aspect-video w-full bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-700"
                style={{
                  borderRadius: outerRadius,
                }}
              />
            </div>
            <p className="text-center font-mono text-xs text-neutral-500">
              Inner: {outerRadius}px
            </p>
            <p className="text-center text-[11px] text-neutral-400">
              Corners appear too round
            </p>
          </div>

          {/* Standard - Apple's formula */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                ○ Standard
              </span>
            </div>
            <div
              className="mx-auto bg-neutral-100 dark:bg-neutral-800"
              style={{
                width: 180,
                borderRadius: outerRadius,
                padding: padding,
              }}
            >
              <div
                className="aspect-video w-full bg-gradient-to-br from-amber-400 to-orange-400"
                style={{
                  borderRadius: standardInnerRadius,
                }}
              />
            </div>
            <p className="text-center font-mono text-xs text-neutral-500">
              Inner: {standardInnerRadius}px
            </p>
            <p className="text-center text-[11px] text-neutral-400">
              outer − gap
            </p>
          </div>

          {/* Optical - With correction */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                ✓ Optical
              </span>
            </div>
            <div
              className="mx-auto bg-neutral-100 dark:bg-neutral-800"
              style={{
                width: 180,
                borderRadius: outerRadius,
                padding: padding,
              }}
            >
              <div
                className="aspect-video w-full bg-gradient-to-br from-swiss-red to-orange-400"
                style={{
                  borderRadius: Math.max(0, standardInnerRadius - suggestedOffset),
                }}
              />
            </div>
            <p className="text-center font-mono text-xs text-neutral-500">
              Inner: {Math.max(0, standardInnerRadius - suggestedOffset)}px
            </p>
            <p className="text-center text-[11px] text-neutral-400">
              outer − gap − {suggestedOffset}
            </p>
          </div>
        </div>
        
        {/* Quick comparison stats */}
        <div className="mt-6 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Outer:</span>
              <span className="font-mono font-medium">{outerRadius}px</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Gap:</span>
              <span className="font-mono font-medium">{padding}px</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Optical offset:</span>
              <span className="font-mono font-medium text-swiss-red">−{suggestedOffset}px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
