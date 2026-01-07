"use client";

import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type HookType = "useState" | "useRef" | "useMemo" | "useCallback";

const hookInfo: Record<HookType, { 
  description: string; 
  useCase: string;
  triggerRerender: boolean;
}> = {
  useState: {
    description: "Stores state that triggers re-renders when changed",
    useCase: "Counter values, form inputs, toggle states",
    triggerRerender: true,
  },
  useRef: {
    description: "Stores mutable values that persist without re-renders",
    useCase: "DOM refs, interval IDs, previous values",
    triggerRerender: false,
  },
  useMemo: {
    description: "Caches expensive calculations between renders",
    useCase: "Filtering large arrays, complex computations",
    triggerRerender: false,
  },
  useCallback: {
    description: "Caches function references between renders",
    useCase: "Event handlers passed to optimized children",
    triggerRerender: false,
  },
};

export function HooksComparisonDemo() {
  const [selectedHook, setSelectedHook] = useState<HookType>("useState");
  const [renderCount, setRenderCount] = useState(0);

  // useState example
  const [count, setCount] = useState(0);

  // useRef example  
  const clickCountRef = useRef(0);
  const [refDisplay, setRefDisplay] = useState(0);

  // useMemo example
  const [numbers] = useState(() => Array.from({ length: 1000 }, (_, i) => i));
  const [filterThreshold, setFilterThreshold] = useState(500);
  const filteredNumbers = useMemo(() => {
    return numbers.filter(n => n > filterThreshold);
  }, [numbers, filterThreshold]);

  // useCallback example
  const [callbackCount, setCallbackCount] = useState(0);
  const handleClick = useCallback(() => {
    setCallbackCount(c => c + 1);
  }, []);

  // Track renders - using a ref to avoid infinite loop
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  
  // Sync to state only when hook selection changes
  useEffect(() => {
    setRenderCount(renderCountRef.current);
  }, [selectedHook, count, callbackCount, filterThreshold, refDisplay]);

  const info = hookInfo[selectedHook];

  return (
    <ExampleWrapper
      title="React Hooks Comparison"
      description="Understanding when each hook triggers re-renders"
      controls={
        <ControlGroup label="Hook">
          {(Object.keys(hookInfo) as HookType[]).map((h) => (
            <ControlButton
              key={h}
              active={selectedHook === h}
              onClick={() => setSelectedHook(h)}
            >
              {h}
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Interactive Demo */}
        <div className="flex flex-col">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Interactive Demo
          </div>
          <div className="flex flex-1 flex-col rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
            {selectedHook === "useState" && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                  {count}
                </div>
                <button
                  onClick={() => setCount(c => c + 1)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Increment (triggers re-render)
                </button>
                <p className="text-center text-xs text-neutral-500">
                  Each click updates state → component re-renders
                </p>
              </div>
            )}

            {selectedHook === "useRef" && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                  {refDisplay}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      clickCountRef.current += 1;
                    }}
                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                  >
                    Update Ref (no re-render)
                  </button>
                  <button
                    onClick={() => setRefDisplay(clickCountRef.current)}
                    className="rounded-lg bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200"
                  >
                    Show Value
                  </button>
                </div>
                <p className="text-center text-xs text-neutral-500">
                  Ref updates silently. Click &quot;Show Value&quot; to see it.
                  <br />
                  Current ref value: {clickCountRef.current}
                </p>
              </div>
            )}

            {selectedHook === "useMemo" && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  Filtering 1000 numbers &gt; {filterThreshold}
                </div>
                <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                  {filteredNumbers.length} results
                </div>
                <input
                  type="range"
                  min="0"
                  max="999"
                  value={filterThreshold}
                  onChange={(e) => setFilterThreshold(Number(e.target.value))}
                  className="w-48"
                />
                <p className="text-center text-xs text-neutral-500">
                  Filter recalculates only when threshold changes
                </p>
              </div>
            )}

            {selectedHook === "useCallback" && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                  {callbackCount}
                </div>
                <button
                  onClick={handleClick}
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                >
                  Cached Click Handler
                </button>
                <p className="text-center text-xs text-neutral-500">
                  Same function reference across renders.
                  <br />
                  Useful for optimized child components.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-4">
          {/* Code */}
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Syntax
            </div>
            <div className="overflow-x-auto rounded-lg bg-neutral-900 p-4">
              <pre className="font-mono text-xs sm:text-sm">
                <code className="text-neutral-300">
                  {selectedHook === "useState" && (
                    <>
                      <span className="text-purple-400">const</span>
                      <span className="text-white"> [value, setValue] = </span>
                      <span className="text-green-300">useState</span>
                      <span className="text-white">(initialValue);</span>
                    </>
                  )}
                  {selectedHook === "useRef" && (
                    <>
                      <span className="text-purple-400">const</span>
                      <span className="text-white"> ref = </span>
                      <span className="text-green-300">useRef</span>
                      <span className="text-white">(initialValue);</span>
                      {"\n"}
                      <span className="text-neutral-500">{"// Access: ref.current"}</span>
                    </>
                  )}
                  {selectedHook === "useMemo" && (
                    <>
                      <span className="text-purple-400">const</span>
                      <span className="text-white"> value = </span>
                      <span className="text-green-300">useMemo</span>
                      <span className="text-white">{"(() => {"}</span>
                      {"\n"}
                      <span className="text-white">  </span>
                      <span className="text-purple-400">return</span>
                      <span className="text-white"> expensiveCalculation();</span>
                      {"\n"}
                      <span className="text-white">{"}, [deps]);"}</span>
                    </>
                  )}
                  {selectedHook === "useCallback" && (
                    <>
                      <span className="text-purple-400">const</span>
                      <span className="text-white"> fn = </span>
                      <span className="text-green-300">useCallback</span>
                      <span className="text-white">{"(() => {"}</span>
                      {"\n"}
                      <span className="text-white">  doSomething();</span>
                      {"\n"}
                      <span className="text-white">{"}, [deps]);"}</span>
                    </>
                  )}
                </code>
              </pre>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
            <div className="mb-2 font-medium text-neutral-900 dark:text-white">
              {selectedHook}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {info.description}
            </p>
            <div className="mt-3 text-xs text-neutral-500">
              <strong>Common use cases:</strong> {info.useCase}
            </div>
          </div>

          {/* Re-render indicator */}
          <div className={`rounded-lg p-3 ${
            info.triggerRerender 
              ? "bg-blue-50 dark:bg-blue-900/20" 
              : "bg-green-50 dark:bg-green-900/20"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                info.triggerRerender 
                  ? "text-blue-700 dark:text-blue-300" 
                  : "text-green-700 dark:text-green-300"
              }`}>
                {info.triggerRerender ? "✓ Triggers re-render" : "✗ No re-render"}
              </span>
              <span className="text-xs text-neutral-500">
                Total renders: {renderCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
