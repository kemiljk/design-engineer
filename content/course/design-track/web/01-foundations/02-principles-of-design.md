# Principles of Design

> **Quick Summary:** Six core principles (hierarchy, balance, contrast, repetition, alignment, and proximity) form the foundation of all effective visual design.

## What You'll Learn

- The six fundamental design principles and why they matter
- How to recognise each principle in existing designs
- How to apply these principles to improve interfaces
- The relationship between principles and usability

## The Framework

> *"Contrast is the essence of communication."* — Jan Tschichold

Design principles aren't rules to memorise. They're tools for making decisions. When you understand these principles, you can analyse why some designs work and others don't. You can make intentional choices instead of random ones.

Let's examine each principle.

## Hierarchy

Hierarchy establishes the order of importance in a design. It answers: "What should users notice first? Second? What can wait?"

<!-- visual-example: hierarchy-demo -->

### How Hierarchy Works

Your eyes are drawn to certain elements before others based on:
- **Size**: Larger elements attract attention first
- **Weight**: Bold elements stand out from regular weight
- **Color**: Brighter or more saturated colors pop forward
- **Position**: Top and left elements (in left-to-right languages) are scanned first
- **Space**: Elements with more surrounding whitespace feel important

### Hierarchy in Practice

Consider a typical blog post page:
1. **Title** (largest, boldest) — noticed first
2. **Author/date** (smaller, lighter) — supporting info
3. **Body text** (readable size, regular weight) — main content
4. **Sidebar links** (smaller, subdued) — secondary actions

Without clear hierarchy, every element competes for attention and nothing wins. Users don't know where to start.

### Common Hierarchy Mistakes

> *"If you have to explain the hierarchy, there isn't one."* — d×e

- **Everything is bold**: When everything is emphasised, nothing is
- **Too many sizes**: Creates visual chaos
- **Competing focal points**: Multiple elements fighting for attention
- **Flat hierarchy**: All elements feel equally important

## Balance

Balance is the distribution of visual weight across a design. Balanced designs feel stable; unbalanced designs feel dynamic or unsettling.

<!-- visual-example: balance-demo -->

<!-- illustration: balance-types -->

### Types of Balance

**Symmetrical Balance**: Elements are mirrored across an axis. Feels formal, stable, traditional.

**Asymmetrical Balance**: Different elements balance each other through size, color, or position. Feels dynamic, modern, interesting.

**Radial Balance**: Elements radiate from a central point. Less common in UI, more common in logos and graphics.

### Balance in Practice

A hero section might use asymmetrical balance:
- Left side: Large heading and text (heavy)
- Right side: Single image (lighter but positioned to balance)

The sides aren't identical, but they feel balanced because the visual weight is distributed thoughtfully.

### Common Balance Mistakes

- **Lopsided layouts**: All content cramped on one side
- **Heavy footers/headers**: Top or bottom dominates
- **Ignoring whitespace**: Empty space has visual weight too

## Contrast

Contrast is the difference between elements. It creates visual interest, establishes hierarchy, and improves readability.

<!-- visual-example: contrast-demo -->

### Types of Contrast

- **Size contrast**: Large vs. small
- **Color contrast**: Dark vs. light, complementary colors
- **Weight contrast**: Bold vs. regular, thick vs. thin
- **Shape contrast**: Rounded vs. angular, organic vs. geometric
- **Texture contrast**: Smooth vs. rough (less common in UI)

### Contrast in Practice

A call-to-action button uses contrast to stand out:
- **Color**: Bright against a neutral background
- **Size**: Larger than surrounding text
- **Shape**: Rounded corners when nearby elements are angular

Without contrast, the button blends in and users miss it.

### The 60-30-10 Rule

A helpful guideline for color contrast:
- **60%**: Dominant color (usually background/neutral)
- **30%**: Secondary color (supporting elements)
- **10%**: Accent color (calls to action, key highlights)

### Common Contrast Mistakes

- **Low contrast text**: Hard to read, accessibility issues
- **Everything high contrast**: Nothing stands out because everything does
- **Random contrast**: Elements differ arbitrarily without meaning

