import type { Viewport } from "next";
import { Suspense } from "react";
import { Martian_Mono, Host_Grotesk } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import MainNav from "./components/main-nav";
import { Providers } from "./providers";
import { BannerWrapper } from "./components/banner-wrapper";
import { EmailSubscriber } from "./components/email-subscriber";
import { KeyboardHint } from "./components/keyboard-hint";

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <ClerkProvider
        signInFallbackRedirectUrl={
          process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
        }
        signUpFallbackRedirectUrl={
          process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
        }
      >
        <body
          className={`${mono.variable} ${sans.variable} relative h-full min-h-screen w-full overflow-x-hidden font-sans text-foreground antialiased transition-colors duration-200 ease-in-out dark:bg-background`}
        >
          <a
            href="#content"
            className="focus-ring sr-only fixed top-4 left-4 z-[100000] bg-background px-3 py-2 text-sm font-medium text-foreground focus:not-sr-only"
          >
            Skip to content
          </a>
          <Providers>
            <Suspense fallback={null}>
              <BannerWrapper />
            </Suspense>
            <MainNav />
            <div id="content" tabIndex={-1} className="outline-none">
              {children}
            </div>
          </Providers>
          <EmailSubscriber />
          <KeyboardHint />
        </body>
      </ClerkProvider>
    </html>
  );
}
