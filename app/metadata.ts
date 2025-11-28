import { getConfig } from "@/lib/cosmic";

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

