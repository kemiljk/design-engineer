"use client";

import { extendVariants, Button } from "@nextui-org/react";

export const StyledButton = extendVariants(Button, {
  variants: {
    variant: {
      stylised:
        "bg-gradient-to-b isolate from-primary-400 to-primary text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)] border border-primary-500 hover:opacity-90 transition-colors duration-200 ease-in-out hover:transition-colors hover:duration-200 hover:ease-in-out",
    },
  },
});
