import { getStat, getStats } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";

import InfoPill from "../components/info-pill";
import { Logo } from "../components/logo";
import SectionTitle from "../components/section-title";

export const dynamic = "force-dynamic";

export default async function Stats() {
  const stats = await getStats();
  const statsArray = await getStat();
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");
  const statsToday = statsArray.filter((obj: Type.Stat) => {
    const createdAt = new Date(obj.created_at);
    const formattedCreatedAt = format(createdAt, "yyyy-MM-dd");

    return formattedToday === formattedCreatedAt;
  });
  return (
    <main>
      <div className="mx-auto w-full py-4 md:p-16 lg:max-w-5xl lg:p-24">
        <div className="flex flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center md:mt-0">
            <SectionTitle>The latest stats</SectionTitle>
            <p className="text-zinc-500 dark:text-zinc-400">
              Our current data from Waitlist signups
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <InfoPill>{stats.total} total waitlisted</InfoPill>
            <InfoPill>{statsToday.length} signed up today</InfoPill>
          </div>
        </div>
      </div>
    </main>
  );
}
