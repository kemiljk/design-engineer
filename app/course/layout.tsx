import type { Metadata } from "next";
import { PreviewModeBanner } from "./components/preview-mode-banner";
import { getCourseAvailability } from "@/lib/cosmic";
import { ComingSoon } from "./components/coming-soon";
import { hasPreviewAccess } from "@/lib/preview-access";
import { headers } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  // ...
};

const isTestMode = process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, { is_available }, previewAccess, headersList] =
    await Promise.all([
      currentUser(),
      getCourseAvailability(),
      hasPreviewAccess(),
      headers(),
    ]);

  const pathname = headersList.get("x-pathname") || "";
  const isPreviewPage = pathname.startsWith("/course/preview");

  // DDG users bypass the pre-launch check
  const isDdgUser =
    user?.emailAddresses[0]?.emailAddress?.endsWith("@duckduckgo.com");

  // Test mode, preview access, development mode, or preview page bypass the availability check
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    !is_available &&
    !previewAccess &&
    !isTestMode &&
    !isTestMode &&
    !isDevelopment &&
    !isPreviewPage &&
    !isDdgUser
  ) {
    return <ComingSoon />;
  }

  return (
    <>
      <PreviewModeBanner />
      {children}
    </>
  );
}
