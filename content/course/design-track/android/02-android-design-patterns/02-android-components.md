# Android Components

> **Quick Summary:** Material Design 3 provides a robust library of components that are adaptive, accessible, and expressive. Choosing the right component isn't just about aesthetics—it's about communicating hierarchy and interaction models correctly.

## What You'll Learn

- The hierarchy of buttons (Filled, Tonal, Outlined, Text)
- When to use the Floating Action Button (FAB)
- Selection controls: Chips vs. Radios vs. Checkboxes
- Using containment surfaces like Cards and Bottom Sheets

## Buttons and Actions

Material Design offers a clear hierarchy of buttons to guide user attention without overwhelming them.

### The Button Hierarchy

1.  **Filled Button:** The highest emphasis. Use this for the single most important action in a linear flow (e.g., "Next", "Submit", "Buy").
2.  **Tonal Button:** A middle ground. It uses a secondary container colour. Perfect for high-priority actions that shouldn't distract from the main content.
3.  **Outlined Button:** Medium emphasis. Use these for secondary actions that pair with a primary button (e.g., "Cancel" next to "Submit").
4.  **Text Button:** Lowest emphasis. Used for less important actions or within cards and dialogs.

### The Floating Action Button (FAB)

The FAB is the signature element of Material Design. It represents the primary action of the screen.

*   **Standard FAB:** An icon in a circle. Ideally used for constructive actions like "New Message," "Add Item," or "Play."
*   **Extended FAB:** Includes a text label. Use this when the icon alone is ambiguous or you have plenty of screen space.
*   **Design Rule:** Only one FAB per screen. If you have two primary actions, neither is primary.

## Selection Controls

### Chips

Chips are versatile, compact elements that represent an input, attribute, or action. They look like rounded pills.
*   **Input Chips:** Represent complex information in a compact form (like a contact in an email "To" field).
*   **Filter Chips:** Allow users to refine content (e.g., "Price: Low to High," "Open Now").
*   **Action Chips:** Trigger actions related to primary content (e.g., "Play Trailer," "Get Directions").

### Checkboxes, Radios, and Switches

*   **Checkboxes:** For selecting multiple items from a list.
*   **Radio Buttons:** For selecting exactly one item from a list.
*   **Switches:** For binary on/off settings that take effect immediately (like "Airplane Mode").

**Pro Tip:** Don't use a switch for a "Submit" action. Switches imply immediate system state change.

## Containment and Surfaces

### Cards

Cards contain content and actions about a single subject. They are versatile containers that can hold images, text, and buttons.
*   **Elevated Card:** Has a shadow. Good for separating content from a patterned background.
*   **Filled Card:** Has a subtle background fill. Good for visual separation without shadows.
*   **Outlined Card:** Has a border. Good for clean, high-density layouts.

### Bottom Sheets

Bottom sheets slide up from the bottom of the screen. They are safer and more flexible than dialogs because they don't necessarily block the user's view of the context.
*   **Standard Bottom Sheet:** Co-exists with main content (like a music player mini-bar).
*   **Modal Bottom Sheet:** Blocks interaction with the rest of the screen. Excellent for complex menus or deep-linking details without leaving the context.

### Dialogs

Dialogs are disruptive. They appear in the center of the screen and require a decision before the user can proceed. Use them sparingly—only for critical decisions like confirming a deletion or accepting permissions.

## Communication

### Snackbars

Snackbars provide brief feedback about an operation. They appear at the bottom of the screen and disappear automatically. They can contain a single text action (e.g., "Undo").
*   **Use for:** "Message sent," "Item deleted."
*   **Don't use for:** Critical errors that must be acknowledged (use a Dialog).

### Progress Indicators

*   **Linear:** Great for filling headers or indicating page loads.
*   **Circular:** Perfect for "pull to refresh" or loading specific small elements.

## States

Every interactive component in Android has standard visual states:
*   **Enabled:** The resting state.
*   **Disabled:** Visually grayed out (opacity 38%).
*   **Pressed:** A ripple effect overlay confirms the touch.
*   **Focused:** Important for keyboard/controller navigation (e.g., on TV or tablets).

Designing custom components means designing *all* these states, not just the resting one.

## Try It Yourself

### Exercise 1: Action Hierarchy

Design a "Checkout" screen footer. It needs:
*   A "Pay Now" button
*   A "Cancel Order" button
*   A "Add Discount Code" button

Assign the correct button style (Filled, Outlined, Text) to each based on priority.

### Exercise 2: Selection Logic

You are designing a filter menu for a shopping app. Users can filter by:
*   **Category:** (Men, Women, Kids) - Mutually exclusive.
*   **Size:** (S, M, L, XL) - Multiple selection allowed.
*   **On Sale:** (Yes/No) - Immediate toggle.

Which component do you choose for each?

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

-   Use the **Button Hierarchy** to guide users: Filled > Tonal > Outlined > Text.
-   **FABs** are for the single most important constructive action.
-   **Bottom Sheets** are often a better choice than **Dialogs** for menus and details.
-   **Switches** are for immediate settings; **Checkboxes** are for form data.
-   Don't forget to design the **Pressed** (ripple) state.

## Next Steps

Continue to [Android Layout System](./03-android-layout-system.md) →
