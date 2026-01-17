# Android Layout System

> **Quick Summary:** Android runs on everything from 3-inch watches to 80-inch TVs. Designing for Android means designing for diversity. The layout system uses responsive grids, density-independent pixels, and window size classes to maintain sanity across thousands of device configurations.

## What You'll Learn

- Understanding Density-Independent Pixels (dp)
- The Material responsive grid system
- Window Size Classes (Compact, Medium, Expanded)
- Adapting to Foldables and Large Screens

## The Core Concept: Density Independence

In the early days of digital design, we thought in pixels. On Android, a pixel is a meaningless unit of measurement because screen densities vary wildly. A 50-pixel button might be thumb-sized on an old screen and microscopic on a modern 4K display.

**The Solution: dp (Density-independent Pixels)**
You define sizes in `dp`. Android scales them at runtime based on the screen's density.
*   **1 dp** ≈ 1/160th of an inch.
*   **48 dp** ≈ 9mm (roughly the size of a fingertip touch target).

When you design, you think in `dp`. The system handles the math.

## The Responsive Grid

Material Design uses a flexible column grid to organize layouts. The number of columns changes based on the screen width.

### The 12-Column System

*   **Mobile (Compact):** 4 columns. Margins are typically 16dp.
*   **Tablet (Medium):** 8 columns. Margins increase to 24dp.
*   **Desktop/Large (Expanded):** 12 columns. Content is often constrained to a max-width to prevent lines of text from becoming unreadably long.

**Gutters** (the space between columns) are typically 16dp but can be adjusted to create more or less separation.

## Window Size Classes

Instead of designing for specific devices ("Samsung Galaxy S22" vs "Pixel 7 Pro"), Android categorizes screens into three buckets called **Window Size Classes**.

### Compact Width (< 600dp)
*   **Devices:** Most phones in portrait mode.
*   **Layout:** Single column content.
*   **Navigation:** Bottom Navigation Bar.
*   **Strategy:** Stack content vertically. Use full-screen dialogs.

### Medium Width (600dp - 840dp)
*   **Devices:** Foldables (unfolded), small tablets, large phones in landscape.
*   **Layout:** Can start to show two panes (e.g., a list and a detail view).
*   **Navigation:** Navigation Rail (vertical bar on the left).
*   **Strategy:** Utilize the extra width. Don't just stretch the phone layout.

### Expanded Width (> 840dp)
*   **Devices:** Large tablets, Desktop mode.
*   **Layout:** Multi-pane layouts are standard (List + Detail + Supporting Pane).
*   **Navigation:** Navigation Drawer (permanently visible sidebar).
*   **Strategy:** Avoid "wall of text." Use layouts that resemble desktop applications.

## Design Patterns for Large Screens

When you have extra space, don't just fill it with whitespace. Use it to reduce friction.

### List-Detail View
On a phone, tapping an email opens a new screen. On a tablet, the inbox list stays on the left (consuming 1/3 of the screen), and the email content opens on the right (2/3). This allows fast browsing without constant back-and-forth navigation.

### Supporting Pane
Use the extra width to show context. If editing a document, the document takes the center stage, and a formatting palette or comments thread sits permanently on the right side.

## The Foldable Frontier

Foldables introduce a new physical variable: **The Hinge**.

### The Hinge/Fold
It's a physical dead zone (on dual-screen devices) or a crease (on flexible screens). **Never place interactive controls or text directly on the fold.** It's hard to touch and hard to read.

### Postures
Foldables change shape.
*   **Tabletop Mode:** The device sits like a laptop. The bottom half becomes a control surface (keyboard, playback controls), and the top half becomes the display. Video apps use this perfectly.
*   **Book Mode:** Held like a book. Great for dual-pane reading or multitasking.

## Try It Yourself

### Exercise 1: The Resizing Test

Take a simple design (e.g., a music player). Sketch it in three states:
1.  **Phone Portrait:** (Compact) Album art, controls below.
2.  **Tablet Portrait:** (Medium) List of songs on left, Now Playing on right.
3.  **Desktop Landscape:** (Expanded) Sidebar navigation, 3-column grid of albums.

### Exercise 2: Grid Math

Calculate the column width for a card on a **360dp** wide phone screen (standard Android width):
*   Total width: 360dp
*   Margins: 16dp x 2 = 32dp
*   Gutters (3 gaps between 4 columns): 16dp x 3 = 48dp
*   Available space for columns: 360 - 32 - 48 = 280dp
*   One column width: 280 / 4 = **70dp**

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-layout-quiz",
  "type": "multiple-choice",
  "title": "Android Layout System",
  "description": "Test your understanding of Android layout.",
  "difficulty": "medium",
  "question": "Why is the Navigation Rail preferred over the Bottom Navigation Bar for Medium width screens (like tablets)?",
  "options": [
    {
      "id": "a",
      "text": "It looks more modern",
      "isCorrect": false,
      "explanation": "Aesthetics are subjective; the reason is ergonomic."
    },
    {
      "id": "b",
      "text": "It saves vertical space for content and is easier to reach with thumbs when holding a tablet by the sides",
      "isCorrect": true,
      "explanation": "Correct! Vertical space is precious in landscape. Moving nav to the side saves vertical room and places controls right under your thumbs when holding a tablet."
    },
    {
      "id": "c",
      "text": "Android tablets don't support Bottom Navigation",
      "isCorrect": false,
      "explanation": "They do support it, but it's often a poor design choice."
    },
    {
      "id": "d",
      "text": "The Rail can hold more items than the Bottom Bar",
      "isCorrect": false,
      "explanation": "Both generally hold 3-7 top-level destinations."
    }
  ]
}
-->

## Key Takeaways

-   Design in **dp**, not pixels.
-   Don't design for specific devices; design for **Window Size Classes**.
-   **Navigation adapts:** Bottom Bar → Nav Rail → Nav Drawer as screens get wider.
-   **Foldables** are not just big phones; they have postures (Tabletop, Book) that require unique layouts.

## Next Steps

Continue to [Notifications and Widgets](./04-notifications-and-widgets.md) →
