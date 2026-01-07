"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type Framework = "react" | "vue" | "svelte" | "angular";

const frameworkInfo = {
  react: {
    name: "React",
    color: "bg-cyan-500",
    textColor: "text-cyan-400",
  },
  vue: {
    name: "Vue",
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
  },
  svelte: {
    name: "Svelte",
    color: "bg-orange-500",
    textColor: "text-orange-400",
  },
  angular: {
    name: "Angular",
    color: "bg-red-500",
    textColor: "text-red-400",
  },
};

const codeExamples: Record<Framework, { code: string; highlights: string[] }> = {
  react: {
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
    highlights: ["useState(0)", "onClick={}", "setCount(count + 1)"],
  },
  vue: {
    code: `<template>
  <button @click="count++">
    Clicked {{ count }} times
  </button>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>`,
    highlights: ["ref(0)", "@click", "{{ count }}"],
  },
  svelte: {
    code: `<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Clicked {count} times
</button>`,
    highlights: ["let count = 0", "on:click", "{count}"],
  },
  angular: {
    code: `@Component({
  template: \`
    <button (click)="increment()">
      Clicked {{ count }} times
    </button>
  \`
})
export class Counter {
  count = 0;
  increment() { this.count++; }
}`,
    highlights: ["count = 0", "(click)", "{{ count }}"],
  },
};

export function FrameworkComparisonDemo() {
  const [framework, setFramework] = useState<Framework>("react");
  const [count, setCount] = useState(0);

  const info = frameworkInfo[framework];
  const example = codeExamples[framework];

  return (
    <ExampleWrapper
      title="The Same Component, Four Ways"
      description="Each framework has its own syntax for state and events—same result, different approaches"
      controls={
        <ControlGroup label="Framework">
          {(Object.keys(frameworkInfo) as Framework[]).map((f) => (
            <ControlButton
              key={f}
              active={framework === f}
              onClick={() => setFramework(f)}
            >
              {frameworkInfo[f].name}
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Preview */}
        <div className="flex flex-col">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Live Preview
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-800">
            <button
              onClick={() => setCount(count + 1)}
              className={`rounded-lg px-6 py-3 font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 ${info.color}`}
            >
              Clicked {count} times
            </button>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              Click to test! (Works identically in all frameworks)
            </p>
          </div>
        </div>

        {/* Code */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {info.name} Code
            </span>
            <span className={`h-2 w-2 rounded-full ${info.color}`} />
          </div>
          <div className="flex-1 overflow-auto rounded-lg bg-neutral-900 p-4">
            <pre className="font-mono text-xs leading-relaxed text-neutral-300 sm:text-sm">
              <code>{example.code}</code>
            </pre>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {example.highlights.map((h, i) => (
              <span
                key={i}
                className={`rounded-full px-2 py-1 text-xs font-mono ${info.color} bg-opacity-20 ${info.textColor}`}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="mt-6 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50">
        <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {info.name} Approach:
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {framework === "react" && "Explicit state with hooks. JSX syntax in JavaScript. You call setCount to update."}
          {framework === "vue" && "Reactive refs that auto-track. HTML templates with directives. Just assign to update."}
          {framework === "svelte" && "Plain JavaScript variables become reactive. Cleanest syntax, compiles away the framework."}
          {framework === "angular" && "Class-based with decorators. Two-way binding available. TypeScript-first design."}
        </p>
      </div>
    </ExampleWrapper>
  );
}
