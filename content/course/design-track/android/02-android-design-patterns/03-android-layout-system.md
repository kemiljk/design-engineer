# Android Layout System

> **Quick Summary:** Android runs on everything from 3-inch watches to 80-inch TVs. Designing for Android means designing for diversity. The layout system uses responsive grids, density-independent pixels, and window size classes to maintain sanity across thousands of device configurations.

## What You'll Learn

- Density-independent pixels (dp) and how they work
- The Material responsive grid system
- Using window size classes (compact, medium, expanded)
- Adapting interfaces for phones, foldables, and large-screen devices

## The Core Concept: Density Independence

In the early days of digital design, we thought in pixels. On Android, a pixel is a meaningless unit of measurement because screen densities vary wildly. A 50-pixel button might be thumb-sized on an old screen and microscopic on a modern 4K display.

**The Solution: dp (Density-independent Pixels)**
You define sizes in `dp`. Android scales them at runtime based on the screen's density. Mathematically, 1dp is roughly 1/160th of an inch. Practically, 48dp is about 9mm—roughly the size of a fingertip touch target. When you design, you think in `dp`, and the system handles the math.

## The Responsive Grid

Material Design uses a flexible column grid to organise layouts. The number of columns changes based on the screen width, allowing content to scale naturally.

The number of columns adapts to screen width: **Compact** mobile layouts use 4 columns, **Medium** tablet designs expand to 8, and **Expanded** desktop layouts use 12 columns to maintain readable line lengths.

**Gutters**—the space between columns—are typically 16dp but can be adjusted to create more or less separation between elements.

## Window Size Classes

Instead of designing for specific devices like "Samsung Galaxy S22" vs "Pixel 7 Pro," Android categorises screens into three buckets called **Window Size Classes**.

### Compact Width (< 600dp)
This class covers most phones in portrait mode. Layouts here are primarily single-column and stack content vertically. Navigation is typically handled by a Bottom Navigation Bar, and flows often use full-screen dialogs to maintain focus.

### Medium Width (600dp - 840dp)
This class includes foldables (unfolded), small tablets, and large phones in landscape orientation. At this width, you can start to show two panes of content, such as a list alongside a detail view. The Navigation Rail (a vertical bar on the left) becomes the preferred navigation pattern, saving vertical space. The strategy here is to utilise the extra width rather than just stretching the phone layout.

### Expanded Width (> 840dp)
This class encompasses large tablets and Desktop mode. Multi-pane layouts are standard here, often showing a list, a detail view, and a supporting pane simultaneously. A permanent Navigation Drawer is appropriate for navigation. The goal is to avoid a "wall of text" and create layouts that resemble desktop applications.

## Design Patterns for Large Screens

When you have extra space, don't just fill it with whitespace. Use it to reduce friction and improve the user's workflow.

Large screens enable powerful patterns like the **List-Detail View**, which allows browsing and reading without leaving the screen, and the **Supporting Pane**, which provides persistent context for main tasks.

## The Foldable Frontier

Foldables introduce a new physical variable: **The Hinge**.

This hinge acts as a physical dead zone (on dual-screen devices) or a crease (on flexible screens). **Never place interactive controls or text directly on the fold**, as it is hard to touch and hard to read.

Foldables also introduce **Postures**. In **Tabletop Mode**, the device sits like a laptop; the bottom half becomes a control surface (keyboard, playback controls), and the top half becomes the display. Video apps use this perfectly. In **Book Mode**, the device is held like a book, which is excellent for dual-pane reading or multitasking.

## Try It Yourself

### Exercise 1: The Resizing Test

Take a simple design (e.g., a music player). Sketch it in three states:
Take a simple music player design and sketch how it should appear across three distinct states. The compact phone portrait view should feature album art with controls below, while the medium tablet portrait layout moves to a split view with a song list on the left and "Now Playing" on the right. Finally, the expanded desktop landscape view should use sidebar navigation with a three-column grid for the album collection.

### Exercise 2: Grid Math

Calculate the column width for a card on a **360dp** wide phone screen (standard Android width):
To calculate the column width for a card on a standard 360dp wide phone screen, start by subtracting 32dp for margins (16dp on each side). Next, account for the 48dp taken up by gutters (three 16dp gaps between four columns). This leaves 280dp of available space for the columns themselves, which, when divided by four, results in a final column width of 70dp.

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

- When designing for Android, you must prioritise density-independent pixels over standard pixels
- Create layouts that target window size classes rather than specific devices

## Next Steps

Continue to [Notifications and Widgets](./04-notifications-and-widgets.md) →
