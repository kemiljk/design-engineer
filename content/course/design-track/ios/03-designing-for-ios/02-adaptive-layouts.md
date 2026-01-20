# Adaptive Layouts

> **Quick Summary:** iOS runs on a vast array of devices, from the pocket-sized iPhone SE to the massive 13-inch iPad Pro. Adaptive layouts ensure your design isn't just a blown-up phone interface, but a tailored experience for every screen.

## What You'll Learn

Throughout this lesson, you will explore the foundational system of iOS size classes and learn how to design adaptive interfaces that shift fluidly between compact and regular environments. We'll examine the specific strategies required to bridge the gap between iPhone and iPad experiences, ensuring your app takes full advantage of larger canvases and system-wide multitasking capabilities without compromising on native feel.

## Size Classes

Instead of designing for specific devices (which changes every year), iOS uses abstract categories called **Size Classes**. These describe the available space in terms of width and height.

### Horizontal Size Class
- **Compact:** Indicates a constrained width. Used by all iPhones in portrait mode and iPad Split View apps.
- **Regular:** Indicates expansive width. Used by iPads and larger iPhones (Max models) in landscape mode.

### Vertical Size Class
- **Compact:** Constrained height. Used by iPhones in landscape.
- **Regular:** Expansive height. Used by all iPhones in portrait and all iPads.

### Common Combinations
- **iPhone Portrait:** Compact Width × Regular Height. This is the standard "mobile" layout.
- **iPad Full Screen:** Regular Width × Regular Height. This is the "tablet" layout.
- **iPad Split View:** Varies. An app taking up 1/3 of the screen behaves like an iPhone (Compact Width).

## iPhone Design

### Portrait (Primary)
The portrait orientation is the dominant mode for iPhone use. Layouts stack vertically. Navigation is handled by a bottom Tab Bar or a stacked Navigation Controller. Content fills the width of the screen.

### Landscape
On smaller iPhones, landscape is cramped (Compact Height). Navigation bars shrink, and vertical scrolling becomes tedious. Many apps lock to portrait for this reason. However, on "Max" sized iPhones, landscape offers a Regular Width, allowing for split-view interfaces (like Mail showing a list on the left and an email on the right).

## iPad Design

Designing for iPad is not just scaling up your iPhone app. It requires a fundamental shift in how you use space.

### Key Differences
- **Sidebar Navigation:** Instead of a bottom Tab Bar, iPads often use a sidebar on the left. This lists top-level destinations and allows for quick switching without losing context.
- **Multi-Column Layouts:** A single column of text on an iPad is unreadable (the lines are too long). Use split views (List + Detail) or masonry grids to utilise the horizontal space.
- **Popovers:** Instead of full-screen modals, use popovers that point to the button that triggered them, maintaining context.

## iPad Multitasking

Users can run multiple apps simultaneously on iPad. This means your "iPad Design" might actually need to look like an "iPhone Design" at any moment.

### Split View
Two apps can share the screen.
- **50/50 Split:** Both apps get a narrow, but usable, interface.
- **70/30 Split:** The smaller app behaves exactly like a mobile phone layout (Compact Width).

### Slide Over
Your app can float in a narrow panel over another full-screen app. This is functionally identical to an iPhone layout.

**The Golden Rule:** Never assume your app is full screen. Your layout must respond to the *window size*, not the *device size*.

## Designing Adaptively

### In Figma
Don't design for every single device. Design for the key breakpoints:
1.  **iPhone (393pt):** The standard mobile experience.
2.  **iPad Split View (Small):** Validates that your adaptive mobile layout works on tablet.
3.  **iPad Full Screen (Regular):** The expansive tablet experience with sidebars and multiple columns.

### Flexible Components
Use Auto Layout in Figma (and SwiftUI in code) to build components that flex.
- **Cards:** Should have a minimum width (for phone) and a maximum width (to prevent looking stretched on tablet).
- **Grids:** Should increase the number of columns as space increases (2 columns on phone → 4 columns on tablet).
- **Text:** Should maintain readable line lengths (60-80 characters) regardless of screen width.

## Try It Yourself

### Exercise 1: Adaptive Screen
Design a "Profile" screen.
- **On iPhone:** Avatar is centred at the top. Details follow in a vertical list.
- **On iPad:** Avatar moves to the left side. Details appear in a grid on the right.
Document the constraints that cause this shift.

### Exercise 2: Navigation Shift
Design a navigation pattern that transforms:
- **iPhone:** A bottom Tab Bar with 4 icons.
- **iPad:** A left Sidebar with the same 4 icons, plus text labels.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-adaptive-quiz",
  "type": "multiple-choice",
  "title": "Adaptive Layouts",
  "description": "Test your understanding of iOS adaptive design.",
  "difficulty": "medium",
  "question": "How does iOS handle different screen sizes (iPhone vs iPad)?",
  "options": [
    {
      "id": "a",
      "text": "Separate app designs are required for each device",
      "isCorrect": false,
      "explanation": "iOS supports universal apps with adaptive layouts."
    },
    {
      "id": "b",
      "text": "Size Classes (Compact/Regular) let layouts adapt to different width and height environments",
      "isCorrect": true,
      "explanation": "Correct! Size Classes indicate available space. iPhone portrait is Compact width; iPad is Regular width. Layouts adapt based on these traits rather than specific device detection."
    },
    {
      "id": "c",
      "text": "iPad just scales up iPhone designs automatically",
      "isCorrect": false,
      "explanation": "Simply scaling up wastes iPad space. Adaptive layouts take advantage of the larger canvas."
    },
    {
      "id": "d",
      "text": "Only iPad Pro supports adaptive layouts",
      "isCorrect": false,
      "explanation": "All iOS devices support adaptive layouts through Size Classes."
    }
  ]
}
-->

## Key Takeaways

Responsive iOS design is built on **Size Classes** (Compact and Regular), which allow a single design to adapt fluidly across all devices. iPad layouts require unique treatments like **Sidebars** and multi-column views to feel truly native, and multitasking capabilities mean your app must handle being resized to iPhone widths at any moment. By using **Auto Layout** constraints rather than fixed artboards, you create flexible components that remain functional and elegant on any screen size.

## Next Steps

Continue to [iOS Animation Principles](./03-ios-animation-principles.md) →
