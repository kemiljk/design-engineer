This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server (we're using Bun for this, so please don't use another package manager as it'll cause conflicts):

```bash
bun i && bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Dependencies and Usages

### Content

All content is managed inside of [Cosmic](https://www.cosmicjs.com/), a headless CMS. This is where the waitlist is sent to and where the content is powered from. To see this in dev, you just need to install all of the packages and you'll start seeing it come in

You'll need some API keys to get going, but they'll be managed outside of this repo

### Fonts

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load fonts.

### Components

- To ensure accessibility and ease of development, we're using [https://ui.shadcn.com/](https://ui.shadcn.com/) as it's powered by Radix under the hood and uses Tailwind.
- We have a top-level components folder which houses each of these bundled atomic components
- We then have a sub-components folder under `app/components` which houses our custom components (which may be small or large)
- Allow Shadcn to bundle itself into the default components folder, but always utilise the `app/components` folder for custom, non-atomic components

### API routes

- We currently have 6 API routes for handling email sending and content upload (for article submissions and the Waitlist)
- These data are handled via [Resend](https://www.resend.com/) and [Cosmic](https://www.cosmicjs.com/) respectively

### Authorisation

- We use Clerk to authorise users, allowing easy handling of sign up and account access without having to set up all the infra ourselves
- If you have access, you can get to our Dashboard [here](https://dashboard.clerk.com/apps/app_2Y0Ftk8612Qthp9hAf6swk4E8SG/instances/ins_2Yfs5euG0GZj2W7sowMcehSeY76)https://dashboard.clerk.com/apps/app_2Y0Ftk8612Qthp9hAf6swk4E8SG/instances/ins_2Yfs5euG0GZj2W7sowMcehSeY76.
- Currently we catch all routes and allow them through the auth barrier, except the `/stats` page
-   In the future we'll be able to lock any route we need to behind auth, such as individual user pages, draft posts, etc.

### Interactivity

- We have limited interactive elements on the site, but we do leverage Liveblocks to show live cursors
- Currently this doesn't provide much utility or interest, but it'll become more interesting as the platform grows

## View Live

The site is live at [https://www.designengineer.xyz/](https://www.designengineer.xyz/).
