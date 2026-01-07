# Collaboration and Handoff

> **Quick Summary:** Design isn't done when the mockup is finished. It's done when it's built. Effective handoff bridges the gap between design and development.

## What You'll Learn

- How to prepare designs for developer handoff
- Design specs and what developers need
- Collaboration workflows that reduce friction
- Tools and techniques for better handoff

## The Handoff Problem

> *"The details are not the details. They make the design."* — Charles Eames

Traditional handoff is where designs go to die:

1. Designer creates mockups
2. Designer "throws over the wall" to developer
3. Developer interprets (guesses) missing details
4. Implementation doesn't match design
5. Designer is frustrated; developer is frustrated
6. Quality suffers

As a Design Engineer, you're uniquely positioned to fix this. You understand both sides.

## What Developers Need

Before handing off, consider what developers need to build accurately:

### Measurements and Spacing

- Element dimensions (width, height)
- Margins and padding
- Gaps between elements
- Border radius values

### Typography

- Font family and weight
- Font size
- Line height
- Letter spacing
- Text colour

### Colors

- Exact colour values (hex, RGB, HSL)
- Color usage context (when to use which)
- Transparency values

### Assets

- Icons (SVG format)
- Images (appropriately sized)
- Logos and graphics

### States and Interactions

- Hover states
- Active states
- Disabled states
- Loading states
- Error states
- Empty states

### Responsive Behaviour

- Breakpoints
- How layout changes at each breakpoint
- Which elements hide/show
- How elements resize

### Animations

- What animates
- Timing and easing
- Trigger conditions

## Preparing Designs for Handoff

### Organize Your File

**Clean up layers:**

- Delete unused elements
- Properly name all layers
- Group logically

**Organize pages:**

- Separate components from screens
- Use clear page names
- Include a cover/overview page

**Remove dead ends:**

- No "WIP" sections in handoff files
- Archive exploration in separate pages

### Use Components Consistently

Components should be:

- Named to match code components
- Applied consistently (no one-off overrides)
- Updated globally (no detached instances)

### Apply Design Tokens

Use defined styles everywhere:

- Color styles (no raw hex values)
- Text styles (no manual typography)
- Effect styles (shadows, blurs)

This ensures consistency and makes updates manageable.

### Document Edge Cases

Design for:

