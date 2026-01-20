# Principles of Design

> **Quick Summary:** Six core principles (hierarchy, balance, contrast, repetition, alignment, and proximity) form the foundation of all effective visual design.

## The Framework

> *"Contrast is the essence of communication."* — Jan Tschichold

Design principles aren't rules to memorise. They're tools for making decisions. When you understand these principles, you can analyse why some designs work and others don't. You can make intentional choices instead of random ones.

Let's examine each principle.

## Hierarchy

Hierarchy establishes the order of importance in a design. It answers: "What should users notice first? Second? What can wait?"

<!-- visual-example: hierarchy-demo -->

### How Hierarchy Works

Your eyes are drawn to certain elements before others based on:
Elements attract attention based on their **size**, where larger items are noticed first, and their **weight**, where bold elements stand out against regular ones. Furthermore, **colour** saturation and brightness help elements pop forward, while their **position** (typically top and left) and the amount of surrounding **whitespace** also establish clear importance.

### Hierarchy in Practice

Consider a typical blog post page:
A typical blog post page demonstrates this through a large, bold **title** that is noticed first, followed by smaller and lighter **author metadata**. The **body text** is styled for readability as the main content, while **sidebar links** are kept small and subdued as secondary actions.

Without clear hierarchy, every element competes for attention and nothing wins. Users don't know where to start.

### Common Hierarchy Mistakes

> *"If you have to explain the hierarchy, there isn't one."* — d×e

Common hierarchy failures include making **everything bold**, which results in no emphasis at all, or using **too many sizes** and competing focal points that create visual chaos and a flat, confusing hierarchy.

## Balance

Balance is the distribution of visual weight across a design. Balanced designs feel stable; unbalanced designs feel dynamic or unsettling.

<!-- visual-example: balance-demo -->

<!-- illustration: balance-types -->

### Types of Balance

**Symmetrical Balance** occurs when elements are mirrored across a central axis. This creates a formal, stable, and traditional feel. Think of a classic wedding invitation or a government building.

**Asymmetrical Balance** is achieved when different elements balance each other through size, colour, or position rather than mirroring. A large image on the left might be balanced by a block of text and a heavy button on the right. This feels dynamic, modern, and interesting.

**Radial Balance** happens when elements radiate from a central point. While less common in standard UI layouts, it is often used in logos, dashboards, or loading states to focus attention inward.

### Balance in Practice

A hero section might use asymmetrical balance:
- Left side: Large heading and text (heavy)
- Right side: Single image (lighter but positioned to balance)

The sides aren't identical, but they feel balanced because the visual weight is distributed thoughtfully.

### Common Balance Mistakes

Lopsided layouts, heavy headers or footers, and a failure to account for the visual weight of whitespace often result in unbalanced and unsettling designs.

## Contrast

Contrast is the difference between elements. It creates visual interest, establishes hierarchy, and improves readability.

<!-- visual-example: contrast-demo -->

### Types of Contrast

Contrast is achieved through differences in **size**, **colour**, and **weight**, as well as through variations in **shape** and **texture** to create emphasis and interest.

### Contrast in Practice

A call-to-action button uses contrast to stand out:
A call-to-action button leverages **colour** to pop against neutral backgrounds, **size** to be larger than surrounding text, and **shape** to stand out through rounded corners.

Without contrast, the button blends in and users miss it.

### The 60-30-10 Rule

A helpful guideline for colour contrast:
A helpful guideline is the **60-30-10 Rule**, where 60% of the design uses a dominant neutral colour, 30% uses a secondary supporting colour, and 10% is reserved for an accent colour for key highlights.

### Common Contrast Mistakes

Common contrast mistakes include low contrast text that harms accessibility, or having too many high-contrast elements that compete for attention without meaning.

## Repetition

Repetition creates consistency through recurring visual elements. It helps users learn patterns and builds cohesion.

<!-- visual-example: repetition-demo -->

### What Gets Repeated

Consistency is built by repeating **colours**, **typography**, and **spacing** throughout the interface, while reusing **components** and **grid patterns** to help users learn and predict behaviour.

### Repetition in Practice

Every button on a site should look like a button. Every heading at a certain level should be styled the same. Every card component should share visual treatment.

This isn't boring. It's helpful. Users learn what elements do based on how they look. Repetition enables prediction.

### Repetition and Design Systems

