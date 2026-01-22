# Bridging Design and Engineering

> **Quick Summary:** The gap between design and engineering causes friction, delays, and quality issues. Design Engineers can bridge this gap.

## What You'll Learn

- Common friction points between design and engineering teams
- Communication strategies that reduce misunderstandings
- How to build shared understanding across disciplines
- How to be an effective bridge between design and engineering

## The Gap

> *"The best designers understand technology and the best technologists understand design."* — John Maeda

Common problems when design and engineering are siloed:
When design and engineering teams are siloed, common problems inevitably arise. Designers often feel that the implementation doesn't match their vision ("That's not what I designed"), while engineers might push back with "That's technically impossible." Constraints are discovered too late ("We didn't know about this"), and the final product often suffers from inconsistent feel ("Why does this feel different?").

These problems waste time and hurt quality.

## Where Friction Happens

### Design → Engineering Handoff
Handoff is notoriously difficult. Common issues include designs that are missing critical states (like error or loading states), interaction specifications that are unclear or ambiguous, timelines that don't account for complexity, and technical constraints that are discovered only after the design is "final."

### Engineering → Design Feedback
Feedback loops can also be friction-filled. Engineers may request changes for purely technical reasons or performance trade-offs that designers don't fully understand. Platform limitations might force a redesign, or critical edge cases might be discovered during implementation that break the proposed layout.

## Communication Strategies

### Be in Both Channels
To bridge the gap, you must be present in both worlds. Join design critiques to understand the "why" behind decisions, and attend engineering standups to understand the "how." Be active in both Slack channels and actively cross-pollinate context between the two groups so everyone stays aligned.

### Translate, Don't Just Relay
Don't just pass messages—translate:
- Designer: "It should feel bouncy"
- To Engineer: "We need a spring animation with 0.8 damping ratio"

### Surface Issues Early
### Surface Issues Early
If you see a problem coming, raise it before it becomes expensive to fix. If a proposed parallax effect will be hard to make performant, or if a layout won't adapt well to certain screen sizes, speak up during the design phase, not the implementation phase.

## Building Shared Understanding

### Shared Vocabulary
Establish a common language that both sides understand. Ensure that component names, state definitions, animation descriptions, and breakpoint names are consistent across design files and the codebase to reduce confusion.

### Living Documentation
Maintain artifacts that serve as a single source of truth for everyone. This includes comprehensive design system documentation, component libraries with live visual examples, animation libraries, and pattern libraries that both designers and engineers reference daily.

### Joint Sessions
Actively bring the teams together. Host design reviews that include engineers, invite designers to technical feasibility discussions, and ensure retrospectives include members from both disciplines to foster a culture of shared ownership.

## Being an Effective Bridge

### Don't Pick Sides
You're not design's advocate OR engineering's advocate—you're the product's advocate.

### Be Constructive
"That won't work" → "That's tricky because X. What if we tried Y?"

### Build Relationships
People listen to those they trust. Invest in relationships on both sides.

### Know When to Step Back
Not every issue needs a bridge. Sometimes let teams work directly.

## Try It Yourself

### Exercise 1: Gap Analysis

Identify the three biggest friction points between design and engineering at your company. What could you do about each?

### Exercise 2: Translation Practice

Take a design spec and translate it to engineering requirements. Take engineering constraints and explain them in design terms.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "bridging-quiz",
  "type": "multiple-choice",
  "title": "Bridging Design and Engineering",
  "description": "Test your understanding of cross-functional collaboration.",
  "difficulty": "medium",
  "question": "How should a Design Engineer communicate a technical constraint to designers?",
  "options": [
    {
      "id": "a",
      "text": "Just say 'we can't do that' and move on",
      "isCorrect": false,
      "explanation": "This shuts down collaboration without understanding or alternatives."
    },
    {
      "id": "b",
      "text": "Explain the constraint in design terms, why it exists, and suggest alternative approaches that achieve similar goals",
      "isCorrect": true,
      "explanation": "Correct! Translate technical constraints into design language, explain the 'why,' and propose alternatives. This maintains collaboration and often leads to better solutions."
    },
    {
      "id": "c",
      "text": "Implement it anyway and explain later why it's different",
      "isCorrect": false,
      "explanation": "Surprises erode trust. Discuss constraints upfront."
    },
    {
      "id": "d",
      "text": "Share the relevant documentation and let them figure it out",
      "isCorrect": false,
      "explanation": "Technical docs may not translate well for designers—active translation is valuable."
    }
  ]
}
-->

## Key Takeaways

- The design-engineering gap causes real problems
- Be present in both worlds
- Translate context, don't just relay messages
- Build shared vocabulary and documentation
- Advocate for the product, not a team

## Next Steps

Continue to [Side Projects](./03-side-projects.md) →
