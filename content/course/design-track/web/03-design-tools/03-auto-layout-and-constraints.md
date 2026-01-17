# Auto Layout and Constraints

> **Quick Summary:** Auto layout makes designs responsive and maintainable. Components resize, reflow, and adapt automatically instead of breaking when content changes.

## What You'll Learn

- What auto layout is and why it matters
- How to create flexible components with auto layout
- Using constraints for responsive positioning
- Best practices for building production-ready components

## The Problem with Static Design

In the early days of digital design, we treated screens like canvases. We placed a button at `x: 100, y: 200` and it stayed there. This "static design" approach is fragile.

If you change the button text from "OK" to "Submit Application," the background rectangle doesn't grow. The text spills out. If you translate the app into German, the layout breaks. If you view the design on a wider screen, the button stays stuck in place, leaving awkward whitespace.

**Auto Layout** solves this by defining *relationships* rather than positions. Instead of saying "Put this button at 100px," you say "Put this button 20px below the headline."

## What is Auto Layout?

Auto Layout (called "Flexbox" in web development) is a set of rules that tells a container how to arrange its children.

It handles the math for you. If you add an item to a list, the container grows. If you delete an item, it shrinks. If you change the text size, the padding respects the new boundaries. It turns your design from a static drawing into a dynamic system.

## Auto Layout Fundamentals

Just like CSS Flexbox, Auto Layout relies on a few core properties:

**Direction:**
Do the children stack horizontally (like a row of buttons) or vertically (like a form)?

**Spacing (Gap):**
How much space sits between each item? Using a consistent value here (like 8px or 16px) creates visual rhythm without manually measuring every gap.

**Padding:**
How much breathing room is inside the container? This is the space between the container's edge and its content.

**Alignment:**
Where do the children sit? Are they centered? Pushed to the left? Spread out to the edges (`Space Between`)?

## Building with Auto Layout

Let's look at how these properties create real components.

<!-- visual-example: auto-layout-demo -->

**The Button:** A button is a horizontal stack. It wraps the label (and maybe an icon). By setting horizontal padding (e.g., 16px) and vertical padding (e.g., 10px), the button automatically resizes to fit whatever text you type.

**The Card:** A card is a vertical stack. It contains an image, a headline, a description, and a footer. By setting a vertical gap of 16px, you ensure that even if the headline runs to two lines, the description moves down to accommodate it. Nothing overlaps.

**The Navigation Bar:** This uses "Space Between" alignment. The Logo sits on the far left, the Menu on the far right, and the auto layout engine calculates the empty space in the middle. If the screen gets wider, the Logo and Menu stay pinned to their corners.

## Sizing Behaviours

The magic of Auto Layout comes from how items resize. You have three main choices for any element:

<!-- visual-example: sizing-behaviors-demo -->

**1. Fixed Width:**
The element stays exactly the size you set (e.g., 24px icon). It ignores the parent container's size.

**2. Hug Contents:**
The element shrinks to be as small as possible while still fitting everything inside it. A button "hugs" its text label. If you add more text, the button grows.

**3. Fill Container:**
The element stretches to take up all available empty space. In a form, the input field often "Fills Container" so it stretches from the label on the left to the edge of the screen on the right.

## Constraints

While Auto Layout handles items *inside* a stack, **Constraints** tell an item how to behave relative to its parent frame. This is essential for responsive screens.

<!-- visual-example: constraints-demo -->

**Pinning:**
You can pin an object to the **Left**, **Right**, **Top**, or **Bottom**. A floating action button (FAB) pinned to "Bottom Right" will stay in the bottom right corner whether the screen is an iPhone SE or an iPhone Pro Max.

**Stretching:**
Setting constraints to **Left and Right** forces the object to maintain a fixed distance from both edges. As the screen widens, the object stretches. This is perfect for hero images or full-width navigation bars.

## Responsive Components

By combining Auto Layout and Constraints, you can build components that work on any device.

**Responsive Grid:**
Imagine a row of three cards.
- The Container uses Auto Layout (Horizontal).
- The Cards are set to "Fill Container."
- As you stretch the container, the cards widen equally to fill the space.

**Responsive Form:**
- Desktop: Label and Input are side-by-side (Horizontal layout).
- Mobile: Label and Input are stacked (Vertical layout).
- You can achieve this by simply changing the "Direction" property on the parent container.

## Debugging Auto Layout

When your layout breaks (and it will), check these common culprits:

1.  **Wrong Sizing Mode:** Did you set "Fixed" when you meant "Fill"? If text is overflowing a box, the box is probably Fixed.
2.  **Conflicting Constraints:** You can't pin something to the Left AND align it to the Center.
3.  **Nesting Errors:** Auto Layout works best when nested. A Card might be a vertical stack, containing a Header (horizontal stack) and a Footer (horizontal stack). If you try to do it all in one layer, you'll struggle.

## Try It Yourself

### Exercise 1: The Flexible Button
Create a button that has an icon on the left and text on the right. Set it up so that:
- It grows when you type more text.
- The padding stays consistent.
- The space between the icon and text is exactly 8px.

### Exercise 2: The Chat Bubble
Create a chat message component.
- **Message:** Text inside a colored bubble.
- **Timestamp:** Small text below the bubble.
- **Alignment:** "Sent" messages align right; "Received" messages align left.
- Use Auto Layout to make the bubble grow with the text.

### Exercise 3: The Responsive Navbar
Create a navigation bar with a Logo (left) and a "Sign Up" button (right).
- Resize the frame. The Logo should stick to the left, the Button to the right.
- Ensure they never overlap, even on small screens.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "auto-layout-quiz",
  "type": "multiple-choice",
  "title": "Auto Layout Sizing",
  "description": "Test your understanding of auto layout sizing behaviours.",
  "difficulty": "medium",
  "question": "In a form row with a label, input field, and submit button, which sizing behaviour should the INPUT field use?",
  "options": [
    {
      "id": "a",
      "text": "Fixed size, so it's always the same width",
      "isCorrect": false,
      "explanation": "Fixed size doesn't adapt to different screen widths, causing the form to break on smaller screens."
    },
    {
      "id": "b",
      "text": "Hug contents, so it sizes to the text inside",
      "isCorrect": false,
      "explanation": "Hug contents would make the input very small when empty. Not ideal for user input."
    },
    {
      "id": "c",
      "text": "Fill container, so it expands to take remaining space",
      "isCorrect": true,
      "explanation": "Correct! Fill container lets the input stretch to fill available space, adapting to different screen sizes while the label and button maintain their natural sizes."
    },
    {
      "id": "d",
      "text": "Any sizing works, it doesn't matter for inputs",
      "isCorrect": false,
      "explanation": "Sizing behaviour significantly affects how forms respond to different screen widths."
    }
  ]
}
-->

## Key Takeaways

- Auto Layout defines relationships (spacing, padding, alignment) rather than absolute positions.
- Use **Hug Contents** for elements that adapt to their children (buttons).
- Use **Fill Container** for elements that adapt to their parent (inputs, hero sections).
- Use **Constraints** to pin elements to the edges of the screen for responsiveness.
- Nesting layouts allows for complex, flexible component structures.

## Next Steps

Continue to [Prototyping Basics](./04-prototyping-basics.md) →
