import { createBucketClient } from "@cosmicjs/sdk";
import * as Type from "./types";
import { cache } from "react";

export const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG as string,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY as string,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY as string,
});

// Site config
export const getConfig = cache(async (): Promise<Type.Config> => {
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
export const getHome = cache(async (): Promise<Type.Home> => {
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

// Blog post
export const getPosts = cache(async (): Promise<Type.Post[]> => {
  const { objects: posts } = await cosmic.objects
    .find({
      type: "blog-posts",
    })
    .props("id,slug,title,metadata")
    .depth(1);

  return posts;
});
