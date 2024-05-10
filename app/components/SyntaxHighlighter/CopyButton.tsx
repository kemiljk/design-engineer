import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

const CopyButton = (props: any) => {
  const { text } = props;
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(0);

  const onClick = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Button
      variant="bordered"
      type="button"
      size="sm"
      color={copied ? "success" : "default"}
      className="absolute right-2 top-2 z-[1] text-xs text-foreground-500 backdrop-blur-md"
      name="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={onClick}
      isIconOnly
      startContent={
        copied ? (
          <CopyCheckIcon className="size-3" />
        ) : (
          <CopyIcon className="size-3" />
        )
      }
    />
  );
};

export default CopyButton;
