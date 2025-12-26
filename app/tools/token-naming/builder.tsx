"use client";

import React, { useState, useMemo, useCallback } from "react";
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
  X,
  Download,
  GraduationCap,
  Wrench,
  CheckSquare,
  Square,
} from "lucide-react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

// Types
type Category = "color" | "typography" | "spacing" | "effects";
type BuilderMode = "educational" | "builder";

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
  isCustom?: boolean;
};

type SelectedComponent = {
  id: string;
  label: string;
  isCustom?: boolean;
  categories: Category[];
  hasStates: boolean;
};

type ModifierOption = {
  id: string;
  label: string;
  type: "variant" | "state" | "scale";
};

type NamingConvention = "explicit" | "compact" | "component-first";

type OutputFormat = "css" | "camelCase" | "json" | "figma";

type BuilderToken = {
  name: string;
  formatted: string;
  category: Category;
  property: string;
  component: string;
  variant: string;
  state: string | null;
};

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

// Component configuration with smart category/property defaults
type ComponentConfig = {
  id: string;
  label: string;
  isCustom?: boolean;
  categories: Category[];
  hasStates: boolean; // Whether this component has interactive states
};

// Default components for Builder Mode with smart category mappings
const DEFAULT_COMPONENTS: ComponentConfig[] = [
  // Surfaces - typically have colors, effects (shadows/radius), but no interactive states
  { id: "page", label: "Page", categories: ["color"], hasStates: false },
  { id: "card", label: "Card", categories: ["color", "spacing", "effects"], hasStates: false },
  { id: "modal", label: "Modal", categories: ["color", "spacing", "effects"], hasStates: false },
  { id: "dialog", label: "Dialog", categories: ["color", "spacing", "effects"], hasStates: false },
  { id: "popover", label: "Popover", categories: ["color", "spacing", "effects"], hasStates: false },
  { id: "dropdown", label: "Dropdown", categories: ["color", "spacing", "effects"], hasStates: true },
  { id: "tooltip", label: "Tooltip", categories: ["color", "spacing", "effects"], hasStates: false },
  { id: "sidebar", label: "Sidebar", categories: ["color", "spacing"], hasStates: false },
  { id: "panel", label: "Panel", categories: ["color", "spacing", "effects"], hasStates: false },
  
  // Interactive - have colors, spacing, and interactive states
  { id: "button", label: "Button", categories: ["color", "typography", "spacing", "effects"], hasStates: true },
  { id: "link", label: "Link", categories: ["color", "typography"], hasStates: true },
  { id: "input", label: "Input", categories: ["color", "typography", "spacing", "effects"], hasStates: true },
  { id: "textarea", label: "Textarea", categories: ["color", "typography", "spacing", "effects"], hasStates: true },
  { id: "select", label: "Select", categories: ["color", "typography", "spacing", "effects"], hasStates: true },
  { id: "checkbox", label: "Checkbox", categories: ["color", "effects"], hasStates: true },
  { id: "radio", label: "Radio", categories: ["color", "effects"], hasStates: true },
  { id: "switch", label: "Switch", categories: ["color", "effects"], hasStates: true },
  { id: "slider", label: "Slider", categories: ["color", "effects"], hasStates: true },
  
  // Navigation - typically have colors and states
  { id: "nav", label: "Navigation", categories: ["color", "spacing"], hasStates: true },
  { id: "tab", label: "Tab", categories: ["color", "typography", "spacing", "effects"], hasStates: true },
  { id: "breadcrumb", label: "Breadcrumb", categories: ["color", "typography", "spacing"], hasStates: true },
  { id: "pagination", label: "Pagination", categories: ["color", "spacing", "effects"], hasStates: true },
  { id: "menu", label: "Menu", categories: ["color", "spacing", "effects"], hasStates: true },
  
  // Data Display - mostly static, some with subtle states
  { id: "badge", label: "Badge", categories: ["color", "typography", "spacing", "effects"], hasStates: false },
  { id: "tag", label: "Tag", categories: ["color", "typography", "spacing", "effects"], hasStates: true },
  { id: "avatar", label: "Avatar", categories: ["color", "effects"], hasStates: false },
  { id: "table", label: "Table", categories: ["color", "typography", "spacing", "effects"], hasStates: true },
  { id: "list", label: "List", categories: ["color", "spacing"], hasStates: true },
  
  // Feedback - typically just colors and maybe effects
  { id: "alert", label: "Alert", categories: ["color", "typography", "spacing", "effects"], hasStates: false },
  { id: "toast", label: "Toast", categories: ["color", "typography", "spacing", "effects"], hasStates: false },
  { id: "progress", label: "Progress", categories: ["color", "effects"], hasStates: false },
  { id: "skeleton", label: "Skeleton", categories: ["color", "effects"], hasStates: false },
  
  // Brand/Semantic - color tokens only (these are color scales, not components)
  { id: "primary", label: "Primary", categories: ["color"], hasStates: false },
  { id: "secondary", label: "Secondary", categories: ["color"], hasStates: false },
  { id: "accent", label: "Accent", categories: ["color"], hasStates: false },
  { id: "success", label: "Success", categories: ["color"], hasStates: false },
  { id: "warning", label: "Warning", categories: ["color"], hasStates: false },
  { id: "error", label: "Error", categories: ["color"], hasStates: false },
  { id: "info", label: "Info", categories: ["color"], hasStates: false },
];

