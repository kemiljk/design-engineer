"use client";

import React, { useState, useMemo } from "react";
import { NavArrowRight as ArrowRight, Copy, Check, WarningCircle as AlertCircle } from "iconoir-react";
import { clsx } from "clsx";

type Framework = "react" | "vue" | "svelte" | "astro" | "solid";

const FRAMEWORKS: { value: Framework; label: string; extension: string }[] = [
  { value: "react", label: "React", extension: ".tsx" },
  { value: "vue", label: "Vue", extension: ".vue" },
  { value: "svelte", label: "Svelte", extension: ".svelte" },
  { value: "astro", label: "Astro", extension: ".astro" },
  { value: "solid", label: "Solid", extension: ".tsx" },
];

const EXAMPLE_CODE = `import React, { useState } from 'react';

function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      {count > 10 && <span>High count!</span>}
    </div>
  );
}

export default Counter;`;

export default function FrameworkConverter() {
  const [inputCode, setInputCode] = useState(EXAMPLE_CODE);
  const [sourceFramework, setSourceFramework] = useState<Framework>("react");
  const [targetFramework, setTargetFramework] = useState<Framework>("vue");
  const [copied, setCopied] = useState(false);

  const convertedCode = useMemo(() => {
    return convertCode(inputCode, sourceFramework, targetFramework);
  }, [inputCode, sourceFramework, targetFramework]);

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setSourceFramework(targetFramework);
    setTargetFramework(sourceFramework);
    setInputCode(convertedCode.code);
  };

  return (
    <div className="space-y-6">
      {/* Framework Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-neutral-500">From</label>
          <select
            value={sourceFramework}
            onChange={(e) => setSourceFramework(e.target.value as Framework)}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-900"
          >
            {FRAMEWORKS.map((fw) => (
              <option key={fw.value} value={fw.value}>
                {fw.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="mt-6 rounded-none bg-neutral-100 p-2 text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          title="Swap frameworks"
        >
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-neutral-500">To</label>
          <select
            value={targetFramework}
            onChange={(e) => setTargetFramework(e.target.value as Framework)}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-900"
          >
            {FRAMEWORKS.map((fw) => (
              <option key={fw.value} value={fw.value}>
                {fw.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Code Editors */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {FRAMEWORKS.find((f) => f.value === sourceFramework)?.label} Input
            </span>
            <span className="font-mono text-xs text-neutral-400">
              {FRAMEWORKS.find((f) => f.value === sourceFramework)?.extension}
            </span>
          </div>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="h-64 w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 p-3 font-mono text-[10px] leading-relaxed focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 sm:h-96 sm:p-4 sm:text-xs"
            placeholder="Paste your component code here..."
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {FRAMEWORKS.find((f) => f.value === targetFramework)?.label} Output
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-400">
                {FRAMEWORKS.find((f) => f.value === targetFramework)?.extension}
              </span>
              <button
                onClick={handleCopy}
                className="rounded-md p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="relative h-64 overflow-auto rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950 sm:h-96 sm:p-4">
            <pre className="whitespace-pre-wrap break-all font-mono text-[10px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:whitespace-pre sm:break-normal sm:text-xs">
              {convertedCode.code}
            </pre>
          </div>
        </div>
      </div>

      {/* Warnings/Notes */}
      {convertedCode.warnings.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="space-y-1">
              <h4 className="font-medium text-amber-800 dark:text-amber-200">
                Conversion Notes
              </h4>
              <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                {convertedCode.warnings.map((warning, i) => (
                  <li key={i}>• {warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Supported Patterns */}
      <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h3 className="mb-4 font-bold">Supported Conversions</h3>
        <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h4 className="font-medium text-neutral-600 dark:text-neutral-400">State</h4>
            <ul className="space-y-1 text-neutral-500">
              <li>• useState → ref/reactive</li>
              <li>• createSignal (Solid)</li>
              <li>• $state (Svelte 5)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-neutral-600 dark:text-neutral-400">Events</h4>
            <ul className="space-y-1 text-neutral-500">
              <li>• onClick → @click / on:click</li>
              <li>• onChange → @input / on:input</li>
              <li>• Event handlers</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-neutral-600 dark:text-neutral-400">Templating</h4>
            <ul className="space-y-1 text-neutral-500">
              <li>• Conditional rendering</li>
              <li>• className → class</li>
              <li>• JSX expressions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Conversion Logic
type ConversionResult = {
  code: string;
  warnings: string[];
};

function convertCode(
  input: string,
  source: Framework,
  target: Framework
): ConversionResult {
  if (source === target) {
    return { code: input, warnings: [] };
  }

  const warnings: string[] = [];
  let output = input;

  // Parse React-like code first (common source)
  if (source === "react" || source === "solid") {
    output = convertFromReact(output, target, warnings);
  } else if (source === "vue") {
    output = convertFromVue(output, target, warnings);
  } else if (source === "svelte") {
    output = convertFromSvelte(output, target, warnings);
  } else if (source === "astro") {
    output = convertFromAstro(output, target, warnings);
  }

  return { code: output.trim(), warnings };
}

function convertFromReact(
  input: string,
  target: Framework,
  warnings: string[]
): string {
  let output = input;

  switch (target) {
    case "vue":
      output = reactToVue(output, warnings);
      break;
    case "svelte":
      output = reactToSvelte(output, warnings);
      break;
    case "astro":
      output = reactToAstro(output, warnings);
      break;
    case "solid":
      output = reactToSolid(output, warnings);
      break;
  }

  return output;
}

function reactToVue(input: string, warnings: string[]): string {
  let output = input;

  // Extract component name
  const componentMatch = input.match(/function\s+(\w+)/);
  const componentName = componentMatch?.[1] || "Component";

  // Extract props
  const propsMatch = input.match(/function\s+\w+\s*\(\s*\{([^}]*)\}/);
  const propsStr = propsMatch?.[1] || "";
  const props = propsStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const [name, defaultVal] = p.split("=").map((s) => s.trim());
      return { name, default: defaultVal };
    });

  // Extract useState calls
  const stateMatches = [...input.matchAll(/const\s+\[(\w+),\s*set(\w+)\]\s*=\s*useState\(([^)]*)\)/g)];
  
  // Extract JSX/return content
  const returnMatch = input.match(/return\s*\(([\s\S]*?)\);?\s*\}/);
  let template = returnMatch?.[1] || "";

  // Convert JSX to Vue template
  template = template
    .replace(/className=/g, "class=")
    .replace(/\{(\w+)\}/g, "{{ $1 }}")
    .replace(/onClick=\{[^}]*\}/g, (match) => {
      const handler = match.match(/onClick=\{([^}]*)\}/)?.[1] || "";
      return `@click="${handler.replace(/\(\) => /, "").replace(/set(\w+)\((\w+) \+ 1\)/, "$2++")}"`;
    })
    .replace(/\{(\w+) > (\d+) && (<[^}]+>)\}/g, '<template v-if="$1 > $2">$3</template>');

  // Build Vue SFC
  const propsDefinition = props.length > 0
    ? `defineProps<{\n  ${props.map((p) => `${p.name}?: ${p.default ? "number" : "string"}`).join(";\n  ")};\n}>()`
    : "";

  const stateDefinitions = stateMatches
    .map((m) => `const ${m[1]} = ref(${m[3] || "null"})`)
    .join("\n  ");

  output = `<script setup lang="ts">
${stateMatches.length > 0 ? "import { ref } from 'vue';\n" : ""}
${propsDefinition ? propsDefinition + "\n" : ""}
  ${stateDefinitions}
</script>

<template>
${template.split("\n").map((line) => "  " + line).join("\n")}
</template>`;

  warnings.push("Review reactive state bindings and event handlers");
  warnings.push("Complex expressions may need manual adjustment");

  return output;
}

