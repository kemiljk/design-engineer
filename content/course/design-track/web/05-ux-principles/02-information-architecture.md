# Information Architecture

> **Quick Summary:** Information architecture is how content is organized, labeled, and connected—it's the blueprint that makes complex information findable and understandable.

## What You'll Learn

- What information architecture is and why it matters
- Principles of organizing information
- Navigation patterns and systems
- Techniques for planning IA

## What is Information Architecture?

> *"Information architecture is the art and science of organising and labelling information to support usability."* — Richard Saul Wurman

Information architecture (IA) is the structural design of information:
- How content is organized into categories
- How categories relate to each other
- How users navigate between areas
- How content is labeled and described

Good IA makes products intuitive. Users find what they need without thinking about where it might be.

Bad IA makes products frustrating. Users search, scroll, and guess.

## Why IA Matters

Even beautiful interfaces fail with poor IA:
- Users can't find features they need
- Related content is scattered
- Navigation is confusing
- Mental model doesn't match system model

IA is invisible when it works and painfully obvious when it doesn't.

## Mental Models

A mental model is how users think information is organized.

Users have expectations based on:
- Experience with similar products
- Real-world analogies
- Common conventions
- Their own logic

Good IA matches user mental models. When the system works like users expect, it feels intuitive.

**Example:** A shopping site.

Users expect:
- Products organized by category
- Filters to narrow results
- Cart accessible from anywhere
- Checkout as a linear flow

If the site organizes by brand instead of category, users struggle—even if it makes sense to the business.

## Organization Schemes

How do you group information?

### Exact Schemes

Clear, objective organization:

**Alphabetical:** A-Z listing
- Good for: Directories, indexes, known-item search
- Bad for: Discovery, browsing

**Chronological:** By date/time
- Good for: News, events, activity feeds
- Bad for: Reference content

**Geographical:** By location
- Good for: Local services, store locators
- Bad for: Non-location content

### Ambiguous Schemes

Subjective, requires judgment:

**By Topic:** Subject-based grouping
- Good for: Content-heavy sites, documentation
- Challenge: Topics overlap

**By Task:** Organized around user goals
- Good for: Service sites, applications
- Challenge: Users have multiple goals

**By Audience:** Segmented by user type
- Good for: Products with distinct audiences
- Challenge: Users may not self-identify

**By Metaphor:** Mapped to familiar concept
- Good for: Novel interfaces
- Challenge: Metaphors break down

Most products use hybrid schemes—topical navigation with task-based sections.

## Navigation Patterns

Navigation helps users move through information.

<!-- illustration: navigation-patterns -->

### Global Navigation

Present on every page:
- Primary nav (main categories)
- Utility nav (account, search, help)

**Patterns:**
- Horizontal nav bar
- Sidebar nav
- Tab bar (mobile)

### Local Navigation

Context-specific to current section:
- Sub-navigation within a category
- Secondary tabs
- In-page navigation

### Contextual Navigation

Related content within pages:
- "Related articles"
- "You might also like"
- "Next/Previous"

### Search

Finding specific content:
- Search box
- Filters
- Autocomplete

Navigation and search are complementary. Some users browse; others search.

### Breadcrumbs

Show current location in hierarchy:
```
Home > Products > Electronics > Cameras
```

Breadcrumbs help users:
- Understand where they are
- Navigate to parent sections
- Understand content relationships

### Footer Navigation

Often overlooked but valuable:
- Secondary links
- Legal/policy pages
- Sitemap for SEO

## Hierarchy and Depth

### How Deep Should Hierarchy Go?

Traditional wisdom: "No more than 3 clicks." This is oversimplified.

Better principle: Each step should feel like progress toward the goal.

10 clear clicks beat 3 confusing ones.

### Flat vs. Deep

**Flat hierarchy:** Few levels, many items per level
- Pros: Everything visible, fewer clicks
- Cons: Overwhelming, hard to scan

**Deep hierarchy:** Many levels, few items per level
- Pros: Manageable choices at each level
- Cons: More navigation, risk of getting lost

**Balance:** Usually 2-4 levels for primary navigation, with 5-9 items per level.

## Labeling

Labels are how you name things. Clear labels make IA work.

### Good Label Characteristics

**Familiar:** Use language users know, not internal jargon.
- ✗ "Modules" → ✓ "Features"
- ✗ "Engagement Dashboard" → ✓ "Analytics"

