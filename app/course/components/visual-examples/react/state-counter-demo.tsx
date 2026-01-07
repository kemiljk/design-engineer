"use client";

import React, { useState } from "react";
import { ExampleWrapper } from "../base/example-wrapper";
import { Plus, Minus, RefreshDouble } from "iconoir-react";

export function StateCounterDemo() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1);
  const [history, setHistory] = useState<{ action: string; value: number }[]>([
    { action: "Initial render", value: 0 },
  ]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setRenderCount((r) => r + 1);
    setHistory((h) => [...h.slice(-4), { action: "increment", value: newCount }]);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setRenderCount((r) => r + 1);
    setHistory((h) => [...h.slice(-4), { action: "decrement", value: newCount }]);
  };

  const reset = () => {
    setCount(0);
    setRenderCount((r) => r + 1);
    setHistory((h) => [...h.slice(-4), { action: "reset", value: 0 }]);
  };

  return (
    <ExampleWrapper
      title="State in Action"
      description="Watch how state changes trigger re-renders and update the UI"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Interactive Counter */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="mb-6 text-center">
            <div className="text-6xl font-bold tabular-nums text-neutral-900 dark:text-white">
              {count}
            </div>
            <div className="mt-2 text-sm text-neutral-500">Current count</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={decrement}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
              <Minus className="h-5 w-5" />
            </button>
            <button
              onClick={increment}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
            >
              <Plus className="h-6 w-6" />
            </button>
            <button
              onClick={reset}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
              <RefreshDouble className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 dark:bg-amber-900/30">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
              Re-renders: {renderCount}
            </span>
          </div>
        </div>

        {/* Code + History */}
        <div className="flex flex-col gap-4">
          {/* Code */}
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              The Code
            </div>
            <div className="overflow-x-auto rounded-lg bg-neutral-900 p-4">
              <pre className="font-mono text-xs leading-relaxed sm:text-sm">
                <code>
                  <span className="text-purple-400">const</span>
                  <span className="text-white"> [</span>
                  <span className="text-blue-300">count</span>
                  <span className="text-white">, </span>
                  <span className="text-yellow-300">setCount</span>
                  <span className="text-white">] = </span>
                  <span className="text-green-300">useState</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">0</span>
                  <span className="text-white">);</span>
                  {"\n\n"}
                  <span className="text-neutral-500">{"// Current value:"}</span>
                  {"\n"}
                  <span className="text-blue-300">count</span>
                  <span className="text-white"> = </span>
                  <span className="text-orange-300">{count}</span>
                  {"\n\n"}
                  <span className="text-neutral-500">{"// To update:"}</span>
                  {"\n"}
                  <span className="text-yellow-300">setCount</span>
                  <span className="text-white">(</span>
                  <span className="text-blue-300">count</span>
                  <span className="text-white"> + </span>
                  <span className="text-orange-300">1</span>
                  <span className="text-white">)</span>
                </code>
              </pre>
            </div>
          </div>

          {/* State History */}
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              State History
            </div>
            <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <div className="flex flex-col gap-1">
                {history.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded px-2 py-1 text-xs ${
                      i === history.length - 1
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : ""
                    }`}
                  >
                    <span className="font-mono text-neutral-600 dark:text-neutral-400">
                      {entry.action}
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      → {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <p className="text-xs text-green-800 dark:text-green-200">
              <strong>Key insight:</strong> When you call <code className="rounded bg-green-200 px-1 dark:bg-green-800">setCount</code>, React re-renders the component with the new value. The UI automatically updates!
            </p>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
