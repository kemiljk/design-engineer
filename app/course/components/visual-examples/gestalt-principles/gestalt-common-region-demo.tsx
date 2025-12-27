"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type RegionType = "none" | "background" | "border" | "both";

export function GestaltCommonRegionDemo() {
  const [regionType, setRegionType] = useState<RegionType>("background");

  const getGroupStyle = (isGrouped: boolean) => {
    if (!isGrouped) return "";
    
    switch (regionType) {
      case "none":
        return "";
      case "background":
        return "bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg";
      case "border":
        return "border-2 border-neutral-300 dark:border-neutral-600 p-4 rounded-lg";
      case "both":
        return "bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 p-4 rounded-lg";
    }
  };

  const items = [
    { label: "Home", icon: "🏠" },
    { label: "Profile", icon: "👤" },
    { label: "Settings", icon: "⚙️" },
    { label: "Help", icon: "❓" },
    { label: "About", icon: "ℹ️" },
    { label: "Logout", icon: "🚪" },
  ];

  return (
    <ExampleWrapper
      title="Gestalt: Common Region"
      description="Elements within the same bounded area are perceived as a group"
      controls={
        <ControlGroup label="Boundary">
          <ControlButton
            active={regionType === "none"}
            onClick={() => setRegionType("none")}
          >
            None
          </ControlButton>
          <ControlButton
            active={regionType === "background"}
            onClick={() => setRegionType("background")}
          >
            Background
          </ControlButton>
          <ControlButton
            active={regionType === "border"}
            onClick={() => setRegionType("border")}
          >
            Border
          </ControlButton>
          <ControlButton
            active={regionType === "both"}
            onClick={() => setRegionType("both")}
          >
            Both
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex flex-col gap-8">
        {/* Navigation example */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary navigation group */}
          <div
            className={`flex gap-2 ${getGroupStyle(regionType !== "none")}`}
          >
            {items.slice(0, 3).map((item) => (
              <div
                key={item.label}
                className="flex h-12 w-12 flex-col items-center justify-center rounded bg-white shadow-sm dark:bg-neutral-900"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[8px] text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Secondary navigation group */}
          <div
            className={`flex gap-2 ${getGroupStyle(regionType !== "none")}`}
          >
            {items.slice(3).map((item) => (
              <div
                key={item.label}
                className="flex h-12 w-12 flex-col items-center justify-center rounded bg-white shadow-sm dark:bg-neutral-900"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[8px] text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="text-center">
          {regionType === "none" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Without boundaries, all items appear equally related (or unrelated)
            </p>
          )}
          {regionType === "background" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Background colour creates distinct regions that group related items
            </p>
          )}
          {regionType === "border" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Borders explicitly define the boundary of each group
            </p>
          )}
          {regionType === "both" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Combined background and border create the strongest grouping
            </p>
          )}
        </div>

        {/* Card example */}
        <div className="space-y-3">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Card Component Example
          </p>
          <div className="flex justify-center gap-4">
            <div
              className={`flex max-w-[180px] flex-col gap-3 ${
                regionType !== "none" 
                  ? "rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800" 
                  : ""
              }`}
            >
              <div className="h-20 w-full rounded bg-neutral-200 dark:bg-neutral-600" />
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Card Title</h4>
              <p className="text-xs text-neutral-500">Card description text</p>
              <button className="rounded bg-neutral-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900">
                Action
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-neutral-500">
            {regionType !== "none" 
              ? "The card boundary groups image, title, description, and button as one unit"
              : "Without a card boundary, elements feel disconnected"}
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}