- Long content (what if the title is 100 characters?)
- Short content (what if description is empty?)
- Error states (what if validation fails?)
- Loading states (what appears during fetch?)
- Empty states (what if there's no data?)

Developers will hit these cases. Design them or they'll improvise.

### Create a Red-Line Spec (If Needed)

For complex layouts, create annotated specs:

- Mark key measurements
- Note spacing relationships
- Call out specific values

Modern tools make this less necessary (inspect mode), but complex cases benefit from explicit documentation.

## Design Tokens for Handoff

Design tokens create a shared vocabulary:

### In Design

Define tokens in your tool:

```text
Colors:
- primary/500: #3B82F6
- grey/100: #F3F4F6
- error/500: #EF4444

Spacing:
- space-2: 8px
- space-4: 16px
- space-6: 24px

Typography:
- heading/large: Inter Bold 32/40
- body/default: Inter Regular 16/24
```

### In Code

Developers use matching tokens:

```css
:root {
  --colour-primary-500: #3b82f6;
  --colour-neutral-100: #f3f4f6;
  --colour-error-500: #ef4444;

  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
}
```

When you say "primary/500 with space-4 padding," developers know exactly what you mean.

## Inspect Mode

Modern design tools have inspect modes that let developers:

- Click any element
- See CSS properties
- Copy values
- Export assets

### What Inspect Mode Shows

- Dimensions
- Position
- Colors
- Typography
- Spacing
- CSS code snippets

### Inspect Mode Limitations

Inspect mode isn't perfect:

- Generated code is often verbose
- Missing context (why these values)
- Doesn't show interactions
- Can't capture responsive behaviour

Inspect mode supplements, but doesn't replace, good documentation and communication.

## Collaboration Workflows

### Real-Time Collaboration

Modern tools allow simultaneous editing:

- Designers and developers in the same file
- Live cursors show who's where
- Comments enable async feedback

### Branching (If Available)

Some tools support branches:

- Main branch is source of truth
- Create branches for exploration
- Merge back when ready

### Comment Threads

Use comments for:

- Questions about implementation
- Flagging issues
- Requesting changes
- Discussing alternatives

Resolve comments when addressed.

### Version History

Use named versions for:

- Major milestones
- Before significant changes
- Handoff snapshots

Developers can reference specific versions.

## Communication Patterns

### Design Reviews

Regular sync with developers:

- Walk through new designs
- Discuss implementation considerations
- Flag potential issues early
- Answer questions

### Slack/Chat Channels

Dedicated channel for design questions:

- Quick clarifications
- Link to specific frames
- Share screenshots

### Documentation

For complex features:

- Written specs alongside designs
- Interaction documentation
- Animation specifications

## Working with Design Systems

If you have a design system:

### Component Mapping

Each design component should map to a code component:

```text
Design: Button/Primary/Large
Code: <Button variant="primary" size="lg">
```

Document the mapping.

### Prop Alignment

Design component properties = code props:

```text
Design:
- Variant: Primary, Secondary
- Size: Small, Medium, Large
- Icon position: Left, Right, None

Code:
variant: 'primary' | 'secondary'
size: 'sm' | 'md' | 'lg'
iconPosition: 'left' | 'right' | null
```

### Shared Source of Truth

Ideally:

- Design tokens exported to code
- Single source for colours, spacing, typography
- Updates propagate automatically

Tools like Style Dictionary, Figma Tokens, or design-to-code plugins enable this.

## Handoff Checklist

Before marking designs as ready, work through this interactive checklist. Your progress is saved automatically and you can export it in various formats to share with your team.

<!-- visual-example: handoff-checklist-demo -->

## Try It Yourself

### Exercise 1: File Cleanup

Take an existing design file and prepare it for handoff:

1. Name all layers properly
2. Organize into logical groups
3. Delete unused elements
4. Add any missing states

### Exercise 2: Handoff Documentation

For a complex component:

1. List all states it can be in
2. Document all measurements
3. Note any animations/interactions
4. Export necessary assets

### Exercise 3: Token Mapping

Create a token mapping document:

1. List your design tokens (colours, spacing, typography)
2. Propose corresponding CSS variable names
3. Note any gaps or inconsistencies

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "handoff-quiz",
  "type": "multiple-choice",
  "title": "Design Handoff",
  "description": "Test your understanding of effective design handoff.",
  "difficulty": "medium",
  "question": "Which of these is NOT something developers need from a design handoff?",
  "options": [
    {
      "id": "a",
      "text": "All interactive states (hover, active, disabled, loading, error)",
      "isCorrect": false,
      "explanation": "Developers definitely need all states designed. Otherwise they'll have to improvise."
    },
    {
      "id": "b",
      "text": "Edge case designs (long content, empty states)",
      "isCorrect": false,
      "explanation": "Edge cases are essential. Developers will encounter them and need guidance."
    },
    {
      "id": "c",
      "text": "The designer's exploration history and rejected alternatives",
      "isCorrect": true,
      "explanation": "Correct! While exploration is valuable during design, handoff files should be clean and focused. Archive explorations separately. Don't include 'WIP' sections."
    },
    {
      "id": "d",
      "text": "Responsive behaviour and breakpoints",
      "isCorrect": false,
      "explanation": "Developers need to know how layouts change at different screen sizes."
    }
  ]
}
-->

## Key Takeaways

- Handoff is where designs become (or fail to become) reality
- Developers need: measurements, typography, colours, assets, states, responsive behaviour
- Prepare files: clean layers, consistent components, applied tokens
- Design edge cases: long content, empty states, errors, loading
- Use design tokens for shared vocabulary between design and code
- Leverage inspect mode but don't rely on it entirely
- Communicate through reviews, comments, and documentation
- Map design components to code components explicitly

## Next Steps

You've completed the Design Tools module! You now understand:

- Component thinking and atomic design
- Design tool fundamentals
- Auto layout and responsive design
- Prototyping and interactions
- Collaboration and handoff

Continue to [Design Systems: What is a Design System](../04-design-systems/01-what-is-a-design-system.md) →
