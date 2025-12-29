# Standard UI Components

> **Quick Summary:** iOS provides a rich set of standard components. Using them correctly ensures familiarity and accessibility for users.

## What You'll Learn

- Buttons and controls
- Lists and tables
- Forms and input
- When to customize vs. use standard

## Buttons

### Button Types
- **Filled:** High emphasis, primary actions
- **Gray:** Medium emphasis
- **Tinted:** Subtle emphasis
- **Plain:** Text-only, low emphasis
- **Bordered:** Clear boundaries

### Button Sizes
- Large: 50pt height
- Medium: 44pt height (default)
- Small: 34pt height
- Mini: 28pt height

### Best Practices
- Clear, action-oriented labels
- One primary button per view
- Appropriate size for context
- 44pt minimum touch target

## Lists and Tables

### List Styles
- **Plain:** Simple list, no grouping
- **Grouped:** Sections with headers
- **Inset Grouped:** Rounded sections
- **Sidebar:** Navigation lists

### Row Types
- Standard: Title only
- Subtitle: Title + secondary text
- Value: Title + right-aligned value
- Custom: Your own layout

### Swipe Actions
- Leading: Less common actions
- Trailing: Delete, common actions
- Full swipe: Primary action

## Forms

### Text Fields
- Standard: Single line input
- Secure: Password entry
- Search: Magnifying glass icon

### Pickers
- Date Picker: Inline, compact, or wheels
- Segmented Control: Few mutually exclusive options
- Stepper: Increment/decrement values
- Slider: Continuous value selection

### Toggles
- Switch: Binary on/off
- Checkbox: Not standard iOS (use Switch)

## Selection

### Single Selection
- Checkmark in list rows
- Segmented control for few options
- Picker for many options

### Multiple Selection
- Edit mode with checkmarks
- Chips/tags for selected items

## Progress and Activity

- **Activity Indicator:** Indeterminate spinner
- **Progress Bar:** Determinate progress
- **Pull to Refresh:** Update content

## When to Customize

### Use Standard When
- Standard behaviour matches your need
- Users expect standard interaction
- Accessibility is critical
- Development time is limited

### Customize When
- Standard doesn't fit your brand
- Unique interaction is needed
- You can maintain accessibility
- The customization adds value

## Try It Yourself

### Exercise 1: Component Inventory

List all components needed for an app idea. Which are standard? Which need customization?

### Exercise 2: List Design

Design a list view using appropriate row types, swipe actions, and section styling.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-components-quiz",
  "type": "multiple-choice",
  "title": "iOS Standard Components",
  "description": "Test your understanding of iOS UI components.",
  "difficulty": "easy",
  "question": "Why should you use standard iOS components when possible?",
  "options": [
    {
      "id": "a",
      "text": "They're the only components Apple allows",
      "isCorrect": false,
      "explanation": "Custom components are allowed, but standards have benefits."
    },
    {
      "id": "b",
      "text": "Users already know how they work, they handle accessibility, and they update with iOS",
      "isCorrect": true,
      "explanation": "Correct! Standard components provide familiarity, built-in accessibility support, and automatic updates with new iOS features and styles."
    },
    {
      "id": "c",
      "text": "They're faster to render than custom components",
      "isCorrect": false,
      "explanation": "Performance isn't the main benefit—consistency and user expectations are."
    },
    {
      "id": "d",
      "text": "Custom components aren't allowed in the App Store",
      "isCorrect": false,
      "explanation": "Many apps successfully use custom components."
    }
  ]
}
-->

## Key Takeaways

- iOS has extensive standard components
- Buttons have types and sizes for different emphasis
- Lists are highly configurable
- Forms use specific iOS patterns (switches, not checkboxes)
- Customize thoughtfully, not by default

## Next Steps

Continue to [Touch and Gestures](./02-touch-and-gestures.md) →
