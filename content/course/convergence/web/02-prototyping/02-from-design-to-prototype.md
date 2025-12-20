# From Design to Prototype

> **Quick Summary:** Translating static designs into interactive prototypes requires making decisions the design didn't specify—this is where Design Engineers shine.

## What You'll Learn

- Reading designs with implementation in mind
- Making interaction decisions
- Handling what designs don't show
- Rapid implementation techniques

## Reading Designs Critically

When you receive a design, ask:
- What happens between these states?
- How does this respond to user input?
- What's the loading experience?
- What happens at different screen sizes?
- What are the error states?

Designs typically show ideal states. Your job is to fill in the gaps.

## Making Interaction Decisions

Designs often don't specify:
- **Timing** - How fast should this animate?
- **Easing** - What's the motion curve?
- **Feedback** - What happens on hover/press?
- **Sequencing** - What order do things happen?

This is your creative opportunity. Make decisions that:
- Feel natural and expected
- Match the product's personality
- Don't surprise users

## Rapid Prototyping Techniques

### Start with Structure
```html
<!-- Get the bones in place first -->
<div class="modal">
  <div class="modal-header">Title</div>
  <div class="modal-body">Content</div>
  <div class="modal-footer">Actions</div>
</div>
```

### Add Minimal Styling
```css
/* Just enough to see what you're building */
.modal {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 500px;
}
```

### Make It Interactive
```javascript
// Get the interaction working
openButton.addEventListener('click', () => {
  modal.classList.add('open');
});
```

### Polish Last
Only add visual polish once the interaction works.

## Handling Unknowns

When the design doesn't specify something:
1. **Make a decision** - Pick something reasonable
2. **Document your choice** - Note it for discussion
3. **Test it** - See if it feels right
4. **Iterate** - Adjust based on feedback

Don't block on missing specs. Prototype your best guess.

## Tools for Speed

### HTML/CSS/JS Sandboxes
- CodePen / CodeSandbox for quick iterations
- No build setup required
- Easy sharing for feedback

### Component Libraries
- Use existing components as starting points
- shadcn/ui, Radix, Headless UI
- Focus on interaction, not rebuilding basics

### Placeholder Content
- Lorem ipsum for text
- placeholder.com for images
- Don't wait for real content

## Try It Yourself

### Exercise 1: Design Audit

Take a design mockup and list:
- 5 things the design doesn't specify
- Your decision for each
- Why you made that choice

### Exercise 2: Speed Build

Find a Dribbble shot you like. Set a 1-hour timer and build a working prototype of it. Focus on the core interaction, skip the details.

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

- Designs show ideal states; prototypes explore transitions
- Make interaction decisions confidently
- Start with structure, add polish last
- Use tools that minimize setup time
- Don't wait for perfect specs—prototype your assumptions

## Next Steps

Continue to [Prototype to Production](./03-prototype-to-production.md) →
