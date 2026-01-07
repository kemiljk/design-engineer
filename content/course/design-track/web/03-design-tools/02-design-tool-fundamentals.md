# Design Tool Fundamentals

> **Quick Summary:** Design tools are where ideas become visual artifacts. Understanding core concepts (not just specific tools) makes you effective across any platform.

## What You'll Learn

- Universal concepts that apply across design tools
- The design tool mental model
- Essential operations and workflows
- How to learn any design tool quickly

## Tool-Agnostic Thinking

> *"The computer is just a tool. It's got the same merit as a pencil, nothing more, nothing less."* — Paula Scher

This lesson focuses on concepts, not specific tools. Whether you use Figma, Sketch, Adobe XD, or Penpot, the fundamentals are the same:

- Frames/artboards contain your designs
- Layers stack elements in z-order
- Shapes and text form your content
- Styles define reusable properties
- Components enable reuse

Once you understand these concepts, switching tools becomes learning new shortcuts, not new paradigms.

## The Canvas Mental Model

Design tools present an infinite canvas where you place design elements.

### Key Concepts

**Canvas:** The workspace. Infinite in most tools, scrollable in all directions.

**Frames (Artboards):** Bounded areas representing screens, components, or areas of focus. Content lives inside frames.

**Layers:** Elements stack. Higher layers appear in front of lower layers.

**Zoom:** You'll constantly zoom in (for detail work) and out (for overall view).

### Working with Frames

Frames are your primary organising structure:
- One frame per screen/page design
- Frames for components
- Frames for sections within pages

Name your frames descriptively:
- `Home - Desktop`
- `Button/Primary`
- `Card - Product`

## Layers and Hierarchy

Every element is a layer. Understanding layer management is essential.

<!-- visual-example: layers-demo -->

### Layer Order

Layers stack from bottom to top. Top layers visually overlap bottom layers.

```text
Layers panel:        Visual result:
─────────────        ─────────────
Button (top)         Button appears in front
Card                 Card behind button  
Background (bottom)  Background behind everything
```

### Layer Organization

**Groups:** Combine related layers. Moving the group moves all children.

**Frames as containers:** Modern tools let frames clip content and have their own properties.

**Naming:** Name every layer. `Rectangle 47` tells you nothing; `Primary Button` is useful.

### Nesting

Frames contain frames. A page might have:
```text
Page
├── Header
│   ├── Logo
│   ├── Navigation
│   └── Profile Menu
├── Main Content
│   ├── Hero
│   └── Features
└── Footer
```

This nesting mirrors both DOM structure and component hierarchy.

## Selection and Manipulation

### Selecting Elements

**Click:** Select one element
**Shift+Click:** Add to selection
**Drag selection:** Select multiple elements in an area
**Deep select:** Click into groups/frames (usually Cmd/Ctrl+Click)

### Moving and Resizing

**Move:** Drag selected elements
**Nudge:** Arrow keys move selection (usually 1px, Shift+Arrow for 10px)
**Resize:** Drag handles on selection
**Constrained resize:** Hold Shift while dragging to maintain proportions

### Alignment

Most tools have alignment options:
- Left/Center/Right align
- Top/Middle/Bottom align
- Distribute horizontally/vertically

Alignment creates clean, intentional layouts.

### Snapping

Elements snap to:
- Other elements' edges
- Guidelines
- Grid lines
- Component spacing

Enable snapping for precision; disable for freedom.

## Shapes and Drawing

### Basic Shapes

- **Rectangle:** Most common for UI. Adjust corner radius for rounded rectangles.
- **Ellipse:** Circles and ovals. Hold Shift for perfect circles.
- **Line:** Strokes between points.
- **Polygon:** Triangles, stars, custom shapes.

### Shape Properties

**Fill:** The inside colour (solid, gradient, or image)
**Stroke:** The outline (colour, weight, style)
**Corner radius:** For rounded corners
**Shadow:** Drop shadow, inner shadow
**Blur:** Gaussian blur, background blur

### Boolean Operations

Combine shapes to create complex forms:
- **Union:** Merge shapes into one
- **Subtract:** Cut one shape from another
- **Intersect:** Keep only the overlap
- **Exclude:** Keep everything except the overlap

## Typography in Tools

### Text Elements

Create text by clicking (point text) or dragging (area text).

**Point text:** Expands as you type. Good for labels, buttons.
**Area text:** Constrained width, text wraps. Good for paragraphs.

### Text Properties

- **Font family and weight**
- **Size**
- **Line height**
- **Letter spacing (tracking)**
- **Paragraph spacing**
- **Alignment** (left, center, right, justify)

