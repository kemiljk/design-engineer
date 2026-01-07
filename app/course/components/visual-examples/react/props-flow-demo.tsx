"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { ArrowDown, User } from "iconoir-react";

type Variant = "primary" | "secondary" | "outline";
type Size = "small" | "medium" | "large";

export function PropsFlowDemo() {
  const [name, setName] = useState("Alex");
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<Size>("medium");
  const [showIcon, setShowIcon] = useState(true);

  const sizeClasses = {
    small: "h-8 px-3 text-xs",
    medium: "h-10 px-4 text-sm",
    large: "h-12 px-6 text-base",
  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  };

  return (
    <ExampleWrapper
      title="Props Flow: Parent → Child"
      description="Change props in the parent and watch how the child component updates"
      controls={
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-neutral-500">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-24 rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-600 dark:bg-neutral-800"
            />
          </div>
          <ControlGroup label="Variant">
            {(["primary", "secondary", "outline"] as Variant[]).map((v) => (
              <ControlButton key={v} active={variant === v} onClick={() => setVariant(v)}>
                {v}
              </ControlButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Size">
            {(["small", "medium", "large"] as Size[]).map((s) => (
              <ControlButton key={s} active={size === s} onClick={() => setSize(s)}>
                {s[0].toUpperCase()}
              </ControlButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Icon">
            <ControlButton active={showIcon} onClick={() => setShowIcon(!showIcon)}>
              {showIcon ? "On" : "Off"}
            </ControlButton>
          </ControlGroup>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Code View */}
        <div className="flex flex-col">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Parent Component (You)
          </div>
          <div className="overflow-x-auto rounded-lg bg-neutral-900 p-4">
            <pre className="font-mono text-xs leading-relaxed sm:text-sm">
              <code>
                <span className="text-pink-400">&lt;UserButton</span>
                {"\n"}
                <span className="text-blue-300">  name</span>
                <span className="text-white">=</span>
                <span className="text-green-300">&quot;{name}&quot;</span>
                {"\n"}
                <span className="text-blue-300">  variant</span>
                <span className="text-white">=</span>
                <span className="text-green-300">&quot;{variant}&quot;</span>
                {"\n"}
                <span className="text-blue-300">  size</span>
                <span className="text-white">=</span>
                <span className="text-green-300">&quot;{size}&quot;</span>
                {"\n"}
                <span className="text-blue-300">  showIcon</span>
                <span className="text-white">=</span>
                <span className="text-yellow-300">{`{${showIcon}}`}</span>
                {"\n"}
                <span className="text-pink-400">/&gt;</span>
              </code>
            </pre>
          </div>

          {/* Arrow */}
          <div className="flex justify-center py-3">
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs text-neutral-400">Props flow down</span>
              <ArrowDown className="h-6 w-6 animate-bounce text-blue-500" />
            </div>
          </div>

          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Child Component (Receives Props)
          </div>
          <div className="overflow-x-auto rounded-lg bg-neutral-900 p-4">
            <pre className="font-mono text-xs leading-relaxed text-neutral-400 sm:text-sm">
              <code>
                <span className="text-purple-400">function</span>
                <span className="text-yellow-300"> UserButton</span>
                <span className="text-white">({"{"}</span>
                {"\n"}
                <span className="text-orange-300">  name, variant, size, showIcon</span>
                {"\n"}
                <span className="text-white">{"}"}) {"{"}</span>
                {"\n"}
                <span className="text-purple-400">  return</span>
                <span className="text-white"> (</span>
                {"\n"}
                <span className="text-pink-400">    &lt;button&gt;</span>
                {"\n"}
                <span className="text-white">      </span>
                <span className="text-neutral-500">{"// Uses props to render"}</span>
                {"\n"}
                <span className="text-pink-400">    &lt;/button&gt;</span>
                {"\n"}
                <span className="text-white">  );</span>
                {"\n"}
                <span className="text-white">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex flex-col">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Rendered Result
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-800">
            <button
              className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all ${sizeClasses[size]} ${variantClasses[variant]}`}
            >
              {showIcon && <User className="h-4 w-4" />}
              <span>Hello, {name || "..."}</span>
            </button>

            <div className="mt-6 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700">
              <p className="text-center text-xs text-neutral-600 dark:text-neutral-300">
                The button receives <strong>name</strong>, <strong>variant</strong>, <strong>size</strong>, and <strong>showIcon</strong> as props and renders accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
