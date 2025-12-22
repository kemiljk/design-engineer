"use client";

import { forwardRef, useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical" | "both";
  hideScrollBar?: boolean;
}

const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  (
    { className, orientation = "horizontal", hideScrollBar = false, children, ...props },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const containerRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;
    const [showStartShadow, setShowStartShadow] = useState(false);
    const [showEndShadow, setShowEndShadow] = useState(false);

    const checkScroll = useCallback(() => {
      const el = containerRef.current;
      if (!el) return;

      if (orientation === "horizontal" || orientation === "both") {
        const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
        setShowStartShadow(hasHorizontalScroll && el.scrollLeft > 0);
        setShowEndShadow(
          hasHorizontalScroll &&
            el.scrollLeft < el.scrollWidth - el.clientWidth - 1
        );
      } else {
        const hasVerticalScroll = el.scrollHeight > el.clientHeight;
        setShowStartShadow(hasVerticalScroll && el.scrollTop > 0);
        setShowEndShadow(
          hasVerticalScroll &&
            el.scrollTop < el.scrollHeight - el.clientHeight - 1
        );
      }
    }, [orientation, containerRef]);

    useEffect(() => {
      checkScroll();
      const el = containerRef.current;
      if (!el) return;

      el.addEventListener("scroll", checkScroll);
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(el);

      return () => {
        el.removeEventListener("scroll", checkScroll);
        resizeObserver.disconnect();
      };
    }, [checkScroll, containerRef]);

    const isHorizontal = orientation === "horizontal" || orientation === "both";

    return (
      <div className="relative">
        {showStartShadow && (
          <div
            className={cn(
              "pointer-events-none absolute z-10",
              isHorizontal
                ? "inset-y-0 left-0 w-8 bg-gradient-to-r from-neutral-100 to-transparent dark:from-neutral-800"
                : "inset-x-0 top-0 h-8 bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-800"
            )}
          />
        )}
        <div
          ref={containerRef}
          className={cn(
            orientation === "horizontal" && "overflow-x-auto",
            orientation === "vertical" && "overflow-y-auto",
            orientation === "both" && "overflow-auto",
            hideScrollBar && "scrollbar-hide",
            className
          )}
          {...props}
        >
          {children}
        </div>
        {showEndShadow && (
          <div
            className={cn(
              "pointer-events-none absolute z-10",
              isHorizontal
                ? "inset-y-0 right-0 w-8 bg-gradient-to-l from-neutral-100 to-transparent dark:from-neutral-800"
                : "inset-x-0 bottom-0 h-8 bg-gradient-to-t from-neutral-100 to-transparent dark:from-neutral-800"
            )}
          />
        )}
      </div>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export { ScrollContainer };
