import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/",
    "/api/article-subnission",
    "/api/receive-subnission",
    "/api/send",
    "/api/send-submission",
    "/api/waitlist",
    "/api/waitlisted",
    "/about",
    "/privacy-policy",
    "/terms-of-service",
    "/posts",
    "/posts/[slug]",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
