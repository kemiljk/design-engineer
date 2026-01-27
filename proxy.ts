import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/posts(.*)",
  "/stories(.*)",
  "/resources(.*)",
  "/about(.*)",
  "/brand(.*)",
  "/design-engineering(.*)",
  "/tools(.*)",
  "/stats(.*)",
  "/privacy-policy(.*)",
  "/terms-of-service(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/subscribe(.*)",
  "/api/article-submission(.*)",
  "/api/job-submission(.*)",
  "/api/webhooks/lemonsqueezy(.*)",
  "/api/course/test-access(.*)", // E2E test access control
  "/api/course/preview(.*)", // Preview access for reviewers
  "/api/course/debug-complete(.*)", // Debug endpoint for testing certificates (dev only)
  "/api/course/admin/setup-gallery(.*)", // Gallery object type setup
  "/api/course/admin/setup-certificates(.*)", // Certificate object type setup (dev only)
  "/course/preview(.*)", // Preview activation page
  "/api/og(.*)", // OG image generation
  "/icon", // Favicon
  "/apple-icon", // Apple Touch Icon
  "/opengraph-image", // Root OG image
  "/(.*)/opengraph-image", // Nested OG images
  "/twitter-image", // Root Twitter image
  "/(.*)/twitter-image", // Nested Twitter images
  "/course",
  "/course/(.*)",
  "/capture(.*)", // Capture routes for GIF generation
  "/debug-demos(.*)", // Debug demos (dev only)
  "/dive-club",
  "/dive-club/(.*)",
  "/ddg",
  "/ddg/(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  console.log("Middleware executing for:", request.nextUrl.pathname);
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
