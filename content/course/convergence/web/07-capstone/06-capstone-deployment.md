---
estimatedTime: 20
---

# Capstone: Documentation & Deployment

> **Quick Summary:** Write your case study, create a README, deploy to production, and complete final testing.

**Time Estimate:** 3-4 hours

## What You'll Learn

- Writing a compelling case study
- Creating project documentation
- Deploying to production
- Final testing checklist

## Step 1: Case Study Document

Create a case study document with these sections:

### Overview
- **Project:** Your project name
- **Role:** Design Engineer
- **Timeline:** How long it took
- **Live URL:** Link to deployed site

### The Challenge
What problem were you solving? What constraints did you face?

### Process

**Research & Planning**
- What did you learn?
- How did you approach the problem?

**Design Decisions**
- Motion design rationale
- Accessibility considerations
- Performance trade-offs

**Technical Implementation**
- Architecture choices
- Interesting solutions
- Challenges overcome

### Results
- Performance metrics achieved
- Accessibility compliance
- User feedback (if any)

### Learnings
- What would you do differently?
- What are you proud of?
- What did you learn?

### Screenshots & Videos
Include visual documentation of your project in action.

## Step 2: README Documentation

Your README should include:

### Project header
- Project name and brief description
- Feature highlights with emojis
- Link to live demo

### Technical details
- Performance metrics (LCP, FID, CLS scores)
- Accessibility compliance (WCAG 2.1 AA, keyboard nav, screen reader tested)
- Built with (HTML5, CSS Custom Properties, Vanilla JS)

### Local development instructions

```bash
# Clone the repository
git clone https://github.com/username/project.git

# Navigate to directory
cd project

# Start local server
npx serve
```

### Author section
- Your name and relevant links (GitHub, portfolio, social)

## Step 3: Deploy

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages:**
Enable in repository Settings → Pages.

## Step 4: Final Testing

### Functionality
- [ ] All features work
- [ ] No console errors
- [ ] Forms submit correctly

### Accessibility
- [ ] Keyboard navigation complete
- [ ] Screen reader tested
- [ ] Colour contrast verified
- [ ] Reduced motion works

### Performance
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] No layout shifts

### Cross-Browser
- [ ] Chrome tested
- [ ] Firefox tested
- [ ] Safari tested
- [ ] Mobile tested

## Submission Checklist

### Interactive Experience
- [ ] Polished, complete project
- [ ] Thoughtful motion design
- [ ] Responsive across devices

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Full keyboard navigation
- [ ] Screen reader optimised
- [ ] Reduced motion support

### Performance
- [ ] Lighthouse performance > 90
- [ ] Core Web Vitals passing
- [ ] Optimised assets

### Documentation
- [ ] README with setup instructions
- [ ] Case study document
- [ ] Code comments where helpful

### Deployment
- [ ] Live URL accessible
- [ ] GitHub repository public
- [ ] Portfolio-ready presentation

## What's Next

Congratulations on completing the Web Convergence Track capstone!

This project demonstrates your ability to:
- Design and implement sophisticated interactions
- Build accessible experiences from the ground up
- Optimise for real-world performance
- Document and present your work professionally

### Portfolio Impact

This capstone is designed to be a centerpiece portfolio piece. Consider:
- Adding it prominently to your portfolio
- Writing a blog post about your process
- Sharing on social media
- Using it in job applications

### Continue Your Journey

- → [iOS Convergence Track](/course/convergence/ios) — Apply skills to native iOS
- → [Android Convergence Track](/course/convergence/android) — Apply skills to native Android
- → Build more projects and grow your portfolio!

