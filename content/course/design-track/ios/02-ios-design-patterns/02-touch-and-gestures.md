# Touch and Gestures

> **Quick Summary:** iOS is a direct-manipulation interface. Unlike a mouse-based system where you look at a screen and move a device on a desk, on iOS you touch the content itself. Designing for fingers requires understanding specific constraints like precision, occlusion, and standard gesture expectations.

## What You'll Learn

- The vocabulary of standard iOS gestures
- Designing for the physical reality of fingers
- Haptic feedback as a design layer
- Handling the lack of hover states

## The Standard Gesture Vocabulary

Users don't read manuals; they explore interfaces using a vocabulary of gestures they've learned from the system. If you break these expectations, your app feels broken.

**The Tap** is the primary mechanism for selection. It requires instant, clear feedback—usually a visual highlight or state change—to confirm the system received the input. Without this, users will tap repeatedly, thinking the app has frozen.

**The Swipe** is versatile and directional. A swipe from the left edge acts as a universal "Back" button, a pattern deeply ingrained in iOS muscle memory. Swiping on list items typically reveals contextual actions like "Delete" or "Archive." While vertical swiping handles scrolling, pulling down from the top of a scroll view triggers the standard "Pull to Refresh" action.

**The Long Press** (formerly Force Touch) reveals secondary options, acting effectively as the "right click" of iOS. You should use it to show context menus, preview content (Peek and Pop), or enter edit modes, such as reordering a list.

**Pinch and Rotate** are the standard manipulations for media. Users expect to be able to pinch photos, maps, and documents to zoom in and out, or rotate them with two fingers.

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

- Respect the **44pt minimum touch target** rule, even for small icons.
- Users expect standard gestures (swipe to back, pull to refresh) to work everywhere.
- Your finger covers what you touch; design offset feedback to handle **occlusion**.
- **No hover states** means affordances must be obvious at a glance.
- Use **haptics** to give physical weight to digital interactions.

## Next Steps

Continue to [Safe Areas and Layout](./03-safe-areas-and-layout.md) →
