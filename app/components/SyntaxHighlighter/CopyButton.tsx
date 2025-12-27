"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CopyButton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const timerRef = useRef(0);
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700",
        className
      )}
      aria-label="Copy code to clipboard"
      onClick={() => {
        window.clearTimeout(timerRef.current);
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Copied to clipboard");
        timerRef.current = window.setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? (
        <Check className="size-4 text-green-500" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  );
};

export default CopyButton;
