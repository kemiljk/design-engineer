"use client";

import { forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Field } from "@base-ui-components/react/field";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
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
      <Field.Root className="relative w-full">
        <Field.Control
          render={(controlProps) => (
            <input
              {...controlProps}
              ref={ref}
              id={inputId}
              className={cn(
                "focus-ring peer text-foreground w-full border border-neutral-200 bg-transparent px-3 py-2 transition-colors motion-reduce:transition-none",
                "placeholder:text-neutral-500",
                "hover:border-neutral-400 dark:hover:border-neutral-600",
                "focus:border-swiss-red dark:focus:border-swiss-red",
                "dark:border-neutral-800",
                sizeClasses[size],
                className,
              )}
              placeholder={label}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
                controlProps.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
                controlProps.onBlur?.(e);
              }}
              {...props}
            />
          )}
        />
        {label && (
          <Field.Label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-3 transition-all duration-150 motion-reduce:transition-none",
              "text-neutral-400",
              isFocused || hasValue
                ? "top-1 text-xs"
                : "top-1/2 -translate-y-1/2 text-sm",
            )}
          >
            {label}
          </Field.Label>
        )}
      </Field.Root>
    );
  },
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    return (
      <Field.Root className="relative w-full">
        <Field.Control
          render={(controlProps) => (
            <textarea
              {...controlProps}
              ref={ref}
              id={textareaId}
              className={cn(
                "focus-ring peer text-foreground w-full border border-neutral-200 bg-transparent px-3 pt-6 pb-2 transition-colors motion-reduce:transition-none",
                "placeholder:text-transparent",
                "hover:border-neutral-400 dark:hover:border-neutral-600",
                "focus:border-swiss-red dark:focus:border-swiss-red",
                "dark:border-neutral-800",
                "min-h-[100px] resize-y",
                className,
              )}
              placeholder={label}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
                controlProps.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
                controlProps.onBlur?.(e);
              }}
              {...props}
            />
          )}
        />
        {label && (
          <Field.Label
            htmlFor={textareaId}
            className={cn(
              "pointer-events-none absolute left-3 transition-all duration-150 motion-reduce:transition-none",
              "text-neutral-400",
              isFocused || hasValue ? "top-2 text-xs" : "top-4 text-sm",
            )}
          >
            {label}
          </Field.Label>
        )}
      </Field.Root>
    );
  },
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
