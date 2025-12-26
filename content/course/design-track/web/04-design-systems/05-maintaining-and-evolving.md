# Maintaining and Evolving

> **Quick Summary:** Design systems are never "done"—they require ongoing maintenance, thoughtful evolution, and clear governance to remain valuable.

## What You'll Learn

- Why design systems require ongoing investment
- Versioning strategies and semantic versioning
- How to deprecate and remove components
- Governance models and contribution processes

## The Living System

A design system isn't a project with an end date—it's a product that requires continuous investment.

**Without maintenance:**
- Components fall out of date
- Documentation becomes inaccurate
- Adoption drops as trust erodes
- Teams build workarounds instead of contributing

**With maintenance:**
- System evolves with needs
- Quality improves over time
- Teams rely on and contribute to the system
- Investment compounds

## Types of Maintenance

### Bug Fixes

Issues discovered in existing components:
- Visual bugs
- Interaction problems
- Accessibility issues
- Browser compatibility

Priority: Fix quickly. Bugs erode trust.

### Enhancements

Improvements to existing components:
- New variants
- Additional props
- Performance improvements
- Better accessibility

Priority: Evaluate against roadmap. Not every request should be implemented.

### New Components

Components that don't exist yet:
- Genuinely new patterns
- Previously one-off implementations being systematized

Priority: High bar. New components have ongoing maintenance cost.

### Deprecation

Removing outdated components:
- Replaced by better alternatives
- No longer used
- Fundamentally flawed

Priority: Essential for system health. Don't let cruft accumulate.

### Documentation Updates

Keeping docs current:
- New features documented
- Outdated information removed
- Examples updated
- Screenshots refreshed

Priority: Every code change should include doc updates.

## Versioning

Versioning communicates what changed and how to upgrade.

### Semantic Versioning (SemVer)

The standard: MAJOR.MINOR.PATCH

**PATCH (1.0.0 → 1.0.1):** Bug fixes, no API changes
- Safe to upgrade automatically
- No breaking changes

**MINOR (1.0.0 → 1.1.0):** New features, backwards compatible
- New components, new props, new options
- Existing code continues to work
- Deprecation warnings may appear

**MAJOR (1.0.0 → 2.0.0):** Breaking changes
- Removed components or props
- Changed API signatures
- Requires migration effort

### Pre-release Versions

For testing before release:
- 1.1.0-alpha.1 — Early development
- 1.1.0-beta.1 — Feature complete, testing
- 1.1.0-rc.1 — Release candidate

### Versioning Strategy

**Libraries:** Version the whole library together (simpler)

**Monorepos:** Version each package independently (more granular)

**Design files:** Use named versions at milestones

## Making Changes

### Additive Changes (Safe)

Adding things is usually safe:
- New components
- New props (with default values)
- New variants
- New tokens

These are minor version bumps.

### Modifying Existing Behavior

Changes to existing behaviour need care:
- Changing defaults (could break existing usage)
- Changing appearance (could break layouts/tests)
- Changing interaction patterns (could confuse users)

Evaluate impact. Communicate clearly.

### Breaking Changes

Sometimes breaking changes are necessary:
- Fixing fundamental design flaws
- Aligning with new platform patterns
- Removing deprecated items

For breaking changes:
1. Announce in advance
2. Provide migration path
3. Support old version during transition
4. Make the migration as easy as possible

## Deprecation Process

Deprecation is how you phase out components or features.

### Step 1: Mark as Deprecated

Add deprecation notices:
- Documentation warnings
- Console warnings in code
- Visual indicators in design tools

Include:
- What's deprecated
- Why it's deprecated
- What to use instead

### Step 2: Provide Migration Path

Help users transition:
- Migration guide documentation
- Codemods (automated code transforms) if possible
- Examples of before/after

### Step 3: Removal Timeline

Communicate when removal will happen:
- "Deprecated in 2.0, will be removed in 3.0"
- Give adequate time (usually one major version cycle)

### Step 4: Remove

In the next major version:
- Remove the deprecated item
- Update documentation
- Note in release notes

## Governance

Governance is how decisions get made about the system.

### Decision-Making Models

**Centralized:** One team owns the system and makes all decisions.
- Pros: Consistent vision, clear ownership
- Cons: Bottleneck, may not reflect user needs

**Federated:** Multiple teams contribute with coordination.
- Pros: Diverse input, shared ownership
- Cons: Coordination overhead, potential inconsistency

**Open Source Model:** Anyone can contribute, core team reviews.
- Pros: Community investment, distributed effort
- Cons: Quality control, alignment challenges

Most organisations use a hybrid—core team owns direction, others contribute with guidance.

### Contribution Process

How do contributions get into the system?

**Proposal:**
1. Identify need
2. Check if it exists
3. Create proposal (RFC, design doc)
4. Review with maintainers

**Design:**
1. Design exploration
2. Feedback collection
3. Design approval

**Implementation:**
1. Build component
2. Write documentation
3. Code review
4. Release

### Request Process

How do users request changes?

- Issue tracker for bugs and requests
- Discussion forum for exploration
- Regular office hours or reviews
- Clear prioritization criteria

## Measuring Success

How do you know the system is healthy?

### Adoption Metrics

- How many products use the system?
- What percentage of components come from the system?
- Are new projects starting with the system?

### Quality Metrics

- Bug count and resolution time
- Accessibility compliance
- Test coverage
- Performance benchmarks

### Engagement Metrics

- Contributions from outside core team
- Questions and answers in channels
- Documentation usage
- Training attendance

### Satisfaction Metrics

- Regular surveys
- NPS (Net Promoter Score) for internal tools
- Qualitative feedback

## The Maintenance Mindset

Design system work is infrastructure work. It requires:

**Patience:** Changes compound over time.

**Empathy:** Understanding user needs and constraints.

**Communication:** Keeping stakeholders informed.

**Pragmatism:** Balancing ideals with reality.

**Long-term thinking:** Making decisions for sustainability.

If you enjoy seeing your work multiply across products and teams, design system maintenance is deeply satisfying.

## Try It Yourself

### Exercise 1: Changelog Review

Review the changelog of a public design system (Material, Carbon, etc.):
1. How do they communicate changes?
2. What's included in minor vs. major versions?
3. How do they handle deprecations?

### Exercise 2: Deprecation Plan

You need to deprecate an old Modal component in favour of a new Dialogue component. Plan:
1. Deprecation messaging
2. Migration documentation outline
3. Timeline
4. Support during transition

### Exercise 3: Contribution Guidelines

Draft contribution guidelines for a hypothetical design system:
1. How to propose new components
2. What makes a good proposal
3. Review process
4. Implementation expectations

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

- Design systems require ongoing maintenance—they're products, not projects
- Maintenance includes: bug fixes, enhancements, new components, deprecation, documentation
- Semantic versioning communicates change impact: MAJOR.MINOR.PATCH
- Deprecation is a process: mark, migrate, timeline, remove
- Governance models: centralized, federated, or hybrid
- Contribution processes should be clear and documented
- Measure success through adoption, quality, engagement, and satisfaction

## Next Steps

You've completed the Design Systems module! You now understand:
- What design systems are and why they matter
- How to create and use design tokens
- Component architecture principles
- Writing effective documentation
- Maintenance, versioning, and governance

Continue to [UX Principles: User-Centered Thinking](../05-ux-principles/01-user-centred-thinking.md) →