// Default properties to include in builder mode
const DEFAULT_PROPERTIES: Record<Category, string[]> = {
  color: ["background", "foreground", "border"],
  typography: ["font-size", "font-weight", "line-height"],
  spacing: ["padding", "gap"],
  effects: ["shadow", "radius"],
};

// Default states for interactive components
const INTERACTIVE_STATES = ["hover", "active", "focus", "disabled"];

// Default variants
const DEFAULT_VARIANTS = ["default", "subtle", "emphasis"];

// Scale tokens (global/primitive tokens not tied to components)
const RADIUS_SCALE = [
  { id: "none", label: "None" },
  { id: "xs", label: "XS" },
  { id: "sm", label: "SM" },
  { id: "md", label: "MD" },
  { id: "lg", label: "LG" },
  { id: "xl", label: "XL" },
  { id: "2xl", label: "2XL" },
  { id: "full", label: "Full" },
];

const NAMING_CONVENTIONS: { id: NamingConvention; label: string; description: string; example: string }[] = [
  { id: "explicit", label: "Explicit", description: "Category-Property-Context-Element-Modifier", example: "color-background-surface-card-hover" },
  { id: "compact", label: "Compact", description: "Property-Context-Modifier", example: "bg-surface-hover" },
  { id: "component-first", label: "Component First", description: "Element-Property-Modifier", example: "card-bg-hover" },
];

const OUTPUT_FORMATS: { value: OutputFormat; label: string }[] = [
  { value: "css", label: "CSS" },
  { value: "camelCase", label: "JS/TS" },
  { value: "json", label: "JSON" },
  { value: "figma", label: "Figma" },
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
      return name.split("-").join(".");
    case "figma":
      return name.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("/");
    default:
      return name;
  }
}

