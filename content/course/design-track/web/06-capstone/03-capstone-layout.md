---
estimatedTime: 12
---

# Capstone: Layout and Wireframes

> **Quick Summary:** Plan your page structure with content strategy, create low-fidelity wireframes, and establish your responsive design approach.

**Time Estimate:** 1-2 hours

## What You'll Learn

- Content strategy and information hierarchy for effective page structure
- Low-fidelity wireframing techniques for rapid layout exploration
- Strategy for planning responsive breakpoints across devices

## Step 1: Content Strategy

Before designing visuals, plan your content:

### Define Your Sections

Begin by listing all sections your landing page requires. For a SaaS or app project, this typically includes a hero section with a compelling headline and call to action, followed by social proof, features overviews, and deep-dives into specific functionality. You should also incorporate pricing tables, testimonials, an FAQ, a final call to action, and a comprehensive footer.

For a physical product, focus on a hero shot that highlights the product, followed by a summary of key benefits, an explanation of how it works, and detailed features or specifications. Reviews and comparisons help build trust before leading the user to a final call to action and footer.

A creative service landing page usually starts with a strong statement and work preview, followed by a selection of featured work, a list of services, and information about the team and their process before concluding with a contact section and footer.

### Content Hierarchy

For each defined section, clarify the primary message users must understand and the supporting content that reinforces it. Identify any specific visual needs—such as images, illustrations, or icons—and determine what the next call to action should be to guide the user successfully through the flow.

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

When creating low-fidelity wireframes, focus entirely on the underlying structure rather than visual polish by using simple boxes and lines instead of detailed UI elements. Maintain a greyscale palette and use system fonts at rough sizes to ensure you prioritising proportions and spacing over aesthetics.

### What to Include

For each section of your wireframe, sketch the content blocks according to their defined hierarchy, placing placeholders for images and illustrations. Mark the intended positions for buttons and links, and establish the rough spacing between elements to evaluate the overall flow.

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

Navigational elements typically shift from a horizontal link layout on desktop and tablet to a hamburger menu on mobile devices to preserve screen real estate. HERO sections often move from a two-column layout on desktop to a stacked arrangement on tablet and mobile, with images placed strategically above or below the text.

Features grids and pricing tables adapt by reducing column counts, moving from a multi-column desktop layout to a single-column stacked view on mobile. For pricing, you might choose to stack the plans or make them swipeable on smaller screens.

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

Content often changes per viewport beyond just layout; headlines might be shortened for mobile clarity, decorative elements may be removed, and touch targets must be increased to a minimum of 44px to ensure usability on mobile devices.

## Checkpoint

Before moving on, verify:

Before proceeding, verify that you have defined and prioritised all page sections, established a clear content hierarchy, and written realistic placeholder copy. Ensure your desktop wireframe is complete and that you have a documented responsive strategy for your defined breakpoints.

## Try It Yourself

Complete all steps in your Figma file:

Finalise your planning in Figma by creating a dedicated "Wireframes" page where you sketch your desktop layout and add annotations for responsive behaviour. Be sure to document your entire breakpoint strategy and save a screenshot for your case study.

## Next Steps

Continue to [Capstone: Visual Design](./04-capstone-visual-design.md) →

