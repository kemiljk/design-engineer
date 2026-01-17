# Maintaining and Evolving

> **Quick Summary:** Design systems are never "done"—they require ongoing maintenance, thoughtful evolution, and clear governance to remain valuable.

## What You'll Learn

- Why design systems require ongoing investment
- Versioning strategies and semantic versioning
- How to deprecate and remove components
- Governance models and contribution processes

## The Living System

A common misconception is that a design system is a project you finish. You build the buttons, write the docs, launch the site, and pop the champagne. In reality, a design system is a product serving internal customers. Like any product, if you stop updating it, it dies.

Without maintenance, entropy sets in. Components drift from their implementations. Documentation becomes a graveyard of "how things used to work." Teams lose trust and start building their own solutions. To keep a system alive, you must treat it as infrastructure that requires constant care.

## Types of Maintenance

Maintenance work generally falls into three buckets, each requiring a different approach.

### 1. Bug Fixes
These are the urgent repairs. A dropdown menu gets cut off on mobile. A button's focus state fails accessibility audits. These erode trust rapidly ("The system is broken, I can't use it"). Prioritize these above all else to maintain confidence.

### 2. Enhancements
These are improvements to existing components. A team might need a new "small" variant of the Button, or a new prop to control icon placement. These requests should be evaluated against the roadmap: Is this a one-off need, or a pattern that benefits everyone?

### 3. New Components
Adding a net-new component is a commitment. It adds weight to the library and creates a permanent maintenance burden. The bar for entry should be high. Often, a pattern should prove its value in a specific product before being promoted to the system.

## Versioning

How do you communicate changes to your users? You need a versioning strategy. The industry standard is **Semantic Versioning (SemVer)**, which uses a three-part number: `MAJOR.MINOR.PATCH` (e.g., 1.4.2).

**PATCH (1.4.1 → 1.4.2):**
These are bug fixes. They don't add features or break anything. It is safe for teams to upgrade automatically.

**MINOR (1.4.0 → 1.5.0):**
These are additive changes. You added a new component or a new optional prop. Existing code continues to work, but there are new toys in the box.

**MAJOR (1.0.0 → 2.0.0):**
These are breaking changes. You renamed a prop, deleted a component, or changed how a function works. Upgrading requires work from the consuming teams. Major versions should be infrequent and painful changes should be grouped together.

## The Deprecation Process

You can't just delete a component that people are using. You need to guide them off it gently.

**Step 1: Mark as Deprecated**
Add a visual warning in the documentation and a console warning in the code: *"Alert is deprecated. Use Toast instead."* Do not break the code yet.

**Step 2: Provide a Migration Path**
Write a clear guide explaining how to move to the new pattern. If possible, write a "codemod" (a script) that automates the update.

**Step 3: The Sunset**
After a designated period (usually the next Major release), remove the old component. This keeps your library from becoming a museum of obsolete code.

## Governance

Governance is simply the answer to the question: "Who decides what goes in?"

**Centralized Model:**
A dedicated Design System team makes all the decisions. This ensures high consistency and quality but can become a bottleneck. The core team becomes the "police."

**Federated Model:**
Representatives from different product teams form a council. They meet to discuss and approve changes. This distributes ownership but requires coordination overhead.

**Hybrid Model:**
Most successful systems land here. A small core team manages the infrastructure and documentation, while product teams contribute new components. The core team acts as "librarians"—curating and polishing contributions rather than building everything from scratch.

## Measuring Success

How do you know if your system is working? Don't just count the number of components.

**Adoption:**
Are teams actually using it? Track the percentage of UI in the product that comes from the system. If it's stagnating, find out why.

**Efficiency:**
Are teams shipping faster? This is hard to measure directly, but qualitative surveys ("Did the system help you this sprint?") reveal a lot.

**Contribution:**
Are people outside the core team fixing bugs or adding patterns? A healthy system has a vibrant community of contributors.

## The Maintenance Mindset

Design system work is service work. It requires a specific temperament:
- **Patience:** You are building for the long term.
- **Empathy:** You must understand the constraints of the teams using your tools.
- **Communication:** You are selling the system every day.
- **Pragmatism:** Sometimes shipping a slightly imperfect component is better than blocking a product release.

## Try It Yourself

### Exercise 1: Changelog Review
Go to the GitHub repository of a major design system (like Material UI or Carbon). Read their Release Notes. Look for:
- How they describe breaking changes.
- How they credit contributors.
- How they structure the notes (New, Fixed, Changed).

### Exercise 2: Deprecation Plan
Imagine you need to remove a "Modal" component because it has accessibility flaws, and replace it with a new "Dialog" component.
1. Write the deprecation warning message.
2. Outline the steps a developer would need to take to switch.
3. Decide on a timeline for removal.

### Exercise 3: Contribution Guidelines
Draft a simple "How to Contribute" document. Answer:
- How do I report a bug?
- How do I request a new feature?
- What is the process for submitting a code change?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "versioning-quiz",
  "type": "multiple-choice",
  "title": "Semantic Versioning",
  "description": "Test your understanding of semantic versioning for design systems.",
  "difficulty": "medium",
  "question": "You're adding a new 'size' prop with a default value to an existing Button component. What version bump is appropriate?",
  "options": [
    {
      "id": "a",
      "text": "MAJOR (1.0.0 → 2.0.0)—any API change is breaking",
      "isCorrect": false,
      "explanation": "Adding a new prop with a default value doesn't break existing code—existing usages will work unchanged."
    },
    {
      "id": "b",
      "text": "MINOR (1.0.0 → 1.1.0)—new feature, backwards compatible",
      "isCorrect": true,
      "explanation": "Correct! Adding a new prop with a sensible default is a backwards-compatible addition. Existing code continues to work, and users can opt-in to the new feature."
    },
    {
      "id": "c",
      "text": "PATCH (1.0.0 → 1.0.1)—it's just a small change",
      "isCorrect": false,
      "explanation": "PATCH is for bug fixes with no new features. Adding a prop is a new feature."
    },
    {
      "id": "d",
      "text": "No version change needed—props don't affect the version",
      "isCorrect": false,
      "explanation": "All API changes should be versioned so users can track what changed."
    }
  ]
}
-->

## Key Takeaways

- A design system is a product, not a project; it needs continuous maintenance.
- Use Semantic Versioning to communicate the impact of changes.
- Deprecation is a managed process, not a sudden deletion.
- Governance models define who makes decisions; hybrid models often work best.
- Measure success by adoption and team satisfaction, not just component counts.

## Next Steps

You've completed the Design Systems module! You now understand:
- What design systems are and why they matter
- How to create and use design tokens
- Component architecture principles
- Writing effective documentation
- Maintenance, versioning, and governance

Continue to [UX Principles: User-Centered Thinking](../05-ux-principles/01-user-centred-thinking.md) →
