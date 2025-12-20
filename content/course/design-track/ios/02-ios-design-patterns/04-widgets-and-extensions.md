# Widgets and Extensions

> **Quick Summary:** Widgets and extensions extend your app beyond its main interface. Design them to provide value at a glance.

## What You'll Learn

- Home Screen widgets
- Lock Screen widgets
- Live Activities
- Design principles for glanceable content

## Home Screen Widgets

### Widget Sizes
- **Small:** 2×2 app icons, ~169×169 pt
- **Medium:** 4×2 app icons, ~360×169 pt
- **Large:** 4×4 app icons, ~360×376 pt
- **Extra Large:** iPad only, full width

### Design Principles
- **Glanceable:** Information at a glance
- **Focused:** One idea per widget
- **Updated:** Show current, relevant data
- **Tappable:** Deep link into app

### What Works Well
- Current status (weather, stocks)
- Quick actions (shortcuts)
- Progress (fitness, goals)
- Upcoming items (calendar, reminders)

### What Doesn't Work
- Dense information
- Real-time updates (battery drain)
- Scrollable content
- Complex interactions

## Lock Screen Widgets

Introduced in iOS 16:

### Characteristics
- Much smaller than Home Screen
- Limited color (monochrome + accent)
- Even more glanceable
- Three placement areas

### Sizes
- Circular: Small status
- Rectangular: Text + icon
- Inline: Single line above time

### Design Constraints
- Minimal information
- High contrast
- Clear at arm's length

## Live Activities

Dynamic, real-time content:

### Use Cases
- Sports scores
- Delivery tracking
- Timers and countdowns
- Ride status

### Locations
- Lock Screen
- Dynamic Island (on supported devices)
- Notification banner

### Design Considerations
- Compact and expanded states
- Real-time updates
- Clear, scannable information
- Graceful degradation

## Dynamic Island

### Integration
- Compact: Minimal presence
- Expanded: More detail on long press
- Minimal: Smallest, least intrusive

### Design Tips
- Embrace the shape
- Smooth animations
- Clear information hierarchy
- Consider both compact and expanded

## Best Practices

### Consistency
Match your app's visual language while respecting widget conventions.

### Updates
Widgets update on a budget—design for meaningful update intervals.

### Interactivity
Widgets support limited interactivity:
- Tap to open app
- Button actions (iOS 17+)
- Toggle states (iOS 17+)

## Try It Yourself

### Exercise 1: Widget Design

Design a widget for an app idea in all three sizes. What information changes per size?

### Exercise 2: Lock Screen

Design a Lock Screen widget. How do you convey value in such limited space?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-widgets-quiz",
  "type": "multiple-choice",
  "title": "Widgets and Extensions",
  "description": "Test your understanding of iOS widgets.",
  "difficulty": "medium",
  "question": "What should iOS widgets prioritize in their design?",
  "options": [
    {
      "id": "a",
      "text": "Interactive controls for completing tasks without opening the app",
      "isCorrect": false,
      "explanation": "While iOS 17+ adds interactivity, widgets primarily show glanceable information."
    },
    {
      "id": "b",
      "text": "Glanceable, relevant information that doesn't require interaction",
      "isCorrect": true,
      "explanation": "Correct! Widgets should provide at-a-glance value—users expect to see useful information instantly, not have to interact to reveal it."
    },
    {
      "id": "c",
      "text": "Detailed information that replaces opening the app",
      "isCorrect": false,
      "explanation": "Widgets have limited space—they complement the app, not replace it."
    },
    {
      "id": "d",
      "text": "Animated content to draw attention",
      "isCorrect": false,
      "explanation": "Widgets should be calm and respect user attention, not animate constantly."
    }
  ]
}
-->

## Key Takeaways

- Widgets provide glanceable information
- Different sizes serve different needs
- Lock Screen widgets are more constrained
- Live Activities show real-time dynamic content
- Design for meaningful updates, not constant updates

## Congratulations!

You've completed the iOS Design Patterns module!

Continue to [Designing for iOS: Designing iOS Apps in Figma](../03-designing-for-ios/01-designing-ios-apps-in-figma.md) →
