# Designing iOS Apps in Figma

> **Quick Summary:** Figma is the primary design tool for most modern teams. Learn how to set up your files, use official resources, and think in points to create designs that developers can actually build.

## What You'll Learn

- Essential setup for iOS design files in Figma (frame sizes, grids, organisation)
- How to leverage official Apple UI kits and SF Symbols
- Maintaining platform consistency in your designs
- Typography and colour styles for professional, developer-friendly interfaces

## File Setup

A clean file structure saves hours of headache later.

### Frame Sizes
Start with the most common iPhone sizes. Designing at **1x** scale (points) is mandatory; never design at 2x or 3x pixel resolution.
- **iPhone 15/16:** 393×852 points. This is your standard canvas.
- **iPhone 15/16 Pro Max:** 430×932 points. Use this to check how layouts scale.
- **iPhone SE:** 375×667 points. Use this to stress-test dense layouts.

### Page Organisation
Organise your Figma file to separate work-in-progress from final assets.
```text
📄 Cover
📄 Components (Local definitions)
📄 Screens - Home
📄 Screens - Detail
📄 Screens - Settings
📄 Prototypes (Interaction flows)
📄 Archive (Old iterations)
```

### Grid System
iOS uses an **8pt grid**. Configure your layout grids in Figma to enforce this.
- **Margins:** Typically 16pt or 20pt on the sides.
- **Gutters:** 8pt or 16pt between items.
- **Rows/Columns:** Use an 8pt square grid background to help align elements vertically and horizontally.

## iOS UI Kits

### Apple's Official Resources
Apple provides an official **Figma iOS 18 UI Kit**. Use it. Do not redraw system components yourself.
- **Why:** It contains every standard component (nav bars, tab bars, keyboards, sheets) with correct constraints and variants.
- **Updates:** Apple updates this kit with each iOS release, so your designs stay current.

### Using UI Kit Components
1.  **Import** the kit as a library in Figma.
2.  **Insert** components as instances (e.g., a Navigation Bar).
3.  **Customise** using the component properties (change title, show/hide buttons).
4.  **Never detach** unless absolutely necessary. Detaching breaks the link to the master library, meaning you won't get updates.

## SF Symbols

Apple's icon system, **SF Symbols 6**, includes over 6,000 consistent icons.

### Adding to Figma
Since Figma cannot read the system font file directly for icons, you need a workflow:
1.  Download the **SF Symbols app** for Mac.
2.  Find the symbol you need.
3.  Copy it as an SVG and paste it into Figma.
4.  Alternatively, use a community plugin like "SF Symbols" to browse and insert directly.

### Symbol Variants
SF Symbols are variable. When you copy one, you can often choose:
- **Weight:** From Ultralight to Black. Match this to your text weight (e.g., Medium text gets a Medium icon).
- **Scale:** Small, Medium, Large.
- **Rendering Mode:** Monochrome (standard), Hierarchical (multi-tone), or Multicolor (full colour).

## Typography Setup

### Font Files
Figma does not include **SF Pro** by default because it is a local system font.
1.  Download the fonts from the Apple Developer website.
2.  Install them on your Mac.
3.  Use the Figma desktop app (or the font helper for the browser) to access them.

### Text Styles
Don't use raw font values. Create Figma Text Styles that match the iOS system styles.
To maintain system consistency, assign standard styles such as **Large Title** (34pt Bold), **Title 1** (28pt Bold), **Body** (17pt Regular), and **Caption 1** (12pt Regular). Naming these styles strictly according to the iOS hierarchy helps developers map them directly to code.
Naming them strictly (e.g., "iOS/Body", "iOS/Title 1") helps developers map them directly to code.

## Colour Styles

Create semantic colour styles in Figma, not just raw hex codes.
Semantic definitions should include **Label Colours** for text hierarchy, **Backgrounds** for layout layers, and **Accents** for interactive system colours like Blue and Red. Using Figma's variable modes allows you to switch your entire design between Light and Dark values with a single click.

## Device Frames

### For Presentation
When showing work to stakeholders, put your designs inside realistic device frames. It provides scale and context. Show how the Dynamic Island interacts with your header, or how the rounded corners clip content.

### For Design Work
While designing, it is often easier to work on a raw rectangular frame (the "logical" screen size) to see your constraints clearly. Add the device bezel only when exporting or presenting.

## Try It Yourself

### Exercise 1: File Setup

Create a new Figma file. Set up an iPhone 15 frame (393x852). configure a layout grid with 16pt margins. Link the Apple UI Kit library and drag in a Tab Bar and a Navigation Bar.

### Exercise 2: First Screen

Design a simple "Settings" screen.
1.  Use the **UI Kit** to place a Navigation Bar titled "Settings".
2.  Create a list of rows using **Auto Layout**.
3.  Use **SF Symbols** for the icons on the left.
4.  Use **System Colours** (Label for text, System Background for the frame).
5.  Ensure everything aligns to the **8pt grid**.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-figma-quiz",
  "type": "multiple-choice",
  "title": "Designing iOS Apps in Figma",
  "description": "Test your understanding of iOS design production.",
  "difficulty": "easy",
  "question": "When designing iOS apps in Figma, what unit should you use for measurements?",
  "options": [
    {
      "id": "a",
      "text": "Pixels (px)",
      "isCorrect": false,
      "explanation": "iOS uses points which are device-independent."
    },
    {
      "id": "b",
      "text": "Points (pt) at 1x scale",
      "isCorrect": true,
      "explanation": "Correct! Design at 1x scale using points. A point is 1px on standard displays, 2px on Retina, 3px on iPhone Plus/Max models. This keeps designs device-independent."
    },
    {
      "id": "c",
      "text": "Percentage values only",
      "isCorrect": false,
      "explanation": "While percentages are used for some layouts, fixed measurements use points."
    },
    {
      "id": "d",
      "text": "Design at 3x for the highest resolution devices",
      "isCorrect": false,
      "explanation": "Design at 1x—export at multiple scales. This makes measurements intuitive."
    }
  ]
}
-->

## Key Takeaways

To create professional iOS designs in Figma, you must always work at **1x scale** (points) and leverage **Apple's official UI Kit** to ensure component accuracy and consistency. Integrating **SF Symbols** as your iconography standard and using **Figma Variables** for semantic Light/Dark mode accessibility will further align your work with system standards. Finally, building with **Auto Layout** ensures your designs mimic the behaviour of native SwiftUI stacks, making the transition to development seamless.

## Next Steps

Continue to [Adaptive Layouts](./02-adaptive-layouts.md) →
