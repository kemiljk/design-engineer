# Design Tool Fundamentals

> **Quick Summary:** Design tools are where ideas become visual artifacts. Understanding core concepts (not just specific tools) makes you effective across any platform.

## What You'll Learn

- Universal concepts that apply across design tools
- The design tool mental model
- Essential operations and workflows
- How to learn any design tool quickly

## Tool-Agnostic Thinking

> *"The computer is just a tool. It's got the same merit as a pencil, nothing more, nothing less."* — Paula Scher

It doesn't matter if you use Figma, Sketch, Adobe XD, or Penpot. They all operate on the same fundamental principles. If you learn the *concepts*, you can switch tools in a weekend. If you only memorize shortcuts, you're trapped.

The core mental model of digital design is: **Objects on a Canvas.**

## The Canvas Mental Model

Imagine a massive, infinite desk. You can put pieces of paper (Frames) on it. You can draw on the papers, or draw directly on the desk. You can stack papers on top of each other. This is your workspace.

**Infinite Canvas:** Unlike a Word document, there are no "pages" in the traditional sense. You place your screens side-by-side to see the flow. You zoom in to perfect a pixel, and zoom out to see the entire user journey.

**Frames (Artboards):** A Frame is a container. It usually represents a device screen (e.g., "iPhone 14"). However, Frames are powerful because they can nest. A "Button" is a Frame containing a text layer. A "Card" is a Frame containing an Image and a Button. This nesting mimics the HTML `div` structure you'll encounter in code.

## Layers and Hierarchy

Every element you create—a rectangle, a text block, an image—is a **Layer**. Think of them like sheets of acetate transparency stacked on top of each other.

**The Z-Index:**
Layers at the top of the list cover layers at the bottom. If your text is hidden, it's probably just sitting "under" the background rectangle in the layer stack.

**Grouping vs. Framing:**
- **Groups** are like a bag. They hold things together so you can move them, but the bag itself has no properties.
- **Frames** are like a picture frame. They hold things, but they also have their own background color, border, and clipping rules (hiding things that stick out). **Modern design relies heavily on Frames.**

## Selection and Manipulation

**Direct Selection:**
Clicking a group usually selects the whole group. To select an item *inside* a group (like the text inside a button), you usually need to "Deep Select" (Cmd+Click or Ctrl+Click). Mastering this shortcut is the difference between frustration and flow.

**Nudging:**
Never drag things with your mouse to align them by eye. It will be messy. Use the arrow keys ("Nudge") to move things by 1px. Hold Shift to move by 10px (or 8px, if configured). This keeps your design on the grid.

## Shapes and Drawing

UI design is mostly rectangles. A button is a rectangle. A card is a rectangle. A phone screen is a rectangle.

**Vector Networks:**
Unlike raster tools (Photoshop) which paint pixels, UI tools are Vector-based. This means they store the *math* of the shape, not the pixels. You can scale a vector icon from 16px to 1000px and it stays perfectly crisp. This is essential for responsive design.

**Boolean Operations:**
Complex shapes are often just simple shapes combined.
- **Union:** Merge two circles to make a cloud.
- **Subtract:** Cut a circle out of a square to make a hole.
- **Intersect:** Keep only the overlapping part (like a Venn diagram).

## Typography

Text in design tools comes in two flavors:
1.  **Point Text:** You click and type. The text box grows as you type. Use this for short labels or headlines.
2.  **Area Text:** You drag a box, then type. The text wraps when it hits the edge. Use this for body paragraphs.

**Styles:**
Never manually set "Arial, 16px, Bold" on every single heading. Create a **Text Style** called "Heading 3". Apply that style. If you later decide all H3s should be 18px, you update the Style, and every instance updates instantly.

## Color and Styles

Just like type, color should be systematic. Do not use the color picker to find a nice blue every time. Find a nice blue *once*, save it as a **Color Style** (e.g., "Primary/500"), and reuse it.

**Fills and Strokes:**
Objects have Fills (insides) and Strokes (outlines). You can stack them. A button might have a solid Fill, a gradient Fill on top (for a shine effect), and an inner Stroke (for a bevel effect).

## Exporting

Design tools are not the final destination. The assets must leave the tool to become code.

- **SVG:** Use this for icons and simple illustrations. It's code-friendly and scalable.
- **PNG/JPG:** Use this for photographs.
- **PDF:** Use this for sharing documents, not for UI assets.

**Export density:**
Screens have different pixel densities (Retina displays). When exporting bitmaps (PNG/JPG), you often need to export at 1x, 2x, and 3x sizes so the developer can serve the sharpest version for each device.

## Try It Yourself

### Exercise 1: The Frame Nesting
Create a Frame called "Button". Put a Text layer inside it saying "Click Me". Now create a Frame called "Card". Put a Rectangle (image) and your "Button" frame inside it. Notice how moving the Card moves everything.

### Exercise 2: Boolean Shapes
Draw two circles overlapping. Select both. Try the "Union" operation. Now try "Subtract." See how you can create a crescent moon shape just by subtracting one circle from another?

### Exercise 3: Styles
Type three different headlines. Manually style them. Now, create a Text Style from one of them. Apply it to the others. Change the Style settings and watch all three update.

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

- Treat the canvas as an infinite desk, not a finite page.
- Use **Frames** to group and clip content, mimicking HTML containers.
- **Vector** shapes allow for infinite scaling without quality loss.
- Always use **Styles** for color and typography to ensure consistency.
- Learn to **Deep Select** (Cmd/Ctrl+Click) to save hours of clicking.

## Next Steps

Continue to [Auto Layout and Constraints](./03-auto-layout-and-constraints.md) →
