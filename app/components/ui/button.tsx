"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Button Component
 *
 * Size Guide (use these, avoid inline overrides):
 * - sm (h-8):  Compact UI, secondary actions in tight spaces
 * - md (h-9):  Default, most buttons
 * - lg (h-10): Primary CTAs, form submits
 * - xl (h-12): Hero sections, major conversion points
 */
const buttonVariants = cva(
  "focus-ring group inline-flex items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,transform] duration-150 ease-out active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        // Primary - swiss red, the main CTA
        default:
          "bg-swiss-red text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black",
        // Secondary - neutral, for secondary actions
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        // Outline - bordered, subtle
        outline:
          "border border-neutral-300 bg-transparent text-foreground hover:border-swiss-red hover:text-swiss-red dark:border-neutral-700",
        // Ghost - no background, minimal
        ghost:
          "bg-transparent text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-sm font-semibold",
        xl: "h-12 px-8 text-base font-bold tracking-wider uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      startContent,
      endContent,
      isLoading,
      isDisabled,
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const iconTransition =
      "inline-flex transition-transform duration-150 ease-out motion-reduce:transition-none";

    const content = (
      <>
        {isLoading ? (
          <svg
            className="size-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : startContent ? (
          <span
            className={cn(
              iconTransition,
              "motion-safe:group-hover:-translate-x-0.5 motion-safe:group-active:translate-x-0",
            )}
          >
            {startContent}
          </span>
        ) : null}
        {children}
        {endContent ? (
          <span
            className={cn(
              iconTransition,
              "motion-safe:group-hover:translate-x-0.5 motion-safe:group-active:translate-x-0",
            )}
          >
            {endContent}
          </span>
        ) : null}
      </>
    );

    if (href) {
      const isExternal = href.startsWith("http");
      const anchorProps =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      const safeRel =
        anchorProps.rel ??
        (anchorProps.target === "_blank" ? "noopener noreferrer" : undefined);

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={cn(buttonVariants({ variant, size }), className)}
            {...anchorProps}
            rel={safeRel}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(buttonVariants({ variant, size }), className)}
          {...anchorProps}
          rel={safeRel}
          scroll
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled || isLoading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
