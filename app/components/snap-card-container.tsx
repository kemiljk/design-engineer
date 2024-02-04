import React from "react";

const SnapCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-fit w-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden">
      {children}
    </div>
  );
};

export default SnapCardContainer;
