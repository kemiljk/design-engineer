---
estimatedTime: 15
---

# Capstone: Visual Design

> **Quick Summary:** Transform your wireframes into polished visual designs, building your component library and creating responsive layouts.

**Time Estimate:** 3-4 hours

## What You'll Learn

- How to design impactful hero sections
- Building a robust, reusable component library
- Assembling cohesive full-page designs
- Ensuring layouts are perfectly adapted for all viewports

## Step 1: The Hero Section

The Hero section is the handshake of your website. It has about 3 seconds to answer: "What is this?" and "Why should I care?"

**The Hook:**
Start with your headline. It should be massive (Display size from your type scale) and high-contrast. Don't be afraid of whitespace. Space equals luxury and confidence. Crowded heroes feel desperate.

**The Imagery:**
Avoid generic stock photos of people shaking hands. Use an illustration that explains the product abstractly, or a high-quality product shot. If you use a photo, ensure it doesn't clash with the text. You might need a gradient overlay to ensure readability.

**The Call to Action (CTA):**
Your primary button needs to pop. It should be the most vibrant element on the screen. Place it logically—usually directly under the supporting text.

Before designing the rest of your page, build your essential components to ensure system-wide consistency. Create a master button component with solid, outline, and ghost variants, ensuring each has a dedicated hover state for interactive feedback.

You should also develop dedicated components for cards, such as feature cards with icons and testimonial cards with quotes and avatars, so that any future padding or style updates can be applied across the entire site instantly.

If your landing page includes a form, build the input component with predefined empty, active, and error states to proactively manage the user experience and avoid last-minute design fixes.

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
Almost everything on mobile transitions to a single-column stack, where the hero image typically moves below the headline to ensure the primary message remains the focus. Navigation should collapse into a hamburger menu or bottom bar, while side margins should be reduced from desktop widths to roughly 16px or 20px. Ensure success by increasing touch targets for all interactive elements to at least 44px, accommodating the coarser nature of finger-based input.

## Step 5: Consistency Check

Zoom out. Look at the whole page.

Is your primary colour used too much? It should be reserved for actions (buttons, links). If your background, icons, and text are all the same "Brand Blue," nothing stands out.

Can you scan the page and read only the headers? They should tell the story by themselves. If the body text is too heavy, lighten it to a dark grey (like `#4B5563`) to create contrast with the black headlines.

## Try It Yourself

Finalise your visual execution by designing several variations of your hero section, building your core button, input, and card components, and assembling the full desktop page. Once complete, create dedicated frames for tablet and mobile to adapt your layout for smaller screens.

## Next Steps

Continue to [Capstone: Polish and Documentation](./05-capstone-polish.md) →
