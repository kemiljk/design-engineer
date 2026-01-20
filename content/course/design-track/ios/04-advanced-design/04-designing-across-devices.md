# Designing Across Apple Devices

> **Quick Summary:** Apple's ecosystem spans from the tiny Watch to the massive TV. Learn how to adapt your designs across iPhone, iPad, and Apple Watch while maintaining a cohesive, native experience.

## The Ecosystem Mindset

Designing for Apple platforms isn't just about resizing a rectangle. It's about understanding the **context of use**.
- **iPhone:** Held in one hand, often while moving. Thumb-driven.
- **iPad:** Held in two hands or propped on a desk. Focus-driven.
- **Watch:** Glanced at for seconds. Action-driven.
- **Mac:** Precision input (mouse/keyboard). Windowed.

Your goal isn't to make the app look "the same" everywhere. It's to make it feel "at home" on every device while sharing a common soul.

## Designing for iPhone

The iPhone is the anchor. It is a personal, handheld device dominated by vertical scrolling.

**Thumb-Driven Design:**
Hands are finite. The top of the screen is hard to reach. Place navigation (Tab Bar) and primary actions at the bottom. Use the top for hierarchy (Back buttons) and content display.

**The Stack Navigation:**
iPhone apps rely on the "Push" model. You tap a list item, and a new screen slides in. This creates a mental model of depth—you are drilling down. Don't fight this; it's how users navigate.

## Designing for iPad

The iPad is a chameleon. It can be a large phone or a laptop replacement.

**Sidebar Navigation:**
Tabs work on phones, but on iPad, **Sidebars** are superior. A sidebar utilizes the landscape width to show the navigation hierarchy *and* the content simultaneously. It flattens the app structure, making context switching faster.

**Multi-Column Layouts:**
A single column of text on an iPad is unreadable. Use a **Master-Detail** layout (List on left, Content on right). This allows users to browse a list and see the details without constantly navigating back and forth.

**Pointer Support:**
iPad supports trackpads. The cursor is a small circle that "snaps" to interactive elements. Your buttons should support this hover state—lifting or glowing when the cursor approaches.

## Designing for Apple Watch

The Watch is an exercise in extreme minimalism.

**The Two-Second Rule:**
If a user can't get the value in two seconds, the design has failed. Text must be large and high-contrast. Backgrounds are usually black to blend with the bezel and save battery.

**Complications:**
The most valuable real estate is the Watch Face. "Complications" are tiny widgets (like a weather icon) on the face. Designing a good complication is often more important than the app itself.

**Action, not Consumption:**
Don't make users read articles. Use the Watch for quick inputs (Log Water, Start Timer) or quick notifications (Uber Arriving).

## Creating Adaptive Designs

How do you maintain sanity while designing for all these sizes?

**Shared Language:**
Use the same **Colour Palette**, **Typography Scale** (Dynamic Type), and **Iconography** (SF Symbols) everywhere. This creates the visual thread.

**Breakpoint Strategy:**
Think in **Size Classes**, not pixels.
- **Compact Width:** iPhone Portrait, iPad Slide Over. (Tabs, Single Column).
- **Regular Width:** iPhone Landscape (Max), iPad Full Screen. (Sidebars, Multi-Column).

**Component Adaptation:**
A "Card" component might stretch to full width on a phone but have a fixed max-width on an iPad. A "Button" might be 44pt tall on a phone for touch, but smaller on Mac/iPad when used with a pointer. Design components that are aware of their container.

## Try It Yourself

### Exercise 1: The Context Shift
Take a "To-Do List" app.
1.  **iPhone:** How do you add an item? (Floating + button).
2.  **iPad:** Can you show the list on the left and the item notes on the right?
3.  **Watch:** What is the ONE task? (Checking off an item). Design that single screen.

### Exercise 2: Sidebar Adaptation
Redesign a social feed for iPad. Move the bottom tabs to a left sidebar. How does this change the layout? Can you show comments side-by-side with the post?

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

Successful multi-platform design respects the **iPhone's** need for vertical depth and thumb reachability, the **iPad's** expansive sidebar and multi-column utility, and the **Watch's** requirement for 2-second glanceability. By using **Size Classes** to adapt layouts logically and maintaining a **shared visual language**, you ensure your app feels native on every device while remaining cohesive as a brand.

## Next Steps

Continue to [Design QA and Handoff](./05-design-qa-and-handoff.md) →
