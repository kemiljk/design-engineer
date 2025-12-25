"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Palette,
  Type,
  Space,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Plus,
  RotateCcw,
  Layers,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

// Types
type Category = "color" | "typography" | "spacing" | "effects";

type PropertyOption = {
  id: string;
  label: string;
  description: string;
};

type ContextOption = {
  id: string;
  label: string;
  description: string;
  suggestedElements?: string[];
};

type ElementOption = {
  id: string;
  label: string;
};

type ModifierOption = {
  id: string;
  label: string;
  type: "variant" | "state" | "scale";
};

type NamingConvention = "explicit" | "compact" | "component-first";

type OutputFormat = "css" | "camelCase" | "json" | "figma" | "dtcg" | "figma-variables";

// Configuration data
const CATEGORIES: { id: Category; label: string; icon: React.ElementType; description: string }[] = [
  { id: "color", label: "Colour", icon: Palette, description: "Background, text, border, and icon colours" },
  { id: "typography", label: "Typography", icon: Type, description: "Font sizes, weights, and line heights" },
  { id: "spacing", label: "Spacing", icon: Space, description: "Padding, margin, and gap values" },
  { id: "effects", label: "Effects", icon: Sparkles, description: "Shadows, borders, and radii" },
];

const PROPERTIES: Record<Category, PropertyOption[]> = {
  color: [
    { id: "background", label: "Background", description: "Fill colours for surfaces and elements" },
    { id: "foreground", label: "Foreground", description: "Text and content colours" },
    { id: "border", label: "Border", description: "Stroke and outline colours" },
    { id: "icon", label: "Icon", description: "Icon and symbol colours" },
  ],
  typography: [
    { id: "font-size", label: "Font Size", description: "Text size values" },
    { id: "font-weight", label: "Font Weight", description: "Text boldness values" },
    { id: "line-height", label: "Line Height", description: "Vertical spacing between lines" },
    { id: "letter-spacing", label: "Letter Spacing", description: "Horizontal spacing between characters" },
  ],
  spacing: [
    { id: "padding", label: "Padding", description: "Internal spacing within elements" },
    { id: "margin", label: "Margin", description: "External spacing around elements" },
    { id: "gap", label: "Gap", description: "Spacing between flex/grid items" },
  ],
  effects: [
    { id: "shadow", label: "Shadow", description: "Drop and box shadows" },
    { id: "radius", label: "Radius", description: "Corner rounding values" },
    { id: "border-width", label: "Border Width", description: "Stroke thickness values" },
  ],
};

const CONTEXTS: Record<Category, ContextOption[]> = {
  color: [
    { id: "surface", label: "Surface", description: "Cards, modals, page backgrounds", suggestedElements: ["page", "card", "modal", "popover", "dropdown"] },
    { id: "interactive", label: "Interactive", description: "Buttons, links, inputs", suggestedElements: ["button", "link", "input", "select", "checkbox"] },
    { id: "brand", label: "Brand", description: "Primary, secondary, accent colours", suggestedElements: ["primary", "secondary", "accent"] },
    { id: "feedback", label: "Feedback", description: "Success, warning, error states", suggestedElements: ["success", "warning", "error", "info"] },
  ],
  typography: [
    { id: "heading", label: "Heading", description: "Titles and section headers", suggestedElements: ["h1", "h2", "h3", "h4", "display"] },
    { id: "body", label: "Body", description: "Paragraphs and running text", suggestedElements: ["default", "large", "small"] },
    { id: "label", label: "Label", description: "Form labels and captions", suggestedElements: ["default", "small"] },
    { id: "ui", label: "UI", description: "Buttons, navigation, controls", suggestedElements: ["button", "nav", "tab", "badge"] },
  ],
  spacing: [
    { id: "component", label: "Component", description: "Internal component spacing", suggestedElements: ["button", "card", "input", "badge"] },
    { id: "layout", label: "Layout", description: "Page and section spacing", suggestedElements: ["section", "container", "stack"] },
    { id: "inline", label: "Inline", description: "Spacing between inline elements", suggestedElements: ["icon", "text", "badge"] },
  ],
  effects: [
    { id: "elevation", label: "Elevation", description: "Layered shadow depths", suggestedElements: ["card", "modal", "dropdown", "tooltip"] },
    { id: "component", label: "Component", description: "Component-specific effects", suggestedElements: ["button", "input", "card", "badge"] },
  ],
};

