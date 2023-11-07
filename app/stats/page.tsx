import InfoPill from "../components/info-pill";
import { Logo } from "../components/logo";
import { getStat, getStats } from "@/lib/cosmic";
import SectionTitle from "../components/section-title";
import { format } from "date-fns";
import * as Type from "@/lib/types";

const dynamic = "force-dynamic";

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
    <main className="flex h-full min-h-screen flex-col items-center overflow-hidden p-4 md:p-16 lg:p-24">
      <Logo className="h-auto w-8 text-blue-500 dark:text-blue-300 lg:w-20" />
      <div className="mx-auto w-full py-4 md:p-16 lg:max-w-5xl lg:p-24">
        <div className="flex flex-col items-center gap-10">
          <div className="mt-8 flex w-full flex-col items-center md:mt-0">
            <SectionTitle>The latest stats</SectionTitle>
            <p className="text-zinc-500 dark:text-zinc-400">
              Our current data from Waitlist signups
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 md:flex-row">
            <InfoPill>{stats.total} total waitlisted</InfoPill>
            <InfoPill>{statsToday.length} signed up today</InfoPill>
          </div>
        </div>
      </div>
    </main>
  );
}
