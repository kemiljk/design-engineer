# Future Tool Opportunities

This document tracks proposed tool ideas for the Design Engineer course platform.

## 1. Spring Physics Playground
**Status:** Implemented
**Goal:** Help design engineers bridge the gap between "feel" and "code" for animations.

### Description
A highly interactive visualizer where users can experiment with spring physics parameters.

### Key Features
- **Visual Controls:** Sliders for `mass`, `stiffness`, and `damping`.
- **Real-time Preview:** A simple object (ball/box) that animates based on the settings.
- **Code Export:** One-click copy for:
  - Framer Motion (`type: "spring"`)
  - CSS (Linear easing approximation if possible, or keyframes)
  - Swift/SwiftUI (`spring()`)
- **Presets:** "Bouncy", "Snappy", "Gentle" presets to get started quickly.

### Alignment with Course Content
Directly supports lessons on:
- `ios-spring-animation`
- `material-motion-system`
- `easing-curves`

---

## 2. Accessibility & Contrast Auditor (AI-Powered)
**Status:** Implemented
**Goal:** Provide instant feedback on component accessibility and semantic structure.

### Description
An AI-assisted tool where users paste a code snippet (React/HTML) and receive an accessibility audit.

### Key Features
- **Code Input:** Text area for pasting component code.
- **Automated Analysis:**
  - Check for semantic HTML usage (avoiding `div` soup).
  - Verify `aria-label` and `role` attributes where needed.
  - Identify potential contrast issues (if colors are hardcoded).
- **"Fix It" Mode:** Button to generate a corrected version of the code.
- **Educational Output:** Explains *why* a change was made (e.g., "Added `type='button'` to prevent form submission").

### Alignment with Course Content
Supports lessons on:
- `contrast-ratio`
- `focus-order`
- `android-accessibility-focus` / `ios-accessibility-focus`

---

## 3. Design Token Calculator
**Status:** Implemented
**Goal:** Streamline the creation of consistent, scalable design systems.

### Description
A utility for generating harmonious spacing and typography scales based on a base value.

### Key Features
- **Inputs:** Base size (e.g., 16px) and Scale Ratio (e.g., Major Third - 1.25).
- **Outputs:**
  - **Type Scale:** Calculated `rem`/`px` values for h1-h6 and body text.
  - **Spacing Scale:** A consistent spacing system (4px, 8px, 12px, etc.).
- **Export Formats:**
  - Tailwind Config (`theme.extend.fontSize`...)
  - CSS Variables (`--space-sm`, `--space-md`...)
  - SCSS Map

### Alignment with Course Content
Supports lessons on:
- `spacing-scale`
- `type-scale`
- `token-hierarchy`

---

## 4. Easing Curve Generator
**Status:** Implemented
**Goal:** Visualize and create custom cubic-bezier curves.

### Description
A tool to manipulate control points for cubic-bezier functions and visualize the resulting animation curve.

### Key Features
- **Visual Graph:** Drag handles to adjust the curve.
- **Presets:** Common easings like ease-in, ease-out, etc.
- **Preview:** Moving ball to demonstrate the timing function.
- **Export:** Copy `cubic-bezier(...)` CSS/Framer string.

---

## 5. Aspect Ratio Calculator
**Status:** Implemented
**Goal:** Simplify calculations for responsive media containers.

### Description
A calculator to find missing dimensions or generate aspect-ratio CSS.

### Key Features
- **Dimension Calc:** Input width/height to get ratio, or width+ratio to get height.
- **Visualizer:** A box that resizes to show the aspect ratio.
- **Presets:** 16:9, 4:3, 1:1, etc.