// Component
export default function TokenNamingBuilder() {
  // Mode toggle
  const [mode, setMode] = useState<BuilderMode>("educational");

  // Educational mode state
  const [category, setCategory] = useState<Category | null>(null);
  const [property, setProperty] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [element, setElement] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>("default");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  // Builder mode state
  const [builderComponents, setBuilderComponents] = useState<SelectedComponent[]>(() => [...DEFAULT_COMPONENTS]);
  const [customComponentInput, setCustomComponentInput] = useState("");
  const [customComponentCategories, setCustomComponentCategories] = useState<Category[]>(["color", "spacing", "effects"]);
  const [customComponentHasStates, setCustomComponentHasStates] = useState(true);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [builderVariants, setBuilderVariants] = useState<string[]>(["default"]);
  const [builderStates, setBuilderStates] = useState<string[]>(INTERACTIVE_STATES);
  const [includeRadiusScale, setIncludeRadiusScale] = useState(true);

  // Convention & output
  const [convention, setConvention] = useState<NamingConvention>("explicit");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("css");

  // UI state
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [showAllElements, setShowAllElements] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

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

  // Builder mode handlers
  const handleToggleBuilderComponent = useCallback((componentId: string) => {
    setBuilderComponents(prev => {
      const exists = prev.find(c => c.id === componentId);
      if (exists) {
        return prev.filter(c => c.id !== componentId);
      }
      const defaultComponent = DEFAULT_COMPONENTS.find(c => c.id === componentId);
      if (defaultComponent) {
        return [...prev, defaultComponent];
      }
      return prev;
    });
  }, []);

  const handleAddBuilderComponent = useCallback((componentId: string) => {
    setBuilderComponents(prev => {
      const exists = prev.find(c => c.id === componentId);
      if (exists) return prev;
      
      const defaultComponent = DEFAULT_COMPONENTS.find(c => c.id === componentId);
      if (defaultComponent) {
        return [...prev, defaultComponent];
      }
      return prev;
    });
  }, []);

  const handleRemoveBuilderComponent = useCallback((componentId: string) => {
    setBuilderComponents(prev => prev.filter(c => c.id !== componentId));
  }, []);

  const handleAddCustomComponent = useCallback(() => {
    const trimmed = customComponentInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmed) return;
    
    const exists = builderComponents.find(c => c.id === trimmed);
    if (exists) {
      setCustomComponentInput("");
      setShowCustomForm(false);
      return;
    }
    
    const label = customComponentInput.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    setBuilderComponents(prev => [...prev, { 
      id: trimmed, 
      label, 
      isCustom: true,
      categories: [...customComponentCategories],
      hasStates: customComponentHasStates,
    }]);
    setCustomComponentInput("");
    setCustomComponentCategories(["color", "spacing", "effects"]);
    setCustomComponentHasStates(true);
    setShowCustomForm(false);
  }, [customComponentInput, builderComponents, customComponentCategories, customComponentHasStates]);

  const handleToggleCustomCategory = useCallback((cat: Category) => {
    setCustomComponentCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }, []);

  const handleToggleComponentCategory = useCallback((componentId: string, category: Category) => {
    setBuilderComponents(prev => prev.map(comp => {
      if (comp.id !== componentId) return comp;
      const hasCategory = comp.categories.includes(category);
      return {
        ...comp,
        categories: hasCategory 
          ? comp.categories.filter(c => c !== category)
          : [...comp.categories, category],
      };
    }));
  }, []);

  const handleToggleComponentStates = useCallback((componentId: string) => {
    setBuilderComponents(prev => prev.map(comp => {
      if (comp.id !== componentId) return comp;
      return { ...comp, hasStates: !comp.hasStates };
    }));
  }, []);

  const handleToggleBuilderVariant = useCallback((variantId: string) => {
    setBuilderVariants(prev =>
      prev.includes(variantId) ? prev.filter(v => v !== variantId) : [...prev, variantId]
    );
  }, []);

  const handleToggleBuilderState = useCallback((stateId: string) => {
    setBuilderStates(prev =>
      prev.includes(stateId) ? prev.filter(s => s !== stateId) : [...prev, stateId]
    );
  }, []);

  const handleSelectAllComponents = useCallback(() => {
    setBuilderComponents([...DEFAULT_COMPONENTS]);
  }, []);

  const handleClearAllComponents = useCallback(() => {
    setBuilderComponents([]);
  }, []);

  const handleResetBuilder = useCallback(() => {
    setBuilderComponents([...DEFAULT_COMPONENTS]);
    setBuilderVariants(["default"]);
    setBuilderStates(INTERACTIVE_STATES);
    setCustomComponentInput("");
    setCustomComponentCategories(["color", "spacing", "effects"]);
    setCustomComponentHasStates(true);
    setShowCustomForm(false);
    setIncludeRadiusScale(true);
  }, []);

  // Generate radius scale tokens
  const radiusScaleTokens = useMemo(() => {
    if (mode !== "builder" || !includeRadiusScale) return [];
    
    return RADIUS_SCALE.map(size => {
      const name = `radius-${size.id}`;
      return {
        name,
        formatted: formatTokenName(name, outputFormat),
        label: size.label,
      };
    });
  }, [mode, includeRadiusScale, outputFormat]);

  // Generate full design system tokens for builder mode
  const builderTokens = useMemo((): BuilderToken[] => {
    if (mode !== "builder" || builderComponents.length === 0) return [];

    const tokens: BuilderToken[] = [];

    builderComponents.forEach(comp => {
      // Only generate tokens for categories this component uses
      comp.categories.forEach(cat => {
        const properties = DEFAULT_PROPERTIES[cat] || [];
        
        properties.forEach(prop => {
          builderVariants.forEach(v => {
            // Base token
            const baseName = buildTokenName(cat, prop, null, comp.id, v, null, convention);
            tokens.push({
              name: baseName,
              formatted: formatTokenName(baseName, outputFormat),
              category: cat,
              property: prop,
              component: comp.id,
              variant: v,
              state: null,
            });

            // State tokens - only if this component has interactive states
            if (comp.hasStates) {
              builderStates.forEach(state => {
                const stateName = buildTokenName(cat, prop, null, comp.id, v, state, convention);
                tokens.push({
                  name: stateName,
                  formatted: formatTokenName(stateName, outputFormat),
                  category: cat,
                  property: prop,
                  component: comp.id,
                  variant: v,
                  state,
                });
              });
            }
          });
        });
      });
    });

    return tokens;
  }, [mode, builderComponents, builderVariants, builderStates, convention, outputFormat]);

  // Group builder tokens by category and component
  const groupedBuilderTokens = useMemo(() => {
    const grouped: Record<string, Record<string, BuilderToken[]>> = {};
    
    builderTokens.forEach(token => {
      if (!grouped[token.category]) {
        grouped[token.category] = {};
      }
      if (!grouped[token.category][token.component]) {
        grouped[token.category][token.component] = [];
      }
      grouped[token.category][token.component].push(token);
    });
    
    return grouped;
  }, [builderTokens]);

  // Generate builder export code
  const generateBuilderExportCode = useCallback(() => {
    const scaleTokens = radiusScaleTokens.map(t => t.formatted);
    const componentTokens = builderTokens.map(t => t.formatted);
    const allTokens = [...scaleTokens, ...componentTokens];
    
    if (allTokens.length === 0) {
      return "// Add components to generate tokens";
    }

    switch (outputFormat) {
      case "css": {
        const sections: string[] = [];
        if (scaleTokens.length > 0) {
          sections.push(`  /* Radius Scale */\n${scaleTokens.map(t => `  ${t}: /* value */;`).join("\n")}`);
        }
        if (componentTokens.length > 0) {
          sections.push(`  /* Component Tokens */\n${componentTokens.map(t => `  ${t}: /* value */;`).join("\n")}`);
        }
        return `:root {\n${sections.join("\n\n")}\n}`;
      }
      
      case "camelCase": {
        const sections: string[] = [];
        if (scaleTokens.length > 0) {
          sections.push(`  // Radius Scale\n${scaleTokens.map(t => `  ${t}: '/* value */',`).join("\n")}`);
        }
        if (componentTokens.length > 0) {
          sections.push(`  // Component Tokens\n${componentTokens.map(t => `  ${t}: '/* value */',`).join("\n")}`);
        }
        return `const tokens = {\n${sections.join("\n\n")}\n};`;
      }
      
      case "json": {
        const jsonObj = buildNestedObject(allTokens, () => "/* value */");
        return JSON.stringify(jsonObj, null, 2);
      }
      
      case "figma":
        return allTokens.map(t => {
          const parts = t.split(".").filter(Boolean);
          return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("/");
        }).join("\n");
      
      default:
        return allTokens.join("\n");
    }
  }, [builderTokens, radiusScaleTokens, outputFormat]);

  const handleCopyAllBuilderTokens = useCallback(() => {
    const code = generateBuilderExportCode();
    navigator.clipboard.writeText(code);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }, [generateBuilderExportCode]);

  // Helper to safely build nested object structure
  const buildNestedObject = (
    tokens: string[],
    valueBuilder: (parts: string[]) => unknown
  ): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    
    tokens.forEach(t => {
      if (!t || typeof t !== "string") return;
      
      const parts = t.split(".").filter(Boolean);
      if (parts.length === 0) return;
      
      let current: Record<string, unknown> = result;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;
        
        if (isLast) {
          current[part] = valueBuilder(parts);
        } else {
          if (current[part] === undefined) {
            current[part] = {};
          } else if (typeof current[part] !== "object" || current[part] === null) {
            current[part] = { _value: current[part] };
          }
          current = current[part] as Record<string, unknown>;
        }
      }
    });
    
    return result;
  };

  // Generate export code
  const generateExportCode = () => {
    if (generatedTokens.length === 0) {
      return "// Select options above to generate tokens";
    }

    const allTokens = [...generatedTokens.map(t => t.formatted)];
    relatedTokens.forEach(r => {
      r.tokens.forEach(t => allTokens.push(t.formatted));
    });

    // Filter out any empty or invalid tokens
    const validTokens = allTokens.filter(t => t && typeof t === "string" && t.length > 0);
    
    if (validTokens.length === 0) {
      return "// No valid tokens generated";
    }

    switch (outputFormat) {
      case "css":
        return `:root {\n${validTokens.map(t => `  ${t}: /* value */;`).join("\n")}\n}`;
      
      case "camelCase":
        return `const tokens = {\n${validTokens.map(t => `  ${t}: '/* value */',`).join("\n")}\n};`;
      
      case "json": {
        const jsonObj = buildNestedObject(validTokens, () => "/* value */");
        return JSON.stringify(jsonObj, null, 2);
      }
      
      case "figma":
        return validTokens.map(t => {
          const parts = t.split(".").filter(Boolean);
          return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("/");
        }).join("\n");
      
      default:
        return validTokens.join("\n");
    }
  };

  return (
    <div className="space-y-8">
      {/* Mode Toggle */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Mode</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Choose how you want to build your tokens
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => setMode("educational")}
            className={clsx(
              "flex items-start gap-4 rounded-lg border p-4 text-left transition-all",
              mode === "educational"
                ? "border-swiss-red bg-swiss-red/5 ring-1 ring-swiss-red"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
            )}
          >
            <div className={clsx(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              mode === "educational" ? "bg-swiss-red text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800"
            )}>
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Educational</div>
              <div className="mt-1 text-xs text-neutral-500">
                Step-by-step guided selection. Learn how semantic tokens are structured.
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode("builder")}
            className={clsx(
              "flex items-start gap-4 rounded-lg border p-4 text-left transition-all",
              mode === "builder"
                ? "border-swiss-red bg-swiss-red/5 ring-1 ring-swiss-red"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
            )}
          >
            <div className={clsx(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              mode === "builder" ? "bg-swiss-red text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800"
            )}>
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Builder</div>
              <div className="mt-1 text-xs text-neutral-500">
                Generate a complete token set. Select components, customise, and export.
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Convention Selection */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Naming Convention</h2>
          <button
            onClick={mode === "builder" ? handleResetBuilder : handleReset}
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

      {/* Builder Mode UI */}
      {mode === "builder" && (
        <BuilderModeUI
          builderComponents={builderComponents}
          customComponentInput={customComponentInput}
          setCustomComponentInput={setCustomComponentInput}
          customComponentCategories={customComponentCategories}
          customComponentHasStates={customComponentHasStates}
          showCustomForm={showCustomForm}
          setShowCustomForm={setShowCustomForm}
          builderVariants={builderVariants}
          builderStates={builderStates}
          builderTokens={builderTokens}
          radiusScaleTokens={radiusScaleTokens}
          includeRadiusScale={includeRadiusScale}
          setIncludeRadiusScale={setIncludeRadiusScale}
          groupedBuilderTokens={groupedBuilderTokens}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          copiedToken={copiedToken}
          copiedAll={copiedAll}
          handleToggleBuilderComponent={handleToggleBuilderComponent}
          handleAddBuilderComponent={handleAddBuilderComponent}
          handleRemoveBuilderComponent={handleRemoveBuilderComponent}
          handleAddCustomComponent={handleAddCustomComponent}
          handleToggleCustomCategory={handleToggleCustomCategory}
          setCustomComponentHasStates={setCustomComponentHasStates}
          handleToggleComponentCategory={handleToggleComponentCategory}
          handleToggleComponentStates={handleToggleComponentStates}
          handleToggleBuilderVariant={handleToggleBuilderVariant}
          handleToggleBuilderState={handleToggleBuilderState}
          handleSelectAllComponents={handleSelectAllComponents}
          handleClearAllComponents={handleClearAllComponents}
          handleCopy={handleCopy}
          handleCopyAllBuilderTokens={handleCopyAllBuilderTokens}
          generateBuilderExportCode={generateBuilderExportCode}
        />
      )}

      {/* Educational Mode UI */}
      {mode === "educational" && (
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
            <div className="mb-4">
              <h2 className="text-lg font-bold">Output Format</h2>
              <p className="mt-1 text-xs text-neutral-500">
                JSON works with Style Dictionary, W3C DTCG, Figma Variables, and Tokens Studio
              </p>
            </div>
            <div className="relative grid grid-cols-2 gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 sm:grid-cols-4">
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
                      <code className="break-all font-mono text-sm">{token.formatted}</code>
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
                            <code className="break-all font-mono text-xs text-neutral-600 dark:text-neutral-400">
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
                      <code className="min-w-0 break-all font-mono text-xs text-neutral-600 dark:text-neutral-400">
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
      )}
    </div>
  );
}