const ELEMENTS: Record<Category, ElementOption[]> = {
  color: [
    { id: "page", label: "Page" },
    { id: "card", label: "Card" },
    { id: "modal", label: "Modal" },
    { id: "button", label: "Button" },
    { id: "link", label: "Link" },
    { id: "input", label: "Input" },
    { id: "nav", label: "Navigation" },
    { id: "badge", label: "Badge" },
    { id: "tooltip", label: "Tooltip" },
  ],
  typography: [
    { id: "display", label: "Display" },
    { id: "title", label: "Title" },
    { id: "subtitle", label: "Subtitle" },
    { id: "body", label: "Body" },
    { id: "caption", label: "Caption" },
    { id: "overline", label: "Overline" },
  ],
  spacing: [
    { id: "xs", label: "XS" },
    { id: "sm", label: "SM" },
    { id: "md", label: "MD" },
    { id: "lg", label: "LG" },
    { id: "xl", label: "XL" },
  ],
  effects: [
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
    { id: "xl", label: "Extra Large" },
  ],
};

const VARIANT_MODIFIERS: ModifierOption[] = [
  { id: "default", label: "Default", type: "variant" },
  { id: "subtle", label: "Subtle", type: "variant" },
  { id: "emphasis", label: "Emphasis", type: "variant" },
  { id: "muted", label: "Muted", type: "variant" },
  { id: "inverted", label: "Inverted", type: "variant" },
];

const STATE_MODIFIERS: ModifierOption[] = [
  { id: "hover", label: "Hover", type: "state" },
  { id: "active", label: "Active", type: "state" },
  { id: "focus", label: "Focus", type: "state" },
  { id: "disabled", label: "Disabled", type: "state" },
  { id: "selected", label: "Selected", type: "state" },
];

const SCALE_MODIFIERS: ModifierOption[] = [
  { id: "50", label: "50", type: "scale" },
  { id: "100", label: "100", type: "scale" },
  { id: "200", label: "200", type: "scale" },
  { id: "300", label: "300", type: "scale" },
  { id: "400", label: "400", type: "scale" },
  { id: "500", label: "500", type: "scale" },
  { id: "600", label: "600", type: "scale" },
  { id: "700", label: "700", type: "scale" },
  { id: "800", label: "800", type: "scale" },
  { id: "900", label: "900", type: "scale" },
];

const NAMING_CONVENTIONS: { id: NamingConvention; label: string; description: string; example: string }[] = [
  { id: "explicit", label: "Explicit", description: "Category-Property-Context-Element-Modifier", example: "color-background-surface-card-hover" },
  { id: "compact", label: "Compact", description: "Property-Context-Modifier", example: "bg-surface-hover" },
  { id: "component-first", label: "Component First", description: "Element-Property-Modifier", example: "card-bg-hover" },
];

const OUTPUT_FORMATS: { value: OutputFormat; label: string; description?: string }[] = [
  { value: "css", label: "CSS" },
  { value: "camelCase", label: "JS/TS" },
  { value: "json", label: "JSON" },
  { value: "figma", label: "Figma" },
  { value: "dtcg", label: "W3C DTCG" },
  { value: "figma-variables", label: "Figma Variables" },
];

