"use client";

import React, { useState } from "react";
import { Copy, Check, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TokenCategory = "color" | "spacing" | "typography" | "effects";
type ThemeMode = "light" | "dark";

interface ColorToken {
  name: string;
  primitive: string;
  value: string;
  darkValue?: string;
}

interface SpacingToken {
  name: string;
  value: string;
  pixels: number;
}

interface TypographyToken {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
}

interface EffectToken {
  name: string;
  type: "shadow" | "radius";
  value: string;
  cssValue: string;
}

const COLOR_TOKENS: ColorToken[] = [
  { name: "color-background", primitive: "neutral-50", value: "#fafafa", darkValue: "#0a0a0a" },
  { name: "color-surface", primitive: "neutral-100", value: "#f5f5f5", darkValue: "#171717" },
  { name: "color-border", primitive: "neutral-200", value: "#e5e5e5", darkValue: "#262626" },
  { name: "color-text-primary", primitive: "neutral-900", value: "#171717", darkValue: "#fafafa" },
  { name: "color-text-secondary", primitive: "neutral-500", value: "#737373", darkValue: "#a3a3a3" },
  { name: "color-primary", primitive: "blue-500", value: "#3b82f6", darkValue: "#60a5fa" },
  { name: "color-success", primitive: "green-500", value: "#22c55e", darkValue: "#4ade80" },
  { name: "color-warning", primitive: "amber-500", value: "#f59e0b", darkValue: "#fbbf24" },
  { name: "color-error", primitive: "red-500", value: "#ef4444", darkValue: "#f87171" },
];

const SPACING_TOKENS: SpacingToken[] = [
  { name: "space-1", value: "0.25rem", pixels: 4 },
  { name: "space-2", value: "0.5rem", pixels: 8 },
  { name: "space-3", value: "0.75rem", pixels: 12 },
  { name: "space-4", value: "1rem", pixels: 16 },
  { name: "space-5", value: "1.25rem", pixels: 20 },
  { name: "space-6", value: "1.5rem", pixels: 24 },
  { name: "space-8", value: "2rem", pixels: 32 },
  { name: "space-10", value: "2.5rem", pixels: 40 },
  { name: "space-12", value: "3rem", pixels: 48 },
];

const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  { name: "text-xs", size: "0.75rem", weight: "400", lineHeight: "1rem" },
  { name: "text-sm", size: "0.875rem", weight: "400", lineHeight: "1.25rem" },
  { name: "text-base", size: "1rem", weight: "400", lineHeight: "1.5rem" },
  { name: "text-lg", size: "1.125rem", weight: "400", lineHeight: "1.75rem" },
  { name: "text-xl", size: "1.25rem", weight: "600", lineHeight: "1.75rem" },
  { name: "text-2xl", size: "1.5rem", weight: "600", lineHeight: "2rem" },
  { name: "text-3xl", size: "1.875rem", weight: "700", lineHeight: "2.25rem" },
];

