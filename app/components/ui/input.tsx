"use client";

import { forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, size = "md", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    const sizeClasses = {
      sm: "h-8 text-sm",
      md: "h-10 text-sm",
      lg: "h-12 text-base",
    };

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "peer w-full border border-neutral-200 bg-transparent px-3 pt-4 pb-1 text-foreground transition-colors",
            "placeholder:text-transparent",
            "hover:border-neutral-400 dark:hover:border-neutral-600",
            "focus:border-swiss-red focus:outline-none dark:focus:border-swiss-red",
            "dark:border-neutral-800",
            sizeClasses[size],
            className
          )}
          placeholder={label}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-3 transition-all duration-150",
              "text-neutral-400",
              isFocused || hasValue
                ? "top-1 text-xs"
                : "top-1/2 -translate-y-1/2 text-sm"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "peer w-full border border-neutral-200 bg-transparent px-3 pt-6 pb-2 text-foreground transition-colors",
            "placeholder:text-transparent",
            "hover:border-neutral-400 dark:hover:border-neutral-600",
            "focus:border-swiss-red focus:outline-none dark:focus:border-swiss-red",
            "dark:border-neutral-800",
            "min-h-[100px] resize-y",
            className
          )}
          placeholder={label}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "pointer-events-none absolute left-3 transition-all duration-150",
              "text-neutral-400",
              isFocused || hasValue ? "top-2 text-xs" : "top-4 text-sm"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
