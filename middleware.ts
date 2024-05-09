import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: (req) =>
    !req.url.includes("/stats") &&
    !req.url.includes("/jobs/task-builder") &&
    !req.url.includes("/jobs/submit-job"),
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