### Text Styles

Define reusable text styles:
- Heading 1
- Heading 2
- Body
- Caption

Apply styles consistently; update the style to change all instances.

## Color and Styles

### Color Definition

Colors can be:
- **Solid:** Single colour (hex, RGB, HSL)
- **Gradient:** Transition between colours
- **Image:** Fill with a picture

### Color Styles

Define named colours for reuse:
- `Primary/500`
- `Gray/100`
- `Error/500`

These become your design tokens. When you change the style, all uses update.

### Effects

**Shadow:** Creates depth
- Drop shadow (outside)
- Inner shadow (inside)

**Blur:** Creates softness
- Layer blur (entire element)
- Background blur (blur what's behind)

## Exporting

Design tools create assets for handoff and implementation.

### Export Formats

**PNG:** Raster images, supports transparency
**JPG:** Raster images, no transparency, smaller files
**SVG:** Vector graphics, scalable, ideal for icons
**PDF:** Document format, good for print

### Export Scales

For screen work, export at multiple scales:
- 1× — Standard resolution
- 2× — Retina/high-DPI displays
- 3× — Extra high-DPI (mobile)

### What to Export

- Icons (SVG usually)
- Images that aren't available elsewhere
- Complex graphics that can't be recreated in code

Don't export everything—CSS can recreate most UI elements.

## Keyboard Shortcuts

Learning shortcuts dramatically speeds up design work:

**Universal across most tools:**
- `V` — Move/selection tool
- `R` — Rectangle
- `T` — Text
- `Cmd/Ctrl + D` — Duplicate
- `Cmd/Ctrl + G` — Group
- `Cmd/Ctrl + Z` — Undo
- `Space + drag` — Pan canvas
- `Cmd/Ctrl + scroll` — Zoom

**Learn gradually:** Pick 3-5 shortcuts to practice each week.

## File Organization

### Page Structure

Organize your file into pages:
- Cover/Overview
- Components
- Desktop Designs
- Mobile Designs
- Archive

### Naming Conventions

Establish naming patterns:
- `[Platform] - [Screen] - [State]`
- `Desktop - Home - Logged In`
- `Mobile - Settings - Dark Mode`

### Version Management

- Use built-in version history
- Name significant versions
- Consider branching for major explorations

## Try It Yourself

### Exercise 1: Tool Setup

In your design tool of choice:
1. Create a new file
2. Set up pages: Components, Desktop, Mobile
3. Create frames for three screens (Home, About, Contact)
4. Name them clearly

### Exercise 2: Basic Layout

Create a simple card component:
1. Draw a rectangle (200×250px)
2. Add corner radius (8px)
3. Add shadow
4. Add a placeholder image at top
5. Add title text below
6. Add description text
7. Group everything
8. Name layers properly

### Exercise 3: Styles Practice

Create and apply:
1. Three colour styles (Primary, Secondary, Background)
2. Two text styles (Heading, Body)
3. Apply them to the card from Exercise 2

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "design-tools-quiz",
  "type": "multiple-choice",
  "title": "Design Tool Fundamentals",
  "description": "Check your understanding of core design tool concepts.",
  "difficulty": "easy",
  "question": "What is the recommended format for exporting icons for web use?",
  "options": [
    {
      "id": "a",
      "text": "PNG at 3x scale for high-DPI displays",
      "isCorrect": false,
      "explanation": "PNG is a raster format that doesn't scale cleanly and results in larger file sizes for icons."
    },
    {
      "id": "b",
      "text": "SVG because it's scalable, small, and styleable with CSS",
      "isCorrect": true,
      "explanation": "Correct! SVG is the ideal format for icons. They're vector-based (infinitely scalable), lightweight, and can be styled with CSS."
    },
    {
      "id": "c",
      "text": "JPG for the smallest file size",
      "isCorrect": false,
      "explanation": "JPG doesn't support transparency and uses lossy compression. Not ideal for crisp icons."
    },
    {
      "id": "d",
      "text": "PDF for cross-platform compatibility",
      "isCorrect": false,
      "explanation": "PDF is a document format, not typically used for web UI icons."
    }
  ]
}
-->

## Key Takeaways

- Design tools share common concepts: canvas, frames, layers, shapes, styles
- Frames organise your work and represent screens/components
- Layer management (order, naming, grouping) is essential
- Shapes have properties: fill, stroke, corner radius, shadows
- Create reusable styles for colours, text, and effects
- Learn keyboard shortcuts incrementally
- Organize files with clear naming and page structure

## Next Steps

Continue to [Auto Layout and Constraints](./03-auto-layout-and-constraints.md) →
