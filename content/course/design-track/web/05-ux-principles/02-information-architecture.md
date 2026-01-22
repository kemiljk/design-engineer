# Information Architecture

> **Quick Summary:** Information architecture is how content is organised, labelled, and connected—it's the blueprint that makes complex information findable and understandable.

## What You'll Learn

- What information architecture (IA) is and why it's fundamental to product success
- Core principles of organising information
- Various navigation patterns and systems
- Practical techniques for planning robust IA

## The Invisible Structure

Information Architecture (IA) is the structural design of shared information environments. It is the art and science of organising and labelling websites, intranets, online communities, and software to support usability and findability.

Think of IA as the blueprint of a building. You can paint the walls (visual design) and install the light switches (interaction design), but if the bathroom is only accessible through the kitchen, the house is fundamentally broken. IA ensures that the rooms are in the right place and the hallways lead where you expect them to.

## Mental Models

A **mental model** is the image of the world that a user carries in their head. When a user arrives at your site, they already have an expectation of how it should work based on their past experiences.

If you are designing a shopping site, users expect products to be categorised by type (Men, Women, Kids), not by colour or date of manufacture. They expect the "Cart" to be in the top right. They expect clicking the logo to take them Home.

Good IA aligns the system model (how it actually works) with the user's mental model (how they think it works). When these align, the interface feels "intuitive." When they clash, the user feels confused and frustrated.

## Organization Schemes

How do you group a pile of 1,000 items? There are two main ways to approach this:

Exact schemes sort information objectively into single, correct locations, such as alphabetical lists for contact directories, chronological feeds for news where timeliness is paramount, or geographical maps for physical locations.

Ambiguous schemes are more subjective and allow for items to potentially appear in multiple places, such as topical groupings like news or sports, task-based categories focused on user actions like "Pay Bill," or audience-specific sections tailored to students or teachers.

Most effective navigation systems use a hybrid approach—perhaps a topical primary navigation combined with a task-based utility menu.

<!-- illustration: organization-schemes -->

## Navigation Patterns

Navigation is the set of controls that allow users to move through the IA structure.

<!-- visual-example: nav-patterns-demo -->
<!-- illustration: navigation-patterns -->

**Global Navigation:**
This is your "North Star." It appears on every page (usually the top header or left sidebar) and provides access to the main sections of the site. It answers the question: "What are the big things I can do here?"

**Local Navigation:**
This appears within a specific section to help users move deeper. On a "Clothing" page, the local nav might be "Shirts, Pants, Shoes."

**Contextual Navigation:**
These are the links embedded within the content itself. "Related Articles," "You Might Also Like," or inline links in a paragraph. They support serendipitous discovery.

**Breadcrumbs:**
"Home > Products > Electronics > Cameras". Breadcrumbs show the user exactly where they are in the hierarchy and provide a one-click path back to safety. They are essential for deep sites.

## Hierarchy and Depth

### Broad vs. Deep
Is it better to have a menu with 10 items (Broad) or a menu with 3 items that each have sub-menus (Deep)?

**Broad hierarchies** (flat) are generally better for discoverability. Users can see more options at a glance without clicking. However, too many options can lead to "choice paralysis."

**Deep hierarchies** keep the interface clean but hide content. Users have to dig to find what they want, and if they go down the wrong rabbit hole, they have to backtrack.

The "Three-Click Rule" (users should find anything in 3 clicks) is a myth. Users don't mind clicking 5 times if each click feels like progress ("Electronics" -> "Cameras" -> "DSLR" -> "Canon" -> "Model X"). They mind clicking once if they have no idea which button to push.

<!-- visual-example: ia-hierarchy-depth-demo -->
<!-- illustration: hierarchy-depth -->

## Labelling

Labelling is the art of naming things. It sounds simple, but it is often the point of failure.

**Avoid internal jargon:** Don't call your help section "Knowledge Repository" if users are looking for "Help." Don't call your pricing page "Investment" if users are looking for "Cost."

**Be specific:** "Resources" is a terrible label. It could mean anything. "Case Studies," "Whitepapers," or "Blog" are specific.

**Be consistent:** If you call it "My Account" in the header, don't call it "Profile" in the footer.

## IA Planning Techniques

How do you actually create an IA? You don't start in Figma. You start with data.

<!-- illustration: ia-hierarchy -->

**Content Inventory:** Before you can organise, you need to know what you have. A content inventory is a spreadsheet listing every page and piece of content on the current site. It is tedious, but necessary.

**Card Sorting:** This is a user research method where you write topics on index cards and ask users to group them.
- **Open Sort:** Users create their own group names. This reveals their mental model.
- **Closed Sort:** Users sort items into pre-defined categories. This tests if your categories make sense.

**Tree Testing:** Once you have a proposed structure, you test it without visual design. You give users a simplified text-only version of your menu and ask them, "Where would you click to find a return policy?" If they fail in the text tree, they will fail in the final design.

**Site Mapping:** Finally, you visualize the structure in a sitemap—a flowchart showing the hierarchy of pages and how they connect. This becomes the master document for the design phase.

## Try It Yourself

### Exercise 1: Mental Model Mapping
Pick a complex app you use (like Spotify or Amazon). Try to draw a map of how you *think* it is organised. Then, navigate through the app and draw the *actual* map. Where do they differ?

### Exercise 2: Quick Card Sort
Write down 20 features of a banking app (Check Balance, Transfer Money, Pay Bill, Order Checks, etc.) on sticky notes. Ask three friends to group them. Do they group "Pay Bill" with "Transfers" or as its own thing?

### Exercise 3: Navigation Audit
Visit a university website (they often have complex IAs). Try to find the academic calendar. Count your clicks. Did the labels lead you there, or did you have to guess?

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
      "text": "A diagram that designers create showing how the site should be organised",
      "isCorrect": false,
      "explanation": "That would be a site map. Mental models are about user expectations, not designer plans."
    },
    {
      "id": "b",
      "text": "How users think information is organised—when IA matches it, interfaces feel intuitive",
      "isCorrect": true,
      "explanation": "Correct! Users have expectations based on experience with similar products and real-world logic. Good IA aligns with these expectations, making navigation feel natural."
    },
    {
      "id": "c",
      "text": "A psychological framework for predicting which colours users prefer",
      "isCorrect": false,
      "explanation": "Mental models are about information organisation, not visual preferences."
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

- Information Architecture serves as the blueprint for your product
- should be designed prior to any visual work, using card sorting to discover user groupings
- should be designed prior to any visual work, using card sorting to discover user groupings
- tree testing to validate the proposed structure tree testing to validate the proposed structure
- By aligning navigation with user mental models and ensuring labels are specific
- consistent, you can provide an interface where breadcrumbs
- consistent, you can provide an interface where breadcrumbs
- global navigation offer necessary context global navigation offer necessary context
- safety for exploration safety for exploration

## Next Steps

Continue to [Interaction Design Basics](./03-interaction-design-basics.md) →
