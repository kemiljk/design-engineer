"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BannerProvider } from "./components/banner-context";
import { ScrollReset } from "./components/scroll-reset";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class">
        <BannerProvider>
          <ScrollReset />
          {children}
        </BannerProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
