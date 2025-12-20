# Android Components

> **Quick Summary:** Material Design provides a comprehensive component library. Knowing when and how to use each component is essential.

## What You'll Learn

- Buttons and actions
- Selection components
- Containment components
- Communication components

## Buttons

### Button Types (Emphasis)
- **Filled:** Highest emphasis, primary actions
- **Tonal:** Medium emphasis
- **Outlined:** Medium emphasis, alternative
- **Text:** Lowest emphasis, tertiary actions

### FAB (Floating Action Button)
- Single primary action per screen
- Floats above content
- Usually bottom-right
- Standard, small, or extended

### Icon Buttons
- Action without label
- Toolbar actions
- Toggle states
- Need adequate touch target

## Selection Components

### Checkboxes
- Multiple selection from list
- Independent options
- Binary state (checked/unchecked)

### Radio Buttons
- Single selection from list
- Mutually exclusive options
- Always in groups

### Switches
- Immediate on/off toggle
- Settings and controls
- Clear binary state

### Chips
- Filter, input, or action
- Can be dismissible
- Compact selection method

## Containment

### Cards
- Related content and actions
- Clearly bounded
- Various layouts
- Tappable as unit or with internal actions

### Dialogs
- Require attention/decision
- Modal, blocking
- Simple, alert, or full-screen
- Use sparingly

### Bottom Sheets
- Additional content/actions
- Slides up from bottom
- Modal or persistent
- Can be full-screen

### Lists
- Groups of related items
- Various item layouts
- Supporting text/actions
- Section headers

## Communication

### Snackbars
- Brief feedback messages
- Bottom of screen
- Optional action
- Auto-dismiss

### Progress Indicators
- Linear: Determinate or indeterminate
- Circular: Loading states
- Show system working

### Badges
- Status indicators
- On icons or avatars
- Notification counts

## Component States

All interactive components have states:
- Enabled (default)
- Hovered
- Focused
- Pressed
- Dragged
- Disabled

Design all states for custom components.

## Try It Yourself

### Exercise 1: Component Selection

For these scenarios, which component?
1. User needs to agree to terms
2. Primary action on a form
3. Filter a product list
4. Show upload progress
5. Confirm a deletion

### Exercise 2: State Design

Design a custom card with all interactive states.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-components-quiz",
  "type": "multiple-choice",
  "title": "Android Components",
  "description": "Test your understanding of Material components.",
  "difficulty": "easy",
  "question": "What visual feedback do Material components provide on touch?",
  "options": [
    {
      "id": "a",
      "text": "Color change only",
      "isCorrect": false,
      "explanation": "Material uses a distinctive feedback mechanism beyond simple color change."
    },
    {
      "id": "b",
      "text": "A ripple effect that emanates from the touch point",
      "isCorrect": true,
      "explanation": "Correct! Material components use ripple animations that radiate from the touch point, providing spatial feedback that connects the user's action to the response."
    },
    {
      "id": "c",
      "text": "No feedback—the result is the feedback",
      "isCorrect": false,
      "explanation": "Immediate touch feedback is important for perceived responsiveness."
    },
    {
      "id": "d",
      "text": "A bounce animation",
      "isCorrect": false,
      "explanation": "Bounce is more characteristic of iOS springs than Material ripples."
    }
  ]
}
-->

## Key Takeaways

- Button types indicate emphasis level
- Selection components match selection model
- Dialogs block; bottom sheets supplement
- All components have multiple states
- Use standard components when possible

## Next Steps

Continue to [Android Layout System](./03-android-layout-system.md) →
