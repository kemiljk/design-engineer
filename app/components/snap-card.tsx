import React from "react";

const SnapCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-8 flex h-[24rem] w-full min-w-[20rem] max-w-xs snap-center flex-col space-y-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 ease-in-out hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
      {children}
    </div>
  );
};

export default SnapCard;
