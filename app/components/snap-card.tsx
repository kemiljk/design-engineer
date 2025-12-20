import React from "react";

const SnapCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-8 flex h-[24rem] w-full min-w-[20rem] max-w-xs snap-center flex-col space-y-4 overflow-hidden rounded-none border border-neutral-200 bg-white transition duration-300 ease-in-out hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:hover:bg-neutral-900">
      {children}
    </div>
  );
};

export default SnapCard;
