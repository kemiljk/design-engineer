# Interaction Design Basics

> **Quick Summary:** Interaction design is the dialogue between a person and a product. It defines how users take action, how the system responds, and how tasks flow from start to finish.

## What You'll Learn

- Core concepts of interaction design (ixd)
- How affordances, signifiers, and feedback loops create intuitive experiences
- Designing for various input methods
- Strategies for effectively managing state and task flows

## The Dialogue of Design

If visual design is about how a product looks, and information architecture is about how it is organised, interaction design (IxD) is about how it behaves. It is the structure of the conversation between the user and the screen.

Good interaction design makes technology feel human. It anticipates needs, provides helpful feedback, and forgives mistakes. Bad interaction design feels like talking to a bureaucrat: rigid, confusing, and indifferent to your goals.

## Affordances

The concept of "affordance" comes from ecological psychology (and later, Don Norman). An affordance is a property of an object that suggests how it can be used. A chair affords sitting. A handle affords pulling. A button affords pressing.

<!-- visual-example: affordances-signifiers-demo -->
<!-- illustration: affordance-signifier -->

In digital interfaces, we don't have physical properties. We simulate them. A button looks "pressable" because we give it a 3D bevel or a drop shadow. A text field looks "fillable" because it has an inner shadow or a border that suggests an empty container.

**False Affordances:** These are dangerous. If text is blue and underlined but doesn't click, it's a false affordance. If a card looks like a button but does nothing, users will click it and think the system is broken.

**Hidden Affordances:** These are features that exist but give no clue. Gestures are the biggest culprit. If a user can swipe a list item to delete it, but there is no visual indicator, they may never discover the feature. While acceptable for power-user shortcuts, hidden affordances should never be the only way to perform a critical task.

## Signifiers

If an affordance is the *ability* to do something, a signifier is the *clue* that tells you it's there.

Think of a door. The flat plate on the door is an affordance for pushing. The sign "PUSH" is the signifier. In a perfect world, the affordance is so obvious you don't need the signifier. In the real world (and in UI), we need both.

Common UI signifiers include specific visual styling like blue text for links, icons such as chevrons that indicate forward movement, and motion cues like pulsing buttons that show the system is waiting for input. On desktop, the cursor changing into a hand remains the ultimate signifier of clickability.

Not everything needs a neon sign. A primary "Checkout" button needs a strong signifier (bold colour, large size), while a secondary "Cancel" link should have a weaker signifier such as plain text in a neutral colour. If everything screams for attention, nothing is heard.

<!-- illustration: signifier-strength -->

## Feedback Loops

Feedback is the system's way of saying, "I heard you." Without feedback, users are left guessing. Did the button work? Is the app frozen? Should I click it again?

<!-- visual-example: interaction-feedback-demo -->
<!-- illustration: feedback-loop -->

**Immediate vs. Delayed:**
- **Instant (< 100ms):** When you click a button, it should visually depress immediately. This acknowledges the physical action.
- **Processing (100ms - 1s):** If the system is thinking, show a spinner or loading state. This acknowledges the request.
- **Result:** Finally, show the outcome. The form disappears, the success message appears, or the new page loads.

**Error Feedback:**
When things go wrong, feedback should be helpful, not just alarming. "Error 500" tells the user nothing. "We couldn't save your changes because the internet connection was lost" explains the problem. "Try checking your WiFi" offers a solution.

## Input Patterns

Different devices offer different ways to interact. Designing for a mouse is fundamentally different from designing for a thumb.

### Pointer (Mouse/Trackpad)
The mouse is a precision instrument. It allows for "Hover"—a state where the user can preview an interaction before committing. Tooltips, hover effects, and precise cursor placement are powerful tools here. However, you can never rely on hover for essential tasks, because it doesn't exist on touchscreens.

### Touch
Touch is coarse. A finger covers a large area of the screen. Touch targets must be large (at least 44x44 points) to prevent "fat finger" errors. Touch also lacks a hover state. You touch it, or you don't. This means signifiers must be visible at all times, not just on hover.

