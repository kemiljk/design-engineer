import type { Viewport } from "next";
import {
  Lora,
  JetBrains_Mono,
  Instrument_Sans,
  Bricolage_Grotesque,
} from "next/font/google";
import PlausibleProvider from "next-plausible";
import { ClerkProvider } from "@clerk/nextjs";
import { getBanner, getConfig } from "@/lib/cosmic";
import "./globals.css";
import MainNav from "./components/main-nav";
import { Providers } from "./providers";
import Banner from "./components/banner";
import { currentUser } from "@clerk/nextjs";
import { Resend } from "resend";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const banner = await getBanner();
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  let emails: string[] = [];

  resend.contacts
    .list({
      audienceId: process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID as string,
    })
    .then((audience) => {
      const data = audience.data?.data || [];
      emails = data.map((contact: any) => contact.email);
    });

  const user = await currentUser();
  if (user && !emails.includes(user.emailAddresses[0].emailAddress as string)) {
    resend.contacts.create({
      audienceId: process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID as string,
      email: user.emailAddresses[0].emailAddress as string,
    });
  }

  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${serif.variable} ${mono.variable} ${sans.variable} ${display.variable}  relative h-full min-h-screen w-full overflow-x-hidden font-sans text-foreground antialiased transition-colors duration-200 ease-in-out dark:bg-background`}
        >
          <PlausibleProvider domain="designengineer.xyz">
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
          </PlausibleProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
