---
estimatedTime: 15
---

# Capstone: Deployment

> **Quick Summary:** Set up a build process, create a GitHub repository, and publish your component library for others to use.

**Time Estimate:** 2-3 hours

## What You'll Learn

In this final lesson, we will focus on setting up a professional build process for your CSS and JavaScript. You will learn how to create a comprehensive README file, understand the steps for publishing to npm or deploying to a CDN, and discover how to manage versioning and releases effectively.

## Step 1: Build Process

Configure your package.json:

```json
{
  "name": "your-component-library",
  "version": "1.0.0",
  "description": "A production-ready component library",
  "main": "dist/index.css",
  "files": ["dist"],
  "scripts": {
    "build": "npm run build:css && npm run build:js",
    "build:css": "postcss src/index.css -o dist/index.css",
    "build:js": "esbuild src/index.js --bundle --minify --outfile=dist/index.js"
  },
  "keywords": ["components", "css", "design-system"],
  "author": "Your Name",
  "license": "MIT"
}
```

Install build dependencies:

```bash
npm install --save-dev postcss postcss-cli autoprefixer cssnano esbuild
```

Create PostCSS config:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' })
  ]
};
```

## Step 2: GitHub Repository

### Repository Structure

```text
your-component-library/
├── src/
│   ├── tokens/
│   ├── components/
│   └── index.css
├── dist/
├── docs/
├── .gitignore
├── package.json
├── postcss.config.js
├── README.md
└── LICENSE
```

### Create .gitignore

```text
node_modules/
dist/
.DS_Store
```

### Comprehensive README

```markdown
# Your Component Library

A production-ready component library with accessibility built-in.

## Installation

```bash
npm install your-component-library
```

## Usage

```css
@import 'your-component-library';
```

Or via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/your-component-library@1.0.0/dist/index.css">
```

## Components

- **Button** — Primary, secondary, ghost variants with all states
- **Input** — Text inputs with validation states
- **Card** — Content containers with variants
- **Badge** — Status indicators
- **Alert** — Important messages
- **Modal** — Dialogue overlays with focus trap
- **Tooltip** — Contextual hints
- **Dropdown** — Selection menus with keyboard navigation

## Customisation

Override CSS custom properties to customise:

```css
:root {
  --colour-primary-500: #your-brand-colour;
  --font-sans: 'Your Font', sans-serif;
}
```

## Theming

Enable dark mode by adding `data-theme="dark"` to your HTML element:

```html
<html data-theme="dark">
```

## Accessibility

All components are built with accessibility in mind:
- Semantic HTML
- Keyboard navigation
- ARIA attributes where needed
- Focus management for modals
- Colour contrast meets WCAG AA

## Documentation

See full documentation at: [your-docs-url]

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT
```

## Step 3: Publish

Choose your publishing method:

### Option A: npm

```bash
# Login to npm
npm login

# Publish (first time)
npm publish

# Update version and publish
npm version patch  # or minor, major
npm publish
```

### Option B: GitHub Packages

Add to package.json:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Option C: CDN (unpkg/jsDelivr)

Once published to npm, your library is automatically available via:

```html
<link rel="stylesheet" href="https://unpkg.com/your-package@1.0.0/dist/index.css">
<script src="https://unpkg.com/your-package@1.0.0/dist/index.js"></script>
```

### Option D: GitHub Pages

Deploy your docs site:

1. Go to repository Settings → Pages
2. Select source branch (main or gh-pages)
3. Your docs will be live at `https://username.github.io/repo-name`

## Step 4: Release Management

### Semantic Versioning

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

### Create a Release

1. Update version: `npm version minor`
2. Push with tags: `git push --follow-tags`
3. Create GitHub release with changelog

## Submission Checklist

Your completed capstone should include a comprehensive token system that uses CSS custom properties for colours (supporting both light and dark themes), typography, and spacing. You must have built a minimum of 8–10 components, including a Button with all variants and states, an Input with validation and error states, a Card with its own variants, and Badge, Alert, and Modal components—the latter requiring a focus trap. Additionally, include a Tooltip, an accessible Dropdown, and at least two other components of your choice.

Your work should demonstrate a high level of accessibility, including semantic HTML throughout, full keyboard navigability with visible focus states, appropriate ARIA attributes, and colour contrast that meets WCAG AA standards. The documentation must be complete, featuring a "Getting Started" guide, individual component pages with code examples, and accessibility notes. Finally, your project must be stored in a GitHub repository and published via npm, a CDN, or GitHub Pages with a complete README.

## Checkpoint

Before you consider your capstone project complete, verify that your build process successfully creates minified distribution files and that your public GitHub repository features a comprehensive README. Finally, ensure your library is either published or ready for deployment, and that your documentation site is live or in a state where it can be easily hosted.

## What's Next

Congratulations on completing the Engineering Track capstone!

### Portfolio Success

The completion of this project demonstrates your deep knowledge of HTML, CSS, and JavaScript, along with your capacity for systems thinking and API design. It also highlights your expertise in accessibility and your focus on documentation and the developer experience.

### Portfolio Tips

A component library is an exceptional portfolio piece. Consider:
- Writing about your design decisions on a blog
- Creating a video walkthrough
- Sharing specific components on CodePen/CodeSandbox
- Discussing token architecture in interviews

### Continue Your Journey

- → [Convergence Track](/course/convergence/web) — Add motion and polish
- → [iOS Engineering Track](/course/engineering-track/ios) — Build in SwiftUI
- → [Android Engineering Track](/course/engineering-track/android) — Build in Compose