// Builder Mode UI Component
type BuilderModeUIProps = {
  builderComponents: SelectedComponent[];
  customComponentInput: string;
  setCustomComponentInput: (value: string) => void;
  customComponentCategories: Category[];
  customComponentHasStates: boolean;
  showCustomForm: boolean;
  setShowCustomForm: (show: boolean) => void;
  builderVariants: string[];
  builderStates: string[];
  builderTokens: BuilderToken[];
  radiusScaleTokens: { name: string; formatted: string; label: string }[];
  includeRadiusScale: boolean;
  setIncludeRadiusScale: (include: boolean) => void;
  groupedBuilderTokens: Record<string, Record<string, BuilderToken[]>>;
  outputFormat: OutputFormat;
  setOutputFormat: (format: OutputFormat) => void;
  copiedToken: string | null;
  copiedAll: boolean;
  handleToggleBuilderComponent: (id: string) => void;
  handleAddBuilderComponent: (id: string) => void;
  handleRemoveBuilderComponent: (id: string) => void;
  handleAddCustomComponent: () => void;
  handleToggleCustomCategory: (cat: Category) => void;
  setCustomComponentHasStates: (hasStates: boolean) => void;
  handleToggleComponentCategory: (componentId: string, category: Category) => void;
  handleToggleComponentStates: (componentId: string) => void;
  handleToggleBuilderVariant: (id: string) => void;
  handleToggleBuilderState: (id: string) => void;
  handleSelectAllComponents: () => void;
  handleClearAllComponents: () => void;
  handleCopy: (token: string) => void;
  handleCopyAllBuilderTokens: () => void;
  generateBuilderExportCode: () => string;
};