function reactToSvelte(input: string, warnings: string[]): string {
  let output = input;

  // Extract component name
  const componentMatch = input.match(/function\s+(\w+)/);

  // Extract props
  const propsMatch = input.match(/function\s+\w+\s*\(\s*\{([^}]*)\}/);
  const propsStr = propsMatch?.[1] || "";
  const props = propsStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const [name, defaultVal] = p.split("=").map((s) => s.trim());
      return { name, default: defaultVal };
    });

  // Extract useState calls
  const stateMatches = [...input.matchAll(/const\s+\[(\w+),\s*set(\w+)\]\s*=\s*useState\(([^)]*)\)/g)];

  // Extract JSX/return content
  const returnMatch = input.match(/return\s*\(([\s\S]*?)\);?\s*\}/);
  let template = returnMatch?.[1] || "";

  // Convert JSX to Svelte template
  template = template
    .replace(/className=/g, "class=")
    .replace(/\{(\w+)\}/g, "{$1}")
    .replace(/onClick=\{([^}]*)\}/g, (match, handler) => {
      return `on:click={() => ${handler.replace(/\(\) => /, "")}}`;
    })
    .replace(/\{(\w+) > (\d+) && (<[^}]+>)\}/g, "{#if $1 > $2}$3{/if}");

  // Convert state setters in template
  stateMatches.forEach((m) => {
    const setterName = `set${m[2]}`;
    template = template.replace(
      new RegExp(`${setterName}\\((\\w+) \\+ 1\\)`, "g"),
      `${m[1]}++`
    );
  });

  // Build Svelte component
  const propsDefinition = props
    .map((p) => `  export let ${p.name}${p.default ? ` = ${p.default}` : ""};`)
    .join("\n");

  const stateDefinitions = stateMatches
    .map((m) => `  let ${m[1]} = ${m[3] || "null"};`)
    .join("\n");

  output = `<script lang="ts">
${propsDefinition}
${stateDefinitions}
</script>

${template.trim()}`;

  warnings.push("Event handlers use Svelte's on:event syntax");
  warnings.push("State uses simple let bindings (Svelte 4) - consider $state for Svelte 5");

  return output;
}

