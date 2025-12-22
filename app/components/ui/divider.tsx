import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        "border-neutral-200 dark:border-neutral-800",
        orientation === "vertical"
          ? "h-full w-px border-l"
          : "w-full border-t",
        className
      )}
      {...props}
    />
  )
);

Divider.displayName = "Divider";

export { Divider };
