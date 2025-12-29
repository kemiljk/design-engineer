# User-Centered Thinking

> **Quick Summary:** User-centred design means making decisions based on real user needs—not assumptions, personal preferences, or what's easiest to build.

## What You'll Learn

- What user-centred design means in practice
- How to develop empathy for users
- Methods for understanding user needs
- Applying user thinking to design decisions

## The Shift in Perspective

> *"Design is not just what it looks like and feels like. Design is how it works."* — Steve Jobs

It's tempting to design for yourself. You understand your own preferences, and building for yourself is fast.

But you are not your user.

Your users:
- Have different goals
- Have different contexts
- Have different abilities
- Have different technical comfort
- Use your product differently than you imagine

User-centred design is a deliberate practice of setting aside assumptions and designing for actual users.

## Why User-Centered Design?

Products built without user input tend to:
- Solve the wrong problems
- Use confusing language
- Have unintuitive flows
- Frustrate and alienate users
- Fail in the market

Products built with user input tend to:
- Address real needs
- Use familiar mental models
- Match user expectations
- Build loyalty and trust
- Succeed

This isn't ideology—it's pragmatism.

## Developing Empathy

Empathy is the foundation of user-centred design. It means understanding users' situations, needs, and frustrations.

### Talk to Users

There's no substitute for direct contact:
- User interviews
- Support conversations
- Usability testing
- Customer feedback review

Even a few conversations reveal insights you'd never have guessing.

### Observe Users

Watching users interact with products (yours or competitors'):
- What do they struggle with?
- What do they skip?
- What questions do they have?
- What workarounds do they create?

Observation reveals behaviour that users might not report.

### Use the Product Yourself

Dogfooding means using your own product:
- Complete real tasks
- Use it in realistic conditions
- Notice friction and confusion

But remember—your familiarity biases you. You know how it's supposed to work.

### Read Support Tickets

Support requests reveal:
- Common confusions
- Missing features
- Documentation gaps
- Accessibility issues

Pattern recognition across tickets identifies systemic problems.

### Create User Personas

Personas are fictional characters representing user types:
- Name and background
- Goals and motivations
- Pain points and frustrations
- Technical comfort level
- Context of use

**Example Persona:**

<!-- visual-example: persona-card-demo -->

### Journey Mapping

Map the entire user experience:
- How do they discover the product?
- What's their first experience?
- How do they accomplish core tasks?
- What happens when things go wrong?
- How do they return over time?

Journey maps reveal touchpoints you might neglect.

<!-- illustration: user-journey-map -->

## Applying User Thinking

Once you understand users, apply that understanding:

### Question Assumptions

When you think "users will..." stop and ask:
- How do I know this?
- What evidence supports it?
- What would happen if I'm wrong?

### Prioritise by User Impact

Features that improve user outcomes should rank higher than:
- Features you want to build
- Features that are easy to build
- Features competitors have

### Design for the Struggle

Users don't use products—they struggle with problems. Products help them struggle less.

Ask:
- What problem is the user trying to solve?
- What's currently difficult about solving it?
- How can we make it easier?

### Consider Context

Users exist in contexts that affect their experience:
- Mobile on commute (distracted, one-handed)
- Desktop at work (focused but interrupted)
- Tablet at home (relaxed, exploring)

Design for real contexts, not ideal ones.

### Account for Diversity

Users vary in:
- Age and generation
- Physical abilities
- Technical expertise
- Language and culture
- Economic circumstances
- Device and connection quality

Designing for diversity improves the experience for everyone.

## Common Traps

### The False Consensus Effect

Assuming others think like you do. Your preferences aren't universal.

**Fix:** Gather diverse input. Challenge your assumptions.

### The Curse of Knowledge

Once you know something, it's hard to imagine not knowing it.

**Fix:** Watch new users. Their confusion reveals your blind spots.

### Designing for Edge Cases

Spending disproportionate effort on rare scenarios while neglecting common ones.

**Fix:** Prioritise by user impact and frequency.

### Solving Your Problems

Building features you want rather than users need.

**Fix:** Validate needs before building. "Would I use this?" isn't sufficient validation.

### Ignoring Negative Feedback

Dismissing complaints as user error or unusual cases.

**Fix:** Treat complaints as data. Patterns matter.

<!-- illustration: ux-traps -->

## User Research Basics

You don't need a research team to practice user-centred design.

### Quick User Interviews

5-6 conversations can reveal major insights:
1. Recruit users (existing, potential, or proxies)
2. Prepare 5-7 open questions
3. Listen more than talk
4. Note patterns across conversations

Sample questions:
- "Walk me through how you currently do X."
- "What's the hardest part about Y?"
- "What would make this easier?"

### Usability Testing

Watch users attempt tasks:
1. Define tasks to test
2. Recruit 5 participants (5 users find ~80% of issues)
3. Ask them to think aloud as they work
4. Note where they struggle
5. Resist the urge to help

Usability testing reveals where your design fails users.

### Feedback Analysis

Mine existing feedback:
- Support tickets
- App store reviews
- Social media mentions
- Survey responses

Categorize and quantify. What patterns emerge?

## User-Centered Decision Making

Apply user thinking to everyday decisions:

**When designing a feature:**
- Who will use this?
- What are they trying to accomplish?
- What will make this easy vs. hard?

**When prioritising work:**
- What causes the most user pain?
- What would help the most users?
- What matches user goals?

**When evaluating designs:**
- Can users accomplish their goals?
- Is this intuitive for our users (not just us)?
- What could go wrong?

## Try It Yourself

### Exercise 1: Assumption Audit

For a feature you're working on, list:
1. Three assumptions you're making about users
2. Evidence for or against each assumption
3. How you could validate each assumption

### Exercise 2: Quick Interview

Interview someone (friend, colleague, family) about a product they use:
1. What do they use it for?
2. What frustrates them?
3. What would they change?

Notice what surprised you.

### Exercise 3: User Observation

Watch someone use a website or app (not your product):
1. Give them a task
2. Observe without helping
3. Note where they hesitate, backtrack, or express frustration
4. Ask follow-up questions

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "user-centred-quiz",
  "type": "multiple-choice",
  "title": "User-Centered Thinking",
  "description": "Test your understanding of user-centred design.",
  "difficulty": "medium",
  "question": "What is the 'curse of knowledge' in design, and why is it problematic?",
  "options": [
    {
      "id": "a",
      "text": "Knowing too much about design principles makes you overthink simple problems",
      "isCorrect": false,
      "explanation": "The curse isn't about design knowledge—it's about product knowledge."
    },
    {
      "id": "b",
      "text": "Once you know how something works, it's hard to imagine not knowing—blinding you to user confusion",
      "isCorrect": true,
      "explanation": "Correct! Your deep familiarity with the product makes things seem obvious that aren't obvious to new users. Watch new users to reveal your blind spots."
    },
    {
      "id": "c",
      "text": "Having access to user research data biases your design decisions",
      "isCorrect": false,
      "explanation": "User research should inform design—it's not a curse but a valuable input."
    },
    {
      "id": "d",
      "text": "Knowing what competitors do limits your creative thinking",
      "isCorrect": false,
      "explanation": "Competitor awareness is helpful context, not a curse."
    }
  ]
}
-->

## Key Takeaways

- User-centred design means making decisions based on real user needs
- You are not your user—set aside assumptions
- Develop empathy through conversations, observation, and research
- Create personas and journey maps to align teams
- Question assumptions and prioritise by user impact
- Account for diverse users and contexts
- Quick research (interviews, usability testing, feedback analysis) is valuable

## Next Steps

Continue to [Information Architecture](./02-information-architecture.md) →
