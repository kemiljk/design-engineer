import { createBucketClient } from "@cosmicjs/sdk";
import { cache } from "react";

export const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG as string,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY as string,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY as string,
});

interface Home {
  metadata: {
    description: string;
    pill: string;
  };
}

interface Config {
  metadata: {
    site_name: string;
    site_description: string;
    meta_image: {
      imgix_url: string;
    };
    site_url: string;
  };
}

// Site config
export const getConfig = cache(async (): Promise<Config> => {
  const config = await Promise.resolve(
    cosmic.objects
      .findOne({
        type: "config",
        slug: "config",
      })
      .props("slug,title,metadata")
      .depth(1),
  );

  return config.object;
});

// Home page
export const getHome = cache(async (): Promise<Home> => {
  const home = await Promise.resolve(
    cosmic.objects
      .findOne({
        type: "home",
        slug: "home",
      })
      .props("title,metadata")
      .depth(1),
  );

  return home.object;
});
