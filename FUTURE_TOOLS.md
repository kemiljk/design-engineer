# Future Tool Opportunities

This document tracks proposed tool ideas for the Design Engineer course platform.

## 1. Spring Physics Playground
**Status:** Proposed
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
**Status:** Proposed
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
**Status:** Proposed
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