### Keyboard
Power users and users with motor impairments rely on the keyboard. A good interaction design includes a logical "Tab Order"—focus moving from top to bottom, left to right. It also requires visible "Focus States" (usually a ring around the element) so the user knows where they are.

### Gesture
Gestures (swipe, pinch, long-press) are efficient but have low discoverability. They act as shortcuts. Always provide a visible alternative. If you can swipe to delete, also provide a delete button in the edit menu.

## State Management

A button typically cycles through several states, including its default resting position, a hover state that shows user interest, and a pressed state for active interaction. It should also have distinct styles for disabled states to explain why an action is unavailable, and a loading state to indicate that a request is currently processing.

Screens similarly cycle through states, using empty states to provide calls to action when no data exists, and loading states or skeletons to manage the transition while data is being fetched. Error states communicate when something has gone wrong, while the ideal state shows the screen fully populated with its intended content.

## Flow Design

Flow is the path a user takes to achieve a goal. A good flow feels effortless; a bad flow feels like an obstacle course.

**Happy Path vs. Edge Cases:**
Designers often focus on the "Happy Path"—everything goes right, the user enters valid data, and the system works. But interaction design happens in the edge cases. What if the username is taken? What if the credit card is declined? What if the user hits "Back" in the middle of a checkout?

**Friction:**
Usually, we want to reduce friction—fewer clicks, fewer forms, faster loading. But sometimes, friction is good. A "Delete Account" button should have friction (a confirmation dialog). A "Send Money" flow should have a review step. Use friction intentionally to prevent errors.

## Micro-interactions

Micro-interactions are the small moments that make a product feel alive. The way a toggle switch slides, the bounce of a notification, the "heart" animation when you like a post.

These aren't just delight; they are functional. A toggle animation confirms the state change. A character counter in a text field provides constraints. Good micro-interactions provide immediate, clear feedback in a way that feels natural and physical.

## Try It Yourself

Perform an affordance audit on your favourite app by identifying every tappable element on the home screen and noting the visual signifiers that indicated its interactivity. Take note of any hidden gestures you discovered by accident that might lack clear clues for new users.

### Exercise 2: State Mapping
Draw a simple "Submit" button. Now draw it in all 5 states: Default, Hover, Focused, Pressed, Disabled, and Loading. How do you distinguish "Disabled" from "Default" without using text?

### Exercise 3: Friction Hunt
Find a task you do often (like paying a bill). Map out the steps. Where is the friction? Is it helpful (preventing errors) or harmful (wasting time)? How would you redesign it?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "interaction-design-quiz",
  "type": "multiple-choice",
  "title": "Affordances and Signifiers",
  "description": "Test your understanding of interaction design concepts.",
  "difficulty": "medium",
  "question": "What is the difference between an affordance and a signifier?",
  "options": [
    {
      "id": "a",
      "text": "Affordances are for designers, signifiers are for developers",
      "isCorrect": false,
      "explanation": "Both concepts are about user experience, not team roles."
    },
    {
      "id": "b",
      "text": "An affordance is what you CAN do; a signifier indicates HOW to do it",
      "isCorrect": true,
      "explanation": "Correct! A button affords pressing (the action possible). Its raised appearance, hover state, and cursor change are signifiers that indicate it's pressable."
    },
    {
      "id": "c",
      "text": "Affordances are visual, signifiers are behavioural",
      "isCorrect": false,
      "explanation": "Actually, it's somewhat the opposite—signifiers are the visual/behavioural cues that indicate affordances."
    },
    {
      "id": "d",
      "text": "They mean the same thing but affordance is the older term",
      "isCorrect": false,
      "explanation": "They're distinct concepts with different meanings and applications."
    }
  ]
}
-->

## Key Takeaways

- Interaction design defines the functional conversation between the user and the product, where affordances represent capabilities and signifiers provide the necessary clues for their use
- By providing immediate and clear feedback to close the interaction loop and using friction intentionally to prevent errors, you create intuitive experiences

## Next Steps

Continue to [Usability Heuristics](./04-usability-heuristics.md) →
