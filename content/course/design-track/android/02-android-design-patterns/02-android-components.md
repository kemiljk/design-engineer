# Android Components

> **Quick Summary:** Material Design 3 provides a robust library of components that are adaptive, accessible, and expressive. Choosing the right component isn't just about aesthetics—it's about communicating hierarchy and interaction models correctly.

## What You'll Learn

- Functional hierarchy of Android buttons (filled, tonal, outlined, text)
- When to employ the floating action button
- Selecting correct controls for chips, radio buttons, and checkboxes
- Containment surfaces like cards and bottom sheets

## Buttons and Actions

Buttons on Android are part of a strict hierarchy designed to guide user attention.

Android buttons follow a strict priority system. The **Filled Button** is the high-emphasis primary choice for main actions like "Submit," while the **Tonal Button** offers a secondary alternative using lighter container colours. **Outlined Buttons** serve medium-emphasis needs, often paired as secondary choices, and **Text Buttons** are for low-emphasis actions within larger components like cards or dialogs.

### The Floating Action Button (FAB)

The FAB is the signature element of Material Design. It represents the primary constructive action of the screen.
The FAB represents the primary constructive action of the screen. It can be a **Standard FAB** with only an icon for common actions like "New Message," or an **Extended FAB** that includes a text label for clarity or larger screen contexts. To maintain a clear hierarchy, you should generally limit yourself to one FAB per screen.

## Selection Controls

Chips are compact elements used for information input, filtering content, or triggering context-specific actions. Selection is managed through **Checkboxes** for multiple items, **Radio Buttons** for mutually exclusive choices, and **Switches** for immediate binary settings like "Airplane Mode." Note that switches should never replace a "Submit" button as they imply an instant system state change.

## Containment and Surfaces

### Cards

Cards contain content and actions about a single subject.
Cards organise content into a single subject using **Elevated**, **Filled**, or **Outlined** styles depending on the desired level of visual separation and container noise.

### Bottom Sheets

Bottom sheets slide up from the bottom of the screen. They are safer and more flexible than dialogs because they often leave context visible.
**Standard Bottom Sheets** co-exist with main content, whereas **Modal Bottom Sheets** block interaction to focus on specific menus or detail views.

### Dialogs

Dialogs are disruptive. They appear in the center of the screen and block everything else. Use them sparingly—only for critical decisions like confirming a deletion or accepting permissions.

## Communication

### Snackbars

Snackbars provide brief feedback about an operation ("Message sent," "Item deleted"). They appear at the bottom and disappear automatically. They can contain a single text action (e.g., "Undo"). Do not use them for critical errors that require acknowledgement.

### Progress Indicators

Visual feedback for loading can be **Linear**, which is ideal for page transitions, or **Circular**, for small elements or "pull to refresh" interactions.

Every interactive component in Android has standard visual states that must be designed for accessibility and feedback. This starts with the **Enabled** resting state, which transitions to a **Disabled** state—visually greyed out at 38% opacity—when an action is unavailable. User interaction is confirmed through the **Pressed** state with a ripple effect overlay, while the **Focused** state ensures usability for keyboard and controller navigation on devices like TVs and tablets.

## Try It Yourself

### Exercise 1: Action Hierarchy

Design a "Checkout" screen footer. It needs:
Design a footer for a checkout screen that includes a "Pay Now" button, a "Cancel Order" action, and an option to "Add Discount Code." You must assign the correct button style—Filled, Outlined, or Text—to each element based on its priority within the user's hierarchy of needs.

### Exercise 2: Selection Logic

You are designing a filter menu. Users can filter by **Category** (Mutually exclusive), **Size** (Multiple selection), and **On Sale** (Immediate toggle). Which component do you choose for each?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-components-quiz",
  "type": "multiple-choice",
  "title": "Android Components",
  "description": "Test your understanding of Material components.",
  "difficulty": "easy",
  "question": "What is the primary difference between a Switch and a Checkbox?",
  "options": [
    {
      "id": "a",
      "text": "Switches are round, checkboxes are square",
      "isCorrect": false,
      "explanation": "While visually true, the functional difference is more important."
    },
    {
      "id": "b",
      "text": "Switches imply immediate activation (like a light switch); checkboxes imply selection for later submission (like a form)",
      "isCorrect": true,
      "explanation": "Correct! Use switches for settings that apply instantly. Use checkboxes for forms where the user must click 'Save' or 'Submit' later."
    },
    {
      "id": "c",
      "text": "Checkboxes allow multiple selection; switches only allow single selection",
      "isCorrect": false,
      "explanation": "Both allow independent toggling of options."
    },
    {
      "id": "d",
      "text": "Switches are for mobile, checkboxes are for desktop",
      "isCorrect": false,
      "explanation": "Both components are used across all form factors."
    }
  ]
}
-->

## Key Takeaways

- To build effective Android interfaces, you must strictly follow the established button hierarchy
- Reserve the FAB for the single most important action on a screen
- Bottom sheets are generally preferred over disruptive dialogs
- Always distinguish between switches for immediate activation and checkboxes for form data
- Ensure every interactive element includes a robust pressed ripple state

## Next Steps

Continue to [Android Layout System](./03-android-layout-system.md) →
