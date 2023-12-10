"use client";

import * as Toast from "@radix-ui/react-toast";
import { CheckCircleIcon, LinkIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function CopyButton({ url }: { url: string }) {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);
  const pathname = `${window.location.origin}/stories/${url}`;

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <div>
        <Button
          variant="secondary"
          name="Copy link to clipboard"
          aria-label="Copy link to clipboard"
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
            navigator.clipboard.writeText(pathname);
          }}
        >
          <LinkIcon className="mr-2 h-4 w-4" />
          Copy and Share
        </Button>
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className="data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut space-y-2 rounded-full border border-zinc-100 bg-white p-4 shadow-lg data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border-zinc-800 dark:bg-zinc-900"
        >
          <Toast.Title className="flex items-center text-black dark:text-white">
            <CheckCircleIcon className="mr-2 h-6 w-6 shrink-0 text-green-500 dark:text-green-400" />
            Copied to clipboard!
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="fixed right-0 top-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[12px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_24px] md:bottom-0" />
      </div>
    </Toast.Provider>
  );
}
