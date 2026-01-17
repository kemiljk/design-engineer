# Gestalt Principles

> **Quick Summary:** Your users don't see pixels; they see patterns. Gestalt psychology explains the predictable ways human brains group and interpret visual information. Leveraging these principles makes your interface feel intuitive; fighting them makes it feel broken.

## The Brain as a Pattern Matching Machine

In the early 20th century, a group of German psychologists observed something fascinating: the human brain is lazy. It constantly tries to simplify complex visual data into simple, organized wholes. This is **Gestalt** (German for "form" or "shape").

For designers, this is a superpower. If you understand how the brain groups things, you can create layouts that users understand instantly, without needing to read a single label.

## The 7 Core Principles

### 1. Proximity
**The Rule:** Things that are close together are perceived as a group.

**In Practice:** This is the most powerful tool in your layout arsenal. You don't need a box or a line to group a headline with its paragraph; you just need to put them close together.
*   **Good:** Small gap between Label and Input. Large gap between that Input and the next Label.
*   **Bad:** Equal spacing everywhere. The user can't tell which label belongs to which input.

### 2. Similarity
**The Rule:** Things that look alike are perceived as related.

**In Practice:** This is why all your primary buttons should look the same. If a "Save" button is blue and a "Submit" button is green, the user has to re-learn the interface. Consistency reduces cognitive load.
*   **Example:** In a list of files, all folders look identical (icon, color, size). The brain instantly categorizes them as "the same type of thing."

### 3. Continuity
**The Rule:** The eye follows lines and curves. We prefer a continuous path over an abrupt change.

**In Practice:** This is why grid alignment matters. When the left edges of your text, images, and buttons align perfectly, they create an invisible vertical line. The user's eye slides down this line effortlessly. If elements are jagged or misaligned, the eye gets "stuck," and scanning becomes a chore.

### 4. Closure
**The Rule:** The brain fills in missing information to create a complete shape.

**In Practice:** You don't need to show the whole thing for users to understand what it is.
*   **Example:** A carousel where the last card is cut off at the edge of the screen. The brain "closes" the shape and understands "there is more content here," prompting a scroll interaction. You don't need a "Scroll for more" label; the incomplete shape says it all.

### 5. Common Region
**The Rule:** Elements enclosed in the same boundary are perceived as a group.

**In Practice:** This overrides Proximity. Even if two items are far apart, if they are inside the same box (like a Card), they are related.
*   **Use Case:** A "Card" component. The image, title, and "Read More" button might be spaced out, but the border around them ties them together into a single unit of content.

### 6. Figure-Ground
**The Rule:** We separate the visual field into the "figure" (the object of focus) and the "ground" (the background).

**In Practice:** This is essential for popups and modals. When a modal opens, we dim the rest of the page (the "ground") to push the modal (the "figure") forward. If you don't create enough contrast between figure and ground, the user doesn't know what to focus on. Shadow and elevation are your tools here.

### 7. Common Fate
**The Rule:** Elements that move together are perceived as a group.

**In Practice:** This is specific to interaction design.
*   **Example:** When you swipe a card away, the text, image, and button on that card all move in sync. If the text lagged behind, the illusion would break. Shared motion implies a shared relationship.

## When Principles Collide

Gestalt principles have a hierarchy. **Common Region** (a box) usually beats **Proximity** (spacing). **Proximity** usually beats **Similarity**.

**The Design Debugger:**
When a layout feels "off" but you can't explain why, go through this checklist.
1.  Are related things close enough? (Proximity)
2.  Are unrelated things far enough apart? (Proximity)
3.  Is the hierarchy clear? (Similarity/Figure-Ground)
4.  Is the alignment creating a smooth path for the eye? (Continuity)

## Try It Yourself

### Exercise 1: The "Squint Test" (Proximity)
Take a screenshot of your current design. Blur it (or squint your eyes) until you can't read the text.
*   Do you see clear blobs (groups)?
*   Does the navigation look like one unit?
*   Does the form look like a list of distinct questions, or one big mess?
Adjust your spacing until the blurry blobs match your intended mental model.

### Exercise 2: Implicit Grouping
Design a "Pricing Tier" component (Basic, Pro, Enterprise) without using any borders or background boxes. Use only **Proximity** (spacing) and **Similarity** (typography/color) to group the features under each price.

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

-   **Don't make the user think.** Use Gestalt principles to do the cognitive heavy lifting.
-   **Proximity is free.** It's the easiest way to improve a design immediately.
-   **Alignment creates flow.** Invisible lines guide the eye.
-   **Consistency creates meaning.** If it looks the same, it acts the same.

## Next Steps

Continue to [Designing with Intention](./04-designing-with-intention.md) →
