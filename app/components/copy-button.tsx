"use client";

import React from "react";
import { Toaster, toast } from "sonner";
import { LinkIcon } from "lucide-react";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function CopyButton() {
  const timerRef = React.useRef(0);
  const pathname = usePathname();
  const path = `${window.location.origin}${pathname}`;

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
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
