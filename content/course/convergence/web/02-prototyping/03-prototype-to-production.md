# Prototype to Production

> **Quick Summary:** Sometimes prototypes can evolve into production code. Knowing when and how to make this transition is a key Design Engineer skill.

## What You'll Learn

Throughout this lesson, you will learn the criteria for deciding when to further develop a prototype into production-ready code versus when it is better to rebuild from scratch. We'll explore how to structure your experimental code for potential reuse by separating concerns and using semantic HTML, and examine the essential process of refactoring prototype shortcuts and providing a professional handoff for other engineering teammates.

## When to Productionise

Consider productionising when:
- The prototype solves the problem well
- Core architecture is sound
- Time pressure is high
- The scope is small and contained

Rebuild from scratch when:
- Prototype took significant shortcuts
- Architecture won't scale
- Requirements changed significantly
- Technical debt is too high

## Writing Productionisable Prototypes

Even quick prototypes can follow patterns that make production transition easier:

### Separate Concerns

```javascript
// Even in a prototype, separate logic from UI
const modalLogic = {
  open: () => { /* ... */ },
  close: () => { /* ... */ },
  toggle: () => { /* ... */ }
};

// UI binding separately
button.addEventListener('click', modalLogic.open);
```

### Use Semantic HTML

```html
<!-- Easy to style and accessible -->
<dialog class="modal">
  <form method="dialog">
    <h2>Title</h2>
    <p>Content</p>
    <button type="submit">Close</button>
  </form>
</dialog>
```

### Name Things Well

```css
/* Even in prototypes, use meaningful names */
.card { }
.card__header { }
.card__content { }
.card__actions { }
```

## Refactoring for Production

### Step 1: Identify What Works

List what the prototype got right:
- Interaction patterns
- Visual approach
- User flow

### Step 2: Identify Technical Debt

Note what needs fixing:
- Hardcoded values
- Missing error handling
- Accessibility gaps
- Performance issues

### Step 3: Incremental Refactoring

```javascript
// Before: Prototype code
document.querySelector('.btn').onclick = () => {
  document.querySelector('.modal').style.display = 'block';
};

// After: Production code
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <button onClick={onClose} aria-label="Close">×</button>
      {children}
    </div>
  );
}
```

## The Handoff

If someone else will productionise your prototype:

### Document Decisions

"The modal animates in with a 200ms ease-out because faster felt jarring in testing."

### Note Known Issues

"Focus trapping not implemented. Will need for accessibility."

### Provide Context

"Users tested well with the slide-in animation but found the fade confusing."

### Record Videos

A quick Loom showing the prototype in action is invaluable.

## Try It Yourself

### Exercise 1: Prototype Audit

Take an old prototype you built. Assess:
- Could it be productionised?
- What would need to change?
- Estimate effort to refactor vs. rebuild

### Exercise 2: Structured Prototype

Build a new prototype with production patterns:
- Separate logic and UI
- Use semantic HTML
- Add TypeScript types
- Document decisions

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "prototype-production-quiz",
  "type": "multiple-choice",
  "title": "Prototype to Production",
  "description": "Test your understanding of evolving prototypes.",
  "difficulty": "medium",
  "question": "When should you NOT evolve a prototype into production code?",
  "options": [
    {
      "id": "a",
      "text": "When the prototype tested well with users",
      "isCorrect": false,
      "explanation": "Successful testing is a reason TO evolve it, but watch for other factors."
    },
    {
      "id": "b",
      "text": "When the prototype was built with shortcuts that would create tech debt or doesn't match production architecture",
      "isCorrect": true,
      "explanation": "Correct! Sometimes it's better to rebuild using what you learned. Prototype shortcuts (hardcoded data, no error handling, no tests) can become problematic at scale."
    },
    {
      "id": "c",
      "text": "When stakeholders liked it",
      "isCorrect": false,
      "explanation": "Stakeholder approval supports moving forward."
    },
    {
      "id": "d",
      "text": "When you built it in a production-ready framework",
      "isCorrect": false,
      "explanation": "The framework doesn't guarantee the code is production-ready."
    }
  ]
}
-->

## Key Takeaways

Knowing when to productionise a prototype requires a careful balance between speed and technical debt, as not all experimental code is meant for the final product. By structuring your prototypes thoughtfully—without over-engineering—and documenting your specific design decisions and known issues, you can make the eventual transition to production far more seamless. Ultimately, effective communication and incremental refactoring are the keys to successfully bridging the gap between an interactive experiment and a scalable feature.

## Next Steps

Continue to [Selling with Prototypes](./04-selling-with-prototypes.md) →
