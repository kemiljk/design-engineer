"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";
import { InfoCircle as Info, WarningCircle as AlertCircle } from "iconoir-react";

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
    description: "Inner = Outer − Gap" 
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
 * visual "weight" and can appear too prominent on nested elements. This is a
 * subtle correction—just enough to improve visual harmony without being obvious.
 * 
 * Formula: offset = innerRadius × curveFactor
 * 
 * Where curveFactor = 0.03-0.06 based on the radius/gap ratio (subtle 3-6%)
 */
function calculateOpticalOffset(outerRadius: number, gap: number): number {
  const standardInner = outerRadius - gap;
  
  // If already at 0 or very small, no offset needed
  if (standardInner <= 4) return 0;
  
  // Subtle curve factor - just enough to reduce visual weight
  // Higher values when the gap is small relative to the radius
  const gapRatio = gap / outerRadius;
  const curveFactor = 0.03 + (1 - gapRatio) * 0.03; // 0.03-0.06 range (subtle)
  
  // Base optical correction
  const offset = standardInner * curveFactor;
  
  // Maximum offset shouldn't exceed 10% of the inner radius
  const maxOffset = standardInner * 0.1;
  
  return Math.round(Math.min(offset, maxOffset));
}

type PreviewLayout = "vertical" | "horizontal";

type RadiusPreset = {
  name: string;
  outerRadius: number;
  padding: number;
  layout: PreviewLayout;
};

const PRESETS: RadiusPreset[] = [
  { name: "Small", outerRadius: 12, padding: 8, layout: "horizontal" },
  { name: "Medium", outerRadius: 16, padding: 12, layout: "horizontal" },
  { name: "Large", outerRadius: 24, padding: 16, layout: "vertical" },
  { name: "Extra Large", outerRadius: 32, padding: 20, layout: "vertical" },
];

