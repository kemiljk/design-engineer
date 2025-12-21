"use client";

import React, { useState } from "react";
import { Copy, Check, Settings2 } from "lucide-react";
import { clsx } from "clsx";

type ScaleRatio = {
  name: string;
  value: number;
};

const RATIOS: ScaleRatio[] = [
  { name: "Minor Second", value: 1.067 },
  { name: "Major Second", value: 1.125 },
  { name: "Minor Third", value: 1.2 },
  { name: "Major Third", value: 1.25 },
  { name: "Perfect Fourth", value: 1.333 },
  { name: "Augmented Fourth", value: 1.414 },
  { name: "Perfect Fifth", value: 1.5 },
  { name: "Golden Ratio", value: 1.618 },
];

export default function TokenCalculator() {
  const [baseSize, setBaseSize] = useState(16);
  const [scaleRatio, setScaleRatio] = useState(1.25);
  const [spacingBase, setSpacingBase] = useState(4);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Generate Type Scale
  const typeSteps = [-2, -1, 0, 1, 2, 3, 4, 5, 6]; // xs to 6xl approx
  const typeScale = typeSteps.map((step) => {
    const value = baseSize * Math.pow(scaleRatio, step);
    return {
      step,
      px: value.toFixed(2),
      rem: (value / baseSize).toFixed(3),
      label: step === 0 ? "base" : step > 0 ? `xl-${step}` : `xs-${Math.abs(step)}` // Simplified labeling
    };
  });
  
  // Mapping steps to semantic names for display
  const getSemanticLabel = (step: number) => {
    if (step === 0) return "text-base";
    if (step === 1) return "text-lg";
    if (step === 2) return "text-xl";
    if (step === 3) return "text-2xl";
    if (step === 4) return "text-3xl";
    if (step === 5) return "text-4xl";
    if (step === 6) return "text-5xl";
    if (step === -1) return "text-sm";
    if (step === -2) return "text-xs";
    return `text-${step}`;
  };

  // Generate Spacing Scale (multiples)
  const spacingSteps = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
  const spacingScale = spacingSteps.map((step) => {
    const px = spacingBase * step;
    const rem = px / baseSize;
    return {
      step,
      px: px,
      rem: rem.toFixed(3),
      label: step.toString().replace(".", "_"), // e.g. 1.5 -> 1_5
    };
  });

  // Export Generators
  const generateTailwindConfig = () => {
    const fontSize = typeScale.reduce((acc, curr) => {
      const key = getSemanticLabel(curr.step).replace("text-", "");
      return { ...acc, [key]: [`${curr.rem}rem`, { lineHeight: "1.5" }] };
    }, {});

    const spacing = spacingScale.reduce((acc, curr) => {
      return { ...acc, [curr.step]: `${curr.rem}rem` };
    }, {});

    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: ${JSON.stringify(fontSize, null, 2).replace(/"/g, "'")},
      spacing: ${JSON.stringify(spacing, null, 2).replace(/"/g, "'")}
    }
  }
}`;
  };

  const generateCSSVariables = () => {
    const typeVars = typeScale.map(
      (t) => `  --text-${getSemanticLabel(t.step).replace("text-", "")}: ${t.rem}rem; /* ${t.px}px */`
    ).join("\n");

    const spacingVars = spacingScale.map(
      (s) => `  --space-${s.step}: ${s.rem}rem; /* ${s.px}px */`
    ).join("\n");

    return `:root {
  /* Typography */
${typeVars}

  /* Spacing */
${spacingVars}
}`;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="h-5 w-5 text-swiss-red" />
            <h2 className="text-lg font-bold">Configuration</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Base Size (px)
              </label>
              <input
                type="number"
                value={baseSize}
                onChange={(e) => setBaseSize(Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Scale Ratio
              </label>
              <select
                value={scaleRatio}
                onChange={(e) => setScaleRatio(Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              >
                {RATIOS.map((r) => (
                  <option key={r.name} value={r.value}>
                    {r.name} ({r.value})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Spacing Base (px)
              </label>
              <input
                type="number"
                value={spacingBase}
                onChange={(e) => setSpacingBase(Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>
          </div>
        </div>

        {/* Exports */}
        <div className="space-y-4">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Export</h3>
            <div className="space-y-4">
                <ExportBlock 
                    label="Tailwind Config"
                    code={generateTailwindConfig()}
                    onCopy={() => handleCopy(generateTailwindConfig(), "tailwind")}
                    copied={copiedSection === "tailwind"}
                />
                <ExportBlock 
                    label="CSS Variables"
                    code={generateCSSVariables()}
                    onCopy={() => handleCopy(generateCSSVariables(), "css")}
                    copied={copiedSection === "css"}
                />
            </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="lg:col-span-8 space-y-8">
        {/* Typography Visualizer */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-6 text-lg font-bold">Typography Scale</h2>
          <div className="space-y-8">
            {typeScale.slice().reverse().map((t) => (
              <div key={t.step} className="flex flex-col gap-2 border-b border-neutral-100 pb-8 last:border-0 last:pb-0 dark:border-neutral-800 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="w-32 shrink-0">
                  <div className="text-sm font-medium text-neutral-500">{getSemanticLabel(t.step)}</div>
                  <div className="font-mono text-xs text-neutral-400">{t.px}px / {t.rem}rem</div>
                </div>
                <div 
                    style={{ fontSize: `${t.px}px`, lineHeight: 1.2 }} 
                    className="font-bold text-neutral-900 dark:text-white truncate"
                >
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing Visualizer */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-6 text-lg font-bold">Spacing Scale</h2>
          <div className="flex flex-wrap gap-4 items-end">
            {spacingScale.slice(0, 10).map((s) => (
              <div key={s.step} className="group relative flex flex-col items-center gap-2">
                <div 
                    className="bg-swiss-red/20 transition-all group-hover:bg-swiss-red"
                    style={{ width: `${s.px}px`, height: '64px' }}
                />
                 <div className="text-center">
                  <div className="text-xs font-medium text-neutral-500">{s.step}</div>
                  <div className="font-mono text-[10px] text-neutral-400">{s.px}px</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportBlock({
  label,
  code,
  onCopy,
  copied,
}: {
  label: string;
  code: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="group relative rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <span className="text-xs font-medium text-neutral-500">{label}</span>
        <button
          onClick={onCopy}
          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400">
          {code}
        </pre>
      </div>
    </div>
  );
}
