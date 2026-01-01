"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Trash, InfoCircle as Info, NavArrowDown as ChevronDown, NavArrowUp as ChevronUp, Drag as GripVertical, Copy, Check, Heart, MessageText as MessageCircle, ShareIos as Share2, Bookmark, MediaImagePlus as ImagePlus, Xmark as X } from "iconoir-react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

// ============================================================================
// Types
// ============================================================================

type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

type BlendModeInfo = {
  name: BlendMode;
  label: string;
  category: string;
  description: string;
  formula: string;
  useCase: string;
};

type Layer = {
  id: string;
  color: string;
  blendMode: BlendMode;
  opacity: number;
};

type Preset = {
  name: string;
  description: string;
  backdrop: string;
  layers: Omit<Layer, "id">[];
};

type OutputFormat = "css" | "tailwind" | "swift" | "android";

// ============================================================================
// Data
// ============================================================================

const BLEND_MODES: BlendModeInfo[] = [
  // Normal
  {
    name: "normal",
    label: "Normal",
    category: "Normal",
    description: "No blending occurs. The blend layer simply covers the base layer.",
    formula: "Result = Blend",
    useCase: "Default behaviour, useful as a reference point.",
  },
  // Darken group
  {
    name: "darken",
    label: "Darken",
    category: "Darken",
    description: "Compares each channel and keeps the darker value from either layer.",
    formula: "Result = min(Base, Blend)",
    useCase: "Removing white backgrounds, creating shadows.",
  },
  {
    name: "multiply",
    label: "Multiply",
    category: "Darken",
    description: "Multiplies the base and blend colours, always resulting in a darker colour. White disappears, black stays.",
    formula: "Result = Base × Blend",
    useCase: "Adding shadows, creating depth, overlaying textures on light backgrounds.",
  },
  {
    name: "color-burn",
    label: "Colour Burn",
    category: "Darken",
    description: "Darkens the base colour to reflect the blend colour by increasing contrast. Creates intense, saturated darks.",
    formula: "Result = 1 - (1 - Base) / Blend",
    useCase: "Rich, saturated shadows with high contrast.",
  },
  // Lighten group
  {
    name: "lighten",
    label: "Lighten",
    category: "Lighten",
    description: "Compares each channel and keeps the lighter value from either layer.",
    formula: "Result = max(Base, Blend)",
    useCase: "Removing black backgrounds, creating highlights.",
  },
  {
    name: "screen",
    label: "Screen",
    category: "Lighten",
    description: "The inverse of multiply. Always results in a lighter colour. Black disappears, white stays.",
    formula: "Result = 1 - (1 - Base) × (1 - Blend)",
    useCase: "Adding light effects, glows, and brightening images.",
  },
  {
    name: "color-dodge",
    label: "Colour Dodge",
    category: "Lighten",
    description: "Brightens the base colour to reflect the blend colour by decreasing contrast. Creates bright, blown-out highlights.",
    formula: "Result = Base / (1 - Blend)",
    useCase: "Intense highlights, light leaks, glowing effects.",
  },
  // Contrast group
  {
    name: "overlay",
    label: "Overlay",
    category: "Contrast",
    description: "Combines Multiply and Screen. Dark base colours get darker (multiply), light base colours get lighter (screen).",
    formula: "If Base < 0.5: 2 × Base × Blend\nElse: 1 - 2 × (1 - Base) × (1 - Blend)",
    useCase: "Increasing contrast whilst preserving highlights and shadows.",
  },
  {
    name: "soft-light",
    label: "Soft Light",
    category: "Contrast",
    description: "A gentler version of Overlay. Like shining a soft, diffused light on the image.",
    formula: "Complex formula based on blend value",
    useCase: "Subtle contrast adjustments, soft colour grading.",
  },
  {
    name: "hard-light",
    label: "Hard Light",
    category: "Contrast",
    description: "Like Overlay, but based on the blend layer instead of base. Creates more dramatic contrast.",
    formula: "If Blend < 0.5: Multiply\nElse: Screen",
    useCase: "Strong lighting effects, dramatic contrast.",
  },
  // Inversion group
  {
    name: "difference",
    label: "Difference",
    category: "Inversion",
    description: "Subtracts the darker colour from the lighter one. Identical colours produce black.",
    formula: "Result = |Base - Blend|",
    useCase: "Creating psychedelic effects, finding differences between layers.",
  },
  {
    name: "exclusion",
    label: "Exclusion",
    category: "Inversion",
    description: "Similar to Difference but with lower contrast. Creates a more muted inversion effect.",
    formula: "Result = Base + Blend - 2 × Base × Blend",
    useCase: "Softer inversion effects, vintage looks.",
  },
  // Component group
  {
    name: "hue",
    label: "Hue",
    category: "Component",
    description: "Uses the hue of the blend colour with the saturation and luminosity of the base.",
    formula: "Result = HSL(Blend.H, Base.S, Base.L)",
    useCase: "Changing colour tones whilst preserving detail.",
  },
  {
    name: "saturation",
    label: "Saturation",
    category: "Component",
    description: "Uses the saturation of the blend colour with the hue and luminosity of the base.",
    formula: "Result = HSL(Base.H, Blend.S, Base.L)",
    useCase: "Adjusting vibrancy without changing colours.",
  },
  {
    name: "color",
    label: "Colour",
    category: "Component",
    description: "Uses the hue and saturation of the blend colour with the luminosity of the base. Great for colourising.",
    formula: "Result = HSL(Blend.H, Blend.S, Base.L)",
    useCase: "Colourising images, duotone effects.",
  },
  {
    name: "luminosity",
    label: "Luminosity",
    category: "Component",
    description: "Uses the luminosity of the blend colour with the hue and saturation of the base.",
    formula: "Result = HSL(Base.H, Base.S, Blend.L)",
    useCase: "Adjusting brightness whilst preserving colour.",
  },
];

