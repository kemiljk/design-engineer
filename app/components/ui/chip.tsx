import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-[color,background-color,border-color] duration-150 ease-out",
  {
    variants: {
      variant: {
        // Default solid chip
        default: "bg-neutral-900 text-white dark:bg-white dark:text-black",
        // Secondary/muted chip
        secondary: "bg-neutral-100 text-foreground dark:bg-neutral-800",
        // Outlined chip
        outline:
          "border border-neutral-200 bg-transparent text-foreground dark:border-neutral-700",
      },
      chipColor: {
        default: "",
        primary: "",
        success: "",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-2.5 text-xs",
        lg: "h-8 px-3 text-sm",
      },
    },
    compoundVariants: [
      {
        variant: "secondary",
        chipColor: "success",
        className:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      },
      {
        variant: "secondary",
        chipColor: "primary",
        className: "bg-swiss-red/10 text-swiss-red dark:bg-swiss-red/20",
      },
      {
        variant: "default",
        chipColor: "success",
        className: "bg-green-600 text-white dark:bg-green-500",
      },
      {
        variant: "default",
        chipColor: "primary",
        className: "bg-swiss-red text-white",
      },
    ],
    defaultVariants: {
      variant: "default",
      chipColor: "default",
      size: "md",
    },
  }
);

type ChipVariantProps = Omit<VariantProps<typeof chipVariants>, "chipColor"> & {
  color?: VariantProps<typeof chipVariants>["chipColor"];
};

interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    ChipVariantProps {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      variant,
      color,
      size,
      startContent,
      endContent,
      children,
      ...props
    },
    ref
  ) => {
    const iconTransition =
      "inline-flex transition-transform duration-150 ease-out motion-reduce:transition-none";

    return (
      <span
        ref={ref}
        className={cn(
          chipVariants({ variant, chipColor: color, size }),
          className,
        )}
        {...props}
      >
        {startContent ? (
          <span className={iconTransition}>{startContent}</span>
        ) : null}
        {children}
        {endContent ? <span className={iconTransition}>{endContent}</span> : null}
      </span>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
