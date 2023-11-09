"use server";
import { getStat, getStats } from "@/lib/cosmic";

export async function GET() {
  const stats = await getStats();
  const statsArray = await getStat();
  return { stats, statsArray };
}
