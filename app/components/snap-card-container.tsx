import { ScrollShadow } from "@heroui/scroll-shadow";
import React from "react";

const SnapCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollShadow
      hideScrollBar
      orientation="horizontal"
      className="flex h-fit w-full snap-x snap-mandatory gap-4"
    >
      {children}
    </ScrollShadow>
  );
};

export default SnapCardContainer;
