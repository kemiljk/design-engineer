---
estimatedTime: 20
---

# Capstone: Documentation & Deployment

> **Quick Summary:** Write your case study, create a README, deploy to production, and complete final testing.

**Time Estimate:** 3-4 hours

## What You'll Learn

- How to document your journey by writing a compelling **case study**
- Creating comprehensive **project documentation** including README files
- How to **deploy your project** to a production environment
- Conducting a rigorous **final testing** pass to ensure everything is perfect

## Step 1: Case Study Document

Create a case study document with these sections:

### Overview
Begin with key project details: the name of your project, your role as Design Engineer, the total timeline, and a direct link to the live URL.

### The Challenge
Clearly articulate the problem you were solving. Describe the specific constraints you faced, whether they were time-based, technical, or self-imposed.

### Process
Break down your journey. In **Research & Planning**, explain your approach and what you learned. Under **Design Decisions**, clarify your motion design rationale, accessibility considerations, and how you navigated performance trade-offs. For **Technical Implementation**, highlight architecture choices, interesting solutions to complex problems, and challenges you overcame.

### Results
Quantify your success. List the performance metrics you achieved, your level of accessibility compliance, and any user feedback you received.

### Learnings
Reflect on the experience. Discuss what you would do differently next time, what specific aspects you are most proud of, and the key skills you acquired.

## Step 2: README Documentation

Your README should include:

### Project Header
Start with the project name and a brief, engaging description. Highlight key features using emojis for scanability and include a prominent link to the live demo.

### Technical Details
Showcase your engineering standards. List achieved performance metrics (LCP, FID, CLS), confirm accessibility compliance (WCAG 2.1 AA, keyboard navigation, screen reader testing), and specify the tech stack used (HTML5, CSS Custom Properties, Vanilla JS).

### Author Section
Conclude with your name and links to your GitHub profile, portfolio, and relevant social media channels.

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
Verify that all core features work as intended. Check the console for any errors and ensure that all forms submit data correctly and provide feedback.

### Accessibility
Conduct a full audit. Ensure keyboard navigation is complete and logical, test the entire site with a screen reader, verify that colour contrast meets AA standards, and confirm that the site respects reduced motion preferences.

### Performance
Run a final lighthouse audit to ensure a score above 90. Confirm that Core Web Vitals are passing and that there are no visible layout shifts during loading or interaction.

### Cross-Browser
Don't rely on just one browser. Test your site in Chrome, Firefox, and Safari, and verify the experience on a mobile device.

## Step 5: Submit to Gallery

Once your project is deployed and tested, allow us to see what you've built.

1.  Navigate to the [Gallery Submission Page](/course/gallery/submit).
2.  Fill in your project details, including the live URL and GitHub repository.
3.  Upload your thumbnail and (optional) demo video.
4.  Submit for review.

Our team reviews every submission. Approved projects are featured in the [Course Gallery](/course/gallery), where they can be seen by recruiters and fellow design engineers.

## Submission Checklist

### Interactive Experience
Ensure you have a polished, complete project with thoughtful motion design that is responsive across all devices.

### Accessibility
Confirm WCAG 2.1 AA compliance, full keyboard navigation, screen reader optimisation, and proper support for reduced motion.

### Performance
Verify Lighthouse performance scores > 90, passing Core Web Vitals, and fully optimised assets.

### Documentation
Include a comprehensive README with setup instructions, a detailed case study document, and code comments where helpful.

### Deployment
Ensure the live URL is accessible, the GitHub repository is public, and the project is presented in a portfolio-ready manner.

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

