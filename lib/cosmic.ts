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
  };
}

// Home page
export const getHome = cache(async (): Promise<Home> => {
  const home = await Promise.resolve(
    cosmic.objects
      .findOne({
        type: "home",
        slug: "home",
      })
      .props("title,metadata")
      .depth(1)
  );

  return home.object;
});
