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
      type: "content-posts",
    })
    .props("id,slug,title,metadata")
    .depth(1)
    .sort("random");

  return posts;
});

// Stats page
export const getStats = async (): Promise<Type.Stats> => {
  const stats = await Promise.resolve(
    await cosmic.objects.find({ type: "waitlists" }).props("title").depth(1),
  );

  return stats;
};

export const getStat = async (): Promise<Type.Stat[]> => {
  const stat = await Promise.resolve(
    await cosmic.objects
      .find({
        type: "waitlists",
      })
      .props("title,created_at")
      .depth(1),
  );

  return stat.objects;
};

export const getAbout = async (): Promise<Type.About> => {
  const about = await Promise.resolve(
    await cosmic.objects
      .findOne({
        type: "about",
        slug: "about-dxe",
      })
      .props("title,metadata")
      .depth(1),
  );

  return about.object;
};

export const getPrivacy = async (): Promise<Type.Privacy> => {
  const privacy = await Promise.resolve(
    await cosmic.objects
      .findOne({
        type: "privacy-policy",
        slug: "privacy-policy",
      })
      .props("title,metadata")
      .depth(1),
  );

  return privacy.object;
};

export const getTerms = async (): Promise<Type.Terms> => {
  const terms = await Promise.resolve(
    await cosmic.objects
      .findOne({
        type: "terms-and-conditions",
        slug: "terms-of-service",
      })
      .props("title,metadata")
      .depth(1),
  );

  return terms.object;
};