const EFFECT_TOKENS: EffectToken[] = [
  { name: "radius-sm", type: "radius", value: "4px", cssValue: "4px" },
  { name: "radius-md", type: "radius", value: "8px", cssValue: "8px" },
  { name: "radius-lg", type: "radius", value: "12px", cssValue: "12px" },
  { name: "radius-full", type: "radius", value: "9999px", cssValue: "9999px" },
  { name: "shadow-sm", type: "shadow", value: "Small", cssValue: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { name: "shadow-md", type: "shadow", value: "Medium", cssValue: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
  { name: "shadow-lg", type: "shadow", value: "Large", cssValue: "0 10px 15px -3px rgb(0 0 0 / 0.1)" },
];

export function TokenExplorerDemo() {
  const [category, setCategory] = useState<TokenCategory>("color");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToken = (name: string, value: string) => {
    const cssVar = `var(--${name})`;
    navigator.clipboard.writeText(cssVar);
    setCopiedToken(name);
    toast.success(`Copied ${cssVar}`);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const categories: { id: TokenCategory; label: string }[] = [
    { id: "color", label: "Colour" },
    { id: "spacing", label: "Spacing" },
    { id: "typography", label: "Typography" },
    { id: "effects", label: "Effects" },
  ];

  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Token Explorer
              </h4>
              <p className="mt-0.5 text-xs text-neutral-500">
                Browse tokens and copy CSS variables
              </p>
            </div>
            {category === "color" && (
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  theme === "light"
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-neutral-900"
                )}
              >
                {theme === "light" ? (
                  <>
                    <Sun className="h-3.5 w-3.5" />
                    Light
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5" />
                    Dark
                  </>
                )}
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="mt-3 flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  category === cat.id
                    ? "bg-swiss-red text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {category === "color" && (
            <div className="space-y-2">
              {COLOR_TOKENS.map((token) => {
                const displayValue = theme === "dark" && token.darkValue ? token.darkValue : token.value;
                return (
                  <div
                    key={token.name}
                    className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                  >
                    <div
                      className="h-10 w-10 shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-600"
                      style={{ backgroundColor: displayValue }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-neutral-900 dark:text-white">
                          --{token.name}
                        </span>
                        <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
                          {token.primitive}
                        </span>
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-neutral-500">
                        {displayValue}
                        {theme === "dark" && token.darkValue && (
                          <span className="ml-2 text-neutral-400">(dark mode)</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToken(token.name, displayValue)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500 opacity-0 transition-all hover:bg-neutral-100 hover:text-neutral-700 group-hover:opacity-100 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    >
                      {copiedToken === token.name ? (
                        <Check className="h-4 w-4 text-swiss-red" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {category === "spacing" && (
            <div className="space-y-2">
              {SPACING_TOKENS.map((token) => (
                <div
                  key={token.name}
                  className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                >
                  <div className="flex h-10 w-24 items-center">
                    <div
                      className="h-3 rounded bg-swiss-red"
                      style={{ width: token.pixels }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-sm font-medium text-neutral-900 dark:text-white">
                      --{token.name}
                    </span>
                    <div className="mt-0.5 font-mono text-xs text-neutral-500">
                      {token.value} ({token.pixels}px)
                    </div>
                  </div>
                  <button
                    onClick={() => copyToken(token.name, token.value)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500 opacity-0 transition-all hover:bg-neutral-100 hover:text-neutral-700 group-hover:opacity-100 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                  >
                    {copiedToken === token.name ? (
                      <Check className="h-4 w-4 text-swiss-red" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {category === "typography" && (
            <div className="space-y-2">
              {TYPOGRAPHY_TOKENS.map((token) => (
                <div
                  key={token.name}
                  className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                >
                  <div className="w-32 shrink-0">
                    <span
                      className="text-neutral-900 dark:text-white"
                      style={{
                        fontSize: token.size,
                        fontWeight: token.weight,
                        lineHeight: token.lineHeight,
                      }}
                    >
                      Aa
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-sm font-medium text-neutral-900 dark:text-white">
                      --{token.name}
                    </span>
                    <div className="mt-0.5 font-mono text-xs text-neutral-500">
                      {token.size} / {token.lineHeight} • weight: {token.weight}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToken(token.name, token.size)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500 opacity-0 transition-all hover:bg-neutral-100 hover:text-neutral-700 group-hover:opacity-100 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                  >
                    {copiedToken === token.name ? (
                      <Check className="h-4 w-4 text-swiss-red" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {category === "effects" && (
            <div className="space-y-2">
              {EFFECT_TOKENS.map((token) => (
                <div
                  key={token.name}
                  className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                >
                  <div className="flex h-10 w-16 items-center justify-center">
                    {token.type === "radius" ? (
                      <div
                        className="h-8 w-8 border-2 border-swiss-red bg-swiss-red/10"
                        style={{ borderRadius: token.cssValue }}
                      />
                    ) : (
                      <div
                        className="h-8 w-8 rounded bg-white dark:bg-neutral-700"
                        style={{ boxShadow: token.cssValue }}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-sm font-medium text-neutral-900 dark:text-white">
                      --{token.name}
                    </span>
                    <div className="mt-0.5 font-mono text-xs text-neutral-500 truncate">
                      {token.cssValue}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToken(token.name, token.cssValue)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500 opacity-0 transition-all hover:bg-neutral-100 hover:text-neutral-700 group-hover:opacity-100 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                  >
                    {copiedToken === token.name ? (
                      <Check className="h-4 w-4 text-swiss-red" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
          <p className="text-center text-xs text-neutral-500">
            Click any row to copy the CSS variable. Toggle theme on colours to see semantic token values change.
          </p>
        </div>
      </div>
    </figure>
  );
}

