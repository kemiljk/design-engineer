# Collaboration and Handoff

> **Quick Summary:** Design isn't done when the mockup is finished. It's done when it's built. Effective handoff bridges the gap between design and development.

## What You'll Learn

- How to prepare designs for effective developer handoff
- Specific specifications developers require
- Collaboration workflows that reduce friction
- Tools and techniques to bridge the gap between design and development

## The Handoff Problem

> *"The details are not the details. They make the design."* — Charles Eames

In traditional workflows, handoff is the moment designs go to die. The designer creates a mockup, throws it "over the wall" to a developer, and moves on. The developer, lacking context or precise specs, interprets the static image as best they can. The result is an implementation that misses the mark, leading to frustration on both sides and a lower-quality product.

As a Design Engineer, you are uniquely positioned to solve this. You understand that handoff isn't a single event—it's a continuous process of communication.

## What Developers Need

Developers aren't mind readers. To build your design accurately, they need explicit information that goes beyond what a static image can convey.

**Measurements and Spacing:** Every gap, margin, and padding value needs to be clear. Are those elements 16px apart or 20px? Is that card fixed width or fluid?

**Typography:** Don't just show the text. Specify the font family, weight, size, line height, and letter spacing. Better yet, map these to your system's type scale.

**Colours:** Provide exact values (hex, RGB, HSL) and, crucially, their usage context. Is this `#EF4444` just red, or is it your system's `Error/500` token?

**Assets:** Developers need icons (SVG) and images in the correct formats and resolutions.

**States and Interactions:** Static mocks show the "happy path." Developers need to know what happens when a user hovers, clicks, or disables an element. They need designs for loading states, error states, and empty states.

**Responsive Behavior:** How does the layout change from mobile to desktop? What happens to the navigation? Which elements stack, hide, or resize?

**Animations:** If something moves, specify the timing, easing, and trigger conditions.

## Preparing Designs for Handoff

### Organize Your File

A messy file leads to a messy implementation. Before you share your work, clean up your layers. Delete unused elements that might confuse a developer. Name your layers properly—`Primary Button` is infinitely more useful than `Group 45`. Group related elements logically so that the structure of your design mirrors the structure of the code.

Organize your pages to separate components from screens. Use clear page names and include a cover page that provides an overview of the feature. Most importantly, remove dead ends. If a section is "Work in Progress," move it to a separate page or file. Handoff files should be definitive.

### Use Components Consistently

Your design components should map 1:1 to code components. If you use a `Button` component in Figma, the developer should be able to reach for a `<Button />` component in code. Ensure you use instances of your main component library rather than detached versions or one-off overrides.

### Apply Design Tokens

Hard-coded values are the enemy of maintainability. Instead of using raw hex codes or random pixel values, apply your defined styles (Design Tokens) everywhere. Use your color styles, text styles, and effect styles. This ensures consistency and means that if you update a token later, the entire system updates with it.

### Document Edge Cases

The "happy path" is easy. The real work is in the edges. What happens if a title is 100 characters long? Does it wrap or truncate? What if the description is empty? What does the UI look like when the network fails? Developers will encounter these scenarios immediately. If you haven't designed for them, they will have to improvise, often with mixed results.

### Create a Red-Line Spec (If Needed)

While modern tools like Figma's Dev Mode have made "red-lining" (manually annotating specs) less critical, complex layouts still benefit from explicit notes. Call out specific relationships, behavior rules, or intricate measurements that automated tools might miss.

## Design Tokens for Handoff

Design tokens act as a shared dictionary between design and engineering.

In your design tool, you define tokens for colors (`primary/500`, `grey/100`), spacing (`space-4`, `space-6`), and typography (`heading/large`, `body/default`).

In code, developers define these same tokens, often as CSS variables:

```css
:root {
  --colour-primary-500: #3b82f6;
  --space-4: 16px;
  --font-heading-large: "Inter", bold;
}
```

