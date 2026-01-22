# Maintaining and Evolving

> **Quick Summary:** Design systems are never "done"—they require ongoing maintenance, thoughtful evolution, and clear governance to remain valuable.

## What You'll Learn

- Why design systems require ongoing investment
- Versioning strategies using semantic versioning principles
- How to effectively deprecate and remove obsolete components
- Governance models and contribution processes to keep systems thriving

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

**Centralised Model:**
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

Design system work is fundamentally service work that requires a specific mindset, starting with the patience to build for the long term and the empathy to understand the constraints of those using your tools. Effective communication is essential for advocating for the system daily, while a pragmatic approach ensures that shipping slightly imperfect components is prioritised over blocking critical product releases.

## Try It Yourself

### Exercise 1: Changelog Review
Perform a changelog review by examining the release notes of a major design system like Material UI or Carbon, paying particular attention to how they describe breaking changes, credit their contributors, and structure their updates into new, fixed, and changed categories.

### Exercise 2: Deprecation Plan
Imagine you need to remove a "Modal" component because it has accessibility flaws, and replace it with a new "Dialog" component.
Develop a deprecation plan for replacing a component by writing a clear warning message for developers, outlining the necessary migration steps, and establishing a firm timeline for its eventual removal.

### Exercise 3: Contribution Guidelines
Draft a set of contribution guidelines that clearly explain how users can report bugs, request new features, and navigate the process for submitting their own code changes to the system.

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

A design system is an ongoing product rather than a finite project, requiring continuous maintenance and the use of semantic versioning to communicate the scope of changes. By managing deprecation as a gradual process and adopting a governance model that balances speed and consistency, you can measure success through team adoption and satisfaction rather than just component volume.

## Next Steps

You've completed the Design Systems module! You now understand:
You have now successfully completed the Design Systems module, gaining a deep understanding of why these systems matter and how to create and manage design tokens. You have also mastered component architecture principles, developed the skills to write effective documentation, and explored the complexities of long-term maintenance, versioning, and governance.

Continue to [UX Principles: User-Centered Thinking](../05-ux-principles/01-user-centred-thinking.md) →