// Helper functions
function buildTokenName(
  category: Category | null,
  property: string | null,
  context: string | null,
  element: string | null,
  variant: string | null,
  state: string | null,
  convention: NamingConvention
): string {
  const parts: string[] = [];

  switch (convention) {
    case "explicit":
      if (category) parts.push(category);
      if (property) parts.push(property);
      if (context) parts.push(context);
      if (element) parts.push(element);
      if (variant && variant !== "default") parts.push(variant);
      if (state) parts.push(state);
      break;

    case "compact":
      // Use abbreviations
      if (property) {
        const abbrev: Record<string, string> = {
          background: "bg",
          foreground: "fg",
          border: "border",
          icon: "icon",
          "font-size": "text",
          "font-weight": "weight",
          "line-height": "leading",
          "letter-spacing": "tracking",
          padding: "p",
          margin: "m",
          gap: "gap",
          shadow: "shadow",
          radius: "rounded",
          "border-width": "border",
        };
        parts.push(abbrev[property] || property);
      }
      if (context) parts.push(context);
      if (element) parts.push(element);
      if (variant && variant !== "default") parts.push(variant);
      if (state) parts.push(state);
      break;

    case "component-first":
      if (element) parts.push(element);
      if (property) {
        const abbrev: Record<string, string> = {
          background: "bg",
          foreground: "text",
          border: "border",
          icon: "icon",
        };
        parts.push(abbrev[property] || property);
      }
      if (variant && variant !== "default") parts.push(variant);
      if (state) parts.push(state);
      break;
  }

  return parts.join("-");
}

function formatTokenName(name: string, format: OutputFormat): string {
  switch (format) {
    case "css":
      return `--${name}`;
    case "camelCase":
      return name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    case "json":
    case "dtcg":
    case "figma-variables":
      return name.split("-").join(".");
    case "figma":
      return name.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("/");
    default:
      return name;
  }
}

function getTokenType(category: Category | null): string {
  switch (category) {
    case "color":
      return "color";
    case "typography":
      return "dimension";
    case "spacing":
      return "dimension";
    case "effects":
      return "shadow";
    default:
      return "color";
  }
}

function getFigmaVariableType(category: Category | null): string {
  switch (category) {
    case "color":
      return "COLOR";
    case "typography":
    case "spacing":
    case "effects":
      return "FLOAT";
    default:
      return "COLOR";
  }
}

