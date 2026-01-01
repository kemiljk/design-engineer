"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

type Platform = "css" | "tailwind" | "swift" | "android";

type AspectRatio = {
  w: number;
  h: number;
  label: string;
};

const PRESETS: AspectRatio[] = [
  { w: 16, h: 9, label: "16:9 (Video)" },
  { w: 4, h: 3, label: "4:3 (Classic)" },
  { w: 1, h: 1, label: "1:1 (Square)" },
  { w: 9, h: 16, label: "9:16 (Social)" },
  { w: 21, h: 9, label: "21:9 (Ultrawide)" },
  { w: 3, h: 2, label: "3:2 (Photo)" },
];

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "css", label: "CSS" },
  { value: "tailwind", label: "Tailwind" },
  { value: "swift", label: "SwiftUI" },
  { value: "android", label: "Android" },
];

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [ratioW, setRatioW] = useState<number>(16);
  const [ratioH, setRatioH] = useState<number>(9);
  const [platform, setPlatform] = useState<Platform>("css");

  const calculateMissing = (target: "w" | "h", value: number) => {
    if (target === "w") {
      setWidth(value);
      setHeight(Math.round(value * (ratioH / ratioW)));
    } else {
      setHeight(value);
      setWidth(Math.round(value * (ratioW / ratioH)));
    }
  };

  const applyPreset = (preset: AspectRatio) => {
    setRatioW(preset.w);
    setRatioH(preset.h);
    setHeight(Math.round(width * (preset.h / preset.w)));
  };

  // Generate code for each platform
  const generateCSS = () => {
    return `.container {
  aspect-ratio: ${ratioW} / ${ratioH};
  width: 100%;
  /* Or fixed dimensions */
  /* width: ${width}px; */
  /* height: ${height}px; */
}

/* Fallback for older browsers */
.container-fallback {
  position: relative;
  width: 100%;
  padding-bottom: ${((ratioH / ratioW) * 100).toFixed(2)}%;
}

.container-fallback > * {
  position: absolute;
  inset: 0;
}`;
  };

  const generateTailwind = () => {
    return `/* Tailwind v4 @theme */
@theme {
  --aspect-ratio-custom: ${ratioW} / ${ratioH};
}

/* Usage */
<div class="aspect-custom">...</div>

/* Or arbitrary value */
<div class="aspect-[${ratioW}/${ratioH}]">...</div>

/* Common ratios built-in */
<div class="aspect-video">...</div>  /* 16/9 */
<div class="aspect-square">...</div> /* 1/1 */`;
  };

  const generateSwiftUI = () => {
    const ratio = ratioW / ratioH;
    return `// SwiftUI AspectRatio
Image("photo")
    .resizable()
    .aspectRatio(${ratio.toFixed(4)}, contentMode: .fit)

// Or with frame
Image("photo")
    .resizable()
    .aspectRatio(contentMode: .fill)
    .frame(width: ${width}, height: ${height})
    .clipped()

// Custom aspect ratio container
struct AspectRatioContainer<Content: View>: View {
    let ratio: CGFloat = ${ratio.toFixed(4)}
    let content: Content
    
    var body: some View {
        GeometryReader { geometry in
            content
                .frame(
                    width: geometry.size.width,
                    height: geometry.size.width / ratio
                )
        }
    }
}`;
  };

  const generateAndroid = () => {
    return `<!-- XML Layout with ConstraintLayout -->
<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
    
    <ImageView
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintDimensionRatio="${ratioW}:${ratioH}"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
        
</androidx.constraintlayout.widget.ConstraintLayout>

/* Jetpack Compose */
Image(
    painter = painterResource(id = R.drawable.photo),
    contentDescription = null,
    modifier = Modifier
        .fillMaxWidth()
        .aspectRatio(${(ratioW / ratioH).toFixed(4)}f),
    contentScale = ContentScale.Crop
)`;
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
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-6 border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-8 sm:p-6">
        <div>
          <h2 className="mb-4 text-lg font-bold">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset)}
                className={clsx(
                  "rounded-none px-4 py-2 text-sm font-medium transition-colors",
                  ratioW === preset.w && ratioH === preset.h
                    ? "bg-swiss-red text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-neutral-50 p-4 dark:bg-neutral-950">
             <div className="flex-1 space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500">Ratio Width</label>
                <input 
                    type="number" 
                    value={ratioW}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setRatioW(val);
                        setHeight(Math.round(width * (ratioH / val)));
                    }}
                    className="w-full bg-transparent text-xl font-bold outline-none"
                />
             </div>
             <span className="text-xl font-bold text-neutral-300">:</span>
             <div className="flex-1 space-y-2 text-right">
                <label className="text-xs font-bold uppercase text-neutral-500">Ratio Height</label>
                 <input 
                    type="number" 
                    value={ratioH}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setRatioH(val);
                        setHeight(Math.round(width * (val / ratioW)));
                    }}
                    className="w-full bg-transparent text-xl font-bold outline-none text-right"
                />
             </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => calculateMissing("w", Number(e.target.value))}
                className="w-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => calculateMissing("h", Number(e.target.value))}
                className="w-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold">Code</h2>
            <div className="relative flex bg-neutral-100 p-1 dark:bg-neutral-800">
              {PLATFORM_OPTIONS.map((option) => {
                const isSelected = platform === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setPlatform(option.value)}
                    className={clsx(
                      "relative z-10 flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                      isSelected
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="aspect-ratio-platform-indicator"
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
          <CodeBlock label={PLATFORM_OPTIONS.find((p) => p.value === platform)?.label || ""} code={getCode()} />
        </div>
      </div>

      {/* Visualiser */}
      <div className="flex items-center justify-center border border-neutral-200 bg-neutral-100 p-8 dark:border-neutral-800 dark:bg-neutral-900">
         <div 
            className="flex items-center justify-center bg-swiss-red text-white shadow-lg transition-all duration-300"
            style={{
                aspectRatio: `${ratioW}/${ratioH}`,
                width: ratioW >= ratioH ? '100%' : 'auto',
                height: ratioH > ratioW ? '100%' : 'auto',
                maxWidth: '100%',
                maxHeight: '400px'
            }}
         >
            <div className="text-center">
                <div className="text-2xl font-bold">{width} × {height}</div>
                <div className="text-sm opacity-80">{ratioW}:{ratioH}</div>
            </div>
         </div>
      </div>
    </div>
  );
}
