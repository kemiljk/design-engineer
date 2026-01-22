# Adaptive and Responsive

> **Quick Summary:** Android's diverse device ecosystem requires adaptive design thinking. Learn to design for phones, tablets, foldables, and more.

## What You'll Learn

- Navigating the complexities of device diversity
- Implementing robust adaptive layout patterns
- Specific considerations for foldable devices
- Supporting multi-window environments on Android

## The Android Landscape

Android runs on a vast landscape of hardware, from pocket-sized **Phones** and portable **Tablets** to expansive **Foldable** devices and even **Chrome OS** laptops running Android apps in resizable windows.

### The Challenge
You cannot design for "The Android Phone" because it doesn't exist. You must design layouts that adapt to the available space.

## Window Size Classes

Android simplifies this chaos into three buckets called **Window Size Classes**.

The **Compact** class (<600dp width) covers most phones in portrait mode, requiring single-column layouts, bottom navigation bars, and vertically stacked content.

**Medium** width (600-840dp) encompasses tablets in portrait, unfolded foldables, and landscape phones, enabling two-column layouts and navigation rails.

For **Expanded** width (>840dp), multi-column layouts with up to three panes are appropriate, often paired with a permanent navigation drawer to manage high-density content while maintaining readable line lengths.

## Adaptive Patterns

### Navigation Changes
Navigation must adapt to user holding patterns; while a bottom navigation bar is ideal for thumb reach on mobile, larger screens should use a rail or drawer to save vertical space.

Content should also shift from single-column lists on phones to grids on tablets, with images restricted to maximum widths to prevent distortion.

In the **List-Detail pattern**, a phone experience transitions from a list to a new detail screen, whereas a tablet displays both side-by-side for instant updates.

## Foldable Design

Fold-aware design respects the physical hinge by avoiding placing text or buttons across the fold and separating content into logical, independent panes.

In Tabletop mode, a foldable sits half-open with the bottom half acting as a control surface while the top half serves as the primary display for video or documents.

### Continuity
The transition must be seamless. If a user unfolds their phone while watching a video, the video should seamlessly expand to the larger screen without pausing or reloading.

## Multi-Window

### Split Screen
Users can run two apps side-by-side. Your app might be running on a huge tablet, but if the user puts it in split-screen mode, your window might be narrow (Compact width). Always respond to the **Window Size**, not the device size.

### Picture-in-Picture
For video or navigation apps, PiP allows the user to shrink your app into a floating window. Ensure your UI hides all non-essential controls in this mode.

## Design Deliverables

Comprehensive deliverables should include layout designs for both compact and expanded widths, along with transition documentation that explains how elements move and adapt between states.

## Try It Yourself

### Exercise 1: Adaptive Layout
Design a news feed screen.
Design a news feed screen that adapts between a compact view featuring a single column of cards and an expanded desktop layout using a three-column masonry grid. Be sure to document the specific grid settings required for each state.

### Exercise 2: List-Detail
Design an email inbox.
Create an email inbox interface where the compact version uses a simple list that pushes a new screen upon selection. For the expanded view, implement a split pane with the list on the left and the email body on the right, ensuring that tapping an item updates the right-hand panel instantly.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-adaptive-quiz",
  "type": "multiple-choice",
  "title": "Adaptive and Responsive Design",
  "description": "Test your understanding of Android adaptive design.",
  "difficulty": "medium",
  "question": "How does Android categorise different screen sizes for adaptive design?",
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

To successfully design for the diverse Android ecosystem, you must target Window Size Classes rather than specific devices, ensuring navigation adapts from a Bottom Bar to a Rail or Drawer as width increases. The List-Detail pattern remains the gold standard for large screens, while foldable hardware requires careful consideration of physical hinges and new tabletop postures. Ultimately, supporting multi-window environments ensures your app remains functional and beautiful at any size.

## Next Steps

Continue to [Android Motion Principles](./03-android-motion-principles.md) →
