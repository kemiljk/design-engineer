"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { BannerProvider } from "./components/banner-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class">
      <BannerProvider>
        {children}
        <Toaster richColors position="bottom-center" />
      </BannerProvider>
    </NextThemesProvider>
  );
}
