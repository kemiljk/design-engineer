# Capstone Project: Design a Complete Android App

> **Quick Summary:** Apply everything you've learned to design a complete, portfolio-worthy Android app with Material 3 components, adaptive layouts, dynamic colour support, and an interactive prototype.

## What You'll Learn

- How to synthesize Android design skills into a cohesive app
- Building a Material 3-compliant component library
- Designing for dynamic colour and theming
- Creating adaptive layouts for phones and tablets
- Implementing Material motion principles

## Project Overview

This capstone brings together everything from the Android Design Track: Material Design foundations, Android design patterns, designing for Android in Figma, and advanced design techniques. You'll design a complete Android app that demonstrates professional-level work.

**Why this project?** Android apps showcase unique skills:
- Material 3 expertise (the latest design system)
- Dynamic colour understanding (Material You)
- Adaptive design (phones, tablets, foldables)
- Motion design (Material motion system)
- Component architecture (Material components)

**Time Estimate:** 8-12 hours

## What You'll Create

By the end of this capstone, you'll have:

1. **Complete Android App Design**
   - 5-7 core screens for phone
   - Tablet/large screen adaptations
   - Light and dark mode
   - Dynamic colour variations

2. **Material 3 Component Library**
   - Navigation components
   - Input components
   - Content components
   - FABs, cards, and containers

3. **Interactive Prototype**
   - Navigation flows
   - Material motion transitions
   - Key interactions

4. **App Icon & Assets**
   - Adaptive icon
   - Themed icon (Material You)

5. **Case Study Documentation**
   - Project brief and goals
   - Design decisions and rationale
   - Process documentation

## The Brief: Choose Your App

Select one of these app types, or propose your own:

### Option A: Productivity App
Design an app that helps users get things done:
- **Suggestions:** Task manager, habit tracker, time tracker, notes app
- **Key Screens:** Home, list view, detail view, create/edit, settings
- **Challenge:** Balance functionality with Material 3 simplicity

### Option B: Lifestyle App
Design an app for personal improvement:
- **Suggestions:** Fitness tracker, meditation app, recipe manager, budget tracker
- **Key Screens:** Dashboard, activity view, detail/stats, profile, onboarding
- **Challenge:** Use dynamic colour to create emotional connection

### Option C: Social/Discovery App
Design an app centred on exploration:
- **Suggestions:** Event finder, travel planner, local recommendations
- **Key Screens:** Feed/discovery, search, detail view, saved items, profile
- **Challenge:** Rich content layouts with Material containment

### Option D: Media/Content App
Design a content consumption experience:
- **Suggestions:** Podcast player, news reader, gallery app
- **Key Screens:** Browse, player/reader, library, settings
- **Challenge:** Large screen adaptation for media

## Phase 1: Material Foundation (2-3 hours)

### Step 1: Research & Reference
Before designing, understand Material 3:
- Study Google's Material 3 guidelines
- Review 5-10 Android apps with good Material implementation
- Note patterns: navigation rails vs. bars, component usage
- Screenshot effective Material 3 applications

### Step 2: Define Your App
Establish the foundation:
- **App name** (fictional is fine)
- **Core purpose** (one sentence)
- **Target user** (be specific)
- **Key jobs to be done** (3-5 tasks)
- **Personality** (playful, professional, expressive, etc.)

### Step 3: Create Material Colour Scheme

Use Material Theme Builder or design manually:

**Primary Colours:**
```
Primary: [Your brand color]
On Primary: [Text/icon on primary]
Primary Container: [Lighter variant]
On Primary Container: [Text on container]
```

**Secondary & Tertiary:**
```
Secondary: [Supporting color]
Tertiary: [Accent color]
[Plus their container variants]
```

**Surface & Background:**
```
Surface: [Main backgrounds]
Surface Variant: [Card backgrounds]
Outline: [Borders and dividers]
```

**Create for both light and dark modes.**

### Step 4: Dynamic Colour Preparation
Plan for Material You:
- Test your design with different wallpaper extractions
- Create 2-3 dynamic colour variations
- Ensure design works with any extracted palette
- Identify elements that should use dynamic vs. static colours

### Step 5: Typography with Roboto
Apply Material type scale:
```
Display Large: 57sp
Display Medium: 45sp
Display Small: 36sp
Headline Large: 32sp
Headline Medium: 28sp
Headline Small: 24sp
Title Large: 22sp
Title Medium: 16sp Medium
Title Small: 14sp Medium
Body Large: 16sp
Body Medium: 14sp
Body Small: 12sp
Label Large: 14sp Medium
Label Medium: 12sp Medium
Label Small: 11sp Medium
```

