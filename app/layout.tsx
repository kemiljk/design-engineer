import { getConfig } from "@/lib/cosmic";
import { ClerkProvider } from "@clerk/nextjs";
import type { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { JetBrains_Mono, Lora } from "next/font/google";
import KKSans from "next/font/local";

import MainNav from "./components/main-nav";
import { MobileNavProvider } from "./components/mobile-nav-container";
import Presence from "./components/presence";
import "./globals.css";

const serif = Lora({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-serif",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const sans = KKSans({
  src: "/fonts/KKSansVF.woff2",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata() {
  const config = await getConfig();
  const metaTitle = config.metadata.site_name;
  const metaDescription = config.metadata.site_description;
  const metaImage = config.metadata.meta_image.imgix_url;
  const metaUrl = config.metadata.site_url;

  return {
    metadataBase: new URL(metaUrl),
    alternates: {
      canonical: "/",
    },
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      type: "website",
      siteName: `d×e`,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      siteId: "1721269273446731776",
      creator: "@dxe_xyz",
      creatorId: "1721269273446731776",
      images: [metaImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${serif.variable} ${mono.variable} ${sans.variable} overflow-x-hidden bg-white font-sans antialiased dark:bg-black`}
        >
          <PlausibleProvider domain="designengineer.xyz">
            <MobileNavProvider>
              <MainNav />
              <Presence>{children}</Presence>
            </MobileNavProvider>
          </PlausibleProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
