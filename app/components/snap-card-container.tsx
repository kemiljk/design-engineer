import { ScrollContainer } from "@/app/components/ui";
import React from "react";

const SnapCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollContainer
      hideScrollBar
      orientation="horizontal"
      className="flex h-fit w-full snap-x snap-mandatory gap-4"
    >
      {children}
    </ScrollContainer>
  );
};

export default SnapCardContainer;
