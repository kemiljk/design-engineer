import type { Viewport } from "next";
import { Lora, JetBrains_Mono, Manrope } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { ClerkProvider } from "@clerk/nextjs";
import { getConfig } from "@/lib/cosmic";
import "./globals.css";
import MainNav from "./components/main-nav";
import Presence from "./components/presence";

const serif = Lora({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-serif",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const sans = Manrope({
  subsets: ["latin"],
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
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${serif.variable} ${mono.variable} ${sans.variable} overflow-x-hidden bg-white font-sans dark:bg-black`}
        >
          <PlausibleProvider domain="designengineer.xyz">
            <MainNav />
            <Presence>{children}</Presence>
          </PlausibleProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
