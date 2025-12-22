"use client";

import React from "react";
import { Toaster, toast } from "sonner";
import { Check, LinkIcon } from "lucide-react";
import { Button } from "@/app/components/ui";
import { usePathname } from "next/navigation";

export default function CopyButton() {
  const timerRef = React.useRef(0);
  const [copied, setCopied] = React.useState(false);
  const pathname = usePathname();
  const path = `${typeof window !== "undefined" ? window.location.origin : ""}${pathname}`;

  React.useEffect(() => {
    const timer = timerRef.current;
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Toaster richColors />
      <Button
        variant="outline"
        aria-label="Copy link to clipboard"
        onClick={() => {
          window.clearTimeout(timerRef.current);
          navigator.clipboard.writeText(path);
          setCopied(true);
          toast.success("Link copied to clipboard");
          timerRef.current = window.setTimeout(() => setCopied(false), 2000);
        }}
        startContent={
          copied ? (
            <Check className="motion-pop size-4 text-green-600 dark:text-green-500" />
          ) : (
            <LinkIcon className="size-4" />
          )
        }
      >
        Copy and Share
      </Button>
    </div>
  );
}
