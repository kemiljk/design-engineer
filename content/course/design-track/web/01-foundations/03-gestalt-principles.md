# Gestalt Principles

> **Quick Summary:** Your users don't see pixels; they see patterns. Gestalt psychology explains the predictable ways human brains group and interpret visual information. Leveraging these principles makes your interface feel intuitive; fighting them makes it feel broken.

## The Brain as a Pattern Matching Machine

In the early 20th century, a group of German psychologists observed something fascinating: the human brain is lazy. It constantly tries to simplify complex visual data into simple, organized wholes. This is **Gestalt** (German for "form" or "shape").

For designers, this is a superpower. If you understand how the brain groups things, you can create layouts that users understand instantly, without needing to read a single label.

## The 7 Core Principles

### 1. Proximity
**The Rule:** Things that are close together are perceived as a group.

**In Practice:** This is the most powerful tool in your layout arsenal. You don't need a box or a line to group a headline with its paragraph; you just need to put them close together.
Maintain proximity by using a small gap between a label and its input, while using a significantly larger gap before the next label to ensure users can instantly identify which elements belong together. Avoid equal spacing everywhere, as it prevents the user from distinguishing logical groupings.

Things that look alike are perceived as related, which is why all primary buttons should share the same visual treatment. Consistency in iconography, colour, and size reduces cognitive load by allowing users to instantly categorise elements without re-learning the interface.

### 3. Continuity
**The Rule:** The eye follows lines and curves. We prefer a continuous path over an abrupt change.

**In Practice:** This is why grid alignment matters. When the left edges of your text, images, and buttons align perfectly, they create an invisible vertical line. The user's eye slides down this line effortlessly. If elements are jagged or misaligned, the eye gets "stuck," and scanning becomes a chore.

The brain fills in missing information to create a complete shape, meaning you don't always need to show an entire element for users to understand it. For instance, a carousel where the final card is cut off at the screen's edge naturally prompts a scroll interaction because the brain "closes" the incomplete shape and understands that more content exists off-screen.

Elements enclosed in the same boundary are perceived as a group, an effect that often overrides proximity. A card component effectively uses this by placing a border around an image, title, and button to tie them together into a single unit of content, even if they are spaced apart internally.

### 6. Figure-Ground
**The Rule:** We separate the visual field into the "figure" (the object of focus) and the "ground" (the background).

**In Practice:** This is essential for popups and modals. When a modal opens, we dim the rest of the page (the "ground") to push the modal (the "figure") forward. If you don't create enough contrast between figure and ground, the user doesn't know what to focus on. Shadow and elevation are your tools here.

Elements that move together are perceived as a group, a principle specific to interaction design. When a user swipes a card away, ensuring the text, imagery, and buttons all move in sync reinforces the shared relationship and maintains the illusion of a single, cohesive object.

## When Principles Collide

Gestalt principles have a hierarchy. **Common Region** (a box) usually beats **Proximity** (spacing). **Proximity** usually beats **Similarity**.

**The Design Debugger:**
When a layout feels "off" but you can't explain why, go through this checklist.
1.  Are related things close enough? (Proximity)
2.  Are unrelated things far enough apart? (Proximity)
3.  Is the hierarchy clear? (Similarity/Figure-Ground)
4.  Is the alignment creating a smooth path for the eye? (Continuity)

## Try It Yourself

Take a screenshot of your design and blur it until the text is unreadable. You should see clear, distinct blobs for navigation and grouped content; if the form appears as one big mess, adjust your spacing until the blurry blobs match your intended mental model.

### Exercise 2: Implicit Grouping
Design a pricing tier component for Basic, Pro, and Enterprise levels without using any borders or boxes, relying solely on proximity and similarity in typography and colour to group the features under each price.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "gestalt-principles-quiz",
  "type": "multiple-choice",
  "title": "Gestalt Principles",
  "description": "Check your understanding of how humans perceive visual information.",
  "difficulty": "medium",
  "question": "You see a row of cards on a screen. The last card is cut off on the right edge. Which Gestalt principle tells the user they can scroll?",
  "options": [
    {
      "id": "a",
      "text": "Proximity",
      "isCorrect": false,
      "explanation": "Proximity groups the cards, but doesn't imply the hidden content."
    },
    {
      "id": "b",
      "text": "Common Fate",
      "isCorrect": false,
      "explanation": "Common Fate applies when the cards are actually moving."
    },
    {
      "id": "c",
      "text": "Closure",
      "isCorrect": true,
      "explanation": "Correct! The brain sees the incomplete shape of the cut-off card and mentally 'closes' it, understanding that the rest of the object exists off-screen."
    },
    {
      "id": "d",
      "text": "Similarity",
      "isCorrect": false,
      "explanation": "Similarity tells us the cut-off object is likely another card, but Closure explains the understanding of the incomplete form."
    }
  ]
}
-->

## Key Takeaways

By leverages Gestalt principles, you can do the cognitive heavy lifting for your users, using proximity to improve designs immediately and alignment to create a smooth, guided flow. Maintaining consistency in visual treatment ensures that if an element looks the same, it acts the same, creating a meaningful and intuitive experience.

## Next Steps

Continue to [Designing with Intention](./04-designing-with-intention.md) →
