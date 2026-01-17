"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";

export function LayersDemo() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const layers = [
    { id: "text", name: "Text Layer", color: "bg-swiss-red", zIndex: 30, offset: { x: 40, y: 40 } },
    { id: "image", name: "Image", color: "bg-neutral-500", zIndex: 20, offset: { x: 20, y: 20 } },
    { id: "bg", name: "Background", color: "bg-neutral-200 dark:bg-neutral-700", zIndex: 10, offset: { x: 0, y: 0 } },
  ];

  return (
    <ExampleWrapper
      title="Layers & Stacking"
      description="Visualise how elements stack on top of each other (z-index)"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-8">
        
        {/* The visual representation */}
        <div className="relative w-64 h-64 perspective-1000 group">
          <div className="relative w-full h-full transform-style-3d group-hover:rotate-y-[-20deg] group-hover:rotate-x-20 transition-transform duration-500 ease-out">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={cn(
                  "absolute w-40 h-40 rounded-none shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300",
                  layer.color,
                  activeLayer === layer.id ? "scale-105 ring-4 ring-black dark:ring-white z-50" : ""
                )}
                style={{
                  top: "20%",
                  left: "20%",
                  transform: `translate(${layer.offset.x}px, ${layer.offset.y}px) translateZ(${layer.zIndex * 2}px)`,
                  zIndex: layer.zIndex
                }}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
              >
                <span className="font-bold text-white drop-shadow-md text-sm">{layer.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Layer List (Design Tool UI) */}
        <div className="w-64 bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
          <div className="px-3 py-2 border-b border-neutral-100 text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:border-neutral-800">
            Layers Panel
          </div>
          <div className="flex flex-col">
            {layers.slice().reverse().map((layer) => (
              <div
                key={layer.id}
                className={cn(
                  "px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors border-l-2",
                  activeLayer === layer.id 
                    ? "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400" 
                    : "border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800"
                )}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
              >
                <div className={cn("w-3 h-3 rounded-full", layer.color)}></div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{layer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-neutral-400 mt-4">
        Hover over the layers list or the visual elements to see the relationship.
      </p>
    </ExampleWrapper>
  );
}