When you speak in tokens ("Use `primary/500` here"), you eliminate ambiguity. The developer knows exactly which variable to use, ensuring the implementation matches the system perfectly.

## Inspect Mode

Modern design tools offer an "Inspect" mode that gives developers a look "under the hood" of your design. They can click an element to see its dimensions, position, colours, typography, and even copy CSS code snippets.

However, Inspect mode isn't magic. The code it generates is often verbose and lacks context. It can tell a developer that a box is 200px wide, but it can't tell them *why* or how it should behave on a smaller screen. Inspect mode supplements good documentation; it doesn't replace it.

## Collaboration Workflows

### Real-Time Collaboration

Tools like Figma allow designers and developers to inhabit the same virtual space. Use this to your advantage. Invite developers into the file early. Let them poke around, ask questions via comments, and flag technical constraints before you've solidified the design.

### Branching

If your tool supports it, use branching to manage changes. Treat the main branch as the "source of truth"—production-ready designs only. Do your exploration in a separate branch and merge it back only when it's ready for handoff. This prevents developers from building against a moving target.

### Comment Threads

Comments are your async communication channel. Use them to clarify intent ("This padding aligns with the grid"), ask questions ("Can we implement this transition efficiently?"), or request changes. Treat comments as tasks—resolve them only when the issue is addressed.

### Version History

Save named versions at key milestones. A developer might need to reference "Handoff v1.0" even after you've started working on v2.0. Clear versioning provides a safety net and a historical record of decisions.

## Communication Patterns

**Design Reviews:** Schedule regular syncs to walk developers through new designs. Explain the user problem, the proposed solution, and the implementation details. This is the time to catch potential issues early.

**Dedicated Channels:** Create a Slack or Teams channel specifically for design-dev collaboration. Use it for quick clarifications ("What's the error state for this input?") rather than burying them in email or JIRA tickets.

**Documentation:** For complex features, supplement your design files with written documentation. Describe the interaction flows, animation logic, and any business rules that aren't obvious from the visuals alone.

## Working with Design Systems

If you are working with a design system, your handoff process should focus on component mapping.

Explicitly map your design components to their code counterparts. For example:

```text
Design: Button / Primary / Large
Code: <Button variant="primary" size="lg" />
```

Document the property alignment. If your design component has a `Variant` property with options `Primary` and `Secondary`, the code component should have a matching prop. This alignment makes translation seamless.

Ideally, your system shares a single source of truth. Tools like Style Dictionary or Figma Tokens can automate this, syncing your design tokens directly to the codebase so that updates propagate automatically.

## Handoff Checklist

Before marking designs as "Ready for Dev," ensure you've covered the basics.

<!-- visual-example: handoff-checklist-demo -->

## Try It Yourself

### Exercise 1: File Cleanup

Open one of your existing design files. Audit it for handoff readiness. Rename layers to be descriptive. Group elements logically. Delete any unused "playground" elements. Ensure every text and color style is linked to a design token.

### Exercise 2: Handoff Documentation

Choose a complex component from your design. Create a documentation frame next to it. List every state (hover, active, disabled, error). Explicitly write out the spacing measurements. Describe any animations or interactions in plain English.

### Exercise 3: Token Mapping

Create a simple table mapping your core design tokens to hypothetical CSS variables. List your primary colours, spacing scale, and typography styles on one side, and their proposed CSS variable names on the other.

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

Effective handoff is a continuous communication process that requires explicit details such as measurements, tokens, states, and responsive rules. By organising your files, applying design tokens, and leveraging inspect tools alongside direct conversation, you can map design components directly to code and streamline the entire implementation lifecycle.

## Next Steps

You've completed the Design Tools module! You now understand:

You have now explored component thinking and atomic design, mastered design tool fundamentals, and understood the intricacies of auto layout and responsive design. Additionally, you have learned to build interactive prototypes and established effective workflows for collaboration and handoff.

Continue to [Design Systems: What is a Design System](../04-design-systems/01-what-is-a-design-system.md) →
