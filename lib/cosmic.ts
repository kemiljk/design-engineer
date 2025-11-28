import { createBucketClient } from "@cosmicjs/sdk";
import * as Type from "./types";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_BUCKET_SLUG as string,
  readKey: process.env.NEXT_PUBLIC_BUCKET_READ_KEY as string,
  writeKey: process.env.NEXT_PUBLIC_BUCKET_WRITE_KEY as string,
});

// Site config - cached for 1 hour
export const getConfig = cache(
  unstable_cache(
    async (): Promise<Type.Config> => {
      const config = await cosmic.objects
        .findOne({
          type: "config",
          slug: "config",
        })
        .props("slug,title,metadata")
        .depth(1);

      return config.object;
    },
    ["config"],
    { revalidate: 3600 }
  )
);

// Home page - cached for 5 minutes
export const getHome = cache(
  unstable_cache(
    async (): Promise<Type.Home> => {
      const home = await cosmic.objects
        .findOne({
          type: "home",
          slug: "home",
        })
        .props("title,metadata")
        .depth(1);

      return home.object;
    },
    ["home"],
    { revalidate: 300 }
  )
);

// Sponsors - cached for 1 hour
export const getSponsors = cache(
  unstable_cache(
    async (): Promise<Type.Sponsor[]> => {
      const sponsors = await cosmic.objects
        .find({
          type: "sponsors",
        })
        .props("id,title,metadata")
        .depth(1);

      return sponsors.objects;
    },
    ["sponsors"],
    { revalidate: 3600 }
  )
);

// Banner - cached for 5 minutes
export const getBanner = cache(
  unstable_cache(
    async () => {
      const banner = await cosmic.objects
        .findOne({
          type: "banner",
          slug: "stories-announcement",
        })
        .props("slug,title,metadata,modified_at")
        .depth(1);

      return banner.object;
    },
    ["banner"],
    { revalidate: 300 }
  )
);

// Blog posts - cached for 5 minutes
export const getPosts = cache(
  unstable_cache(
    async (): Promise<Type.Post[]> => {
      const { objects: posts } = await cosmic.objects
        .find({
          type: "content-posts",
        })
        .props("id,slug,title,metadata")
        .depth(1);

      return posts;
    },
    ["posts"],
    { revalidate: 300 }
  )
);

// First party posts - cached for 5 minutes
export const getFirstPartyPosts = cache(
  unstable_cache(
    async (): Promise<Type.Post[]> => {
      const { objects: posts } = await cosmic.objects
        .find({
          type: "content-posts",
        })
        .props("id,slug,title,metadata")
        .depth(1);

      return posts;
    },
    ["first-party-posts"],
    { revalidate: 300 }
  )
);

// Single post - cached for 5 minutes
export const getPost = cache(
  async ({ params }: { params: { slug: string } }): Promise<Type.Post> => {
    return unstable_cache(
      async () => {
        const post = await cosmic.objects
          .findOne({
            type: "content-posts",
            slug: params.slug,
          })
          .props("id,slug,title,metadata,created_at,modified_at")
          .depth(2);

        return post.object;
      },
      [`post-${params.slug}`],
      { revalidate: 300 }
    )();
  }
);

// Stats page
export const getStats = cache(
  unstable_cache(
    async (): Promise<Type.Stats> => {
      const stats = await cosmic.objects
        .find({ type: "waitlists" })
        .props("title")
        .depth(1);

      return stats;
    },
    ["stats"],
    { revalidate: 60 }
  )
);

export const getStat = cache(
  unstable_cache(
    async (): Promise<Type.Stat[]> => {
      const stat = await cosmic.objects
        .find({
          type: "waitlists",
        })
        .props("title,created_at")
        .depth(1);

      return stat.objects;
    },
    ["stat"],
    { revalidate: 60 }
  )
);

// About page - cached for 1 hour
export const getAbout = cache(
  unstable_cache(
    async (): Promise<Type.About> => {
      const about = await cosmic.objects
        .findOne({
          type: "about",
          slug: "about-dxe",
        })
        .props("title,metadata")
        .depth(1);

      return about.object;
    },
    ["about"],
    { revalidate: 3600 }
  )
);

