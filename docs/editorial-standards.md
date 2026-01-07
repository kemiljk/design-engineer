# Editorial Standards - Design Engineer Course

## Overview

These standards ensure consistency, clarity, and authentic voice across all course materials. As an editorial partner, apply these rigorously whilst preserving technical accuracy and the author's intent.

---

## British English

### Spelling Conventions

**Always use British English for user-facing prose:**

| American | British |
|----------|---------|
| color | colour |
| behavior | behaviour |
| customize | customise |
| organize | organise |
| realize | realise |
| recognize | recognise |
| analyze | analyse |
| optimize | optimise |
| specialize | specialise |
| favorite | favourite |
| center | centre |
| theater | theatre |
| defense | defence |
| license (noun) | licence |
| practice (noun) | practice |
| practice (verb) | practise |
| gray | grey |
| traveled | travelled |
| modeling | modelling |
| canceled | cancelled |
| labeled | labelled |

**Exception:** Always use American English in code (CSS properties, HTML attributes, JavaScript).

```css
/* Correct - code uses American English */
.element {
  color: blue;
  text-align: center;
  background-color: gray;
}
```

```markdown
<!-- Correct - prose uses British English -->
The button's colour should match your brand palette.
```

### Grammar Differences

**Collective nouns:**
- British: "The team are working" (plural)
- Use British style

**Whilst vs While:**
- Use "whilst" for temporal/conditional clauses in formal writing
- Both are acceptable; "whilst" is more traditionally British

**At the weekend vs On the weekend:**
- Use "at the weekend"

### Date Formats
- British: 21 December 2025
- NOT American: December 21, 2025

### Currency
- Use £ (GBP) as primary
- Format: £199 (no space)

---

## Voice and Tone

### Authentic Practitioner Voice

Write as an **experienced practitioner teaching a colleague**—not as generic AI.

**Good:**
> "The terminal might look intimidating, but it's simply a text-based way to talk to your computer. Once you understand the basics, it becomes powerful."

**Bad:**
> "It's important to note that the terminal, overall, is a powerful tool. Additionally, it can be intimidating. However, once you learn it, you'll find it's quite useful."

### Core Principles

1. **Confident, not arrogant**
   - State facts directly
   - Avoid hedging unnecessarily
   - Be honest about tradeoffs

2. **Concrete over abstract**
   - Use specific examples
   - Prefer "real" over "basically"
   - Show, don't just tell

3. **Direct and concise**
   - Remove filler words
   - Cut redundancy
   - Use active voice

4. **Natural rhythm**
   - Vary sentence length
   - Avoid mechanical balance
   - Use natural transitions

---

## Editorial Patterns to Avoid

### AI Tells - Remove These

| ❌ Don't Use | ✅ Use Instead |
|-------------|---------------|
| "It is important to note that..." | "Note that..." or just state it |
| "In conclusion," | Remove entirely |
| "Overall," | Remove or be specific |
| "In summary," | Use "Key Takeaways" section |
| "On the other hand," | "However," |
| "Additionally," | "Also," or just continue |
| "Furthermore," | Remove or restructure |
| "It should be noted that..." | Just state it |
| "You might want to..." | "You should..." or "You can..." |
| "This allows you to..." | "This lets you..." |
| "In order to..." | "To..." |
| "utilize" | "use" |
| "commence" | "start" / "begin" |
| "implement" (overused) | "build" / "create" / "add" |

### Hedging and Filler

**Remove excessive qualifiers:**
- "just", "simply", "basically", "really", "very", "quite"
- "might", "could", "perhaps" (when being definitive is better)
- "sort of", "kind of", "a bit"

**Before:**
> "You can just simply add a class to basically style the element."

**After:**
> "Add a class to style the element."

### Repetitive Patterns

**Avoid starting consecutive sentences the same way:**

❌ "This is a button. This button has state. This makes it interactive."

✅ "The button has state, making it interactive."

---

## Technical Writing Standards

### Code Examples

1. **Always include context**
   - Show where code lives
   - Explain what it does in prose, not comments
   - Use realistic examples

2. **Comments in code**
   - Use sparingly
   - Explain "why", not "what"
   - Never state the obvious

❌ **Bad:**
```javascript
// Add 1 to counter
counter = counter + 1;
```

✅ **Good:**
```javascript
// Reset to 1 for accessibility - screen readers announce count
counter = counter + 1;
```

3. **British English in comments explaining to users**

```javascript
// The gradient changes colour based on scroll position
const gradient = calculateColour(scrollY);
```

### Explaining Concepts

**Pattern: Why → What → How**

1. **Why** - Why does this matter?
2. **What** - What is the concept?
3. **How** - How do you use it?

**Example:**

> Semantic HTML improves accessibility. Screen readers announce "Navigation landmark" for `<nav>`, helping users navigate. Use `<nav>` for major navigation blocks.

### Technical Accuracy

- Stay current with web standards
- Reference actual specifications when relevant
- Be honest about browser support
- Mention tradeoffs explicitly

