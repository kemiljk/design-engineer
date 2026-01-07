"use client";

import React, { useState } from "react";
import { ExampleWrapper } from "../base/example-wrapper";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface DemoButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function DemoButton({
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  children,
  onClick,
}: DemoButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-400 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600",
    ghost:
      "bg-transparent border border-current text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
  };

  const sizes: Record<ButtonSize, string> = {
    small: "px-3 py-1.5 text-xs rounded-md",
    medium: "px-4 py-2 text-sm rounded-lg",
    large: "px-6 py-3 text-base rounded-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled || loading ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={disabled || loading}
      aria-busy={loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
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
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function ButtonShowcaseDemo() {
  const [loadingBtn, setLoadingBtn] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const handleLoadingDemo = () => {
    setLoadingBtn("save");
    setTimeout(() => setLoadingBtn(null), 2000);
  };

  return (
    <ExampleWrapper
      title="Button Component"
      description="Interactive buttons with variants, sizes, and states"
    >
      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Variants
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            <DemoButton variant="primary">Primary</DemoButton>
            <DemoButton variant="secondary">Secondary</DemoButton>
            <DemoButton variant="ghost">Ghost</DemoButton>
            <DemoButton variant="danger">Danger</DemoButton>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Sizes
          </h4>
          <div className="flex flex-wrap items-end gap-3">
            <DemoButton size="small">Small</DemoButton>
            <DemoButton size="medium">Medium</DemoButton>
            <DemoButton size="large">Large</DemoButton>
          </div>
        </div>

        {/* States */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            States
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            <DemoButton onClick={() => setClickCount((c) => c + 1)}>
              Click me ({clickCount})
            </DemoButton>
            <DemoButton disabled>Disabled</DemoButton>
            <DemoButton loading={loadingBtn === "save"} onClick={handleLoadingDemo}>
              {loadingBtn === "save" ? "Saving..." : "Save Changes"}
            </DemoButton>
          </div>
        </div>

        {/* Interactive Example */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Try It
          </h4>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Click the buttons above to see states change. The "Save Changes"
            button shows a loading state for 2 seconds.
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <span className="text-xs text-green-800 dark:text-green-200">
              <strong>Props in action:</strong> <code className="rounded bg-green-200 px-1 dark:bg-green-800">variant</code>, <code className="rounded bg-green-200 px-1 dark:bg-green-800">size</code>, <code className="rounded bg-green-200 px-1 dark:bg-green-800">disabled</code>, and <code className="rounded bg-green-200 px-1 dark:bg-green-800">loading</code> control appearance and behaviour
            </span>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

