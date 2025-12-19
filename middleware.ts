import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/posts(.*)",
  "/stories(.*)",
  "/resources(.*)",
  "/about(.*)",
  "/tools(.*)",
  "/stats(.*)",
  "/privacy-policy(.*)",
  "/terms-of-service(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/subscribe(.*)",
  "/api/article-submission(.*)",
  "/api/job-submission(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
