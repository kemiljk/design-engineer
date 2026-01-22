# Safe Areas and Layout

> **Quick Summary:** In a world of notches, Dynamic Islands, and rounded corners, the rectangular screen is a myth. Safe areas act as the guard rails of iOS layout, ensuring your content is always visible and interactive while allowing background elements to extend beautifully to the edge.

## What You'll Learn

- Why the rectangular screen concept no longer applies to modern iOS devices
- How to use safe areas to protect interactive content
- Strategies for achieving immersive "full-bleed" designs
- Managing system-reserved zones (dynamic island, home indicator, rounded corners)

## The Death of the Rectangle

For decades, we designed for perfect rectangles. Coordinates like `(0,0)` meant the top-left corner. On modern iPhones, `(0,0)` is inside a rounded corner, possibly behind a status bar, or cut off by a camera housing.

**Safe Areas** define the rectangular portion of the screen where it is guaranteed to be safe to place interactive content. Anything outside the safe area might be obscured by hardware (notch, Dynamic Island, corners), covered by system UI (Home Indicator, Status Bar), or be physically difficult to tap (edges of the screen).

Critically, **backgrounds should ignore safe areas**. To create an immersive, premium feel, your background colours and images should extend to the physical edge of the device. Only your content—text, buttons, inputs—needs to be constrained.

## Anatomy of the Safe Area

### The Top Inset

The top safe area inset varies significantly by device. On older iPhones (SE), it's just the status bar (20pt). On modern iPhones with the Dynamic Island, it's significantly larger (59pt) to accommodate the camera hardware and interactive system UI.

If you place a custom back button at `y=20` on a modern iPhone, it will sit directly underneath the Dynamic Island, completely untappable. Respecting the top layout guide ensures your navigation controls slide down automatically to the correct position on every device.

### The Bottom Inset

The bottom inset (typically 34pt) exists to protect the Home Indicator—the horizontal bar used for swiping home or switching apps.

Placing interactive elements like buttons or tab bars directly at the bottom edge (`y=0`) is a critical error. Users trying to tap your button will accidentally swipe home. The bottom safe area ensures clear separation between your app's interactions and the system's gestures.

### The Side Insets

In portrait orientation, side insets are usually zero. However, in landscape orientation, the notch or Dynamic Island sits on the *side* of the screen. To prevent content from being covered, the safe area insets increase on the left and right, effectively "letterboxing" your interactive content while allowing backgrounds to fill the width.

## Layout Best Practices

### Full-Bleed Design

iOS apps should feel expansive. Avoid trapping your entire interface inside the safe area boundaries, which creates unsightly letterboxing.
To achieve a "full bleed" effect, you should pin your background views to the screen edges (superview) while constraining interactive content like text and buttons to the **Safe Area Layout Guide**. This ensures that headers and tab bars extend infinitely to the device edges while remaining readable and tappable.

### Scrolling Content

Scroll views have special behaviour. Their content should scroll *behind* the navigation bar and tab bar, not clip at their edges. This allows the user to see more context. The system automatically handles "content insets" for scroll views, ensuring that the last item in a list isn't hidden behind the Home Indicator when you scroll to the bottom.

### Designing for Variation

You cannot hard-code dimensions. The "height of the status bar" is a variable, not a constant.
Modern iOS devices present varying layout challenges, from the rectangular screen of the **iPhone SE** to the rounded display and Dynamic Island of the **iPhone 15, 16, and Pro Max** models.

Your layout must adapt. Auto Layout (and SwiftUI's layout system) is built for this. By constraining views to the Safe Area guides rather than absolute constants, your app adapts to future devices (with potentially larger islands or different corners) without a single code change.

## Try It Yourself

### Exercise 1: The Red Box Test

Create a simple layout with a red box background and a text label.
1.  Pin the red box to the **screen edges**.
2.  Pin the text label to the **safe area edges**.
3.  Run the app in the Simulator on an iPhone SE and an iPhone 16 Pro.
4.  Rotate both devices to landscape.

Observe how the red box always fills the screen, but the text moves around to stay visible. This is the core of adaptive iOS layout.

### Exercise 2: Bottom Button Placement

Design a screen with a "Confirm" button at the bottom.
- How does it look on an iPhone with a Home button?
- How does it look on an iPhone with Face ID?
- Does it look visually balanced in both cases? (Hint: You often need *more* padding than just the safe area to make it look right on Home button devices).

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-safe-areas-quiz",
  "type": "multiple-choice",
  "title": "Safe Areas and Layout",
  "description": "Test your understanding of iOS safe areas.",
  "difficulty": "medium",
  "question": "When designing a custom navigation bar with a background colour, how should you configure its constraints?",
  "options": [
    {
      "id": "a",
      "text": "Constrain the background and the content to the Safe Area Top",
      "isCorrect": false,
      "explanation": "This leaves a white/black gap behind the status bar, looking broken."
    },
    {
      "id": "b",
      "text": "Constrain the background to the Superview Top (screen edge) and the content to the Safe Area Top",
      "isCorrect": true,
      "explanation": "Correct! The background extends behind the status bar for a seamless look, while the buttons and title sit safely below the hardware sensors."
    },
    {
      "id": "c",
      "text": "Hard-code the height to 88 points",
      "isCorrect": false,
      "explanation": "Status bar heights vary by device. Hard-coding will break on newer iPhones."
    },
    {
      "id": "d",
      "text": "Ignore safe areas entirely and add 20px padding",
      "isCorrect": false,
      "explanation": "20px is insufficient for Face ID devices, which have much taller top insets."
    }
  ]
}
-->

## Key Takeaways

- Backgrounds enjoy a full-bleed effect, while interactive content remains visible across various Touch ID and Face ID devices
- You must be particularly careful to avoid placing controls in the **home indicator zone**
- Always use layout guides instead of hard-coded values to future-proof your interface

## Next Steps

Continue to [Widgets and Extensions](./04-widgets-and-extensions.md) →
