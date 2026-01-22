import type { Metadata } from "next";
import { PreviewModeBanner } from "./components/preview-mode-banner";
import { getCourseAvailability } from "@/lib/cosmic";
import { ComingSoon } from "./components/coming-soon";
import { hasPreviewAccess } from "@/lib/preview-access";
import { headers } from "next/headers";

export const metadata: Metadata = {
  // ...
};

const isTestMode = process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ is_available }, previewAccess, headersList] = await Promise.all([
    getCourseAvailability(),
    hasPreviewAccess(),
    headers(),
  ]);

  const pathname = headersList.get("x-pathname") || "";
  const isPreviewPage = pathname.startsWith("/course/preview");

  // Test mode, preview access, development mode, or preview page bypass the availability check
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    !is_available &&
    !previewAccess &&
    !isTestMode &&
    !isDevelopment &&
    !isPreviewPage
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
