import type { Metadata } from "next";
import { PreviewModeBanner } from "./components/preview-mode-banner";
import { getCourseAvailability } from "@/lib/cosmic";
import { ComingSoon } from "./components/coming-soon";
import { hasPreviewAccess } from "@/lib/preview-access";

export const metadata: Metadata = {
  title: "Design Engineer Course | Learn to Bridge Design and Development",
  description:
    "A comprehensive course for becoming a Design Engineer. Learn design fundamentals, engineering skills, and how to bridge the gap between design and development.",
};

const isTestMode = process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ is_available }, previewAccess] = await Promise.all([
    getCourseAvailability(),
    hasPreviewAccess(),
  ]);

  // Test mode, preview access, or development mode bypass the availability check
  const isDevelopment = process.env.NODE_ENV === "development";
  if (!is_available && !previewAccess && !isTestMode && !isDevelopment) {
    return <ComingSoon />;
  }

  return (
    <>
      <PreviewModeBanner />
      {children}
    </>
  );
}
