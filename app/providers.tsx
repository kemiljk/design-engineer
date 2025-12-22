"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BannerProvider } from "./components/banner-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class">
      <BannerProvider>{children}</BannerProvider>
    </NextThemesProvider>
  );
}
