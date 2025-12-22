"use client";

import React from "react";
import { cn } from "@/lib/utils";

type CalloutProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "blockquote" | "aside";
  label?: React.ReactNode;
};

export function Callout({
  as: Comp = "div",
  label,
  className,
  children,
  ...props
}: CalloutProps) {
  return (
    <Comp
      className={cn(
        "relative border-l-4 border-swiss-red bg-neutral-50 p-6 dark:bg-neutral-900",
        className,
      )}
      {...props}
    >
      {label ? (
        <span className="absolute -top-3 left-4 bg-neutral-50 px-2 text-xs font-semibold tracking-wider text-swiss-red uppercase dark:bg-neutral-900">
          {label}
        </span>
      ) : null}
      {children}
    </Comp>
  );
}