### Checkpoint
✓ App concept defined with clear purpose
✓ Material 3 colour scheme created
✓ Light and dark modes designed
✓ Dynamic colour variations created
✓ Typography scale applied

## Phase 2: Phone Screen Design (2-3 hours)

### Step 1: Information Architecture
Plan your app structure:
- What are the main destinations?
- How does navigation flow?
- Where are the primary actions (FAB placement)?
- What content needs containment (cards, sheets)?

### Step 2: Navigation Pattern
Choose Material 3 navigation:
- **Navigation Bar:** For 3-5 main destinations
- **Navigation Drawer:** For 5+ destinations or secondary nav
- **Top App Bar:** For hierarchy and actions
- **Navigation Rail:** For tablets (plan ahead)

### Step 3: Core Screens
Design your main screens:

**For each screen, design:**
- Purpose and user goal
- Key content and components
- FAB or primary action placement
- Navigation elements

**Required screens:**
1. **Home/Dashboard:** Primary app view
2. **List/Feed View:** Multiple items display
3. **Detail View:** Single item focus
4. **Create/Edit:** Content creation (if applicable)
5. **Settings:** App configuration

### Step 4: Material Component Usage
Apply Material 3 components correctly:
- **FABs:** For primary creation actions
- **Cards:** For contained content groups
- **Lists:** For scannable content
- **Dialogs:** For decisions/confirmations
- **Bottom Sheets:** For additional options
- **Chips:** For filters and selections
- **Text Fields:** For input (outlined or filled)

### Checkpoint
✓ Information architecture mapped
✓ Navigation pattern chosen
✓ 5-7 phone screens designed
✓ Material 3 components used correctly
✓ Consistent spacing and elevation

## Phase 3: Adaptive Layouts (1-2 hours)

### Step 1: Breakpoint Strategy
Plan your responsive behaviour:
- **Compact:** < 600dp (phones)
- **Medium:** 600-840dp (tablets portrait, foldables)
- **Expanded:** > 840dp (tablets landscape, desktop)

### Step 2: Navigation Adaptation
Plan how navigation transforms:
- **Compact:** Bottom navigation bar
- **Medium:** Navigation rail (side)
- **Expanded:** Navigation rail with labels or drawer

### Step 3: Content Adaptation
Design layout transformations:
- **List-Detail:** Side-by-side on large screens
- **Grid Layouts:** More columns on larger screens
- **Reading Width:** Constrain content for readability
- **Supporting Panel:** Secondary content alongside primary

### Step 4: Tablet/Large Screen Design
Create expanded layout:
- At least one key flow at tablet size
- Navigation rail implementation
- Two-pane layout (if applicable)
- Proper use of space (not just stretched phone)

### Checkpoint
✓ Breakpoints defined
✓ Navigation adaptation planned
✓ At least one tablet layout complete
✓ Content reflows appropriately

## Phase 4: Motion & Prototype (2-3 hours)

### Step 1: Material Motion Principles
Plan motion using Material guidelines:
- **Container Transform:** List → Detail
- **Shared Axis:** Forward/backward in flow
- **Fade Through:** Between unrelated destinations
- **Fade:** Simple appear/disappear

### Step 2: Interaction States
Design all states:
- **Buttons:** Enabled, hovered, focused, pressed, disabled
- **FABs:** Default, pressed, extended
- **Cards:** Default, pressed, dragged
- **Inputs:** Empty, focused, filled, error, disabled

### Step 3: Build Prototype
Connect your screens:
- Navigation bar/rail transitions
- List to detail transitions
- Create/edit flows
- Modal and sheet presentations
- Back navigation

### Step 4: Micro-interactions
Add Material-specific details:
- Ripple effects (document, implied in prototype)
- State layer changes
- Elevation changes on interaction
- Icon animations

### Checkpoint
✓ Motion principles applied
✓ All states designed
✓ Prototype navigable
✓ Transitions feel Material

## Phase 5: Polish & Documentation (1-2 hours)

### Step 1: Adaptive Icon
Design your app icon:
- **Foreground:** Your icon graphic (108dp with 66dp safe zone)
- **Background:** Colour or pattern layer
- **Themed variant:** Monochrome version for Material You

