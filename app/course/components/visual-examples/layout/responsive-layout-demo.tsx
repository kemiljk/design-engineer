"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { Computer as Monitor, MacOsWindow as Tablet, SmartphoneDevice as Smartphone } from "iconoir-react";

type Viewport = "mobile" | "tablet" | "desktop";

const viewports: { value: Viewport; label: string; icon: React.ReactNode; width: number }[] = [
  { value: "mobile", label: "Mobile", icon: <Smartphone className="h-4 w-4" />, width: 320 },
  { value: "tablet", label: "Tablet", icon: <Tablet className="h-4 w-4" />, width: 768 },
  { value: "desktop", label: "Desktop", icon: <Monitor className="h-4 w-4" />, width: 1024 },
];

export function ResponsiveLayoutDemo() {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const currentViewport = viewports.find((v) => v.value === viewport)!;

  const getGridColumns = () => {
    switch (viewport) {
      case "mobile":
        return 1;
      case "tablet":
        return 2;
      case "desktop":
        return 3;
    }
  };

  const getNavLayout = () => {
    switch (viewport) {
      case "mobile":
        return "collapsed";
      case "tablet":
      case "desktop":
        return "expanded";
    }
  };

  return (
    <ExampleWrapper
      title="Responsive Layout"
      description="See how layouts adapt across different screen sizes"
      controls={
        <ControlGroup label="Viewport">
          {viewports.map((v) => (
            <ControlButton
              key={v.value}
              active={viewport === v.value}
              onClick={() => setViewport(v.value)}
            >
              <span className="flex items-center gap-2">
                {v.icon}
                {v.label}
              </span>
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <div className="flex justify-center">
        {/* Device frame */}
        <div
          className="overflow-hidden rounded-lg border-4 border-neutral-800 bg-neutral-800 dark:border-neutral-300"
          style={{ width: Math.min(currentViewport.width, 800) }}
        >
          {/* Screen */}
          <div className="overflow-hidden bg-white dark:bg-neutral-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
              <div className="h-6 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
              {getNavLayout() === "expanded" ? (
                <div className="flex gap-3">
                  <div className="h-4 w-12 rounded bg-neutral-100 dark:bg-neutral-600" />
                  <div className="h-4 w-12 rounded bg-neutral-100 dark:bg-neutral-600" />
                  <div className="h-4 w-12 rounded bg-neutral-100 dark:bg-neutral-600" />
                </div>
              ) : (
                <div className="h-6 w-6 rounded bg-neutral-200 dark:bg-neutral-700" />
              )}
            </div>

            {/* Content */}
            <div
              className="p-4"
              style={{ minHeight: 300 }}
            >
              {/* Hero */}
              <div className="mb-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
                <div
                  className="h-4 rounded bg-neutral-300 dark:bg-neutral-600"
                  style={{ width: viewport === "mobile" ? "100%" : "60%" }}
                />
                <div
                  className="mt-2 h-3 rounded bg-neutral-200 dark:bg-neutral-700"
                  style={{ width: viewport === "mobile" ? "100%" : "40%" }}
                />
              </div>

              {/* Card grid */}
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)` }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <div className="mb-2 aspect-video rounded bg-neutral-100 dark:bg-neutral-700" />
                    <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-600" />
                    <div className="mt-1 h-2 w-1/2 rounded bg-neutral-100 dark:bg-neutral-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakpoint info */}
      <div className="mt-4 flex justify-center gap-4">
        {viewports.map((v) => (
          <div
            key={v.value}
            className={`rounded px-3 py-1 text-xs ${
              viewport === v.value
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800"
            }`}
          >
            {v.label}: {v.width}px
          </div>
        ))}
      </div>

      {/* Insight */}
      <div className="mt-4 text-center">
        <p className="text-xs text-neutral-500">
          {viewport === "mobile" && "Mobile: Single column, collapsed navigation, stacked content"}
          {viewport === "tablet" && "Tablet: Two columns, expanded navigation, balanced layout"}
          {viewport === "desktop" && "Desktop: Three columns, full navigation, maximum information density"}
        </p>
      </div>
    </ExampleWrapper>
  );
}
