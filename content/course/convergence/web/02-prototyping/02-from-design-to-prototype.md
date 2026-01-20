# From Design to Prototype

> **Quick Summary:** A design file is a map, not the territory. Translating static pixels into living software requires you to make hundreds of small decisions that the designer never specified. This interpretation layer is where Design Engineers provide immense value.

## The Gap Between Figma and Reality

Static design tools lie. They show perfect data, ideal usernames, and happy paths. They freeze time, ignoring the awkward transitions between states.

When you sit down to build a prototype from a design file, you aren't just "coding the design." You are interpreting intent. You are answering questions the designer hasn't even thought to ask yet.

## Reading Critically

Don't just measure pixels. Interrogate the design.

*   **The In-Between:** How does this modal appear? Does it fade? Slide? Grow?
*   **The Response:** When I click this button, does it load instantly? If not, what do I see for the 500ms while it processes?
*   **The Constraints:** What happens if this title is 200 characters long? What happens on a screen that is 320px wide?

If these answers aren't in the file (and they usually aren't), it's your job to propose them through your prototype.

## Making Decisions in Code

When you encounter a gap, don't stop. Fill it with a reasonable default.

### 1. Motion and Timing
If no animation is specified, default to "snappy."
*   **Transitions:** 150ms-200ms `ease-out`.
*   **Entrances:** 200ms-300ms `ease-out`.
*   **Exits:** 150ms `ease-in` (faster than entrances).

### 2. Feedback States
Every interaction needs feedback. If the design doesn't show a hover state, add a subtle opacity change (`opacity: 0.9`) or a background darkening. If a button clicks, add a `transform: scale(0.98)` on active. These small details make the prototype feel "real" even without high-fidelity specs.

### 3. Sequencing
Designs show "State A" and "State B." They don't show that "Image A" fades out *before* "Image B" slides in. You decide the choreography. Try to make events flow logically—don't have everything change at the exact same millisecond.

## Rapid Prototyping Techniques

The goal of a prototype is to answer a question, not to write production code. Optimize for speed.

### Start with Structure (HTML)
Ignore the colours. Get the boxes on the screen.
```html
<div class="card">
  <div class="image"></div>
  <h3>Title</h3>
  <button>Action</button>
</div>
```

### Add "Good Enough" Styles (CSS)
Don't fuss over the exact shade of grey yet. Use CSS variables or a utility library to get the spacing and layout roughly right. The goal is to make it recognizable, not pixel-perfect.

### Interaction First (JS)
This is the most important part. Hook up the click handlers. Make the state change.
```javascript
button.addEventListener('click', () => {
  card.classList.add('expanded');
});
```

### Polish Last
Only once the interaction works should you go back and fine-tune the corner radius or the shadow blur. If the interaction feels wrong, the visual polish won't save it.

## Handling Unknowns

You will hit roadbloacks. "I don't know what this error state looks like."

**Do not block.**
1.  **Improvise:** Create a simple red banner with text.
2.  **Document:** Add a comment in the code: `// TODO: Design pending for error state`.
3.  **Review:** Show the designer your improvised solution. "I put this here for now—does this work?"

It is always better to show a working prototype with a placeholder than to show nothing because you were waiting for a pixel-perfect comp.

## Try It Yourself

### Exercise 1: The "Ghost" Audit
Take a static design file. List 5 things that are *implied* but not *shown*. (e.g., "The navigation drawer slides in from the left.")

### Exercise 2: The 1-Hour Sprint
Find a UI animation on Dribbble or Twitter. Set a timer for 60 minutes. Recreate just that interaction in CodePen. Don't worry about the specific icons or text—focus entirely on the *feel* of the movement.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "design-to-prototype-quiz",
  "type": "multiple-choice",
  "title": "From Design to Prototype",
  "description": "Test your understanding of the prototyping process.",
  "difficulty": "medium",
  "question": "When building a prototype from a design, what should you focus on FIRST?",
  "options": [
    {
      "id": "a",
      "text": "Pixel-perfect visual accuracy",
      "isCorrect": false,
      "explanation": "Visual polish can come later—interaction is what makes it a prototype."
    },
    {
      "id": "b",
      "text": "The core interaction or question you're trying to answer",
      "isCorrect": true,
      "explanation": "Correct! Prototypes exist to test specific hypotheses. Focus on the interaction pattern you're validating, then add fidelity if needed."
    },
    {
      "id": "c",
      "text": "Setting up the full component library first",
      "isCorrect": false,
      "explanation": "Prototypes should be quick—building a full component library defeats the purpose."
    },
    {
      "id": "d",
      "text": "Responsive layouts for all screen sizes",
      "isCorrect": false,
      "explanation": "Prototype for the primary use case first; responsiveness can come later."
    }
  ]
}
-->

## Key Takeaways

-   **Design files are incomplete.** Your job is to fill the gaps.
-   **Default to standard motion.** Use established timing (150-300ms) when in doubt.
-   **Build the bones first.** Structure -> Interaction -> Visual Polish.
-   **Improvise and iterate.** Don't wait for permission to solve a problem.

## Next Steps

Continue to [Prototype to Production](./03-prototype-to-production.md) →