### Step 2: Design Audit
Review everything:
- Consistent with Material 3?
- All states complete?
- Spacing follows 4dp grid?
- Typography scale correct?
- Colour contrast accessible (4.5:1)?
- Dynamic colour works?

### Step 3: Case Study
Document your process:
- **Challenge:** What problem does the app solve?
- **Research:** What did you learn about Material 3?
- **Process:** How did you approach the design?
- **Decisions:** Key choices (especially Material-specific)
- **Results:** Final designs and prototype

### Step 4: File Organization
Structure for portfolio:
- Cover page
- Material 3 design system
- Phone screens (light)
- Phone screens (dark)
- Dynamic colour variations
- Tablet layouts
- Component library
- Prototype documentation

### Checkpoint
✓ Adaptive icon complete
✓ Design audit passed
✓ Case study written
✓ File professionally organised

## Submission Checklist

Your capstone should include:

- [ ] **Material 3 Design System**
  - [ ] Colour scheme (primary, secondary, tertiary)
  - [ ] Light and dark modes
  - [ ] Dynamic colour variations (2-3)
  - [ ] Typography using Roboto

- [ ] **Phone Screen Designs**
  - [ ] 5-7 core screens
  - [ ] Light mode complete
  - [ ] Dark mode complete
  - [ ] Consistent Material styling

- [ ] **Adaptive Layouts**
  - [ ] At least one tablet layout
  - [ ] Navigation rail implementation
  - [ ] Content adaptation demonstrated

- [ ] **Component Library**
  - [ ] Navigation components
  - [ ] FABs with variants
  - [ ] Cards and containers
  - [ ] Inputs with all states
  - [ ] Buttons with all states

- [ ] **Interactive Prototype**
  - [ ] Navigation flows
  - [ ] Material motion transitions
  - [ ] Key interactions

- [ ] **App Icon**
  - [ ] Adaptive icon layers
  - [ ] Themed (monochrome) version

- [ ] **Documentation**
  - [ ] Process documented
  - [ ] Material decisions explained

## Evaluation Criteria

| Criteria | Developing | Proficient | Excellent |
|----------|-----------|------------|-----------|
| **Material 3 Adherence** | Some Material usage, inconsistent | Strong Material alignment | Exceptional Material fluency, thoughtful decisions |
| **Colour System** | Basic colours, limited modes | Full light/dark, good contrast | Dynamic colour mastery, beautiful in any palette |
| **Adaptive Design** | Phone only | Phone plus basic tablet | Thoughtful adaptation, great use of space |
| **Visual Polish** | Basic styling | Clean, consistent | Beautiful, delightful Material expression |
| **Motion Design** | Basic transitions | Correct Material patterns | Fluid, purposeful motion throughout |
| **Accessibility** | Not considered | Good contrast, touch targets | Full a11y, TalkBack-ready |

## Examples for Inspiration

Study these Android apps for Material 3 excellence:

**Google Apps:**
- Google Messages — Material 3 reference
- Google Photos — Gallery patterns
- Google Tasks — Simple Material productivity
- Google Calendar — Navigation and scheduling

**Third-Party Excellence:**
- Pocket Casts — Media app Material implementation
- Sync for Reddit — Content app patterns
- Todoist — Productivity Material usage
- Sleep as Android — Lifestyle app

**Material You Showcases:**
- Most Google apps for dynamic colour
- Android 12+ system apps

## Tips for Success

1. **Use Material Theme Builder.** Google's tool ensures correct colour math.
2. **Reference M3 guidelines constantly.** Keep material.io open.
3. **Design real content.** Realistic data makes better designs.
4. **Test dynamic colour early.** Don't assume your colours always work.
5. **Think adaptive from the start.** Don't leave tablets as an afterthought.
6. **Follow the 4dp grid.** Material spacing should feel consistent.

## What's Next

Congratulations on completing the Android Design Track capstone!

This project demonstrates:
- Your mastery of Material 3 design system
- Ability to design for dynamic colour
- Understanding of adaptive layouts
- Skill in Material motion design

**Portfolio Tip:** This Android app design is valuable portfolio material. Consider:
- Recording a prototype video with Material motion
- Showcasing dynamic colour variations
- Writing about your Material 3 decisions
- Sharing on Dribbble with Android-specific tags

**Continue your journey:**
- → [Android Engineering Track](/course/engineering-track/android) — Build this in Compose
- → [Android Convergence Track](/course/convergence/android) — Add animations and polish
- → [iOS Design Track](/course/design-track/ios) — Apply skills to Apple's HIG
