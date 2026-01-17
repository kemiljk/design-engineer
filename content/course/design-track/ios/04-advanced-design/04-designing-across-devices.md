# Designing Across Apple Devices

> **Quick Summary:** Apple's ecosystem spans from watch to TV. Learn how to adapt your designs across iPhone, iPad, and Apple Watch while maintaining a cohesive experience.

## What You'll Learn

- Device-specific design considerations
- Adapting layouts for different sizes
- Maintaining design consistency
- Platform-specific patterns

<!-- illustration: apple-device-family -->

## The Ecosystem Mindset

Designing for Apple platforms isn't just about resizing a rectangle. It's about understanding the context of use. A user holds an iPhone in one hand while walking. They prop an iPad on a desk for focused work. They glance at a Watch for two seconds while running.

Your design must respect these contexts. The goal isn't to make the app look "the same" on every device; it's to make it feel "at home" on every device while sharing a common soul.

## Designing for iPhone

The iPhone is the anchor. It is a personal, handheld device dominated by vertical scrolling.

**Thumb-Driven Design:**
Since phones are tall and hands are finite, the top of the screen is hard to reach. Place navigation (Tab Bar) and primary actions at the bottom. Use the top areas for content display and navigation hierarchy (Back buttons).

**The Stack Navigation:**
iPhone apps rely heavily on the "Push" navigation model. You tap a list item, and a new screen slides in from the right. This creates a mental model of depth—you are drilling down into content. Don't fight this; it's how users know where they are.

## Designing for iPad

The iPad is a chameleon. It can be a large phone (reading in bed), or it can be a laptop (attached to a Magic Keyboard).

**Sidebar Navigation:**
On iPhone, we use tabs. On iPad, we use Sidebars. A sidebar takes advantage of the landscape width to show the navigation hierarchy *and* the content simultaneously. It flattens the app structure, making it faster to switch contexts.

**Multi-Column Layouts:**
A single column of text on an iPad is unreadable (the lines are too long). Use a multi-column approach. A list of emails on the left, the selected email in the middle, and the email details on the right. This "Master-Detail" view allows users to browse and consume without constantly navigating back and forth.

**Pointer Support:**
iPad supports trackpads. When a user uses a trackpad, the cursor is a small circle that "snaps" to interactive elements. Your buttons should support this hover state. They should lift or glow when the cursor approaches, providing feedback that they are clickable.

## Designing for Apple Watch

The Watch is an exercise in extreme minimalism.

**The Two-Second Rule:**
If a user can't get the value in two seconds, the design has failed. Text must be large and high-contrast. Backgrounds are usually black to blend with the bezel and save battery.

**Complications:**
The most valuable real estate on the Watch isn't the app; it's the Watch Face. "Complications" are tiny widgets that sit on the face (like a weather icon or activity ring). Designing a good complication is more important than designing a complex app UI.

**Action, not Consumption:**
Don't make users read long articles on their wrist. Use the Watch for quick inputs (Log Water, Start Timer) or quick notifications (Uber Arriving).

## Creating Adaptive Designs

How do you maintain sanity while designing for all these sizes?

**Shared Language:**
Use the same color palette, typography scale (Dynamic Type), and iconography (SF Symbols) across all devices. This creates a visual thread that ties the ecosystem together.

**Breakpoint Strategy:**
Think in "Size Classes," not pixels.
- **Compact Width:** iPhone Portrait, iPad Slide Over. Use Tabs and Single Columns.
- **Regular Width:** iPhone Landscape, iPad Full Screen. Use Sidebars and Multi-Columns.

**Component Adaptation:**
A "Card" component might stretch to full width on a phone, but have a fixed max-width on an iPad. A "Button" might be 44pt tall on a phone for touch, but smaller on Mac/iPad when used with a pointer. Design components that are aware of their container.

## Try It Yourself

### Exercise 1: The Context Shift
Take a simple "To-Do List" app.
1.  **iPhone:** Design the list. How do you add an item? (Likely a floating + button or top-right Add).
2.  **iPad:** Design the same view. Can you show the list on the left and the item details (notes, due date) on the right?
3.  **Watch:** What is the ONE thing you need to do? (Check off an item). Design that single-focus screen.

### Exercise 2: Sidebar Adaptation
Redesign the Instagram home screen for iPad. instead of a bottom tab bar, move the navigation to a left sidebar. How does this change the feed? Can you show comments side-by-side with the photo?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-devices-quiz",
  "type": "multiple-choice",
  "title": "Designing Across Devices",
  "description": "Test your understanding of multi-device design.",
  "difficulty": "medium",
  "question": "When designing an iPad app, what navigation pattern typically replaces the iPhone's tab bar?",
  "options": [
    {
      "id": "a",
      "text": "A larger tab bar with bigger icons",
      "isCorrect": false,
      "explanation": "Simply enlarging the tab bar doesn't take advantage of iPad's screen space."
    },
    {
      "id": "b",
      "text": "A sidebar navigation that's always visible",
      "isCorrect": true,
      "explanation": "Correct! iPad apps typically use a sidebar for primary navigation, taking advantage of the extra screen width while keeping content easily accessible."
    },
    {
      "id": "c",
      "text": "A hamburger menu in the top corner",
      "isCorrect": false,
      "explanation": "Hamburger menus hide navigation and aren't recommended for iPad's spacious layout."
    },
    {
      "id": "d",
      "text": "Gesture-based navigation without visible controls",
      "isCorrect": false,
      "explanation": "While iPad supports gestures, primary navigation should be visible and discoverable."
    }
  ]
}
-->

## Key Takeaways

- iPhone is about vertical depth and thumb reachability.
- iPad is about productivity, sidebars, and utilizing landscape width.
- Watch is about glanceability and quick actions (2-second rule).
- Use Size Classes (Compact vs. Regular) to adapt layouts logic.
- Maintain a shared visual language (Type, Color, Icons) to keep the brand cohesive.

## Next Steps

Continue to [Design QA and Handoff](./05-design-qa-and-handoff.md) →
