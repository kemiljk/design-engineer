import type { Metadata } from "next";
import { TestModePanel } from "./components/test-mode-panel";

export const metadata: Metadata = {
  title: "Design Engineer Course | Learn to Bridge Design and Development",
  description:
    "A comprehensive course for becoming a Design Engineer. Learn design fundamentals, engineering skills, and how to bridge the gap between design and development.",
};

const isTestMode = process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {isTestMode && <TestModePanel />}
    </>
  );
}