function reactToAstro(input: string, warnings: string[]): string {
  let output = input;

  // Extract props
  const propsMatch = input.match(/function\s+\w+\s*\(\s*\{([^}]*)\}/);
  const propsStr = propsMatch?.[1] || "";
  const props = propsStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const [name, defaultVal] = p.split("=").map((s) => s.trim());
      return { name, default: defaultVal };
    });

  // Extract JSX/return content
  const returnMatch = input.match(/return\s*\(([\s\S]*?)\);?\s*\}/);
  let template = returnMatch?.[1] || "";

  // Convert JSX to Astro template (mostly compatible)
  template = template.replace(/className=/g, "class=");

  // Build Astro component
  const propsDefinition = props.length > 0
    ? `interface Props {\n  ${props.map((p) => `${p.name}?: ${p.default ? "number" : "string"}`).join(";\n  ")};\n}\n\nconst { ${props.map((p) => p.default ? `${p.name} = ${p.default}` : p.name).join(", ")} } = Astro.props;`
    : "";

  output = `---
${propsDefinition}
---

${template.trim()}`;

  warnings.push("Astro components are static by default");
  warnings.push("For interactivity, use client:* directives with a framework component");
  warnings.push("useState and other React hooks won't work in Astro frontmatter");

  return output;
}

function reactToSolid(input: string, warnings: string[]): string {
  let output = input;

  // Convert imports
  output = output.replace(
    /import React,?\s*\{?\s*useState\s*\}?\s*from\s*['"]react['"]/,
    "import { createSignal } from 'solid-js'"
  );
  output = output.replace(
    /import\s*\{?\s*useState\s*\}?\s*from\s*['"]react['"]/,
    "import { createSignal } from 'solid-js'"
  );

  // Convert useState to createSignal
  output = output.replace(
    /const\s+\[(\w+),\s*set(\w+)\]\s*=\s*useState\(([^)]*)\)/g,
    "const [$1, set$2] = createSignal($3)"
  );

  // Convert state access to function calls
  const signalMatches = [...output.matchAll(/const\s+\[(\w+),\s*set\w+\]\s*=\s*createSignal/g)];
  signalMatches.forEach((match) => {
    const signalName = match[1];
    // Replace uses in JSX (but not the setter)
    output = output.replace(
      new RegExp(`\\{${signalName}\\}`, "g"),
      `{${signalName}()}`
    );
    output = output.replace(
      new RegExp(`${signalName}(?!\\(|\\s*,)(?=\\s*[>+<])`, "g"),
      `${signalName}()`
    );
  });

  warnings.push("Solid signals are functions - access with signal()");
  warnings.push("Solid uses fine-grained reactivity, no virtual DOM");

  return output;
}

function convertFromVue(
  input: string,
  target: Framework,
  warnings: string[]
): string {
  warnings.push("Vue to other frameworks conversion is simplified");
  warnings.push("Review the output carefully for Vue-specific patterns");

  // Extract script content
  const scriptMatch = input.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  const templateMatch = input.match(/<template>([\s\S]*?)<\/template>/);

  if (!templateMatch) {
    return input;
  }

  let template = templateMatch[1];
  
  // Convert Vue template to JSX-like
  template = template
    .replace(/class=/g, "className=")
    .replace(/@click="([^"]*)"/g, 'onClick={() => $1}')
    .replace(/v-if="([^"]*)"/g, "")
    .replace(/{{\s*(\w+)\s*}}/g, "{$1}");

  if (target === "react") {
    return `import React, { useState } from 'react';

function Component() {
  return (
${template}
  );
}

export default Component;`;
  }

  return input;
}

function convertFromSvelte(
  input: string,
  target: Framework,
  warnings: string[]
): string {
  warnings.push("Svelte to other frameworks conversion is simplified");

  const scriptMatch = input.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  let template = input.replace(/<script[^>]*>[\s\S]*?<\/script>/, "").trim();

  // Convert Svelte template to JSX-like
  template = template
    .replace(/class=/g, "className=")
    .replace(/on:click=\{([^}]*)\}/g, "onClick={$1}")
    .replace(/\{#if ([^}]*)\}([\s\S]*?)\{\/if\}/g, "{$1 && ($2)}");

  if (target === "react") {
    return `import React, { useState } from 'react';

function Component() {
  return (
    ${template}
  );
}

export default Component;`;
  }

  return input;
}

function convertFromAstro(
  input: string,
  target: Framework,
  warnings: string[]
): string {
  warnings.push("Astro to other frameworks conversion is simplified");
  warnings.push("Astro frontmatter logic needs manual conversion");

  // Extract frontmatter and template
  const frontmatterMatch = input.match(/^---\n([\s\S]*?)\n---/);
  let template = input.replace(/^---\n[\s\S]*?\n---/, "").trim();

  // Convert template
  template = template.replace(/class=/g, "className=");

  if (target === "react") {
    return `import React from 'react';

function Component() {
  return (
    ${template}
  );
}

export default Component;`;
  }

  return input;
}
