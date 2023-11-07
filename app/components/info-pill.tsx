import React from "react";

export default function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="flex w-max rounded-full border border-lime-400 bg-white/10 px-2 py-1.5 text-xs font-medium leading-none text-lime-700 dark:border-lime-800 dark:bg-slate-950/10 dark:from-inherit dark:text-lime-300 md:text-sm">
        {children}
      </p>
    </div>
  );
}
