# What is a Design System?

> **Quick Summary:** A design system is more than a component library—it's a shared language of principles, patterns, and tools that enables teams to build consistent products efficiently.

## What You'll Learn

- What design systems are (and aren't)
- The components of a design system
- Why organisations invest in design systems
- When you need a design system

## Beyond Component Libraries

> *"Design systems aren't about limitations—they're about shared language."* — d×e

Many people confuse design systems with component libraries. They're related but distinct:

**Component Library:** A collection of reusable UI components (buttons, inputs, cards).

**Design System:** A comprehensive system including:
- Design principles and guidelines
- Design tokens (colors, spacing, typography)
- Component library
- Patterns and templates
- Documentation
- Governance processes

A component library is *part* of a design system, but a design system is much more.

## The Parts of a Design System

<!-- illustration: design-system-layers -->

### 1. Design Principles

Foundational beliefs that guide decisions:
- "Clarity over cleverness"
- "Accessibility is not optional"
- "Consistency enables familiarity"

Principles help teams make aligned decisions even when the system doesn't provide explicit guidance.

### 2. Design Tokens

The primitive values that define visual style:
- Colours (brand, semantic, neutral)
- Typography (fonts, sizes, weights)
- Spacing (margin/padding values)
- Shadows, borders, radii

Tokens ensure consistency and enable theming.

### 3. Components

Reusable UI elements:
- Basic: Buttons, inputs, checkboxes
- Composite: Cards, modals, navigation
- Complex: Data tables, date pickers

Components encapsulate design decisions in reusable packages.

### 4. Patterns

Solutions to common design problems:
- Form patterns (validation, error handling)
- Navigation patterns (sidebar, tabs, breadcrumbs)
- Content patterns (empty states, loading)

Patterns are higher-level than components—they describe *how* to use components together.

### 5. Documentation

Knowledge that makes the system usable:
- Component usage guidelines
- Do's and don'ts
- Code examples
- Design rationale

Without documentation, a design system is a black box.

### 6. Tools and Resources

Assets that enable adoption:
- Design tool libraries (Figma, Sketch)
- Code packages (npm, Swift packages)
- Icon sets
- Templates and starters

### 7. Governance

Processes that keep the system healthy:
- How to propose changes
- Who approves additions
- Versioning strategy
- Deprecation process

## Why Design Systems?

Organisations invest in design systems for concrete benefits:

### Consistency

Users experience the same product everywhere:
- Same button looks the same across 50 pages
- Same interaction patterns throughout
- Cohesive brand experience

Consistency builds trust and reduces cognitive load.

### Efficiency

Teams move faster:
- Don't redesign the same button every project
- Developers use pre-built components
- Less back-and-forth on solved problems

Time saved compounds across every team using the system.

### Quality

Higher baseline quality:
- Components are tested and refined
- Accessibility built in
- Edge cases handled

Teams benefit from collective improvements.

### Scalability

Organisations grow without chaos:
- New teams onboard faster
- Products maintain coherence
- Standards evolve centrally

### Single Source of Truth

One authoritative source:
- Designers and developers reference the same system
- No ambiguity about "how we do things"
- Updates propagate everywhere

## What Design Systems Aren't

**Not a straitjacket:** Good systems enable creativity within constraints, not enforce rigid conformity.

**Not set-and-forget:** Systems require ongoing maintenance, evolution, and governance.

**Not one-size-fits-all:** Different organisations need different systems based on size, needs, and culture.

**Not just for design:** Design systems serve designers AND developers. Both perspectives are essential.

## When Do You Need a Design System?

Design systems require investment. Consider one when:

### You Have

- Multiple products or platforms
- Multiple teams building UI
- Consistency problems across surfaces
- Repeated "reinventing the wheel"
- Designers and developers miscommunicating

### You Can Invest

- Time to build and document
- Ongoing maintenance resources
- Governance process
- Cross-functional collaboration

### The Math Works

A design system pays off when:
- Time saved across teams > time to build/maintain
- Quality improvements justify investment
- Scale amplifies benefits

For small teams or single products, a design system might be overkill. A well-organised component library might suffice.

## Famous Design Systems

Learning from established systems:

### Material Design (Google)

- Comprehensive principles and guidelines
- Cross-platform (web, Android, Flutter)
- Strong motion and interaction guidance
- Open for anyone to use

### Human Interface Guidelines (Apple)

- Platform-specific guidance
- Deep integration with native components
- Focus on feel and craft
- Proprietary to Apple platforms

### Carbon (IBM)

- Enterprise-focused
- Strong accessibility focus
- Open source
- Multiple framework implementations

### Polaris (Shopify)

- E-commerce domain expertise
- Practical, prescriptive guidance
- Well-documented patterns
- Open source

### Base Web (Uber)

- Highly themeable
- Performance-focused
- React-based
- Open source

Study these systems for inspiration and patterns.

## Design Systems for Design Engineers

Design Engineers are uniquely suited for design system work:

**Bridge perspective:** Understand both design and code constraints.

**Implementation insight:** Know what's practical to build and maintain.

**Documentation skill:** Can write for both designer and developer audiences.

**Pattern recognition:** See connections across both disciplines.

If design systems interest you, it's a natural career path for Design Engineers.

## Try It Yourself

### Exercise 1: System Audit

Pick a product you use regularly. Identify:
1. What design tokens might they use? (colors, spacing, typography)
2. What components do you see repeated?
3. What patterns appear across screens?
4. Where do you notice inconsistency?

### Exercise 2: Principles Draft

For a hypothetical product, write 3-5 design principles:
1. What values should guide design decisions?
2. How would you resolve conflicting requirements?
3. What makes your product different?

### Exercise 3: System Exploration

Explore a public design system (Material, Carbon, Polaris). Note:
1. How is it organised?
2. What documentation is provided?
3. How are components presented?
4. What can you apply to your own work?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "design-system-definition-quiz",
  "type": "multiple-choice",
  "title": "Design System Components",
  "description": "Test your understanding of what makes up a design system.",
  "difficulty": "easy",
  "question": "What is the key difference between a component library and a design system?",
  "options": [
    {
      "id": "a",
      "text": "A component library is for React, a design system is for all frameworks",
      "isCorrect": false,
      "explanation": "Both can support multiple frameworks—that's not the distinguishing factor."
    },
    {
      "id": "b",
      "text": "A design system includes principles, tokens, patterns, documentation, and governance—not just components",
      "isCorrect": true,
      "explanation": "Correct! A component library is just one part of a design system. A complete system also includes design principles, tokens, patterns, documentation, and governance processes."
    },
    {
      "id": "c",
      "text": "A component library is for developers, a design system is for designers",
      "isCorrect": false,
      "explanation": "Design systems serve both designers AND developers—that's part of their value."
    },
    {
      "id": "d",
      "text": "A design system is just a more expensive version of a component library",
      "isCorrect": false,
      "explanation": "While systems require more investment, they provide fundamentally different value through shared principles and vocabulary."
    }
  ]
}
-->

## Key Takeaways

- Design systems are more than component libraries—they include principles, tokens, patterns, documentation, and governance
- Benefits: consistency, efficiency, quality, scalability, single source of truth
- Systems require ongoing investment—not a one-time project
- Consider a design system when scale justifies the investment
- Design Engineers are well-suited for design system work

## Next Steps

Continue to [Tokens and Variables](./02-tokens-and-variables.md) →
