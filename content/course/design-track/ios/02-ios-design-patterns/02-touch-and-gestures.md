# Touch and Gestures

> **Quick Summary:** iOS is a direct-manipulation interface. Unlike a mouse-based system where you look at a screen and move a device on a desk, on iOS you touch the content itself. Designing for fingers requires understanding specific constraints like precision, occlusion, and standard gesture expectations.

## What You'll Learn

- Vocabulary of standard iOS gestures (taps, swipes, long presses)
- How to design for the physical realities of direct human interaction
- Handling the lack of hover states with clear visual affordances
- Implementing haptic feedback for a sophisticated tactile experience

## The Standard Gesture Vocabulary

Users don't read manuals; they explore interfaces using a vocabulary of gestures they've learned from the system. If you break these expectations, your app feels broken.

**The Tap** is the primary mechanism for selection. It requires instant, clear feedback—usually a visual highlight or state change—to confirm the system received the input. Without this, users will tap repeatedly, thinking the app has frozen.

Platform navigation relies on several key gestures: **Swipe** from the left edge acts as a universal "Back" button, while pulling down triggers content refreshes and long-swiping list items reveals contextual actions. **Long Press** is the "right click" of iOS, surfacing secondary menus or content previews, and **Pinch and Rotate** provides the standard mechanism for manipulating photos, maps, and documents.

## Designing for Fingers

A cursor is precise—a single pixel. A finger is a blunt instrument that changes shape as it presses.

### The 44-Point Rule

Apple's Human Interface Guidelines famously recommend a minimum touch target size of **44x44 points**. This roughly corresponds to the physical size of a fingertip (about 7-10mm).

Critically, the *visible* element can be smaller than the *touch* target. A standard toolbar icon might be visually 24x24 points, but its invisible tappable area extends to 44x44 points. If you place two small buttons closer than 44 points apart, you guarantee frustration as users accidentally tap the wrong one.

### The Problem of Occlusion

When you touch a screen, your hand covers part of the interface. This is occlusion.

If you design a drag-and-drop interaction, the item being dragged shouldn't be directly under the finger—it should "lift" and offset slightly so the user can see where they are dropping it. Similarly, when pressing a button, the visual feedback needs to be visible *around* the finger, not just directly underneath it.

### No Hover State

Touch screens have no hover state. You cannot rely on tooltips to explain cryptic icons, or hover effects to signal interactiveness. Every interactive element must look interactive by default. Affordances—visual clues like colour, depth, or icons—must communicate "tap me" without a cursor hover.

## Thumb Zones

Most users hold their phone in one hand, using their thumb to interact. This creates natural zones of reachability. The bottom third of the screen is the **Easy Reach** zone, making it prime real estate for primary actions like tab bars and floating action buttons. The middle of the screen requires a slight stretch but is acceptable for lists and content. The top corners are the **Hard Reach** zones. This physical difficulty explains why the system "Back" button is duplicated by a swipe gesture—reaching the top-left corner on a large phone is uncomfortable.

## Haptic Feedback

Haptics add a tactile layer to your design. Modern iPhones use the Taptic Engine to provide incredibly precise physical feedback that reinforces digital interactions.

Different haptics communicate different meanings. A **Selection** haptic feels like a light tick, similar to a clock mechanism, and is perfect for scrolling through a picker. An **Impact** haptic provides a solid tap when a snap-to-grid event happens or a switch toggles. **Notification** haptics are more complex: a Success is two light taps, while an Error is a heavier double-tap that commands attention.

Haptics should be subtle. Like sound design, if you notice it too much, it's probably overdone. Use them to reinforce important physical interactions, not to punctuate every single tap.

## Try It Yourself

### Exercise 1: Touch Target Audit

Take a screenshot of a design you're working on. Overlay a grid of 44x44 point squares. Are any of your interactive elements (buttons, links, icons) smaller than a square? Are any two targets occupying the same square?

### Exercise 2: Gesture Mapping

Choose a complex interaction in your app (like organising a list). Map it to standard gestures:
- Tap to select
- Long press to lift/reorder
- Swipe to delete
- Tap-and-drag to move multiple items

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-touch-quiz",
  "type": "multiple-choice",
  "title": "Touch and Gestures",
  "description": "Test your understanding of iOS touch interactions.",
  "difficulty": "easy",
  "question": "Why is it important to design visual feedback that extends beyond the bounds of the element itself?",
  "options": [
    {
      "id": "a",
      "text": "It looks more modern",
      "isCorrect": false,
      "explanation": "While aesthetics matter, there is a functional reason related to the physics of touch."
    },
    {
      "id": "b",
      "text": "Because the user's finger occludes (covers) the element while pressing it",
      "isCorrect": true,
      "explanation": "Correct! Since the finger covers the button during the press, feedback restricted to the button's interior might be completely hidden. Expanding the feedback ensures the user knows the tap was registered."
    },
    {
      "id": "c",
      "text": "To make the touch target larger",
      "isCorrect": false,
      "explanation": "Visual feedback doesn't change the hit-test area."
    },
    {
      "id": "d",
      "text": "It isn't important; standard button states are sufficient",
      "isCorrect": false,
      "explanation": "Standard states often do this automatically (like the glow or dimming), but custom components need to account for occlusion manually."
    }
  ]
}
-->

## Key Takeaways

- Designing for direct manipulation requires respecting the **44pt minimum touch target**
- Standard system gestures like swiping to go back should be supported consistently
- Since physical fingers occlude what they touch, provide offset **visual feedback** and obvious affordances for interactive elements without relying on hover states
- Use **haptics** to provide subtle physical weight to your digital interactions

## Next Steps

Continue to [Safe Areas and Layout](./03-safe-areas-and-layout.md) →