export default function CornerRadiusCalculator() {
  const [outerRadius, setOuterRadius] = useState(24);
  const [padding, setPadding] = useState(16);
  const [customOffset, setCustomOffset] = useState(0);
  const [mode, setMode] = useState<CalculationMode>("standard");
  const [platform, setPlatform] = useState<Platform>("css");
  const [activePreset, setActivePreset] = useState<string | null>("Large");
  const [previewLayout, setPreviewLayout] = useState<PreviewLayout>("vertical");
  const [showBorders, setShowBorders] = useState(true);

  // Calculate the suggested optical offset
  const suggestedOffset = useMemo(() => {
    return calculateOpticalOffset(outerRadius, padding);
  }, [outerRadius, padding]);

  // Calculate inner radius based on mode
  const innerRadius = useMemo(() => {
    let calculated: number;

    switch (mode) {
      case "standard":
        // Standard approach: inner = outer - gap
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
    setPreviewLayout(preset.layout);
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
    return `// SwiftUI handles nested radii automatically with .containerRelativeFrame
// For manual control, use the calculated inner radius:

// Outer container
RoundedRectangle(cornerRadius: ${outerRadius}, style: .continuous)
    .padding(${padding})

// Inner element
RoundedRectangle(cornerRadius: ${innerRadius}, style: .continuous)

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
        .clipShape(RoundedRectangle(cornerRadius: outerRadius, style: .continuous))
    }
}`;
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
        <div className="space-y-6 border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-8 sm:p-6">
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
                    "flex cursor-pointer items-start gap-3 border p-3 transition-colors",
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
            <div className="border border-dashed border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
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
                <div className="mt-3 bg-swiss-red/[0.025] p-3 dark:bg-swiss-red/5">
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
                <div className="mt-3 bg-neutral-100 p-3 dark:bg-neutral-800">
                  <p className="text-xs text-neutral-700 dark:text-neutral-300">
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
              <div className="overflow-hidden bg-neutral-100 p-3 dark:bg-neutral-800">
                <p className="mb-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Optical Offset Formula
                </p>
                <p className="break-words font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                  offset = inner × curveFactor
                </p>
                <div className="mt-2 text-[11px] text-neutral-500">
                  <p className="break-words">
                    <strong>curveFactor</strong>: {(0.03 + (1 - padding / outerRadius) * 0.03).toFixed(2)} (3-6%)
                  </p>
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
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <div className="relative flex min-h-[350px] flex-1 items-center justify-center overflow-hidden border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800 sm:min-h-[400px]">
            
            {/* Preview card */}
            <div className="relative">
              {/* Vertical card layout - image on top */}
              {previewLayout === "vertical" && (
                <motion.div
                  layout
                  className="relative bg-white shadow-xl dark:bg-neutral-800"
                  style={{
                    width: 240,
                    borderRadius: outerRadius,
                    paddingTop: padding,
                    paddingLeft: padding,
                    paddingRight: padding,
                    paddingBottom: padding * 2,
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <motion.div
                    layout
                    className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-swiss-red to-orange-400"
                    style={{ borderRadius: innerRadius }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </motion.div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-2 w-full rounded bg-neutral-100 dark:bg-neutral-700/50" />
                  </div>
                </motion.div>
              )}

              {/* Horizontal card layout - text left, square image right */}
              {previewLayout === "horizontal" && (
                <motion.div
                  layout
                  className="relative flex items-center gap-3 bg-white shadow-xl dark:bg-neutral-800"
                  style={{
                    width: 280,
                    borderRadius: outerRadius,
                    padding: padding,
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-4/5 rounded bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-2 w-full rounded bg-neutral-100 dark:bg-neutral-700/50" />
                    <div className="h-2 w-3/4 rounded bg-neutral-100 dark:bg-neutral-700/50" />
                  </div>
                  <motion.div
                    layout
                    className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-gradient-to-br from-swiss-red to-orange-400"
                    style={{ borderRadius: innerRadius }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* SVG Overlay for measurement annotations */}
              {showBorders && (() => {
                const elementWidth = previewLayout === "horizontal" ? 280 : 240;
                // 45° point on corner arc: r × (1 - cos(45°)) ≈ r × 0.293
                const outerDotX = outerRadius * 0.293;
                const outerDotY = outerRadius * 0.293;
                
                // Inner element position - top-right corner of inner element
                const innerDotX = elementWidth - padding - innerRadius * 0.293;
                const innerDotY = padding + innerRadius * 0.293;
                
                // L-shaped leader line offsets
                const leaderH = 30;
                const leaderV = padding * 1.5;
                
                return (
                  <svg
                    className="pointer-events-none absolute left-0 top-0 h-full text-neutral-900 dark:text-white"
                    style={{
                      width: elementWidth,
                      overflow: "visible",
                    }}
                  >
                    {/* OUTER RADIUS - L-shaped leader: up then right */}
                    <circle cx={outerDotX} cy={outerDotY} r="3" fill="currentColor" />
                    <polyline
                      points={`${outerDotX},${outerDotY} ${outerDotX},${outerDotY - leaderV} ${outerDotX + leaderH},${outerDotY - leaderV}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={outerDotX + leaderH + 4}
                      y={outerDotY - leaderV}
                      fill="currentColor"
                      style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px" }}
                      textAnchor="start"
                      dominantBaseline="middle"
                    >
                      {outerRadius}px
                    </text>

                    {/* INNER RADIUS - L-shaped leader: up then left */}
                    {innerRadius > 0 && (
                      <>
                        <circle cx={innerDotX} cy={innerDotY} r="3" fill="currentColor" />
                        <polyline
                          points={`${innerDotX},${innerDotY} ${innerDotX},${innerDotY - leaderV} ${innerDotX - leaderH},${innerDotY - leaderV}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={innerDotX - leaderH - 4}
                          y={innerDotY - leaderV}
                          fill="currentColor"
                          style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px" }}
                          textAnchor="end"
                          dominantBaseline="middle"
                        >
                          {innerRadius}px
                        </text>
                      </>
                    )}

                    {/* GAP - horizontal dimension at 50% height on left edge */}
                    {padding > 0 && (
                      <g style={{ transform: "translateY(50%)" }}>
                        <line x1={0} y1={0} x2={padding} y2={0} stroke="currentColor" strokeWidth="1" />
                        <line x1={0} y1={-4} x2={0} y2={4} stroke="currentColor" strokeWidth="1" />
                        <line x1={padding} y1={-4} x2={padding} y2={4} stroke="currentColor" strokeWidth="1" />
                        <text
                          x={-4}
                          y={0}
                          fill="currentColor"
                          style={{ fontFamily: "ui-monospace, monospace", fontSize: "10px" }}
                          textAnchor="end"
                          dominantBaseline="middle"
                        >
                          {padding}px
                        </text>
                      </g>
                    )}
                  </svg>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Understanding the Problem */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
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
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="text-center">
              <div
                className="bg-neutral-200 dark:bg-neutral-700"
                style={{ borderRadius: 24, padding: 10, width: 80 }}
              >
                <div
                  className="aspect-square w-full bg-neutral-400"
                  style={{ borderRadius: 24 }}
                />
              </div>
              <p className="mt-2 text-xxs text-neutral-500 sm:text-xs">Same radius</p>
              <p className="text-xxs text-neutral-400">✗ Wrong</p>
            </div>
            <div className="text-xl text-neutral-300 sm:text-2xl">→</div>
            <div className="text-center">
              <div
                className="bg-neutral-200 dark:bg-neutral-700"
                style={{ borderRadius: 24, padding: 10, width: 80 }}
              >
                <div
                  className="aspect-square w-full bg-swiss-red"
                  style={{ borderRadius: 10 }}
                />
              </div>
              <p className="mt-2 text-xxs text-neutral-500 sm:text-xs">Adjusted</p>
              <p className="text-xxs text-swiss-red">✓ Correct</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Standard Formula */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">The Standard Formula</h2>
        <div className="mb-4 flex items-center justify-center bg-neutral-100 p-4 dark:bg-neutral-800 sm:p-6">
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-neutral-900 dark:text-white sm:text-2xl">
              inner = outer − gap
            </p>
            <p className="mt-2 text-xs text-neutral-500 sm:text-sm">The mathematical approach</p>
          </div>
        </div>
        <div className="prose prose-neutral max-w-none text-sm dark:prose-invert">
          <p>
            The idea is simple: the inner radius should account for the space between the 
            elements. If you have a 24px outer radius and 16px of padding, the inner radius 
            should be 8px.
          </p>
          <p>
            This formula works well in most cases and is mathematically precise. Some platforms 
            even have built-in modifiers that calculate inner radii automatically for you.
          </p>
        </div>
      </div>

      {/* Why Optical Offset */}
      <div className="border border-swiss-red/20 bg-swiss-red/[0.025] p-4 dark:border-swiss-red/30 dark:bg-swiss-red/5 sm:p-6">
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
              
              <h3 className="text-base font-semibold">Two Perceptual Factors</h3>
              
              <div className="not-prose my-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800 sm:p-4">
                  <div className="mb-2 text-xl sm:text-2xl">📐</div>
                  <h4 className="text-sm font-semibold sm:text-base">Curve Weight</h4>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    Larger radii carry more visual &quot;mass&quot;, creating subtle tension with the outer curve.
                  </p>
                </div>
                <div className="border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800 sm:p-4">
                  <div className="mb-2 text-xl sm:text-2xl">👁️</div>
                  <h4 className="text-sm font-semibold sm:text-base">Gap Perception</h4>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    Smaller gaps make the inner curve slightly more prominent, needing a touch more reduction.
                  </p>
                </div>
              </div>

              <h3 className="text-base font-semibold">The Optical Formula</h3>
              <div className="not-prose my-4 overflow-x-auto bg-neutral-900 p-4 dark:bg-neutral-950">
                <pre className="whitespace-pre-wrap break-words text-xs text-neutral-300 sm:whitespace-pre sm:break-normal">
{`// Subtle optical correction (3-6%)
curveFactor = 0.03 + (1 - gap/outer) × 0.03
offset = inner × curveFactor
opticalInner = outer - gap - offset`}
                </pre>
              </div>
              
              <p>
                The curve factor scales between 3% and 6%—a subtle adjustment that&apos;s just 
                enough to improve visual harmony without being obvious. Smaller gaps mean the 
                inner curve is slightly more visible and benefits from marginally more correction.
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
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold sm:mb-6">Visual Comparison</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {/* Wrong - Same radius */}
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center">
              <span className="inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xxs font-bold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 sm:px-3 sm:py-1 sm:text-xs">
                ✗ Same
              </span>
            </div>
            <div
              className="mx-auto w-full max-w-[180px] bg-neutral-200 dark:bg-neutral-700"
              style={{
                borderRadius: outerRadius,
                padding: padding,
              }}
            >
              <div
                className="aspect-video w-full bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-500 dark:to-neutral-600"
                style={{
                  borderRadius: outerRadius,
                }}
              />
            </div>
            <p className="text-center font-mono text-xxs text-neutral-500 sm:text-xs">
              {outerRadius}px
            </p>
          </div>

          {/* Standard formula */}
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center">
              <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xxs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 sm:px-3 sm:py-1 sm:text-xs">
                ○ Standard
              </span>
            </div>
            <div
              className="mx-auto w-full max-w-[180px] bg-neutral-200 dark:bg-neutral-700"
              style={{
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
            <p className="text-center font-mono text-xxs text-neutral-500 sm:text-xs">
              {standardInnerRadius}px
            </p>
          </div>

          {/* Optical - With correction */}
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center">
              <span className="inline-block rounded-full bg-swiss-red/10 px-2 py-0.5 text-xxs font-bold text-swiss-red sm:px-3 sm:py-1 sm:text-xs">
                ✓ Optical
              </span>
            </div>
            <div
              className="mx-auto w-full max-w-[180px] bg-neutral-200 dark:bg-neutral-700"
              style={{
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
            <p className="text-center font-mono text-xxs text-neutral-500 sm:text-xs">
              {Math.max(0, standardInnerRadius - suggestedOffset)}px
            </p>
          </div>
        </div>
        
        {/* Quick comparison stats */}
        <div className="mt-6 bg-neutral-50 p-3 dark:bg-neutral-800/50 sm:p-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:gap-x-8 sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-neutral-500">Outer:</span>
              <span className="font-mono font-medium">{outerRadius}px</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-neutral-500">Gap:</span>
              <span className="font-mono font-medium">{padding}px</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-neutral-500">Offset:</span>
              <span className="font-mono font-medium text-swiss-red">−{suggestedOffset}px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