## Repetition

Repetition creates consistency through recurring visual elements. It helps users learn patterns and builds cohesion.

<!-- visual-example: repetition-demo -->

### What Gets Repeated

- **Colors**: Consistent palette throughout
- **Typography**: Same fonts, sizes, styles for similar elements
- **Spacing**: Consistent margins, padding, gaps
- **Components**: Buttons, cards, icons that look the same everywhere
- **Patterns**: Grid structures, alignment, layout approaches

### Repetition in Practice

Every button on a site should look like a button. Every heading at a certain level should be styled the same. Every card component should share visual treatment.

This isn't boring. It's helpful. Users learn what elements do based on how they look. Repetition enables prediction.

### Repetition and Design Systems

Design systems are essentially codified repetition. They define how elements should look and behave, ensuring consistency across products and teams.

### Common Repetition Mistakes

- **Inconsistency**: Similar elements styled differently
- **Reinventing wheels**: Creating new patterns when existing ones work
- **Too much variation**: "Creative" choices that break patterns unnecessarily

## Alignment

Alignment is the placement of elements relative to each other. It creates visual connections and organisation.

<!-- visual-example: alignment-demo -->

<!-- illustration: alignment-grid -->

### Types of Alignment

- **Edge alignment**: Elements share a left, right, top, or bottom edge
- **Center alignment**: Elements share a center axis
- **Grid alignment**: Elements snap to an underlying grid structure

### Alignment in Practice

In a form:
- All labels left-align
- All inputs left-align (and align with labels)
- The submit button aligns with inputs

This creates invisible lines that guide the eye and make the form feel organised.

### The Grid System

Most professional designs use an underlying grid, typically 8px, 4px, or a column-based system. Elements align to this grid, creating rhythm and consistency.

We'll cover grids in depth in later lessons.

### Common Alignment Mistakes

- **Arbitrary positioning**: Elements placed "wherever"
- **Mixing alignments**: Some left-aligned, some centered, without reason
- **Near-alignment**: Almost aligned is worse than obviously different

## Proximity

Proximity uses space to indicate relationships. Elements that are close together are perceived as related.

<!-- visual-example: proximity-demo -->

### Proximity in Practice

A form groups related fields:
- First name and last name are close together
- A gap separates personal info from address info
- Another gap separates address from payment info

Without these groupings, users see a wall of fields rather than logical sections.

### The Law of Proximity

This is one of the Gestalt principles (which we'll cover next lesson). The human brain automatically groups nearby elements. You can use this to:
- Group related content without boxes or lines
- Separate distinct sections without heavy dividers
- Create visual hierarchy through spacing alone

### Common Proximity Mistakes

- **Equal spacing everywhere**: No grouping, flat layout
- **Too tight**: Elements crammed together feel cluttered
- **Too loose**: Elements feel disconnected, relationships unclear

## Principles Working Together

These principles don't operate in isolation. Every good design uses all six:

A well-designed card might:
- Use **hierarchy** to emphasize the title over description
- Apply **contrast** to make the CTA button stand out
- Maintain **alignment** so text and images form clean lines
- Show **proximity** by grouping title and subtitle together
- Use **repetition** to match other cards on the page
- Create **balance** between image and text content

When you learn to see these principles, you start to see design differently.

## Try It Yourself

### Exercise 1: Principle Identification

Find a web page or app you admire. Identify how it uses:
1. Hierarchy: What's most important? How do you know?
2. Contrast: What stands out? Why?
3. Alignment: What invisible lines connect elements?
4. Proximity: What's grouped together? What's separated?

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
      "explanation": "Contrast creates differentiation through visual differences like size or color, not through spacing."
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

- Six principles guide all visual design: hierarchy, balance, contrast, repetition, alignment, proximity
- Hierarchy establishes order of importance
- Balance distributes visual weight
- Contrast creates differentiation and interest
- Repetition builds consistency and learnability
- Alignment creates organisation through positioning
- Proximity groups related elements through spacing
- These principles work together in every effective design

## Next Steps

Continue to [Gestalt Principles](./03-gestalt-principles.md) →
