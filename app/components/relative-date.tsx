"use client";

import { formatDistance } from "date-fns";

export function RelativeDate({ date }: { date: string }) {
  const relativeDate = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });

  return <span>{relativeDate}</span>;
}