function BuilderModeUI({
  builderComponents,
  customComponentInput,
  setCustomComponentInput,
  customComponentCategories,
  customComponentHasStates,
  showCustomForm,
  setShowCustomForm,
  builderVariants,
  builderStates,
  builderTokens,
  radiusScaleTokens,
  includeRadiusScale,
  setIncludeRadiusScale,
  outputFormat,
  setOutputFormat,
  copiedToken,
  copiedAll,
  handleAddBuilderComponent,
  handleRemoveBuilderComponent,
  handleAddCustomComponent,
  handleToggleCustomCategory,
  setCustomComponentHasStates,
  handleToggleComponentCategory,
  handleToggleComponentStates,
  handleToggleBuilderVariant,
  handleToggleBuilderState,
  handleSelectAllComponents,
  handleClearAllComponents,
  handleCopy,
  handleCopyAllBuilderTokens,
  generateBuilderExportCode,
}: BuilderModeUIProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);
  
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Configuration Panel */}
      <div className="space-y-6 lg:col-span-5">
        {/* Components Selection */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-swiss-red" />
              <h3 className="font-bold">Components</h3>
              <span className="rounded-full bg-swiss-red/10 px-2 py-0.5 text-xs font-medium text-swiss-red">
                {builderComponents.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAllComponents}
                className="text-xs text-neutral-500 hover:text-swiss-red"
              >
                Select all
              </button>
              <span className="text-neutral-300">|</span>
              <button
                onClick={handleClearAllComponents}
                className="text-xs text-neutral-500 hover:text-swiss-red"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Selected Components */}
          <div className="mb-4 flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {builderComponents.map(comp => (
                <motion.button
                  key={comp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleRemoveBuilderComponent(comp.id)}
                  className={clsx(
                    "group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all hover:border-red-300 hover:bg-red-50 dark:hover:border-red-800 dark:hover:bg-red-950",
                    comp.isCustom
                      ? "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
                      : "border-swiss-red/30 bg-swiss-red/5 text-swiss-red"
                  )}
                >
                  {comp.label}
                  <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Custom Component */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-medium uppercase text-neutral-500">
                Add Custom Component
              </div>
              {!showCustomForm && (
                <button
                  onClick={() => setShowCustomForm(true)}
                  className="text-xs text-swiss-red hover:underline"
                >
                  + Add custom
                </button>
              )}
            </div>
            
            <AnimatePresence>
              {showCustomForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/50">
                    {/* Name input */}
                    <div className="mb-3">
                      <label className="mb-1.5 block text-xs font-medium text-purple-700 dark:text-purple-300">
                        Component Name
                      </label>
                      <input
                        type="text"
                        value={customComponentInput}
                        onChange={(e) => setCustomComponentInput(e.target.value)}
                        placeholder="e.g., stepper, chip, carousel..."
                        className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-purple-700 dark:bg-neutral-800"
                      />
                    </div>
                    
                    {/* Category selection */}
                    <div className="mb-3">
                      <label className="mb-1.5 block text-xs font-medium text-purple-700 dark:text-purple-300">
                        Categories
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {CATEGORIES.map(cat => {
                          const isSelected = customComponentCategories.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              onClick={() => handleToggleCustomCategory(cat.id)}
                              className={clsx(
                                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all",
                                isSelected
                                  ? "border-purple-500 bg-purple-500 text-white"
                                  : "border-purple-200 text-purple-600 hover:border-purple-300 dark:border-purple-700 dark:text-purple-400"
                              )}
                            >
                              <cat.icon className="h-3 w-3" />
                              {cat.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* States toggle */}
                    <div className="mb-4">
                      <label className="mb-1.5 block text-xs font-medium text-purple-700 dark:text-purple-300">
                        Interactive States
                      </label>
                      <button
                        onClick={() => setCustomComponentHasStates(!customComponentHasStates)}
                        className={clsx(
                          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                          customComponentHasStates
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-purple-200 text-purple-600 hover:border-purple-300 dark:border-purple-700 dark:text-purple-400"
                        )}
                      >
                        {customComponentHasStates ? <Check className="h-3 w-3" /> : null}
                        {customComponentHasStates ? "Has states (hover, active, focus, disabled)" : "No interactive states"}
                      </button>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddCustomComponent}
                        disabled={!customComponentInput.trim() || customComponentCategories.length === 0}
                        className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                        Add Component
                      </button>
                      <button
                        onClick={() => {
                          setShowCustomForm(false);
                          setCustomComponentInput("");
                        }}
                        className="rounded-lg px-4 py-2 text-sm text-purple-600 transition-colors hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Add from Defaults */}
          {DEFAULT_COMPONENTS.filter(c => !builderComponents.find(bc => bc.id === c.id)).length > 0 && (
          <div>
            <div className="mb-2 text-xs font-medium uppercase text-neutral-500">
              Quick Add Defaults
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DEFAULT_COMPONENTS.filter(c => !builderComponents.find(bc => bc.id === c.id))
                .slice(0, 12)
                .map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => handleAddBuilderComponent(comp.id)}
                    className="rounded-full border border-dashed border-neutral-300 px-2.5 py-1 text-xs text-neutral-500 transition-all hover:border-swiss-red hover:bg-swiss-red/5 hover:text-swiss-red dark:border-neutral-600"
                  >
                    + {comp.label}
                  </button>
                ))}
              {DEFAULT_COMPONENTS.filter(c => !builderComponents.find(bc => bc.id === c.id)).length > 12 && (
                <span className="px-2 py-1 text-xs text-neutral-400">
                  +{DEFAULT_COMPONENTS.filter(c => !builderComponents.find(bc => bc.id === c.id)).length - 12} more
                </span>
              )}
            </div>
          </div>
          )}
        </div>

        {/* Component Configuration */}
        {builderComponents.length > 0 && (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5 text-swiss-red" />
            <h3 className="font-bold">Component Configuration</h3>
            <span className="text-xs text-neutral-500">Click to customise</span>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {builderComponents.map(comp => {
              const isExpanded = expandedComponent === comp.id;
              const categoryCount = comp.categories.length;
              
              return (
                <div key={comp.id} className="rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  <button
                    onClick={() => setExpandedComponent(isExpanded ? null : comp.id)}
                    className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className={clsx(
                        "font-medium text-sm",
                        comp.isCustom ? "text-purple-600 dark:text-purple-400" : ""
                      )}>
                        {comp.label}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {categoryCount} {categoryCount === 1 ? "category" : "categories"}
                        {comp.hasStates && " + states"}
                      </span>
                    </div>
                    <ChevronRight className={clsx(
                      "h-4 w-4 text-neutral-400 transition-transform",
                      isExpanded && "rotate-90"
                    )} />
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-neutral-200 dark:border-neutral-700 p-3 space-y-3">
                          {/* Category toggles */}
                          <div>
                            <div className="text-[10px] font-medium uppercase text-neutral-500 mb-2">Categories</div>
                            <div className="flex flex-wrap gap-1.5">
                              {CATEGORIES.map(cat => {
                                const hasCategory = comp.categories.includes(cat.id);
                                return (
                                  <button
                                    key={cat.id}
                                    onClick={() => handleToggleComponentCategory(comp.id, cat.id)}
                                    className={clsx(
                                      "flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs transition-all",
                                      hasCategory
                                        ? "border-swiss-red bg-swiss-red/10 text-swiss-red"
                                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300 dark:border-neutral-600"
                                    )}
                                  >
                                    <cat.icon className="h-3 w-3" />
                                    {cat.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* States toggle */}
                          <div>
                            <div className="text-[10px] font-medium uppercase text-neutral-500 mb-2">Interactive States</div>
                            <button
                              onClick={() => handleToggleComponentStates(comp.id)}
                              className={clsx(
                                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                                comp.hasStates
                                  ? "border-swiss-red bg-swiss-red text-white"
                                  : "border-neutral-200 text-neutral-500 hover:border-neutral-300 dark:border-neutral-600"
                              )}
                            >
                              {comp.hasStates ? <Check className="h-3 w-3" /> : null}
                              {comp.hasStates ? "Has states (hover, active, focus, disabled)" : "No interactive states"}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Variants Selection */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-swiss-red" />
            <h3 className="font-bold">Variants</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {VARIANT_MODIFIERS.map(mod => {
              const isSelected = builderVariants.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => handleToggleBuilderVariant(mod.id)}
                  className={clsx(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all",
                    isSelected
                      ? "border-swiss-red bg-swiss-red text-white"
                      : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                  )}
                >
                  {isSelected ? (
                    <Check className="h-3 w-3" />
                  ) : null}
                  {mod.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* States Selection */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-swiss-red" />
            <h3 className="font-bold">States</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {STATE_MODIFIERS.map(mod => {
              const isSelected = builderStates.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => handleToggleBuilderState(mod.id)}
                  className={clsx(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all",
                    isSelected
                      ? "border-swiss-red bg-swiss-red text-white"
                      : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                  )}
                >
                  {isSelected ? (
                    <Check className="h-3 w-3" />
                  ) : null}
                  {mod.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scale Tokens */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Space className="h-5 w-5 text-swiss-red" />
              <h3 className="font-bold">Scale Tokens</h3>
            </div>
          </div>

          <p className="mb-4 text-xs text-neutral-500">
            Global primitive tokens for consistent scales across your design system.
          </p>

          {/* Radius Scale Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
            <div>
              <div className="font-medium text-sm">Border Radius Scale</div>
              <div className="text-xs text-neutral-500">
                {RADIUS_SCALE.map(s => s.id).join(", ")}
              </div>
            </div>
            <button
              onClick={() => setIncludeRadiusScale(!includeRadiusScale)}
              className={clsx(
                "relative h-6 w-11 rounded-full transition-colors",
                includeRadiusScale ? "bg-swiss-red" : "bg-neutral-200 dark:bg-neutral-700"
              )}
            >
              <span
                className={clsx(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  includeRadiusScale ? "left-[22px]" : "left-0.5"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="space-y-6 lg:col-span-7">
        {/* Output Format Selection */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Output Format</h2>
            <p className="mt-1 text-xs text-neutral-500">
              JSON works with Style Dictionary, W3C DTCG, Figma Variables, and Tokens Studio
            </p>
          </div>
          <div className="relative grid grid-cols-2 gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 sm:grid-cols-4">
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
                      layoutId="builder-format-indicator"
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

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl font-bold text-swiss-red">{builderComponents.length}</div>
            <div className="text-xs text-neutral-500">Components</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl font-bold text-swiss-red">{builderComponents.filter(c => c.hasStates).length}</div>
            <div className="text-xs text-neutral-500">With States</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl font-bold text-swiss-red">{radiusScaleTokens.length}</div>
            <div className="text-xs text-neutral-500">Scale Tokens</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl font-bold text-swiss-red">{builderTokens.length + radiusScaleTokens.length}</div>
            <div className="text-xs text-neutral-500">Total Tokens</div>
          </div>
        </div>

        {/* Token Preview */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-swiss-red" />
              <h2 className="text-lg font-bold">Token Preview</h2>
            </div>
            <button
              onClick={handleCopyAllBuilderTokens}
              className="flex items-center gap-2 rounded-lg bg-swiss-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-swiss-red/90"
            >
              {copiedAll ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export All
                </>
              )}
            </button>
          </div>

          {builderTokens.length === 0 && radiusScaleTokens.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <Layers className="mx-auto mb-3 h-12 w-12 text-neutral-300 dark:text-neutral-700" />
              <p>Add components to start generating tokens</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Radius Scale Tokens */}
              {radiusScaleTokens.length > 0 && (
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === "radius-scale" ? null : "radius-scale")}
                    className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <div className="flex items-center gap-2">
                      <Space className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium">Radius Scale</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {radiusScaleTokens.length} tokens
                      </span>
                    </div>
                    <ChevronRight className={clsx(
                      "h-4 w-4 text-neutral-400 transition-transform",
                      expandedCategory === "radius-scale" && "rotate-90"
                    )} />
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategory === "radius-scale" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-neutral-200 p-3 dark:border-neutral-700">
                          <div className="grid gap-1">
                            {radiusScaleTokens.map(token => (
                              <div
                                key={token.formatted}
                                className="group flex items-center justify-between rounded bg-neutral-50 p-2 dark:bg-neutral-800/50"
                              >
                                <div className="flex items-center gap-2">
                                  <code className="min-w-0 break-all font-mono text-xs text-neutral-600 dark:text-neutral-400">
                                    {token.formatted}
                                  </code>
                                  <span className="text-[10px] text-neutral-400">({token.label})</span>
                                </div>
                                <button
                                  onClick={() => handleCopy(token.formatted)}
                                  className="shrink-0 p-1 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:hover:text-white"
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Component Groups */}
              {builderComponents.map(comp => {
                const componentTokens = builderTokens.filter(t => t.component === comp.id);
                if (componentTokens.length === 0) return null;
                const isExpanded = expandedCategory === comp.id;
                
                return (
                  <div key={comp.id} className="rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : comp.id)}
                      className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className={clsx("h-4 w-4", comp.isCustom ? "text-purple-500" : "text-swiss-red")} />
                        <span className="font-medium">{comp.label}</span>
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800">
                          {componentTokens.length} tokens
                        </span>
                        {comp.hasStates && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                            +states
                          </span>
                        )}
                      </div>
                      <ChevronRight className={clsx(
                        "h-4 w-4 text-neutral-400 transition-transform",
                        isExpanded && "rotate-90"
                      )} />
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="max-h-64 overflow-y-auto border-t border-neutral-200 p-3 dark:border-neutral-700">
                            <div className="grid gap-1">
                              {componentTokens.slice(0, 50).map(token => (
                                <div
                                  key={token.formatted}
                                  className="group flex items-center justify-between rounded bg-neutral-50 p-2 dark:bg-neutral-800/50"
                                >
                                  <code className="min-w-0 break-all font-mono text-xs text-neutral-600 dark:text-neutral-400">
                                    {token.formatted}
                                  </code>
                                  <button
                                    onClick={() => handleCopy(token.formatted)}
                                    className="shrink-0 p-1 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:hover:text-white"
                                  >
                                    {copiedToken === token.formatted ? (
                                      <Check className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <Copy className="h-3 w-3" />
                                    )}
                                  </button>
                                </div>
                              ))}
                              {componentTokens.length > 50 && (
                                <div className="py-2 text-center text-xs text-neutral-500">
                                  +{componentTokens.length - 50} more tokens in export
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Export Code */}
        {(builderTokens.length > 0 || radiusScaleTokens.length > 0) && (
          <CodeBlock
            label={`Full Export (${OUTPUT_FORMATS.find(f => f.value === outputFormat)?.label}) - ${builderTokens.length + radiusScaleTokens.length} tokens`}
            code={generateBuilderExportCode()}
          />
        )}
      </div>
    </div>
  );
}