// Privacy - cached for 1 day
export const getPrivacy = cache(
  unstable_cache(
    async (): Promise<Type.Privacy> => {
      const privacy = await cosmic.objects
        .findOne({
          type: "privacy-policy",
          slug: "privacy-policy",
        })
        .props("title,metadata")
        .depth(1);

      return privacy.object;
    },
    ["privacy"],
    { revalidate: 86400 }
  )
);

// Terms - cached for 1 day
export const getTerms = cache(
  unstable_cache(
    async (): Promise<Type.Terms> => {
      const terms = await cosmic.objects
        .findOne({
          type: "terms-and-conditions",
          slug: "terms-of-service",
        })
        .props("title,metadata")
        .depth(1);

      return terms.object;
    },
    ["terms"],
    { revalidate: 86400 }
  )
);

// Jobs - cached for 5 minutes
export const getJobs = cache(
  unstable_cache(
    async (): Promise<Type.Job[]> => {
      const jobs = await cosmic.objects
        .find({
          type: "jobs",
        })
        .props("id,title,metadata")
        .depth(1);

      return jobs.objects;
    },
    ["jobs"],
    { revalidate: 300 }
  )
);

// Industries - cached for 1 hour
export const getIndustries = cache(
  unstable_cache(
    async (): Promise<Type.Industry[]> => {
      const industries = await cosmic.objects
        .find({ type: "industries" })
        .props("id,slug,title,metadata")
        .depth(1);

      return industries.objects;
    },
    ["industries"],
    { revalidate: 3600 }
  )
);

// Locations - cached for 1 hour
export const getLocations = cache(
  unstable_cache(
    async (): Promise<Type.Location[]> => {
      const locations = await cosmic.objects
        .find({ type: "locations" })
        .props("id,slug,title,metadata")
        .depth(1);

      return locations.objects;
    },
    ["locations"],
    { revalidate: 3600 }
  )
);

// Prompts - cached for 5 minutes
export const getPrompts = cache(
  unstable_cache(
    async (): Promise<Type.Prompt[]> => {
      const prompts = await cosmic.objects
        .find({ type: "spec-builder-prompts" })
        .props("id,title")
        .depth(1);

      return prompts.objects;
    },
    ["prompts"],
    { revalidate: 300 }
  )
);

// Specs - cached for 5 minutes
export const getSpecs = cache(
  unstable_cache(
    async (): Promise<Type.Spec[]> => {
      const specs = await cosmic.objects
        .find({ type: "spec-builder-completions" })
        .props("id,title,metadata,creation_date")
        .depth(1);

      return specs.objects;
    },
    ["specs"],
    { revalidate: 300 }
  )
);

// Task builder suggestions - cached for 5 minutes
export const getTaskBuilderSuggestions = cache(
  unstable_cache(
    async (): Promise<Type.TaskBuilderSuggestion[]> => {
      const suggestions = await cosmic.objects
        .find({ type: "taskbuildersuggestions" })
        .props("id,title")
        .depth(1);

      return suggestions.objects;
    },
    ["task-builder-suggestions"],
    { revalidate: 300 }
  )
);

// Stories - cached for 5 minutes
export const getStories = cache(
  unstable_cache(
    async (): Promise<Type.Story[]> => {
      const { objects: story } = await cosmic.objects
        .find({
          type: "stories",
        })
        .props("id,slug,title,metadata")
        .depth(1)
        .sort("order");

      return story;
    },
    ["stories"],
    { revalidate: 300 }
  )
);

// Single story - cached for 5 minutes
export const getStory = cache(
  async (slug: string): Promise<Type.Story> => {
    return unstable_cache(
      async () => {
        const { object: story } = await cosmic.objects
          .findOne({
            slug,
            type: "stories",
          })
          .props("id,slug,title,metadata")
          .depth(3);

        return story;
      },
      [`story-${slug}`],
      { revalidate: 300 }
    )();
  }
);

// Resources - cached for 1 hour
export const getResources = cache(
  unstable_cache(
    async (): Promise<Type.Resource[]> => {
      const { objects: resources } = await cosmic.objects
        .find({
          type: "resources",
        })
        .props("slug,title,metadata")
        .depth(2);

      return resources;
    },
    ["resources"],
    { revalidate: 3600 }
  )
);