**Specific:** Clearly indicate what's there.
- ✗ "Resources" (what kind?) → ✓ "Help Articles"
- ✗ "Tools" (which tools?) → ✓ "Writing Tools"

**Consistent:** Similar things labeled similarly.
- If "Settings" is here, don't call it "Preferences" there

**Scannable:** Short enough to scan quickly.
- Aim for 1-2 words for navigation labels

### Testing Labels

Labels that make sense to you might not make sense to users. Test with:

**Card sorting:** Users group content and name groups.

**Tree testing:** Users navigate a text-only hierarchy to find items.

**First-click testing:** See where users click first for a given task.

## IA Planning Techniques

<!-- illustration: ia-hierarchy -->

### Content Inventory

List everything that exists or will exist:
- Pages
- Features
- Content types

This reveals scope and overlap.

### Card Sorting

Understand how users group content:
1. Write content items on cards
2. Ask users to sort into groups
3. Ask users to name groups
4. Look for patterns across users

**Open card sort:** Users create their own groups
**Closed card sort:** Users sort into predefined groups

### Site Mapping

Visualize the structure:
```
Home
├── Products
│   ├── Category A
│   │   ├── Product 1
│   │   └── Product 2
│   └── Category B
├── About
│   ├── Company
│   └── Team
└── Contact
```

Maps clarify relationships and reveal gaps.

### Tree Testing

Test navigation without visual design:
1. Create text-only tree of navigation
2. Give users tasks ("Find X")
3. Record where they navigate
4. Identify problem areas

Validates IA before investing in design.

## IA for Applications

Web applications have different IA needs than content sites:

### Feature Organization

How are features grouped?
- By workflow stage
- By user type
- By frequency of use
- By object type

### Object-Oriented IA

Many apps organize around objects:
- Projects → Tasks → Comments
- Contacts → Deals → Activities
- Courses → Lessons → Exercises

Navigation helps users find and manipulate objects.

### Dashboard vs. Task Flow

**Dashboard:** Overview of multiple things
**Task flow:** Linear progression through a process

Most apps have both—dashboard for orientation, task flows for action.

## Try It Yourself

### Exercise 1: Mental Model Mapping

For a product you're working on:
1. How do you think content is organized?
2. Interview 3 users—how do they think it's organized?
3. Where do mental models differ?

### Exercise 2: Quick Card Sort

With sticky notes or index cards:
1. Write 15-20 features/content items
2. Ask 3-5 people to sort them into groups
3. Ask them to name each group
4. Note patterns and surprises

### Exercise 3: Navigation Audit

For a website or app:
1. Map out the navigation structure
2. Identify: What's in global nav? Local nav? Contextual?
3. Try to complete 3 common tasks. Was navigation helpful?
4. What would you improve?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "information-architecture-quiz",
  "type": "multiple-choice",
  "title": "Information Architecture",
  "description": "Test your understanding of IA principles.",
  "difficulty": "medium",
  "question": "What is a 'mental model' in information architecture, and why does it matter?",
  "options": [
    {
      "id": "a",
      "text": "A diagram that designers create showing how the site should be organized",
      "isCorrect": false,
      "explanation": "That would be a site map. Mental models are about user expectations, not designer plans."
    },
    {
      "id": "b",
      "text": "How users think information is organized—when IA matches it, interfaces feel intuitive",
      "isCorrect": true,
      "explanation": "Correct! Users have expectations based on experience with similar products and real-world logic. Good IA aligns with these expectations, making navigation feel natural."
    },
    {
      "id": "c",
      "text": "A psychological framework for predicting which colors users prefer",
      "isCorrect": false,
      "explanation": "Mental models are about information organization, not visual preferences."
    },
    {
      "id": "d",
      "text": "The documentation that explains navigation to developers",
      "isCorrect": false,
      "explanation": "Developer documentation is different from mental models, which are about user expectations."
    }
  ]
}
-->

## Key Takeaways

- Information architecture is how content is organized, labeled, and connected
- Good IA matches user mental models
- Organization schemes: alphabetical, chronological, topical, task-based, audience-based
- Navigation types: global, local, contextual, search, breadcrumbs
- Balance hierarchy depth with clarity—each step should feel like progress
- Labels should be familiar, specific, consistent, and scannable
- Test IA with card sorting, tree testing, and first-click testing

## Next Steps

Continue to [Interaction Design Basics](./03-interaction-design-basics.md) →
