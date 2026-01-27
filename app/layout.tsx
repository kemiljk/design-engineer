import type { Viewport } from "next";
import { Suspense } from "react";
import { Host_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MainNav from "./components/main-nav";
import { Providers } from "./providers";
import { BannerWrapper } from "./components/banner-wrapper";
import { EmailSubscriber } from "./components/email-subscriber";
import { KeyboardHint } from "./components/keyboard-hint";

const sans = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="64db16ef-0f64-42eb-b2c7-09f686e06711"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} text-foreground dark:bg-background relative h-full min-h-dvh w-full overflow-x-hidden font-sans antialiased transition-colors duration-200 ease-in-out`}
      >
        <a
          href="#content"
          className="focus-ring bg-background text-foreground sr-only fixed top-4 left-4 z-100000 px-3 py-2 text-sm font-medium focus:not-sr-only"
        >
          Skip to content
        </a>
        <Providers
          signInFallbackRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
          }
          signUpFallbackRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
          }
        >
          <Suspense fallback={null}>
            <BannerWrapper />
          </Suspense>
          <MainNav />
          <div id="content" tabIndex={-1} className="outline-none">
            {children}
          </div>
          <EmailSubscriber />
          <KeyboardHint />
        </Providers>
      </body>
    </html>
  );
}