Design systems are essentially codified repetition. They define how elements should look and behave, ensuring consistency across products and teams.

### Common Repetition Mistakes

Inconsistency in styling and reinventing wheels for common patterns creates unnecessary variation that breaks the user's mental model.

## Alignment

Alignment is the placement of elements relative to each other. It creates visual connections and organisation.

<!-- visual-example: alignment-demo -->

<!-- illustration: alignment-grid -->

### Types of Alignment

Different types of alignment include **edge alignment** along common borders, **centre alignment** along a shared axis, and **grid alignment** where elements snap to an underlying structure.

### Alignment in Practice

In a form:
In a well-aligned form, all labels and inputs share a clean left-aligned edge, while the submit button aligns with the input fields to create a clear visual path for the user.

This creates invisible lines that guide the eye and make the form feel organised.

### The Grid System

Most professional designs use an underlying grid, typically 8px, 4px, or a column-based system. Elements align to this grid, creating rhythm and consistency.

We'll cover grids in depth in later lessons.

### Common Alignment Mistakes

Arbitrary positioning and mixing alignments without a logical reason often result in a near-alignment that feels accidental and messy.

## Proximity

Proximity uses space to indicate relationships. Elements that are close together are perceived as related.

<!-- visual-example: proximity-demo -->

### Proximity in Practice

A form groups related fields:
Forms often use proximity to group first and last name fields closely together, while using larger gaps to separate personal information from address and payment details.

Without these groupings, users see a wall of fields rather than logical sections.

### The Law of Proximity

This is one of the Gestalt principles (which we'll cover next lesson). The human brain automatically groups nearby elements. You can use this to:
The Law of Proximity allows you to group related content and separate distinct sections without the need for heavy boxes or lines, creating visual hierarchy through spacing alone.

### Common Proximity Mistakes

Equal spacing everywhere results in a flat layout with no grouping, while overly tight or loose spacing can make interfaces feel either cluttered or disconnected.

## Principles Working Together

These principles don't operate in isolation. Every good design uses all six:

A well-designed card might:
A well-designed card emphasizes the title over the description through **hierarchy**, uses **contrast** on the button, and maintains internal **alignment** and **proximity** while matching other cards through **repetition** to create overall **balance**.

When you learn to see these principles, you start to see design differently.

## Try It Yourself

### Exercise 1: Principle Identification

Find a web page or app you admire. Identify how it uses:
Identify how hierarchy establishes importance, how contrast creates differentiation, and how invisible lines of alignment and proximity group elements effectively.

### Exercise 2: Improvement Analysis

Find a web page or app that feels "off" to you. Identify which principles are violated. How could they be applied better?

### Exercise 3: Quick Redesign

Sketch (on paper) a simple card component:
- Image at top
- Title
- Short description
- Button

Apply all six principles deliberately. Then sketch it again, intentionally violating each principle. Compare how they feel.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "design-principles-quiz",
  "type": "multiple-choice",
  "title": "Design Principles",
  "description": "Test your knowledge of the six fundamental design principles.",
  "difficulty": "medium",
  "question": "A form groups 'First name' and 'Last name' fields close together, then adds more space before the 'Email' field. Which design principle is being applied?",
  "options": [
    {
      "id": "a",
      "text": "Contrast",
      "isCorrect": false,
      "explanation": "Contrast creates differentiation through visual differences like size or colour, not through spacing."
    },
    {
      "id": "b",
      "text": "Hierarchy",
      "isCorrect": false,
      "explanation": "Hierarchy establishes order of importance: what users notice first, second, etc."
    },
    {
      "id": "c",
      "text": "Proximity",
      "isCorrect": true,
      "explanation": "Correct! Proximity uses space to indicate relationships. Elements that are close together are perceived as related."
    },
    {
      "id": "d",
      "text": "Alignment",
      "isCorrect": false,
      "explanation": "Alignment is about positioning elements relative to each other along edges or axes."
    }
  ]
}
-->

## Key Takeaways

The six foundational principles—hierarchy, balance, contrast, repetition, alignment, and proximity—work together to establish importance, distribute visual weight, and build consistency. By using these tools to create differentiation through contrast and organisation through alignment and proximity, you can ensure that every design is effective and intuitive for the user.

## Next Steps

Continue to [Gestalt Principles](./03-gestalt-principles.md) →
