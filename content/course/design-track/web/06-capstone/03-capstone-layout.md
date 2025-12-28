---
estimatedTime: 12
---

# Capstone: Layout and Wireframes

> **Quick Summary:** Plan your page structure with content strategy, create low-fidelity wireframes, and establish your responsive design approach.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Content strategy and information hierarchy
- Low-fidelity wireframing techniques
- Planning responsive breakpoints

## Step 1: Content Strategy

Before designing visuals, plan your content:

### Define Your Sections

List all sections your landing page needs. Common patterns:

**SaaS/App:**
1. Hero (headline, subhead, CTA, visual)
2. Social proof/logos
3. Features overview
4. Feature deep-dives (2-3)
5. Pricing
6. Testimonials
7. FAQ
8. Final CTA
9. Footer

**Physical Product:**
1. Hero (product shot, headline, CTA)
2. Key benefits (3-4)
3. How it works
4. Features/specs
5. Reviews
6. Comparison (optional)
7. Final CTA
8. Footer

**Creative Service:**
1. Hero (statement, work preview)
2. Selected work
3. Services
4. About/team
5. Process
6. Contact
7. Footer

### Content Hierarchy

For each section, define:
- **Primary message:** What must users understand?
- **Supporting content:** What reinforces the message?
- **Visual needs:** Image, illustration, icon, or none?
- **Call to action:** What should users do next?

### Write Placeholder Copy

Real (or realistic) copy makes better designs:

| Element | Example | Length |
|---------|---------|--------|
| Hero headline | "Ship better products, faster" | 5-8 words |
| Hero subhead | "The all-in-one platform for product teams to plan, build, and ship together." | 15-25 words |
| Hero CTA | "Start free trial" | 2-4 words |
| Feature title | "Real-time collaboration" | 2-4 words |
| Feature description | "See changes as they happen. Comment, react, and resolve inline." | 10-20 words |

## Step 2: Desktop Wireframes

Create low-fidelity layouts:

### Wireframing Principles

- **Focus on structure, not visuals**
- Use boxes and lines, not detailed UI
- Grey scale only (no colour)
- System fonts at rough sizes
- Focus on proportions and spacing

### What to Include

For each section, sketch:
- Content blocks and their hierarchy
- Image/illustration placeholders
- Button and link positions
- Rough spacing between elements

### Wireframe Techniques

```plaintext
┌─────────────────────────────────────────────┐
│  [Logo]              [Nav] [Nav] [CTA]      │
├─────────────────────────────────────────────┤
│                                             │
│     Headline goes here,                     │
│     spanning multiple lines                 │
│                                             │
│     Supporting text that explains           │
│     the value proposition clearly.          │
│                                             │
│     [Primary CTA]  [Secondary CTA]          │
│                                             │
│            ┌─────────────────┐              │
│            │                 │              │
│            │   Hero Image    │              │
│            │                 │              │
│            └─────────────────┘              │
└─────────────────────────────────────────────┘
```

### Establishing Rhythm

- Use your spacing scale even in wireframes
- Create consistent section heights
- Plan for content of varying lengths
- Consider scroll depth (what's above the fold?)

## Step 3: Responsive Strategy

Plan how each section adapts before designing:

### Define Breakpoints

Common breakpoints:
- **Desktop:** 1440px or 1920px (your primary design)
- **Tablet:** 768px (iPad portrait)
- **Mobile:** 375px (iPhone)

### Adaptation Patterns

For each section, decide:

**Navigation:**
- Desktop: Horizontal links
- Tablet: Horizontal or hamburger
- Mobile: Hamburger menu

**Hero:**
- Desktop: Two columns (text + image)
- Tablet: Stacked or smaller image
- Mobile: Stacked, image below or above

**Features Grid:**
- Desktop: 3-4 columns
- Tablet: 2 columns
- Mobile: 1 column (stacked)

**Pricing:**
- Desktop: 3 plans side-by-side
- Tablet: 3 plans (compressed) or tabs
- Mobile: Stacked or swipeable

### Document Your Strategy

Create a simple table:

| Section | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Nav | Horizontal | Horizontal | Hamburger |
| Hero | 2 columns | Stacked | Stacked |
| Features | 3 columns | 2 columns | 1 column |
| Pricing | 3 side-by-side | 3 compressed | Stacked |
| Footer | 4 columns | 2 columns | 1 column |

### Content Changes

Some content changes per viewport:
- Headlines might shorten on mobile
- Images might swap (landscape → portrait)
- Some decorative elements disappear
- Touch targets increase (44px minimum)

## Checkpoint

Before moving on, verify:

- [ ] All page sections defined and prioritised
- [ ] Content hierarchy clear for each section
- [ ] Placeholder copy written
- [ ] Desktop wireframe complete
- [ ] Responsive strategy documented
- [ ] Breakpoints defined

## Try It Yourself

Complete all steps in your Figma file:

1. Create a "Wireframes" page
2. Sketch your desktop layout (rough is fine)
3. Add annotations for responsive behaviour
4. Document your breakpoint strategy
5. Screenshot for your case study

## Next Steps

Continue to [Capstone: Visual Design](./04-capstone-visual-design.md) →

