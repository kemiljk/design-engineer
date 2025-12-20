import type { Metadata } from "next";
import { TestModePanel } from "./components/test-mode-panel";
import { getCourseAvailability } from "@/lib/cosmic";
import { ComingSoon } from "./components/coming-soon";

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
  const { is_available } = await getCourseAvailability();

  if (!is_available) {
    return <ComingSoon />;
  }

  return (
    <>
      {children}
      {isTestMode && <TestModePanel />}
    </>
  );
}
