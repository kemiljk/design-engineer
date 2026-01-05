# Visual Example Generator Guide

This directory contains interactive visual examples used throughout the Design Track course. These examples are small, self-contained React components that demonstrate specific design principles.

## Purpose

The goal is to transform abstract design principles into concrete, visible realities. Students should be able to *see* the difference between good and bad design, or toggle between different states to understand a concept.

## Creating a New Example

### 1. Component Structure

Use the `ExampleWrapper` to ensure consistent styling and layout.

```tsx
"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

export function YourDemoName() {
  const [mode, setMode] = useState<"before" | "after">("before");

  return (
    <ExampleWrapper
      title="Example Title"
      description="Brief description of what this demonstrates"
      controls={
        <ControlGroup label="Mode">
          <ControlButton
            active={mode === "before"}
            onClick={() => setMode("before")}
          >
            Before
          </ControlButton>
          <ControlButton
            active={mode === "after"}
            onClick={() => setMode("after")}
          >
            After
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="p-4 border rounded-lg bg-white dark:bg-neutral-900">
        {/* Your visual demonstration here */}
      </div>
    </ExampleWrapper>
  );
}
```

### 2. Design Guidelines

- **Self-Contained:** Use Tailwind classes for all styling. Avoid external dependencies.
- **Micro-Scale:** Design for a focused area (max width ~600px), not full pages.
- **Realistic Content:** Use "Upgrade to Pro" or specific labels, not "Lorem Ipsum".
- **Contrast:** Show comparisons (Good vs Bad, Weak vs Strong) whenever possible.
- **Accessibility:** Ensure high contrast and semantic HTML.

### 3. File Naming

- Use kebab-case: `your-demo-name.tsx`
- Suffix with `-demo` to distinguish from regular components.
- Place in the appropriate topic folder (e.g., `typography/`, `colour/`, `layout/`).

### 4. Integration

1.  **Create the file:** e.g., `visual-examples/topic/your-demo.tsx`
2.  **Export it:** Add to `visual-examples/topic/index.ts` (if exists) or create one.
3.  **Register it:** Add to `VISUAL_EXAMPLE_MAP` in `visual-examples/visual-example-renderer.tsx`.
4.  **Use it:** Add `<!-- visual-example: your-demo-name -->` in the markdown lesson.

## Directory Structure

- `base/`: Shared components like `ExampleWrapper`
- `design-principles/`: Core principles (Hierarchy, Contrast, etc.)
- `typography/`: Type scale, pairing, etc.
- `colour/`: Palette, contrast, etc.
- `spacing/`: Spacing scales, whitespace
- `layout/`: Grids, responsive layouts
- `motion/`: Animation principles
- `design-tools/`: Tool concepts (Auto Layout, etc.)
- `design-systems/`: Tokens, components
- `ux/`: User-centred thinking patterns
- `foundations/`: Core concepts
- `iconography/`: Icons and images
- `edge-cases/`: Empty states, errors, etc.

