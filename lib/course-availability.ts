import { getCourseAvailability } from "./cosmic";
import { NextResponse } from "next/server";

export async function checkCourseAvailability() {
  const { is_available } = await getCourseAvailability();
  return is_available;
}

export async function requireCourseAvailable() {
  const isAvailable = await checkCourseAvailability();
  
  if (!isAvailable) {
    return NextResponse.json(
      { error: "Course is not yet available" },
      { status: 503 }
    );
  }
  
  return null;
}