// Component
export default function TokenNamingBuilder() {
  // Builder state
  const [category, setCategory] = useState<Category | null>(null);
  const [property, setProperty] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [element, setElement] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>("default");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  // Convention & output
  const [convention, setConvention] = useState<NamingConvention>("explicit");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("css");

  // UI state
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [showAllElements, setShowAllElements] = useState(false);

  // Derived state
  const currentContext = useMemo(() => {
    if (!category || !context) return null;
    return CONTEXTS[category]?.find(c => c.id === context);
  }, [category, context]);

  const suggestedElements = useMemo(() => {
    return currentContext?.suggestedElements || [];
  }, [currentContext]);

  const baseTokenName = useMemo(() => {
    return buildTokenName(category, property, context, element, variant, null, convention);
  }, [category, property, context, element, variant, convention]);

  // Generate all token variations based on current selection
  const generatedTokens = useMemo(() => {
    if (!category || !property) return [];

    const tokens: { name: string; formatted: string; isBase: boolean; type: "base" | "state" }[] = [];

    // Base token
    if (baseTokenName) {
      tokens.push({
        name: baseTokenName,
        formatted: formatTokenName(baseTokenName, outputFormat),
        isBase: true,
        type: "base",
      });
    }

    // State tokens
    selectedStates.forEach(state => {
      const stateName = buildTokenName(category, property, context, element, variant, state, convention);
      tokens.push({
        name: stateName,
        formatted: formatTokenName(stateName, outputFormat),
        isBase: false,
        type: "state",
      });
    });

    return tokens;
  }, [baseTokenName, selectedStates, category, property, context, element, variant, convention, outputFormat]);

  // Generate related tokens (other properties in same context)
  const relatedTokens = useMemo(() => {
    if (!category || !property || !context) return [];

    const properties = PROPERTIES[category] || [];
    const related: { property: string; tokens: { name: string; formatted: string }[] }[] = [];

    properties.forEach(prop => {
      if (prop.id === property) return; // Skip current property

      const tokens: { name: string; formatted: string }[] = [];

      // Base token for related property
      const baseName = buildTokenName(category, prop.id, context, element, variant, null, convention);
      tokens.push({
        name: baseName,
        formatted: formatTokenName(baseName, outputFormat),
      });

      // State tokens
      selectedStates.forEach(state => {
        const stateName = buildTokenName(category, prop.id, context, element, variant, state, convention);
        tokens.push({
          name: stateName,
          formatted: formatTokenName(stateName, outputFormat),
        });
      });

      related.push({ property: prop.label, tokens });
    });

    return related;
  }, [category, property, context, element, variant, selectedStates, convention, outputFormat]);

  // Generate component token set (all properties + states for an element)
  const componentTokenSet = useMemo(() => {
    if (!category || !element) return null;

    const properties = PROPERTIES[category] || [];
    const allTokens: string[] = [];

    properties.forEach(prop => {
      // Base token
      const baseName = buildTokenName(category, prop.id, context, element, variant, null, convention);
      allTokens.push(formatTokenName(baseName, outputFormat));

      // State tokens
      selectedStates.forEach(state => {
        const stateName = buildTokenName(category, prop.id, context, element, variant, state, convention);
        allTokens.push(formatTokenName(stateName, outputFormat));
      });
    });

    return allTokens;
  }, [category, element, context, variant, selectedStates, convention, outputFormat]);

  const handleCopy = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleToggleState = (stateId: string) => {
    setSelectedStates(prev =>
      prev.includes(stateId) ? prev.filter(s => s !== stateId) : [...prev, stateId]
    );
  };

  const handleReset = () => {
    setCategory(null);
    setProperty(null);
    setContext(null);
    setElement(null);
    setVariant("default");
    setSelectedStates([]);
  };

  const handleAddAllInteractiveStates = () => {
    setSelectedStates(["hover", "active", "focus", "disabled"]);
  };

  // Generate export code
  const generateExportCode = () => {
    const allTokens = [...generatedTokens.map(t => t.formatted)];
    relatedTokens.forEach(r => {
      r.tokens.forEach(t => allTokens.push(t.formatted));
    });

    const tokenType = getTokenType(category);
    const figmaType = getFigmaVariableType(category);

    switch (outputFormat) {
      case "css":
        return `:root {\n${allTokens.map(t => `  ${t}: /* value */;`).join("\n")}\n}`;
      
      case "camelCase":
        return `const tokens = {\n${allTokens.map(t => `  ${t}: '/* value */',`).join("\n")}\n};`;
      
      case "json": {
        const jsonObj: Record<string, unknown> = {};
        allTokens.forEach(t => {
          const parts = t.split(".");
          let current: Record<string, unknown> = jsonObj;
          parts.forEach((part, i) => {
            if (i === parts.length - 1) {
              current[part] = "/* value */";
            } else {
              current[part] = current[part] || {};
              current = current[part] as Record<string, unknown>;
            }
          });
        });
        return JSON.stringify(jsonObj, null, 2);
      }
      
      case "dtcg": {
        // W3C Design Tokens Community Group format
        const dtcgObj: Record<string, unknown> = {};
        allTokens.forEach(t => {
          const parts = t.split(".");
          let current: Record<string, unknown> = dtcgObj;
          parts.forEach((part, i) => {
            if (i === parts.length - 1) {
              current[part] = {
                "$type": tokenType,
                "$value": "{/* value */}",
                "$description": `Token for ${parts.join(" > ")}`
              };
            } else {
              current[part] = current[part] || {};
              current = current[part] as Record<string, unknown>;
            }
          });
        });
        return `// W3C Design Tokens Community Group (DTCG) Format
// https://design-tokens.github.io/community-group/format/
${JSON.stringify(dtcgObj, null, 2)}`;
      }
      
      case "figma-variables": {
        // Figma Variables JSON format for import
        const variables = allTokens.map(t => {
          const namePath = t.split(".").join("/");
          return {
            name: namePath,
            resolvedType: figmaType,
            description: `Token: ${t}`,
            hiddenFromPublishing: false,
            scopes: figmaType === "COLOR" ? ["ALL_FILLS", "STROKE_COLOR"] : ["ALL_SCOPES"],
            codeSyntax: {
              WEB: `--${t.split(".").join("-")}`,
              ANDROID: t.split(".").map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)).join(""),
              iOS: t.split(".").map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)).join("")
            },
            valuesByMode: {
              "Light": figmaType === "COLOR" 
                ? { r: 0, g: 0, b: 0, a: 1 }
                : 0,
              "Dark": figmaType === "COLOR"
                ? { r: 1, g: 1, b: 1, a: 1 }
                : 0
            }
          };
        });

        const figmaExport = {
          version: "1.0",
          metadata: {
            exportedAt: new Date().toISOString(),
            tool: "Design Engineer Token Naming Tool"
          },
          collections: [
            {
              name: category ? category.charAt(0).toUpperCase() + category.slice(1) + " Tokens" : "Tokens",
              modes: ["Light", "Dark"],
              variables: variables
            }
          ]
        };
        
        return `// Figma Variables JSON
// Import via Figma Plugin or REST API
${JSON.stringify(figmaExport, null, 2)}`;
      }
      
      case "figma":
        return `// Figma Token Names (slash-separated)
// Use these names when creating styles/variables in Figma
${allTokens.map(t => {
          const figmaPath = t.split(".").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("/");
          return figmaPath;
        }).join("\n")}`;
      
      default:
        return allTokens.join("\n");
    }
  };

  return (
    <div className="space-y-8">
      {/* Convention Selection */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Naming Convention</h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {NAMING_CONVENTIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => setConvention(conv.id)}
              className={clsx(
                "rounded-lg border p-4 text-left transition-all",
                convention === conv.id
                  ? "border-swiss-red bg-swiss-red/5 ring-1 ring-swiss-red"
                  : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
              )}
            >
              <div className="mb-1 font-medium">{conv.label}</div>
              <div className="mb-2 text-xs text-neutral-500">{conv.description}</div>
              <code className="text-xs text-neutral-600 dark:text-neutral-400">{conv.example}</code>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Builder Panel */}
        <div className="space-y-6 lg:col-span-5">
          {/* Step 1: Category */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-swiss-red text-xs font-bold text-white">
                1
              </div>
              <h3 className="font-bold">Category</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    setProperty(null);
                    setContext(null);
                    setElement(null);
                  }}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                    category === cat.id
                      ? "border-swiss-red bg-swiss-red/5"
                      : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                  )}
                >
                  <cat.icon className={clsx(
                    "h-5 w-5",
                    category === cat.id ? "text-swiss-red" : "text-neutral-400"
                  )} />
                  <div>
                    <div className="text-sm font-medium">{cat.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Property */}
          <AnimatePresence mode="wait">
            {category && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-swiss-red text-xs font-bold text-white">
                    2
                  </div>
                  <h3 className="font-bold">Property</h3>
                </div>

                <div className="space-y-2">
                  {PROPERTIES[category]?.map(prop => (
                    <button
                      key={prop.id}
                      onClick={() => setProperty(prop.id)}
                      className={clsx(
                        "flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all",
                        property === prop.id
                          ? "border-swiss-red bg-swiss-red/5"
                          : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                      )}
                    >
                      <div>
                        <div className="text-sm font-medium">{prop.label}</div>
                        <div className="text-xs text-neutral-500">{prop.description}</div>
                      </div>
                      <ChevronRight className={clsx(
                        "h-4 w-4 transition-transform",
                        property === prop.id ? "rotate-90 text-swiss-red" : "text-neutral-400"
                      )} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Context */}
          <AnimatePresence mode="wait">
            {category && property && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-swiss-red text-xs font-bold text-white">
                    3
                  </div>
                  <h3 className="font-bold">Context</h3>
                </div>

                <div className="space-y-2">
                  {CONTEXTS[category]?.map(ctx => (
                    <button
                      key={ctx.id}
                      onClick={() => {
                        setContext(ctx.id);
                        setElement(null);
                      }}
                      className={clsx(
                        "flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all",
                        context === ctx.id
                          ? "border-swiss-red bg-swiss-red/5"
                          : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                      )}
                    >
                      <div>
                        <div className="text-sm font-medium">{ctx.label}</div>
                        <div className="text-xs text-neutral-500">{ctx.description}</div>
                      </div>
                      <ChevronRight className={clsx(
                        "h-4 w-4 transition-transform",
                        context === ctx.id ? "rotate-90 text-swiss-red" : "text-neutral-400"
                      )} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Element (Optional) */}
          <AnimatePresence mode="wait">
            {category && property && context && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                    4
                  </div>
                  <h3 className="font-bold">Element</h3>
                  <span className="text-xs text-neutral-500">(optional)</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(showAllElements ? ELEMENTS[category] : ELEMENTS[category]?.filter(el => suggestedElements.includes(el.id)))?.map(el => (
                    <button
                      key={el.id}
                      onClick={() => setElement(element === el.id ? null : el.id)}
                      className={clsx(
                        "rounded-full border px-3 py-1.5 text-sm transition-all",
                        element === el.id
                          ? "border-swiss-red bg-swiss-red text-white"
                          : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                      )}
                    >
                      {el.label}
                    </button>
                  ))}
                  {!showAllElements && suggestedElements.length < ELEMENTS[category]?.length && (
                    <button
                      onClick={() => setShowAllElements(true)}
                      className="flex items-center gap-1 rounded-full border border-dashed border-neutral-300 px-3 py-1.5 text-sm text-neutral-500 transition-all hover:border-neutral-400 hover:text-neutral-700 dark:border-neutral-600 dark:hover:border-neutral-500"
                    >
                      <Plus className="h-3 w-3" />
                      More
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 5: Modifiers */}
          <AnimatePresence mode="wait">
            {category && property && context && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                    5
                  </div>
                  <h3 className="font-bold">Modifiers</h3>
                </div>

                {/* Variants */}
                <div className="mb-4">
                  <div className="mb-2 text-xs font-medium uppercase text-neutral-500">Variant</div>
                  <div className="flex flex-wrap gap-2">
                    {VARIANT_MODIFIERS.map(mod => (
                      <button
                        key={mod.id}
                        onClick={() => setVariant(mod.id)}
                        className={clsx(
                          "rounded-full border px-3 py-1.5 text-sm transition-all",
                          variant === mod.id
                            ? "border-swiss-red bg-swiss-red text-white"
                            : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                        )}
                      >
                        {mod.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* States */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-medium uppercase text-neutral-500">States</div>
                    <button
                      onClick={handleAddAllInteractiveStates}
                      className="flex items-center gap-1 text-xs text-swiss-red hover:underline"
                    >
                      <Zap className="h-3 w-3" />
                      Add all interactive states
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STATE_MODIFIERS.map(mod => (
                      <button
                        key={mod.id}
                        onClick={() => handleToggleState(mod.id)}
                        className={clsx(
                          "rounded-full border px-3 py-1.5 text-sm transition-all",
                          selectedStates.includes(mod.id)
                            ? "border-swiss-red bg-swiss-red text-white"
                            : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                        )}
                      >
                        {mod.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6 lg:col-span-7">
          {/* Output Format Selection */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Output Format</h2>
            </div>
            <div className="relative grid grid-cols-3 gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 sm:grid-cols-6">
              {OUTPUT_FORMATS.map(format => {
                const isSelected = outputFormat === format.value;
                return (
                  <button
                    key={format.value}
                    onClick={() => setOutputFormat(format.value)}
                    className={clsx(
                      "relative z-10 rounded-md px-2 py-2 text-xs font-medium transition-colors",
                      isSelected
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="token-naming-format-indicator"
                        className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-neutral-700"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10">{format.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generated Tokens */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-swiss-red" />
              <h2 className="text-lg font-bold">Generated Tokens</h2>
            </div>

            {generatedTokens.length === 0 ? (
              <div className="py-12 text-center text-neutral-500">
                <Palette className="mx-auto mb-3 h-12 w-12 text-neutral-300 dark:text-neutral-700" />
                <p>Select a category and property to start building tokens</p>
              </div>
            ) : (
              <div className="space-y-2">
                {generatedTokens.map((token, idx) => (
                  <motion.div
                    key={token.formatted}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={clsx(
                      "group flex items-center justify-between rounded-lg border p-3 transition-colors",
                      token.isBase
                        ? "border-swiss-red/30 bg-swiss-red/5"
                        : "border-neutral-200 dark:border-neutral-700"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {token.isBase && (
                        <span className="rounded bg-swiss-red px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                          Base
                        </span>
                      )}
                      {token.type === "state" && (
                        <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-bold uppercase text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                          State
                        </span>
                      )}
                      <code className="font-mono text-sm">{token.formatted}</code>
                    </div>
                    <button
                      onClick={() => handleCopy(token.formatted)}
                      className="p-1.5 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:hover:text-white"
                    >
                      {copiedToken === token.formatted ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Related Tokens */}
          <AnimatePresence mode="wait">
            {relatedTokens.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <h2 className="text-lg font-bold">Related Tokens</h2>
                  <span className="text-xs text-neutral-500">Same convention, other properties</span>
                </div>

                <div className="space-y-4">
                  {relatedTokens.map(related => (
                    <div key={related.property}>
                      <div className="mb-2 text-xs font-medium uppercase text-neutral-500">
                        {related.property}
                      </div>
                      <div className="space-y-1">
                        {related.tokens.map(token => (
                          <div
                            key={token.formatted}
                            className="group flex items-center justify-between rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800/50"
                          >
                            <code className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                              {token.formatted}
                            </code>
                            <button
                              onClick={() => handleCopy(token.formatted)}
                              className="p-1 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:hover:text-white"
                            >
                              {copiedToken === token.formatted ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Component Token Set */}
          <AnimatePresence mode="wait">
            {componentTokenSet && componentTokenSet.length > 0 && element && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <h2 className="text-lg font-bold">Complete {element.charAt(0).toUpperCase() + element.slice(1)} Token Set</h2>
                </div>

                <p className="mb-4 text-sm text-neutral-500">
                  All {category} tokens for the {element} element with your selected states.
                </p>

                <div className="grid gap-1 sm:grid-cols-2">
                  {componentTokenSet.map(token => (
                    <div
                      key={token}
                      className="group flex items-center justify-between rounded bg-neutral-50 p-2 dark:bg-neutral-800/50"
                    >
                      <code className="truncate font-mono text-xs text-neutral-600 dark:text-neutral-400">
                        {token}
                      </code>
                      <button
                        onClick={() => handleCopy(token)}
                        className="shrink-0 p-1 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:hover:text-white"
                      >
                        {copiedToken === token ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Export Code */}
          {generatedTokens.length > 0 && (
            <CodeBlock
              label={`Export (${OUTPUT_FORMATS.find(f => f.value === outputFormat)?.label})`}
              code={generateExportCode()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
