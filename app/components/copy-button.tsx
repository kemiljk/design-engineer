"use client";

import React from "react";
import { Toaster, toast } from "sonner";
import { LinkIcon } from "lucide-react";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";

export default function CopyButton() {
  const timerRef = React.useRef(0);
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
        name="Copy link to clipboard"
        aria-label="Copy link to clipboard"
        onClick={() => {
          window.clearTimeout(timerRef.current);
          navigator.clipboard.writeText(path);
          toast.success("Link copied to clipboard");
        }}
        startContent={<LinkIcon className="size-4" />}
      >
        Copy and Share
      </Button>
    </div>
  );
}
