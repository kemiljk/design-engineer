import { getStat, getStats } from "@/lib/cosmic";
import SectionTitle from "../components/section-title";
import { format } from "date-fns";
import * as Type from "@/lib/types";
import { Chip } from "@nextui-org/react";
import { CalendarCheck, Clipboard } from "lucide-react";

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
          <div className="mt-8 flex w-full flex-col items-center md:mt-0">
            <SectionTitle>The latest stats</SectionTitle>
            <p className="text-zinc-500 dark:text-zinc-400">
              Our current data from Waitlist signups
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Chip
              variant="flat"
              size="lg"
              color="success"
              startContent={<Clipboard className="size-4" />}
              className="gap-1.5"
            >
              {stats.total} total waitlisted
            </Chip>
            <Chip
              variant="flat"
              size="lg"
              color="success"
              startContent={<CalendarCheck className="size-4" />}
              className="gap-1.5"
            >
              {statsToday.length} signed up today
            </Chip>
          </div>
        </div>
      </div>
    </main>
  );
}
