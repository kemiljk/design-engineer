---
estimatedTime: 15
---

# Capstone: Visual Design

> **Quick Summary:** Transform your wireframes into polished visual designs, building your component library and creating responsive layouts.

**Time Estimate:** 3-4 hours

## What You'll Learn

- Designing an impactful hero section
- Building a reusable component library
- Creating cohesive full-page designs
- Adapting designs for all viewports

## Step 1: The Hero Section

The Hero section is the handshake of your website. It has about 3 seconds to answer: "What is this?" and "Why should I care?"

**The Hook:**
Start with your headline. It should be massive (Display size from your type scale) and high-contrast. Don't be afraid of whitespace. Space equals luxury and confidence. Crowded heroes feel desperate.

**The Imagery:**
Avoid generic stock photos of people shaking hands. Use an illustration that explains the product abstractly, or a high-quality product shot. If you use a photo, ensure it doesn't clash with the text. You might need a gradient overlay to ensure readability.

**The Call to Action (CTA):**
Your primary button needs to pop. It should be the most vibrant element on the screen. Place it logically—usually directly under the supporting text.

## Step 2: The Component Library

Before you design the rest of the page, stop. Don't paint the walls before you buy the brushes. Build your "ingredients" first.

**Buttons:**
Create a master component for your Button. Give it variants for Primary (solid), Secondary (outline), and Ghost (text only). Ensure you have a Hover state for each.

**Cards:**
You'll likely need a Feature Card (icon + title + text) and a Testimonial Card (quote + avatar + name). Build these as components now so that if you change the padding later, every card updates instantly.

**Inputs:**
If you have a form, build the Input component. Don't forget the "Empty," "Active," and "Error" states. Designing the error state now saves you panic later.

## Step 3: Full Page Design

Now, assemble the page like LEGOs.

**Social Proof:**
Directly under the hero, add a "Trusted By" strip. Use logos that are desaturated or mono-color so they don't compete with your brand. This builds immediate credibility.

**Features Section:**
Use your Feature Card component. A 3-column grid is standard because it breaks the monotony of full-width text. Use a Zig-Zag layout (Text-Image, Image-Text) to guide the user's eye down the page.

**Pricing:**
Pricing tables are complex. Use a distinct color or shadow to highlight the "Recommended" plan. Ensure the "Buy" buttons align at the bottom of the cards regardless of how long the feature list is.

**The Footer:**
The footer is the safety net. It's where users go if they didn't find what they wanted. Organize links into clear columns (Product, Company, Resources). Don't forget the copyright and social links.

## Step 4: Responsive Design

You designed for Desktop (likely 1440px). Now, break it.

**The Tablet Squeeze (768px):**
On a tablet, your 3-column feature grid will look squashed. Drop it to a 2-column grid (2 on top, 1 below) or a single column. The horizontal menu might still fit, but be ready to switch to a Hamburger menu if it feels tight.

**The Mobile Stack (375px):**
On mobile, almost everything becomes a single column.
- **Hero:** Image usually moves *below* the text so the headline is seen first.
- **Navigation:** Collapses into a Hamburger menu or a bottom bar.
- **Padding:** Reduce your side margins. 80px padding on desktop should become 16px or 20px on mobile.
- **Touch Targets:** Your mouse is precise; your thumb is not. Ensure every button is at least 44px tall.

## Step 5: Consistency Check

Zoom out. Look at the whole page.

**Color Balance:**
Is your primary color used too much? It should be reserved for actions (buttons, links). If your background, icons, and text are all the same "Brand Blue," nothing stands out.

**Typography Hierarchy:**
Can you scan the page and read only the headers? They should tell the story by themselves. If the body text is too heavy, lighten it to a dark grey (like `#4B5563`) to create contrast with the black headlines.

## Try It Yourself

1.  **Hero:** Design 3 variations of your hero. Pick the best one.
2.  **Components:** Build your Button, Input, and Card components in Figma.
3.  **Assembly:** Construct the full desktop page.
4.  **Responsiveness:** Create a Tablet and Mobile frame and adapt the layout.

## Next Steps

Continue to [Capstone: Polish and Documentation](./05-capstone-polish.md) →
