"use client";

import { extendVariants, Button } from "@heroui/react";

export const StyledButton = extendVariants(Button, {
  variants: {
    variant: {
      stylised:
        "rounded-none bg-swiss-red text-white border border-transparent hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 ease-in-out font-medium px-6",
      light:
        "rounded-none bg-transparent text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 font-medium",
      flat:
        "rounded-none bg-neutral-100 dark:bg-neutral-800 text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200 font-medium",
      outline:
        "rounded-none bg-transparent border border-neutral-300 dark:border-neutral-700 text-foreground hover:border-swiss-red hover:text-swiss-red transition-colors duration-200 font-medium",
    },
    color: {
      primary: "rounded-none bg-swiss-red text-white",
    },
    radius: {
      none: "rounded-none",
    },
  },
});
