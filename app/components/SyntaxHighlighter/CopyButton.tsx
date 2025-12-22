"use client";

import { useRef, useState } from "react";
import { Button } from "@/app/components/ui";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";

const CopyButton = ({
  text,
  className,
  overridePosition,
}: {
  text: string;
  className?: string;
  overridePosition?: boolean;
}) => {
  const timerRef = useRef(0);
  const [copied, setCopied] = useState(false);

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      aria-label="Copy code to clipboard"
      onClick={() => {
        window.clearTimeout(timerRef.current);
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Code copied to clipboard");
        timerRef.current = window.setTimeout(() => setCopied(false), 2000);
      }}
      startContent={
        copied ? (
          <Check className="motion-pop size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )
      }
    />
  );
};

export default CopyButton;
