# Standard UI Components

> **Quick Summary:** iOS provides a rich set of standard components that balance consistency with flexibility. Understanding how to use these native elements ensures your app feels at home on the platform while maintaining accessibility and familiarity.

## What You'll Learn

- The extensive library of standard iOS components
- Hierarchy of button styles and when to use each
- Ways to structure content using lists and tables
- When to choose native UI elements over custom builds
- Input patterns (switches, pickers) for efficient data entry

## Buttons and Actions

Buttons on iOS are more than just rectangles. The system provides a hierarchy of styles to communicate importance without cluttering the interface.

### Visual Hierarchy

Your primary action should typically use the **Filled** style—a solid colour that draws the eye. For example, the "Save" button in a form or "Book Now" in a travel app.

Secondary actions often use the **Gray** or **Tinted** styles. These have a background but are less visually dominant, making them perfect for "Cancel" buttons or secondary options.

For the lowest emphasis, **Plain** buttons (text only) or **Bordered** buttons work well. These are common in toolbars, navigation bars, or grouped lists where a filled button would be visually overwhelming.

### Sizing Targets

While buttons vary in visual weight, their touch targets must remain consistent. The standard height for a button is 44 points, though larger variants (50 points) are often used for prominent calls to action at the bottom of the screen. Even smaller buttons (like those in navigation bars) maintain a large invisible touch target to ensure they're easily tappable.

## Lists and Collections

Most content on iOS is presented in lists. UIKit and SwiftUI provide powerful list components that handle scrolling, selection, and layout automatically.

### List Styles

The **Plain** style is a simple list of rows, commonly used for long lists of similar content like contacts or messages. It's efficient and space-saving.

**Grouped** and **Inset Grouped** styles are better for settings screens or forms. They separate content into logical sections with headers and footers. The Inset Grouped style, with its rounded corners and padding, has become the modern standard for system settings and many productivity apps.

### Row Content

Within a list, rows follow standard patterns. A **Standard** row has just a title. **Subtitle** rows add a second line of text for context. **Value** rows place a title on the left and a detail on the right, perfect for settings like "Wi-Fi: Connected".

Lists also support interactions natively. **Swipe actions** allow users to perform tasks like deleting or flagging items without opening them. Standard convention places destructive actions (like Delete) on the trailing edge (swiping left) and positive actions (like Mark Unread) on the leading edge.

## Data Entry and Forms

iOS forms have specific conventions that differ from the web.

### Text Input

Text fields come with built-in behaviours you should leverage. A **Secure** text field automatically hides passwords. A **Search** field includes the magnifying glass icon and clear button. Configuring the correct keyboard type (email, number pad, URL) is arguably the most important "design" decision you make for a form—it dramatically improves the user experience.

### Selection Controls

Where the web might use a checkbox, iOS uses a **Switch** for binary on/off states. It provides clear visual feedback and a satisfying tactile interaction.

For choosing between options, you have several tools:
For choosing between multiple options, you can use **Segmented Controls** for small groups of 2-5 mutually exclusive views, **Pickers** for dates or long lists, and **Steppers** for simple incremental adjustments. Modern date pickers are particularly versatile, offering both inline calendar views and compact fields that expand.

## Progress and Activity

When the app is working, users need feedback.

For indeterminate wait times (like a network request), use an **Activity Indicator** (the spinning gear). It tells users "something is happening, please wait."

For determinate tasks (like a download), use a **Progress Bar** to show exactly how much is left. This reduces anxiety by giving a clear endpoint.

The **Pull to Refresh** control is a standard pattern for updating content lists. It's so ingrained in iOS culture that users will instinctively pull down on any list they expect to update.

## The Customisation Trade-off

One of the most common questions is: "Should I build a custom component?"

### The Case for Standard

Standard components are "free" in many ways. They automatically support:
Standard components offer significant advantages out of the box, including automatic support for **Dynamic Type** and **Dark Mode**, pre-configured **Accessibility** traits for VoiceOver, and seamless **Evolution** as the system's visual style changes over time.

### The Case for Custom

You should build custom components when the standard ones fundamentally don't solve your problem, or when brand identity is the primary goal (like in a game or a highly branded lifestyle app).

If you do build custom, you inherit the responsibility for all the "free" features listed above. You must manually implement accessibility, dynamic sizing, and theme adaptation.

## Try It Yourself

### Exercise 1: Component Audit

Open the Settings app on your iPhone. Identify at least five different standard components (lists, switches, buttons, navigation links). Note how they are grouped and how they interact.

### Exercise 2: List Design

Sketch a "Profile" screen for an app. Decide which list style (Plain or Inset Grouped) fits best. Plan the rows: which should be simple navigation? Which need toggles? Which need value styles?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-components-quiz",
  "type": "multiple-choice",
  "title": "iOS Standard Components",
  "description": "Test your understanding of iOS UI components.",
  "difficulty": "easy",
  "question": "Why is the Inset Grouped list style commonly used for settings screens?",
  "options": [
    {
      "id": "a",
      "text": "It fits more content on the screen than a plain list",
      "isCorrect": false,
      "explanation": "Inset lists actually use more space due to padding and margins."
    },
    {
      "id": "b",
      "text": "It visually separates distinct sections of related options, making complex forms easier to scan",
      "isCorrect": true,
      "explanation": "Correct! The visual separation of rounded groups helps users digest complex sets of options."
    },
    {
      "id": "c",
      "text": "It is the only style that supports switches",
      "isCorrect": false,
      "explanation": "Any list style can contain switches."
    },
    {
      "id": "d",
      "text": "It loads faster than other list styles",
      "isCorrect": false,
      "explanation": "Performance is identical across list styles."
    }
  ]
}
-->

## Key Takeaways

Effective iOS interfaces prioritise hierarchy by using **Filled** buttons for primary actions and **Inset Grouped** lists for settings and forms, while reserving **Plain** lists for general content. By leveraging native input behaviours like **Switches** and correct keyboard types, you gain accessibility and future-proof platform updates for free, whereas custom components require manual implementation of these critical features.

## Next Steps

Continue to [Touch and Gestures](./02-touch-and-gestures.md) →
