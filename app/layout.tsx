import type { Viewport } from "next";
import { Suspense } from "react";
import {
  Lora,
  JetBrains_Mono,
  Instrument_Sans,
  Bricolage_Grotesque,
} from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import MainNav from "./components/main-nav";
import { Providers } from "./providers";
import { BannerWrapper } from "./components/banner-wrapper";
import { EmailSubscriber } from "./components/email-subscriber";
import { KeyboardHint } from "./components/keyboard-hint";

const serif = Lora({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export { generateMetadata } from "./metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="64db16ef-0f64-42eb-b2c7-09f686e06711"
          strategy="afterInteractive"
        />
      </head>
      <ClerkProvider>
        <body
          className={`${serif.variable} ${mono.variable} ${sans.variable} ${display.variable} relative h-full min-h-screen w-full overflow-x-hidden font-sans text-foreground antialiased transition-colors duration-200 ease-in-out dark:bg-background`}
        >
          <Providers>
            <Suspense fallback={null}>
              <BannerWrapper />
            </Suspense>
            <MainNav />
            {children}
          </Providers>
          <EmailSubscriber />
          <KeyboardHint />
        </body>
      </ClerkProvider>
    </html>
  );
}
