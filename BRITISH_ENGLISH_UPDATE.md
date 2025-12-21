# British English Update - Summary

## Overview
Updated all user-facing prose content to use British English spelling and grammar, while maintaining American English for all code-related technical terms.

## Cursor Rules Added

Created `.cursorrules` file with comprehensive guidelines:

### British English Scope
- ✅ All user-facing text, headings, descriptions
- ✅ Marketing copy and landing pages
- ✅ Course lesson content and explanations
- ✅ Email templates and notifications
- ✅ FAQ, help text, documentation
- ✅ Button labels and UI microcopy
- ✅ Error/success messages

### American English Scope  
- ✅ Code keywords and syntax (CSS `color`, `center`, etc.)
- ✅ Programming language conventions
- ✅ Framework and library names
- ✅ Technical identifiers
- ✅ Code comments (technical)

### Key Spelling Conversions Documented
- customise (not customize)
- organisation (not organization)
- realise (not realize)
- recognise (not recognize)
- analyse (not analyze)
- optimise (not optimize)
- colour (not color) - except CSS
- centre (not center) - except CSS
- behaviour (not behavior) - except technical contexts
- specialise (not specialize)
- programme (not program) - for courses/events

## Files Updated to British English

### 1. Course Details Email (`/course-details-followup.md`)
**Changes:**
- "program" → "programme" (for university programme)
- "Color Theory" → "Colour Theory"
- "color systems" → "colour systems"
- "guessing at spacing and color" → "guessing at spacing and colour"
- "vs." → "versus"
- "judgment" → "judgement"

### 2. FAQ Page (`/app/course/faq/page.tsx`)
**Changes:**
- "organization's needs" → "organisation's needs"
- "specialize in your preferred platform" → "specialise in your preferred platform"
- "isn't recognized" → "isn't recognised"

### 3. Student Discount Form (`/app/course/pricing/student-discount-form.tsx`)
**Changes:**
- "recognized educational institution" → "recognised educational institution"
- Error message check updated to use "recognised"

### 4. API Route (`/app/api/course/student-discount/route.ts`)
**Changes:**
- "not being recognized" → "not being recognised"

### 5. Privacy Page (`/app/course/privacy/page.tsx`)
**Changes:**
- "analyze usage patterns" → "analyse usage patterns"
- "organizational measures" → "organisational measures"

### 6. Email Templates (`/app/components/email-template.tsx`)
**Status:** Already using appropriate British English
- Pro Tip wording checked and confirmed

## Technical Terms Kept as American English

These remain in American English as they are technical/industry standard terms:

### CSS Properties (all files)
```css
color: red;
text-align: center;
background-color: gray;
```

### React/UI Props
```tsx
color="primary"
behavior="smooth"  // CSS property
```

### Technical Documentation
When discussing UI component behavior in technical contexts, "behavior" is acceptable as it's an industry-standard technical term (like "behavior-driven development").

### Course Content
In markdown lesson files, technical terms about code behavior remain in American English:
- "Standard behavior matches your need"
- "Sizing behavior significantly affects..."
- "Can't capture responsive behavior"

This follows industry conventions where technical terms use American spelling even in British English publications.

## Cosmic Setup Script

Created `/scripts/setup-student-discounts.ts`:
- Uses Cosmic API to create `student-discounts` object type
- Fully automated setup
- Run with: `npm run setup:student-discounts`
- Includes error handling and helpful messages

### Added npm Script
```json
"setup:student-discounts": "tsx scripts/setup-student-discounts.ts"
```

## Grammar and Style

### Collective Nouns
Using British style:
- "The team are working" (plural verb)
- "The organisation is..."

### Prepositions
- "at the weekend" (British)
- NOT "on the weekend" (American)

### Date Format
- British: 21 December 2025
- Formatted in code where needed

### Currency
- £ symbol (GBP primary)
- Format: £199 (no space)

## Acceptable Americanisms

Some terms kept as they're universally understood:
- "Sign up" / "Sign in" (not "Register" / "Log in")
- "Email" (not "e-mail")
- "Website" (not "web site")

## File Structure

```
.cursorrules                                    ← NEW: British English guidelines
scripts/setup-student-discounts.ts             ← NEW: Cosmic setup script
course-details-followup.md                     ← UPDATED: British English
app/course/faq/page.tsx                        ← UPDATED: British English
app/course/privacy/page.tsx                    ← UPDATED: British English
app/course/pricing/student-discount-form.tsx   ← UPDATED: British English
app/api/course/student-discount/route.ts       ← UPDATED: British English
```

## Quality Assurance

### Checked Areas
- ✅ All user-facing text in app directory
- ✅ Marketing emails and templates
- ✅ FAQ and help content
- ✅ Error messages
- ✅ Form labels and instructions
- ✅ Privacy and legal pages

### Verified Exclusions
- ✅ CSS properties remain American
- ✅ Code examples remain American
- ✅ Technical props/attributes remain American
- ✅ Industry-standard technical terms remain American

## Testing Recommendations

### Manual Review
1. Read through all user-facing pages
2. Check consistency of spelling
3. Verify code examples still use American English
4. Test student discount flow (messages in British English)

### Automated Checks (Future)
Consider adding:
- ESLint rule for common American spellings in prose
- Pre-commit hook to catch American spellings
- Custom dictionary for spell-checking

## Future Content Guidelines

When creating new content:

1. **Default to British English** for all prose
2. **Keep code in American English** (CSS, HTML, JS)
3. **Check `.cursorrules`** for common conversions
4. **Technical terms** can use American spelling if industry-standard
5. **Be consistent** within each piece of content

## Examples

### Good - Mixed Appropriately
```tsx
<p>
  Learn how to customise the colour scheme. We'll use CSS properties
  like <code>color</code> and <code>background-color</code> to 
  centre the elements.
</p>

<style>
  .button {
    color: red;           /* American in CSS */
    text-align: center;   /* American in CSS */
  }
</style>
```

### Bad - All American
```tsx
<p>
  Learn how to customize the color scheme using CSS properties
  like color and background-color to center the elements.
</p>
```

### Bad - All British (Including Code)
```tsx
<style>
  .button {
    colour: red;          /* Wrong - not valid CSS */
    text-align: centre;   /* Wrong - not valid CSS */
  }
</style>
```

## Summary Statistics

**Files Modified:** 6 main files + 1 cursorrules
**Files Created:** 2 (setup script + this doc)
**Spelling Conversions:** ~15 instances
**Lines of Guidelines:** 200+ in .cursorrules

## Maintenance

### Regular Checks
- Review new content for American spellings
- Update .cursorrules if new patterns emerge
- Educate contributors about British English policy

### Exceptions Process
If an American spelling is needed:
1. Document why (technical term, industry standard, etc.)
2. Add to `.cursorrules` exceptions list
3. Ensure consistency across codebase

---

## Running the Cosmic Setup

To create the `student-discounts` object type:

```bash
npm run setup:student-discounts
```

This will:
1. Check if type already exists
2. Create the type with proper metafields
3. Display success message with details
4. Handle errors gracefully

The student discount automation system will then be fully operational.

---

British English is now the standard for all prose content while maintaining American English for code. The `.cursorrules` file ensures consistency for future development.
