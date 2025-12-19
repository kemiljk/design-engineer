import { createBucketClient } from "@cosmicjs/sdk";
import { unstable_cache } from "next/cache";
import * as Type from "./types";

export const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG as string,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY as string,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY as string,
});

export const getConfig = unstable_cache(
  async (): Promise<Type.Config> => {
    const config = await cosmic.objects
      .findOne({ type: "config", slug: "config" })
      .props("slug,title,metadata")
      .depth(1);

    return config.object;
  },
  ["config"],
  { revalidate: 3600, tags: ["config"] }
);

export const getHome = unstable_cache(
  async (): Promise<Type.Home> => {
    const home = await cosmic.objects
      .findOne({ type: "home", slug: "home" })
      .props("title,metadata")
      .depth(1);

    return home.object;
  },
  ["home"],
  { revalidate: 300, tags: ["home"] }
);

export const getSponsors = unstable_cache(
  async (): Promise<Type.Sponsor[]> => {
    const sponsors = await cosmic.objects
      .find({ type: "sponsors" })
      .props("id,title,metadata")
      .depth(1);

    return sponsors.objects;
  },
  ["sponsors"],
  { revalidate: 3600, tags: ["sponsors"] }
);

export const getBanner = unstable_cache(
  async () => {
    const banner = await cosmic.objects
      .findOne({ type: "banner", slug: "stories-announcement" })
      .props("slug,title,metadata,modified_at")
      .depth(1);

    return banner.object;
  },
  ["banner"],
  { revalidate: 300, tags: ["banner"] }
);

export const getPosts = unstable_cache(
  async (): Promise<Type.Post[]> => {
    const { objects: posts } = await cosmic.objects
      .find({ type: "content-posts" })
      .props("id,slug,title,metadata")
      .depth(1);

    return posts;
  },
  ["posts"],
  { revalidate: 300, tags: ["posts"] }
);

export const getPost = async (slug: string): Promise<Type.Post> => {
  return unstable_cache(
    async () => {
      const post = await cosmic.objects
        .findOne({ type: "content-posts", slug })
        .props("id,slug,title,metadata,created_at,modified_at")
        .depth(2);

      return post.object;
    },
    [`post-${slug}`],
    { revalidate: 300, tags: ["posts", `post-${slug}`] }
  )();
};

export const getStats = unstable_cache(
  async (): Promise<Type.Stats> => {
    const stats = await cosmic.objects
      .find({ type: "waitlists" })
      .props("title")
      .depth(1);

    return stats;
  },
  ["stats"],
  { revalidate: 60, tags: ["stats"] }
);

export const getStat = unstable_cache(
  async (): Promise<Type.Stat[]> => {
    const stat = await cosmic.objects
      .find({ type: "waitlists" })
      .props("title,created_at")
      .depth(1);

    return stat.objects;
  },
  ["stat"],
  { revalidate: 60, tags: ["stats"] }
);

export const getAbout = unstable_cache(
  async (): Promise<Type.About> => {
    const about = await cosmic.objects
      .findOne({ type: "about", slug: "about-dxe" })
      .props("title,metadata")
      .depth(1);

    return about.object;
  },
  ["about"],
  { revalidate: 3600, tags: ["about"] }
);

export const getPrivacy = unstable_cache(
  async (): Promise<Type.Privacy> => {
    const privacy = await cosmic.objects
      .findOne({ type: "privacy-policy", slug: "privacy-policy" })
      .props("title,metadata")
      .depth(1);

    return privacy.object;
  },
  ["privacy"],
  { revalidate: 86400, tags: ["privacy"] }
);

export const getTerms = unstable_cache(
  async (): Promise<Type.Terms> => {
    const terms = await cosmic.objects
      .findOne({ type: "terms-and-conditions", slug: "terms-of-service" })
      .props("title,metadata")
      .depth(1);

    return terms.object;
  },
  ["terms"],
  { revalidate: 86400, tags: ["terms"] }
);

export const getJobs = unstable_cache(
  async (): Promise<Type.Job[]> => {
    const jobs = await cosmic.objects
      .find({ type: "jobs" })
      .props("id,title,metadata")
      .depth(1);

    return jobs.objects;
  },
  ["jobs"],
  { revalidate: 300, tags: ["jobs"] }
);

export const getIndustries = unstable_cache(
  async (): Promise<Type.Industry[]> => {
    const industries = await cosmic.objects
      .find({ type: "industries" })
      .props("id,slug,title,metadata")
      .depth(1);

    return industries.objects;
  },
  ["industries"],
  { revalidate: 3600, tags: ["industries"] }
);

export const getLocations = unstable_cache(
  async (): Promise<Type.Location[]> => {
    const locations = await cosmic.objects
      .find({ type: "locations" })
      .props("id,slug,title,metadata")
      .depth(1);

    return locations.objects;
  },
  ["locations"],
  { revalidate: 3600, tags: ["locations"] }
);

export const getPrompts = unstable_cache(
  async (): Promise<Type.Prompt[]> => {
    const prompts = await cosmic.objects
      .find({ type: "spec-builder-prompts" })
      .props("id,title")
      .depth(1);

    return prompts.objects;
  },
  ["prompts"],
  { revalidate: 300, tags: ["prompts"] }
);

export const getSpecs = unstable_cache(
  async (): Promise<Type.Spec[]> => {
    const specs = await cosmic.objects
      .find({ type: "spec-builder-completions" })
      .props("id,title,metadata,creation_date")
      .depth(1);

    return specs.objects;
  },
  ["specs"],
  { revalidate: 300, tags: ["specs"] }
);

export const getTaskBuilderSuggestions = unstable_cache(
  async (): Promise<Type.TaskBuilderSuggestion[]> => {
    const suggestions = await cosmic.objects
      .find({ type: "taskbuildersuggestions" })
      .props("id,title")
      .depth(1);

    return suggestions.objects;
  },
  ["task-builder-suggestions"],
  { revalidate: 300, tags: ["task-builder-suggestions"] }
);

export const getStories = unstable_cache(
  async (): Promise<Type.Story[]> => {
    const { objects: story } = await cosmic.objects
      .find({ type: "stories" })
      .props("id,slug,title,metadata")
      .depth(1)
      .sort("order");

    return story;
  },
  ["stories"],
  { revalidate: 300, tags: ["stories"] }
);

export const getStory = async (slug: string): Promise<Type.Story> => {
  return unstable_cache(
    async () => {
      const { object: story } = await cosmic.objects
        .findOne({ slug, type: "stories" })
        .props("id,slug,title,metadata")
        .depth(3);

      return story;
    },
    [`story-${slug}`],
    { revalidate: 300, tags: ["stories", `story-${slug}`] }
  )();
};

export const getResources = unstable_cache(
  async (): Promise<Type.Resource[]> => {
    const { objects: resources } = await cosmic.objects
      .find({ type: "resources" })
      .props("slug,title,metadata")
      .depth(2);

    return resources;
  },
  ["resources"],
  { revalidate: 3600, tags: ["resources"] }
);

export const getRecentPostSlugs = unstable_cache(
  async (): Promise<{ slug: string; title: string }[]> => {
    const { objects } = await cosmic.objects
      .find({ type: "content-posts" })
      .props("slug,title")
      .limit(10)
      .depth(1);

    return objects;
  },
  ["recent-post-slugs"],
  { revalidate: 300, tags: ["posts"] }
);
