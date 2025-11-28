import type { Viewport } from "next";
import {
  Lora,
  JetBrains_Mono,
  Instrument_Sans,
  Bricolage_Grotesque,
} from "next/font/google";
import UmamiProvider from "next-umami";
import { ClerkProvider } from "@clerk/nextjs";
import { getBanner } from "@/lib/cosmic";
import "./globals.css";
import MainNav from "./components/main-nav";
import { Providers } from "./providers";
import Banner from "./components/banner";
import { EmailSubscriber } from "./components/email-subscriber";
import { KeyboardHint } from "./components/keyboard-hint";

const serif = Lora({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-serif",
});

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export { generateMetadata } from "./metadata";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const banner = await getBanner();

  return (
    <html lang="en">
      <head>
        <UmamiProvider websiteId="64db16ef-0f64-42eb-b2c7-09f686e06711" />
      </head>
      <ClerkProvider>
        <body
          className={`${serif.variable} ${mono.variable} ${sans.variable} ${display.variable} relative h-full min-h-screen w-full overflow-x-hidden font-sans text-foreground antialiased transition-colors duration-200 ease-in-out dark:bg-background`}
        >
          <Providers>
            {banner.metadata.is_active && (
              <Banner
                link={banner.metadata.link}
                button_label={banner.metadata.button_label}
                message={banner.metadata.message}
                modified_at={banner.modified_at}
              />
            )}
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
