# Adaptive and Responsive

> **Quick Summary:** Android's diverse device ecosystem requires adaptive design thinking. Learn to design for phones, tablets, foldables, and more.

## What You'll Learn

- Designing for device diversity
- Adaptive layout patterns
- Foldable considerations
- Multi-window support

## The Android Landscape

### Device Variety
Android runs on everything.
- **Phones:** Tall, short, wide, narrow.
- **Tablets:** From 7-inch readers to 14-inch laptop replacements.
- **Foldables:** Phones that open into tablets (Book style) or phones that fold in half (Flip style).
- **Chrome OS:** Laptops running Android apps in resizable windows.

### The Challenge
You cannot design for "The Android Phone" because it doesn't exist. You must design layouts that adapt to the available space.

## Window Size Classes

Android simplifies this chaos into three buckets called **Window Size Classes**.

### Compact (<600dp width)
This covers almost all phones in portrait mode.
- **Layout:** Single column.
- **Navigation:** Bottom Navigation Bar.
- **Content:** Vertically stacked.

### Medium (600-840dp width)
This covers tablets in portrait, large unfolded foldables, and phones in landscape.
- **Layout:** Can support two columns (e.g., List/Detail).
- **Navigation:** Navigation Rail (vertical bar on the left).
- **Content:** Grid layouts for cards.

### Expanded (>840dp width)
This covers large tablets and desktops.
- **Layout:** Multi-column (up to 3 panes).
- **Navigation:** Permanent Navigation Drawer or Rail.
- **Content:** Maximum density; avoid lines of text getting too long.

## Adaptive Patterns

### Navigation Changes
Navigation must move to accommodate holding patterns.
- **Compact:** Bottom Nav is best for thumbs.
- **Medium/Expanded:** Navigation Rail or Drawer moves nav to the side, saving vertical space for content and placing targets near the thumbs on a tablet.

### Content Changes
- **List:** A single column list on a phone becomes a grid on a tablet.
- **Images:** A full-width image on a phone might be restricted to a max-width or float to the side on a tablet.

### List-Detail Pattern
This is the most common adaptive pattern.
- **Phone:** The user sees a List. Tapping an item navigates to a new Detail screen.
- **Tablet:** The user sees the List on the left (1/3 width) and the Detail on the right (2/3 width). Tapping an item updates the right pane instantly.

## Foldable Design

### Fold-Aware Design
Foldables have a physical hinge or crease.
- **Don't** place text or buttons across the fold. It's hard to read and touch.
- **Do** separate content into two logical panes (e.g., a map on top, controls on the bottom).

### Table-Top Mode
When a foldable is half-open and sitting on a table:
- The bottom half becomes a control surface (keyboard, media controls).
- The top half becomes the display (video, document).
- This is perfect for video calls or watching movies.

### Continuity
The transition must be seamless. If a user unfolds their phone while watching a video, the video should seamlessly expand to the larger screen without pausing or reloading.

## Multi-Window

### Split Screen
Users can run two apps side-by-side. Your app might be running on a huge tablet, but if the user puts it in split-screen mode, your window might be narrow (Compact width). Always respond to the **Window Size**, not the device size.

### Picture-in-Picture
For video or navigation apps, PiP allows the user to shrink your app into a floating window. Ensure your UI hides all non-essential controls in this mode.

## Design Deliverables

For a comprehensive adaptive design, you should provide:
1.  **Compact Layout:** The standard phone experience.
2.  **Expanded Layout:** The tablet/desktop experience.
3.  **Transition Documentation:** Notes on how elements move from one to the other (e.g., "The navigation bar becomes a rail").

## Try It Yourself

### Exercise 1: Adaptive Layout
Design a news feed screen.
- **Compact:** Single column of cards.
- **Expanded:** Three columns of cards (Masonry grid).
Document the grid settings for each.

### Exercise 2: List-Detail
Design an email inbox.
- **Compact:** List of emails. Tapping one pushes a new screen.
- **Expanded:** List on left, email body on right. Tapping one updates the right pane.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-adaptive-quiz",
  "type": "multiple-choice",
  "title": "Adaptive and Responsive Design",
  "description": "Test your understanding of Android adaptive design.",
  "difficulty": "medium",
  "question": "How does Android categorize different screen sizes for adaptive design?",
  "options": [
    {
      "id": "a",
      "text": "By device model name",
      "isCorrect": false,
      "explanation": "Android uses size-based categories, not device-specific targeting."
    },
    {
      "id": "b",
      "text": "Window size classes: Compact, Medium, and Expanded for width and height",
      "isCorrect": true,
      "explanation": "Correct! Window size classes provide breakpoints for adaptive layouts. Compact is typically phone portrait, Medium is tablet portrait or phone landscape, Expanded is tablet landscape or desktop."
    },
    {
      "id": "c",
      "text": "Small, Normal, Large, and XLarge screen densities",
      "isCorrect": false,
      "explanation": "Those are density qualifiers, not the modern window size classes."
    },
    {
      "id": "d",
      "text": "Phone vs Tablet only",
      "isCorrect": false,
      "explanation": "The distinction is more nuanced with foldables and varying sizes."
    }
  ]
}
-->

## Key Takeaways

- Android runs on diverse devices; design for **Window Size Classes**.
- **Navigation** adapts from Bottom Bar to Rail/Drawer.
- **List-Detail** is the gold standard for adapting lists to large screens.
- **Foldables** introduce physical constraints (the hinge) and new postures (Table-Top).
- **Multi-window** means your app can be any size at any time.

## Next Steps

Continue to [Android Motion Principles](./03-android-motion-principles.md) →
