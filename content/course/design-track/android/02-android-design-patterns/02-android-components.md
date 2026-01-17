# Android Components

> **Quick Summary:** Material Design 3 provides a robust library of components that are adaptive, accessible, and expressive. Choosing the right component isn't just about aesthetics—it's about communicating hierarchy and interaction models correctly.

## What You'll Learn

- The hierarchy of buttons (Filled, Tonal, Outlined, Text)
- When to use the Floating Action Button (FAB)
- Selection controls: Chips vs. Radios vs. Checkboxes
- Using containment surfaces like Cards and Bottom Sheets

## Buttons and Actions

Buttons on Android are part of a strict hierarchy designed to guide user attention.

### The Button Hierarchy

1.  **Filled Button:** This is your high-emphasis workhorse. Use it for the primary action in a flow, like "Next," "Submit," or "Buy." It demands attention.
2.  **Tonal Button:** A middle ground between filled and outlined. It uses a secondary container colour. It's perfect for high-priority actions that shouldn't distract from the main content or compete with a FAB.
3.  **Outlined Button:** Use this for medium-emphasis actions, often paired with a primary button (e.g., a "Cancel" button next to a "Submit" button).
4.  **Text Button:** The lowest emphasis. These are used for less important actions or within cards and dialogs where you don't want to clutter the interface with containers.

### The Floating Action Button (FAB)

The FAB is the signature element of Material Design. It represents the primary constructive action of the screen.
- **Standard FAB:** An icon in a circle. Ideal for actions like "New Message" or "Play."
- **Extended FAB:** Includes a text label. Use this when the icon alone is ambiguous or when you have plenty of screen space (like on a tablet).
- **Design Rule:** Generally, limit yourself to one FAB per screen. If you have two "primary" actions, neither is truly primary.

## Selection Controls

### Chips

Chips are versatile, compact elements.
- **Input Chips:** Represent complex information, like a contact in an email "To" field.
- **Filter Chips:** Allow users to refine content (e.g., "Price: Low to High," "Open Now").
- **Action Chips:** Trigger actions related to primary content, like "Play Trailer."

### Checkboxes, Radios, and Switches

- **Checkboxes:** Use these when users can select multiple items from a list.
- **Radio Buttons:** Use these when users must select exactly one item from a list.
- **Switches:** Use these for binary on/off settings that take effect immediately (like "Airplane Mode"). **Pro Tip:** Never use a switch for a "Submit" action; switches imply immediate system state change.

## Containment and Surfaces

### Cards

Cards contain content and actions about a single subject.
- **Elevated Card:** Has a shadow. Good for separating content from a patterned background.
- **Filled Card:** Has a subtle background fill. Good for visual separation without the noise of shadows.
- **Outlined Card:** Has a border. Good for clean, high-density layouts.

### Bottom Sheets

Bottom sheets slide up from the bottom of the screen. They are safer and more flexible than dialogs because they often leave context visible.
- **Standard Bottom Sheet:** Co-exists with main content (like a music player mini-bar).
- **Modal Bottom Sheet:** Blocks interaction with the background. Excellent for complex menus or deep-linking details.

### Dialogs

Dialogs are disruptive. They appear in the center of the screen and block everything else. Use them sparingly—only for critical decisions like confirming a deletion or accepting permissions.

## Communication

### Snackbars

Snackbars provide brief feedback about an operation ("Message sent," "Item deleted"). They appear at the bottom and disappear automatically. They can contain a single text action (e.g., "Undo"). Do not use them for critical errors that require acknowledgement.

### Progress Indicators

- **Linear:** Great for filling headers or indicating page loads.
- **Circular:** Perfect for "pull to refresh" or loading specific small elements.

## States

Every interactive component in Android has standard visual states that you must design for:
- **Enabled:** The resting state.
- **Disabled:** Visually grayed out (opacity 38%).
- **Pressed:** A ripple effect overlay confirms the touch.
- **Focused:** Essential for keyboard/controller navigation (e.g., on TV or tablets).

## Try It Yourself

### Exercise 1: Action Hierarchy

Design a "Checkout" screen footer. It needs:
- A "Pay Now" button
- A "Cancel Order" button
- A "Add Discount Code" button
Assign the correct button style (Filled, Outlined, Text) to each based on priority.

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

- Follow the **Button Hierarchy** (Filled > Tonal > Outlined > Text).
- **FABs** are for the single most important action.
- **Bottom Sheets** are often better than **Dialogs**.
- **Switches** = Immediate; **Checkboxes** = Form Data.
- Always design the **Pressed** (ripple) state.

## Next Steps

Continue to [Android Layout System](./03-android-layout-system.md) →