---

## Section Structure

### Lesson Anatomy

Every lesson should have:

1. **Quick Summary** - One sentence at the top
2. **What You'll Learn** - Bullet points of outcomes
3. **Main Content** - Teaching sections with headers
4. **Try It Yourself** - Practical exercises
5. **Test Your Understanding** - Quiz
6. **Key Takeaways** - Summary bullets
7. **Next Steps** - Link to next lesson

### Headers

- Use sentence case, not Title Case
- Be specific: "Building a button" not "Buttons"
- Keep concise: 2-7 words ideal

### Lists

- Use parallel structure
- Start with verbs when action-oriented
- Keep items roughly equal length
- Aim for 3-7 items (cognitive limit)

---

## Accessibility

### Writing for All Learners

1. **Define jargon on first use**
   - Don't assume knowledge
   - Link to prerequisite concepts

2. **Use inclusive examples**
   - Diverse names in code examples
   - Global perspectives where relevant

3. **Respect user preferences**
   - Always mention reduced motion
   - Include fallbacks for visual content
   - Consider performance on low-end devices

### Alt Text and Descriptions

- Be descriptive for diagrams
- Explain what's being shown
- Don't start with "Image of..."

---

## Formatting

### Inline Code

Use backticks for:
- Code elements: `<button>`, `useState`, `.className`
- File names: `package.json`, `styles.css`
- Command line commands: `npm install`
- Technical terms on first use: `viewport`

### Code Blocks

Always specify language:

```markdown
​```javascript
// Your code here
​```
```

### Emphasis

- **Bold** for important terms, UI elements
- *Italic* for emphasis, introducing new terms
- `Code` for technical terms
- > Blockquotes for notable quotes or key insights

### Links

- Use descriptive link text
- Not "click here" or "this link"
- Make clear what you're linking to

❌ "Read more about it [here](url)"
✅ "Read the [MDN guide to semantic HTML](url)"

### Punctuation

**Em dashes (—):**
Use sparingly for emphasis or interruption. Overuse creates choppy, breathless prose.

❌ **Overuse:**
> Props are how components receive data—they flow down from parent to child—making components reusable.

✅ **Better alternatives:**

| Instead of | Use |
|------------|-----|
| Explanation after em dash | Colon or period |
| Aside or clarification | Parentheses or commas |
| Contrast or pivot | Semicolon or "but" |
| Dramatic pause | Keep the em dash (sparingly) |

**Examples:**

❌ "This isn't HTML—it's JSX that compiles to JavaScript."
✅ "This isn't HTML. It's JSX that compiles to JavaScript."

❌ "Arrays follow the same rule—create new arrays, don't mutate."
✅ "Arrays follow the same rule: create new arrays, don't mutate."

❌ "Try it yourself—see how the counter works."
✅ "Try it yourself. See how the counter works."

**When em dashes work well:**
- Interrupting for effect: "The answer—surprisingly—was yes."
- Introducing a dramatic reveal: "There was only one solution—refactor everything."

Limit to 1–2 em dashes per lesson section maximum.

---

## Content Quality Checklist

Before completing an edit:

- [ ] All prose in British English
- [ ] All code in American English (properties, keywords)
- [ ] No AI tells or formulaic transitions
- [ ] Voice is confident and authentic
- [ ] Examples are concrete and realistic
- [ ] Technical information is accurate
- [ ] Accessibility considerations included
- [ ] Headers are clear and specific
- [ ] Lists use parallel structure
- [ ] Exercises are practical and doable

---

## Examples

### Before and After

**Before (needs work):**
> Overall, it's important to note that CSS animations are quite powerful. Additionally, they allow you to create motion in your interfaces. However, on the other hand, they can be performance-intensive. In conclusion, you should utilize them carefully.

**After (improved):**
> CSS animations are powerful but can affect performance. Use them thoughtfully for smooth, 60fps motion.

---

**Before (needs work):**
> In this section, we will learn about how to implement buttons. It should be noted that buttons are important for interactivity. We will cover the basic implementation.

**After (improved):**
> Buttons are the most common interactive element. Let's build one from scratch.

---

## Quick Reference

### British Spelling Quick Check
```bash
# Common words to find/replace
color → colour
behavior → behaviour
realize → realise
optimize → optimise
gray → grey
```

### Voice Quick Check

Replace:
- "It's important to note" → (delete or "Note that")
- "Additionally" → "Also" or restructure
- "In order to" → "To"
- "utilize" → "use"
- "Overall" → (delete)

### Confidence Check

Does this sound like:
- [ ] A senior developer/designer explaining to a peer?
- [ ] Someone who knows what they're talking about?
- [ ] Natural speech, not formal essay?

If no to any, revise.

---

## Updates and Maintenance

This document should evolve as we discover new patterns or needs. When making changes:

1. Document the change
2. Update examples
3. Run consistency check across existing content
4. Update .cursorrules if needed

Last updated: 29 December 2024
