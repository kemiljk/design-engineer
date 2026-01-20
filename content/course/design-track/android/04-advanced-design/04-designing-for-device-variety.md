# Designing for Android Device Variety

> **Quick Summary:** Android powers over 2 billion active devices, ranging from 4-inch phones to 14-inch tablets, foldables, and watches. Learn how to create adaptive designs that flow like water into any container.

## The Android Device Landscape

For a designer, Android's variety is both a challenge and an opportunity. You cannot simply design a "mobile" screen and a "desktop" screen. You must design a responsive system.

### Device Categories
While there are thousands of unique devices, they generally fall into three width buckets: compact phones in portrait mode, medium small tablets and landscape phones, and expanded large tablets or desktop configurations.

## Window Size Classes

To manage this diversity, Google introduced **Window Size Classes**. Rather than targeting specific devices, you design for these standardised breakpoints.

### Compact Width
This is the standard phone experience. Space is premium. Layouts use a single column. Navigation lives at the bottom (Bottom Navigation Bar) for thumb reachability. Content is stacked vertically.

### Medium Width
This captures small tablets and foldables. You have enough horizontal space to break out of the single column. Introduce a **Navigation Rail** on the left to save vertical space. Consider showing a list and a detail view side-by-side if the content is sparse.

### Expanded Width
On large tablets, a single column of text looks ridiculous. Expanded layouts demand a multi-pane approach. Use a permanent **Navigation Drawer**, a list of items, and a detailed view all visible at once. Dialogs should float in the center rather than taking up the full screen.

## Designing Adaptive Layouts

### The List-Detail Pattern
In the compact phone view, the list and detail exist as separate screens where tapping an item triggers a full-page navigation. On medium to expanded screens, however, these elements sit side-by-side, allowing users to update the detail pane instantly and triage information far more efficiently.

### Navigation Adaptation
Your navigation structure should morph from a Bottom Navigation Bar on compact devices to a Navigation Rail for medium widths, eventually becoming a permanent Navigation Drawer for expanded layouts.

### Content Reflow
Content shouldn't just stretch; it should reflow. A grid of cards might show one column on a phone, two on a foldable, and four on a tablet. Hero images should be constrained to prevent them from dominating the viewport on large screens.

## Designing for Foldables

Foldables introduce a new dimension: physical posture.

### Hinge Awareness
The hinge is a physical divider. Your layout must be "hinge-aware." Never place critical UI elements (like a button or a face in a video) directly under the hinge area.

### Tabletop Posture
When a foldable is bent at 90 degrees and placed on a surface, it enters Tabletop mode. The top half becomes the display (video), and the bottom half becomes the control surface (media controls). It feels like a mini-laptop.

### Book Mode
Holding a foldable like a book offers a natural reading experience. Treat the screen as two distinct pages—left and right—mimicking a paperback.

## Designing for Wear OS

Designing for the wrist requires extreme restraint to ensure information is glanceable at a first look before a user has to scroll. Wear OS features swipeable tiles for instant data access and actionable notifications with quick replies, all supported by massive 48dp touch targets for easy interaction while moving.

## Testing Across Devices

You cannot design for Android solely on a generic "360x800" frame.
- **Emulators:** Android Studio provides resizable emulators to test layout logic instantly.
- **Physical Devices:** Test on at least one small phone and one tablet to feel the reachability issues.

## Try It Yourself

### Exercise 1: Size Class Audit
Take your main screen.
1.  **Compact:** Design for phone.
2.  **Medium:** Adapt for tablet. Switch bottom nav to a rail.
3.  **Expanded:** Design for desktop. Introduce a list-detail view.

### Exercise 2: Foldable Consideration
Design a "Recipe View" for a foldable in **Tabletop Mode**.
- Top Screen: The instruction video.
- Bottom Screen: The ingredients list and "Next Step" button.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-devices-quiz",
  "type": "multiple-choice",
  "title": "Designing for Device Variety",
  "description": "Test your understanding of adaptive Android design.",
  "difficulty": "medium",
  "question": "What navigation pattern typically replaces a bottom navigation bar on an expanded-width Android device?",
  "options": [
    {
      "id": "a",
      "text": "A larger bottom navigation bar",
      "isCorrect": false,
      "explanation": "Simply enlarging the bottom bar wastes screen space on larger devices."
    },
    {
      "id": "b",
      "text": "A navigation drawer that's always visible",
      "isCorrect": true,
      "explanation": "Correct! On expanded-width devices (>840dp), Material Design recommends a permanent navigation drawer that takes advantage of the extra screen space."
    },
    {
      "id": "c",
      "text": "Gesture-only navigation",
      "isCorrect": false,
      "explanation": "Removing visible navigation reduces discoverability."
    },
    {
      "id": "d",
      "text": "Top app bar with navigation tabs",
      "isCorrect": false,
      "explanation": "While possible, the navigation drawer is the recommended pattern for expanded layouts."
    }
  ]
}
-->

## Key Takeaways

To master Android's device variety, you must design for Window Size Classes while ensuring navigation evolves naturally from a Bottom Bar to a Rail or Drawer. By leveraging unique foldable postures like Tabletop and Book modes and adopting a glanceable mindset for Wear OS, you can ensure your interface remains functional and beautiful across all form factors, which should always be validated using resizable emulators.

## Next Steps

Continue to [Design QA and Handoff](./05-design-qa-and-handoff.md) →