const CATEGORIES = ["Normal", "Darken", "Lighten", "Contrast", "Inversion", "Component"];

const BACKDROP_PRESETS = [
  {
    name: "Sunset",
    value: "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)",
  },
  {
    name: "Ocean",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  },
  {
    name: "Forest",
    value: "linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #a8ff78 100%)",
  },
  {
    name: "Neon",
    value: "linear-gradient(135deg, #f5af19 0%, #f12711 33%, #c471ed 66%, #12c2e9 100%)",
  },
  {
    name: "Monochrome",
    value: "linear-gradient(135deg, #2c3e50 0%, #bdc3c7 50%, #ecf0f1 100%)",
  },
  {
    name: "Vibrant",
    value: "conic-gradient(from 0deg, #ff0080, #ff8c00, #40e0d0, #8a2be2, #ff0080)",
  },
];

const STACKING_PRESETS: Preset[] = [
  {
    name: "Duotone",
    description: "Classic two-colour effect used in modern design",
    backdrop: BACKDROP_PRESETS[0].value,
    layers: [
      { color: "#1a1a2e", blendMode: "color", opacity: 100 },
      { color: "#e94560", blendMode: "lighten", opacity: 80 },
    ],
  },
  {
    name: "Vintage Film",
    description: "Warm, faded look reminiscent of old photographs",
    backdrop: BACKDROP_PRESETS[1].value,
    layers: [
      { color: "#d4a574", blendMode: "multiply", opacity: 30 },
      { color: "#ffeaa7", blendMode: "overlay", opacity: 25 },
      { color: "#2d3436", blendMode: "soft-light", opacity: 15 },
    ],
  },
  {
    name: "Neon Glow",
    description: "Vibrant, electric effect with high saturation",
    backdrop: BACKDROP_PRESETS[3].value,
    layers: [
      { color: "#00ff88", blendMode: "screen", opacity: 40 },
      { color: "#ff00ff", blendMode: "color-dodge", opacity: 30 },
    ],
  },
  {
    name: "Soft Contrast",
    description: "Subtle enhancement that adds depth without harshness",
    backdrop: BACKDROP_PRESETS[2].value,
    layers: [
      { color: "#ffffff", blendMode: "soft-light", opacity: 30 },
      { color: "#000000", blendMode: "soft-light", opacity: 20 },
    ],
  },
  {
    name: "Golden Hour",
    description: "Warm, sunset-inspired colour grading",
    backdrop: BACKDROP_PRESETS[0].value,
    layers: [
      { color: "#ff9500", blendMode: "overlay", opacity: 35 },
      { color: "#ffcc00", blendMode: "soft-light", opacity: 25 },
    ],
  },
  {
    name: "Cyberpunk",
    description: "High contrast neon aesthetic",
    backdrop: BACKDROP_PRESETS[3].value,
    layers: [
      { color: "#ff0055", blendMode: "hard-light", opacity: 40 },
      { color: "#00ffff", blendMode: "screen", opacity: 35 },
      { color: "#000000", blendMode: "multiply", opacity: 20 },
    ],
  },
  {
    name: "Desaturated Drama",
    description: "Moody, cinematic feel with reduced colour",
    backdrop: BACKDROP_PRESETS[4].value,
    layers: [
      { color: "#808080", blendMode: "saturation", opacity: 60 },
      { color: "#1a1a1a", blendMode: "soft-light", opacity: 40 },
    ],
  },
  {
    name: "Ethereal",
    description: "Dreamy, soft effect with lifted shadows",
    backdrop: BACKDROP_PRESETS[1].value,
    layers: [
      { color: "#e8daef", blendMode: "lighten", opacity: 30 },
      { color: "#fdfefe", blendMode: "overlay", opacity: 20 },
      { color: "#aed6f1", blendMode: "color", opacity: 25 },
    ],
  },
];

const FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
  { value: "css", label: "CSS" },
  { value: "tailwind", label: "Tailwind" },
  { value: "swift", label: "SwiftUI" },
  { value: "android", label: "Android" },
];

// ============================================================================
// Sortable Layer Component
// ============================================================================

type SortableLayerProps = {
  layer: Layer;
  index: number;
  onUpdate: (id: string, updates: Partial<Layer>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  blendModes: BlendModeInfo[];
};

function SortableLayer({
  layer,
  index,
  onUpdate,
  onRemove,
  canRemove,
  blendModes,
}: SortableLayerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: layer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-950",
        isDragging && "z-50 shadow-lg ring-2 ring-swiss-red"
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none rounded p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 active:cursor-grabbing dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">Layer {index + 1}</span>
          <span
            className="h-3 w-3 rounded-full border border-neutral-300 dark:border-neutral-600"
            style={{ backgroundColor: layer.color }}
          />
        </div>
        <button
          onClick={() => onRemove(layer.id)}
          disabled={!canRemove}
          className="p-1 text-neutral-400 hover:text-red-500 disabled:opacity-30"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {/* Colour */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500">Colour</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={layer.color}
              onChange={(e) => onUpdate(layer.id, { color: e.target.value })}
              className="h-8 w-10 cursor-pointer rounded border border-neutral-200 dark:border-neutral-700"
            />
            <input
              type="text"
              value={layer.color}
              onChange={(e) => onUpdate(layer.id, { color: e.target.value })}
              className="w-full min-w-0 rounded-none border border-neutral-200 bg-white px-2 py-1 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>
        </div>

        {/* Blend mode */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500">
            Blend Mode
          </label>
          <select
            value={layer.blendMode}
            onChange={(e) =>
              onUpdate(layer.id, { blendMode: e.target.value as BlendMode })
            }
            className="w-full rounded-none border border-neutral-200 bg-white px-2 py-1.5 text-xs dark:border-neutral-700 dark:bg-neutral-900"
          >
            {blendModes.map((mode) => (
              <option key={mode.name} value={mode.name}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        {/* Opacity */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-xs font-medium text-neutral-500">
              Opacity
            </label>
            <span className="font-mono text-xs text-neutral-400">
              {layer.opacity}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={layer.opacity}
            onChange={(e) =>
              onUpdate(layer.id, { opacity: Number(e.target.value) })
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function BlendModeExplorer() {
  // Reference section state
  const [selectedMode, setSelectedMode] = useState<BlendModeInfo>(BLEND_MODES[2]); // multiply
  const [showReference, setShowReference] = useState(true);

  // Playground state
  const [backdrop, setBackdrop] = useState(BACKDROP_PRESETS[0].value);
  const [customBackdrop, setCustomBackdrop] = useState("#3B82F6");
  const [useCustomBackdrop, setUseCustomBackdrop] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [useCustomImage, setUseCustomImage] = useState(false);
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", color: "#ff0000", blendMode: "multiply", opacity: 50 },
  ]);

  // Preset state
  const [expandedPreset, setExpandedPreset] = useState<string | null>(null);
  const [copiedPreset, setCopiedPreset] = useState<string | null>(null);

  // Output state
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("css");

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Active backdrop
  const activeBackdrop = useCustomImage && customImage 
    ? `url(${customImage})` 
    : useCustomBackdrop 
      ? customBackdrop 
      : backdrop;

  // Handle image upload with optimization - outputs a blob URL for performance
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const sourceUrl = URL.createObjectURL(file);

    img.onload = () => {
      // Max size for preview - keeps things snappy
      const MAX_SIZE = 800;
      
      let { width, height } = img;
      
      // Resize if larger than max
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      // Create canvas and resize
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob then create object URL (much more efficient than data URL)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Revoke old image URL if exists
              if (customImage?.startsWith("blob:")) {
                URL.revokeObjectURL(customImage);
              }
              
              const blobUrl = URL.createObjectURL(blob);
              setCustomImage(blobUrl);
              setUseCustomImage(true);
              setUseCustomBackdrop(false);
            }
          },
          "image/jpeg",
          0.8
        );
      }

      // Clean up source
      URL.revokeObjectURL(sourceUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
    };

    img.src = sourceUrl;
  };

  const clearCustomImage = () => {
    // Revoke blob URL to free memory
    if (customImage?.startsWith("blob:")) {
      URL.revokeObjectURL(customImage);
    }
    setCustomImage(null);
    setUseCustomImage(false);
  };

  // Layer management
  const addLayer = () => {
    const newLayer: Layer = {
      id: String(Date.now()),
      color: "#0066ff",
      blendMode: "screen",
      opacity: 50,
    };
    setLayers([...layers, newLayer]);
  };

  const removeLayer = (id: string) => {
    if (layers.length > 1) {
      setLayers(layers.filter((l) => l.id !== id));
    }
  };

  const updateLayer = (id: string, updates: Partial<Layer>) => {
    setLayers(layers.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLayers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const applyPreset = (preset: Preset) => {
    setBackdrop(preset.backdrop);
    setUseCustomBackdrop(false);
    setLayers(
      preset.layers.map((l, i) => ({
        ...l,
        id: String(Date.now() + i),
      }))
    );
    setExpandedPreset(null);
  };

  const getPresetCSS = (preset: Preset) => {
    const layerStyles = preset.layers
      .map(
        (l, i) =>
          `.layer-${i + 1} {
  background-color: ${l.color};
  mix-blend-mode: ${l.blendMode};
  opacity: ${l.opacity / 100};
}`
      )
      .join("\n\n");

    return `/* ${preset.name} - ${preset.description} */

.container {
  position: relative;
  background: ${preset.backdrop};
}

${layerStyles}`;
  };

  const copyPresetCode = (preset: Preset) => {
    navigator.clipboard.writeText(getPresetCSS(preset));
    setCopiedPreset(preset.name);
    setTimeout(() => setCopiedPreset(null), 2000);
  };

  // Code generation
  const generateCSS = () => {
    const layerStyles = layers
      .map(
        (l, i) =>
          `.layer-${i + 1} {
  background-color: ${l.color};
  mix-blend-mode: ${l.blendMode};
  opacity: ${l.opacity / 100};
}`
      )
      .join("\n\n");

    return `/* Container with backdrop */
.blend-container {
  position: relative;
  background: ${activeBackdrop};
}

/* Blend layers (stacked with position: absolute) */
${layerStyles}

/* Alternative: background-blend-mode for single element */
.single-element {
  background: 
    ${layers.map((l) => l.color).join(",\n    ")},
    ${activeBackdrop};
  background-blend-mode: ${layers.map((l) => l.blendMode).join(", ")};
}`;
  };

  const generateTailwind = () => {
    const blendModeMap: Record<BlendMode, string> = {
      normal: "mix-blend-normal",
      multiply: "mix-blend-multiply",
      screen: "mix-blend-screen",
      overlay: "mix-blend-overlay",
      darken: "mix-blend-darken",
      lighten: "mix-blend-lighten",
      "color-dodge": "mix-blend-color-dodge",
      "color-burn": "mix-blend-color-burn",
      "hard-light": "mix-blend-hard-light",
      "soft-light": "mix-blend-soft-light",
      difference: "mix-blend-difference",
      exclusion: "mix-blend-exclusion",
      hue: "mix-blend-hue",
      saturation: "mix-blend-saturation",
      color: "mix-blend-color",
      luminosity: "mix-blend-luminosity",
    };

    const layerClasses = layers
      .map(
        (l, i) =>
          `<!-- Layer ${i + 1} -->
<div class="absolute inset-0 ${blendModeMap[l.blendMode]} bg-[${l.color}] opacity-[${l.opacity / 100}]"></div>`
      )
      .join("\n");

    return `<!-- Container -->
<div class="relative">
  <!-- Backdrop -->
  <div class="bg-gradient-to-br from-[...] to-[...]">
    <!-- Content here -->
  </div>
  
  <!-- Blend Layers -->
${layerClasses}
</div>`;
  };

  const generateSwiftUI = () => {
    const blendModeMap: Record<BlendMode, string> = {
      normal: ".normal",
      multiply: ".multiply",
      screen: ".screen",
      overlay: ".overlay",
      darken: ".darken",
      lighten: ".lighten",
      "color-dodge": ".colorDodge",
      "color-burn": ".colorBurn",
      "hard-light": ".hardLight",
      "soft-light": ".softLight",
      difference: ".difference",
      exclusion: ".exclusion",
      hue: ".hue",
      saturation: ".saturation",
      color: ".color",
      luminosity: ".luminosity",
    };

    const layerViews = layers
      .map((l) => {
        const r = parseInt(l.color.slice(1, 3), 16) / 255;
        const g = parseInt(l.color.slice(3, 5), 16) / 255;
        const b = parseInt(l.color.slice(5, 7), 16) / 255;
        return `        Color(red: ${r.toFixed(2)}, green: ${g.toFixed(2)}, blue: ${b.toFixed(2)})
            .blendMode(${blendModeMap[l.blendMode]})
            .opacity(${(l.opacity / 100).toFixed(2)})`;
      })
      .join("\n        ");

    return `ZStack {
    // Backdrop
    LinearGradient(
        colors: [.red, .orange, .pink],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    // Blend Layers
${layerViews}
}`;
  };

  const generateAndroid = () => {
    const blendModeMap: Record<BlendMode, string> = {
      normal: "BlendMode.SrcOver",
      multiply: "BlendMode.Multiply",
      screen: "BlendMode.Screen",
      overlay: "BlendMode.Overlay",
      darken: "BlendMode.Darken",
      lighten: "BlendMode.Lighten",
      "color-dodge": "BlendMode.ColorDodge",
      "color-burn": "BlendMode.ColorBurn",
      "hard-light": "BlendMode.Hardlight",
      "soft-light": "BlendMode.Softlight",
      difference: "BlendMode.Difference",
      exclusion: "BlendMode.Exclusion",
      hue: "BlendMode.Hue",
      saturation: "BlendMode.Saturation",
      color: "BlendMode.Color",
      luminosity: "BlendMode.Luminosity",
    };

    const layerBoxes = layers
      .map(
        (l) =>
          `        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF${l.color.slice(1).toUpperCase()}))
                .graphicsLayer { 
                    alpha = ${(l.opacity / 100).toFixed(2)}f
                    compositingStrategy = CompositingStrategy.Offscreen
                }
                .drawWithContent {
                    drawContent()
                    drawRect(
                        color = Color(0xFF${l.color.slice(1).toUpperCase()}),
                        blendMode = ${blendModeMap[l.blendMode]}
                    )
                }
        )`
      )
      .join("\n");

    return `// Jetpack Compose with blend modes
Box(modifier = Modifier.fillMaxSize()) {
    // Backdrop
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.linearGradient(
                    colors = listOf(Color.Red, Color.Magenta)
                )
            )
    )
    
    // Blend Layers
${layerBoxes}
}`;
  };

  const getCode = () => {
    switch (outputFormat) {
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
      {/* ================================================================== */}
      {/* Section 1: Blend Mode Reference */}
      {/* ================================================================== */}
      <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <button
          onClick={() => setShowReference(!showReference)}
          className="flex w-full items-center justify-between p-4 text-left sm:p-6"
        >
          <div>
            <h2 className="text-lg font-bold">Blend Mode Reference</h2>
            <p className="text-sm text-neutral-500">
              Learn how each blend mode works with visual examples
            </p>
          </div>
          {showReference ? (
            <ChevronUp className="h-5 w-5 text-neutral-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          )}
        </button>

        {showReference && (
          <div className="border-t border-neutral-200 p-4 dark:border-neutral-800 sm:p-6">
            {/* Category tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    const mode = BLEND_MODES.find((m) => m.category === category);
                    if (mode) setSelectedMode(mode);
                  }}
                  className={clsx(
                    "rounded-none px-3 py-1.5 text-xs font-medium transition-colors",
                    selectedMode.category === category
                      ? "bg-swiss-red text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Mode grid */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-neutral-500">
                  {selectedMode.category} Modes
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {BLEND_MODES.filter((m) => m.category === selectedMode.category).map(
                    (mode) => (
                      <button
                        key={mode.name}
                        onClick={() => setSelectedMode(mode)}
                        className={clsx(
                          "group relative overflow-hidden border-2 p-1 transition-all",
                          selectedMode.name === mode.name
                            ? "border-swiss-red"
                            : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                        )}
                      >
                        {/* Visual preview */}
                        <div className="relative h-16 overflow-hidden rounded bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
                          <div
                            className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-600"
                            style={{
                              mixBlendMode: mode.name,
                            }}
                          />
                        </div>
                        <p className="mt-1 text-center text-xs font-medium">
                          {mode.label}
                        </p>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Selected mode info */}
              <div className="bg-neutral-50 p-4 dark:bg-neutral-950">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{selectedMode.label}</h3>
                    <span className="text-xs text-swiss-red">{selectedMode.category}</span>
                  </div>
                  <Info className="h-5 w-5 text-neutral-400" />
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                      How it works
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {selectedMode.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                      Formula
                    </h4>
                    <pre className="whitespace-pre-wrap rounded bg-neutral-100 p-2 font-mono text-xs text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                      {selectedMode.formula}
                    </pre>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-neutral-700 dark:text-neutral-300">
                      Best used for
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {selectedMode.useCase}
                    </p>
                  </div>
                </div>

                {/* Large preview */}
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-medium uppercase text-neutral-500">
                    Preview
                  </h4>
                  <div className="relative h-32 overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-600"
                      style={{
                        mixBlendMode: selectedMode.name,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded bg-white/90 px-3 py-1 text-sm font-bold text-neutral-900 backdrop-blur-sm">
                        {selectedMode.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* Section 2: Stacking Presets */}
      {/* ================================================================== */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-2 text-lg font-bold">Stacking Presets</h2>
        <p className="mb-4 text-sm text-neutral-500">
          Click to view code and apply to playground
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STACKING_PRESETS.map((preset) => (
            <div
              key={preset.name}
              className={clsx(
                "relative overflow-hidden border transition-all",
                expandedPreset === preset.name
                  ? "border-swiss-red lg:col-span-2 lg:row-span-2"
                  : "border-neutral-200 hover:border-swiss-red dark:border-neutral-700 dark:hover:border-swiss-red"
              )}
            >
              {/* Preview - clickable */}
              <button
                onClick={() => setExpandedPreset(expandedPreset === preset.name ? null : preset.name)}
                className="w-full p-1 text-left"
              >
                <div
                  className={clsx(
                    "relative overflow-hidden rounded",
                    expandedPreset === preset.name ? "h-32" : "h-20"
                  )}
                  style={{ background: preset.backdrop }}
                >
                  {preset.layers.map((layer, i) => (
                    <div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        backgroundColor: layer.color,
                        mixBlendMode: layer.blendMode,
                        opacity: layer.opacity / 100,
                      }}
                    />
                  ))}
                  {/* Mini hero text overlay */}
                  <div className="relative z-10 flex h-full flex-col justify-end p-2">
                    <span className="text-xxs font-bold text-white drop-shadow-lg">
                      Hero Title
                    </span>
                    <span className="text-[8px] text-white/80 drop-shadow">
                      With blend overlay
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-bold">{preset.name}</h3>
                  <p className="text-xs text-neutral-500 line-clamp-1">
                    {preset.description}
                  </p>
                </div>
              </button>

              {/* Expanded view with code */}
              <AnimatePresence>
                {expandedPreset === preset.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="p-3 space-y-3">
                      {/* Layer badges */}
                      <div>
                        <p className="mb-2 text-xs font-medium text-neutral-500">Layers</p>
                        <div className="flex flex-wrap gap-1">
                          {preset.layers.map((layer, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xxs font-medium dark:bg-neutral-800"
                            >
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: layer.color }}
                              />
                              {layer.blendMode} @ {layer.opacity}%
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Code preview */}
                      <div>
                        <p className="mb-2 text-xs font-medium text-neutral-500">CSS</p>
                        <pre className="max-h-32 overflow-auto bg-neutral-50 p-2 font-mono text-xxs text-neutral-600 dark:bg-neutral-950 dark:text-neutral-400">
                          {getPresetCSS(preset)}
                        </pre>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyPresetCode(preset)}
                          className="flex flex-1 items-center justify-center gap-1 bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        >
                          {copiedPreset === preset.name ? (
                            <>
                              <Check className="h-3 w-3 text-green-500" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy CSS
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => applyPreset(preset)}
                          className="flex flex-1 items-center justify-center gap-1 bg-swiss-red px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600"
                        >
                          Apply to Playground
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* Section 3: Interactive Playground */}
      {/* ================================================================== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          {/* Backdrop selection */}
          <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <h2 className="mb-4 text-lg font-bold">Backdrop</h2>

            {/* Gradient presets */}
            <div className="mb-4 flex flex-wrap gap-2">
              {BACKDROP_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setBackdrop(preset.value);
                    setUseCustomBackdrop(false);
                    setUseCustomImage(false);
                  }}
                  className={clsx(
                    "flex items-center gap-2 rounded-none px-3 py-2 text-sm font-medium transition-colors",
                    !useCustomBackdrop && !useCustomImage && backdrop === preset.value
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                  )}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ background: preset.value }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Custom colour */}
            <div className="mb-4 flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useCustomBackdrop}
                  onChange={(e) => {
                    setUseCustomBackdrop(e.target.checked);
                    if (e.target.checked) setUseCustomImage(false);
                  }}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Custom colour
                </span>
              </label>
              {useCustomBackdrop && (
                <input
                  type="color"
                  value={customBackdrop}
                  onChange={(e) => setCustomBackdrop(e.target.value)}
                  className="h-8 w-12 cursor-pointer rounded border border-neutral-200 dark:border-neutral-700"
                />
              )}
            </div>

            {/* Custom image upload */}
            <div className="border border-dashed border-neutral-300 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-950">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                    <ImagePlus className="h-5 w-5 text-neutral-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {customImage ? "Image uploaded" : "Upload an image"}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {customImage ? "Stored in memory only" : "Test blend modes on your own images"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {customImage && (
                    <>
                      <div
                        className="h-10 w-10 shrink-0 border border-neutral-300 dark:border-neutral-600"
                        style={{ 
                          backgroundImage: `url(${customImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {!useCustomImage && (
                        <button
                          onClick={() => setUseCustomImage(true)}
                          className="bg-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          Use
                        </button>
                      )}
                      <button
                        onClick={clearCustomImage}
                        className="p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 dark:hover:bg-neutral-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <label className="cursor-pointer bg-swiss-red px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600">
                    {customImage ? "Replace" : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
              {useCustomImage && customImage && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-swiss-red/10 px-2 py-0.5 text-xs font-medium text-swiss-red">
                    <Check className="h-3 w-3" />
                    Active
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Layer controls */}
          <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Blend Layers</h2>
                <p className="text-xs text-neutral-500">Drag to reorder</p>
              </div>
              <button
                onClick={addLayer}
                className="flex items-center gap-1 rounded-none bg-swiss-red px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600"
              >
                <Plus className="h-3 w-3" />
                Add Layer
              </button>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={layers.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {layers.map((layer, index) => (
                    <SortableLayer
                      key={layer.id}
                      layer={layer}
                      index={index}
                      onUpdate={updateLayer}
                      onRemove={removeLayer}
                      canRemove={layers.length > 1}
                      blendModes={BLEND_MODES}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Live Preview */}
        <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <h2 className="mb-4 text-lg font-bold">Live Preview</h2>
          <p className="mb-4 text-xs text-neutral-500">
            Blend layers applied to the image overlay — a common real-world use case
          </p>

          {/* Hero Section Demo */}
          <div className="overflow-hidden shadow-lg">
            {/* Image with blend overlay */}
            <div
              className="relative h-64 sm:h-80"
              style={
                useCustomImage && customImage
                  ? {
                      backgroundImage: `url(${customImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }
                  : {
                      background: activeBackdrop,
                    }
              }
            >
              {/* Blend overlay layers - this is how blend modes are used in real UI */}
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="absolute inset-0"
                  style={{
                    backgroundColor: layer.color,
                    mixBlendMode: layer.blendMode,
                    opacity: layer.opacity / 100,
                  }}
                />
              ))}

              {/* Content on top of blended image */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <div className="max-w-md">
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    Featured
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
                    Blend Modes in Action
                  </h3>
                  <p className="mb-4 text-sm text-white/90 drop-shadow">
                    Colour overlays with blend modes create striking hero sections, 
                    duotone effects, and branded imagery.
                  </p>
                  <div className="flex gap-3">
                    <button className="bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-lg transition-transform hover:scale-105">
                      Learn More
                    </button>
                    <button className="bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-transform hover:scale-105">
                      View Code
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card section below - showing UI on top */}
            <div className="border-t border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-swiss-red to-orange-400" />
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">Design Engineer</div>
                    <div className="text-xs text-neutral-500">Creating visual effects</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400">
                    <Heart className="h-3 w-3" />
                    128
                  </button>
                  <button className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400">
                    <Bookmark className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Layer stack visualisation */}
          <div className="mt-4 bg-neutral-50 p-3 dark:bg-neutral-950">
            <h3 className="mb-2 text-xs font-medium uppercase text-neutral-500">
              How it works
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <div
                  className="h-6 w-6 border border-neutral-300 dark:border-neutral-600"
                  style={
                    useCustomImage && customImage
                      ? {
                          backgroundImage: `url(${customImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {
                          background: activeBackdrop,
                        }
                  }
                />
                <span className="text-xs text-neutral-500">
                  {useCustomImage && customImage ? "Your image" : "Gradient"}
                </span>
              </div>
              {layers.map((layer, i) => (
                <React.Fragment key={layer.id}>
                  <span className="text-neutral-300">+</span>
                  <div className="flex items-center gap-1">
                    <div
                      className="h-6 w-6 rounded border border-neutral-300 dark:border-neutral-600"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className="text-xs text-neutral-500">
                      {layer.blendMode}
                    </span>
                  </div>
                </React.Fragment>
              ))}
              <span className="text-neutral-300">=</span>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Result</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Section 4: Code Output */}
      {/* ================================================================== */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">Code</h2>
          <div className="relative flex bg-neutral-100 p-1 dark:bg-neutral-800">
            {FORMAT_OPTIONS.map((option) => {
              const isSelected = outputFormat === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setOutputFormat(option.value)}
                  className={clsx(
                    "relative z-10 flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                    isSelected
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="blend-mode-format-indicator"
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
          label={FORMAT_OPTIONS.find((f) => f.value === outputFormat)?.label || ""}
          code={getCode()}
        />
      </div>
    </div>
  );
}
