import { getDynamicTotalLessonsForAccess } from "@/lib/course-structure";
import { DiveClubContent } from "./dive-club-content";

export const metadata = {
  title: "Dive Club Exclusive | Design Engineer",
  description: "Exclusive discount for Dive Club members.",
};

export default async function DiveClubPage() {
  const totalLessons = await getDynamicTotalLessonsForAccess("convergence");

  return <DiveClubContent totalLessons={totalLessons} />;
}
