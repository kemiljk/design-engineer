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
    try {
      const { objects } = await cosmic.objects
        .find({ type: "banner" })
        .props("slug,title,metadata,modified_at")
        .depth(1)
        .limit(1);

      return objects?.[0] ?? null;
    } catch (error) {
      console.error("Error fetching banner:", error);
      return null;
    }
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

export const getCourseAvailability = unstable_cache(
  async (): Promise<{ is_available: boolean }> => {
    try {
      const { object } = await cosmic.objects
        .findOne({ type: "course-availability", slug: "availability" })
        .props("metadata")
        .depth(1);

      const isAvailable = object?.metadata?.is_available === true;
      console.log("[Course Availability]", { isAvailable, raw: object?.metadata?.is_available });
      
      return {
        is_available: isAvailable,
      };
    } catch (error) {
      console.error("[Course Availability] Error fetching:", error);
      return { is_available: false };
    }
  },
  ["course-availability"],
  { revalidate: 60, tags: ["course-availability"] }
);

// Gallery Project Functions

export const getGalleryProjects = unstable_cache(
  async (options?: { 
    status?: Type.GalleryProjectStatus; 
    platform?: Type.GalleryProjectPlatform;
    track?: Type.GalleryProjectTrack;
    limit?: number;
  }): Promise<Type.GalleryProject[]> => {
    try {
      const query: Record<string, unknown> = {
        type: "gallery-projects",
      };
      
      if (options?.status) {
        query["metadata.status"] = options.status;
      }
      if (options?.platform) {
        query["metadata.platform"] = options.platform;
      }
      if (options?.track) {
        query["metadata.track"] = options.track;
      }
      
      let request = cosmic.objects
        .find(query)
        .props("id,slug,title,created_at,modified_at,metadata")
        .depth(1)
        .sort("-created_at");
      
      if (options?.limit) {
        request = request.limit(options.limit);
      }
      
      const { objects } = await request;
      return objects || [];
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        return [];
      }
      console.error("Error fetching gallery projects:", error);
      return [];
    }
  },
  ["gallery-projects"],
  { revalidate: 300, tags: ["gallery-projects"] }
);

export const getFeaturedGalleryProjects = unstable_cache(
  async (limit: number = 6): Promise<Type.GalleryProject[]> => {
    try {
      const { objects } = await cosmic.objects
        .find({
          type: "gallery-projects",
          "metadata.status": "featured",
        })
        .props("id,slug,title,created_at,modified_at,metadata")
        .depth(1)
        .sort("-metadata.featured_at")
        .limit(limit);
      
      return objects || [];
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        return [];
      }
      console.error("Error fetching featured gallery projects:", error);
      return [];
    }
  },
  ["gallery-projects-featured"],
  { revalidate: 300, tags: ["gallery-projects"] }
);

export const getUserGalleryProjects = async (
  userId: string
): Promise<Type.GalleryProject[]> => {
  return unstable_cache(
    async () => {
      try {
        const { objects } = await cosmic.objects
          .find({
            type: "gallery-projects",
            "metadata.user_id": userId,
          })
          .props("id,slug,title,created_at,modified_at,metadata")
          .depth(1)
          .sort("-created_at");

        return objects || [];
      } catch (error: unknown) {
        if (
          error &&
          typeof error === "object" &&
          "status" in error &&
          error.status === 404
        ) {
          return [];
        }
        console.error("Error fetching user gallery projects:", error);
        return [];
      }
    },
    [`user-gallery-projects-${userId}`],
    {
      revalidate: 300,
      tags: ["gallery-projects", `user-gallery-projects-${userId}`],
    }
  )();
};

export const getGalleryProject = async (
  slug: string
): Promise<Type.GalleryProject | null> => {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: "gallery-projects",
        slug,
      })
      .props("id,slug,title,created_at,modified_at,metadata")
      .depth(1);
    
    return object || null;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      return null;
    }
    console.error("Error fetching gallery project:", error);
    return null;
  }
};

// Testimonial Functions

export const getTestimonials = unstable_cache(
  async (options?: { 
    status?: Type.TestimonialStatus;
    limit?: number;
  }): Promise<Type.Testimonial[]> => {
    try {
      const query: Record<string, unknown> = {
        type: "testimonials",
      };
      
      if (options?.status) {
        query["metadata.status"] = options.status;
      }
      
      let request = cosmic.objects
        .find(query)
        .props("id,slug,title,created_at,modified_at,metadata")
        .depth(1)
        .sort("-created_at");
      
      if (options?.limit) {
        request = request.limit(options.limit);
      }
      
      const { objects } = await request;
      return objects || [];
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        return [];
      }
      console.error("Error fetching testimonials:", error);
      return [];
    }
  },
  ["testimonials"],
  { revalidate: 300, tags: ["testimonials"] }
);

export const getFeaturedTestimonials = unstable_cache(
  async (limit: number = 6): Promise<Type.Testimonial[]> => {
    try {
      const { objects } = await cosmic.objects
        .find({
          type: "testimonials",
          "metadata.status": "featured",
        })
        .props("id,slug,title,created_at,modified_at,metadata")
        .depth(1)
        .sort("-metadata.featured_at")
        .limit(limit);
      
      return objects || [];
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        return [];
      }
      console.error("Error fetching featured testimonials:", error);
      return [];
    }
  },
  ["testimonials-featured"],
  { revalidate: 300, tags: ["testimonials"] }
);

export const getApprovedTestimonials = unstable_cache(
  async (limit: number = 12): Promise<Type.Testimonial[]> => {
    try {
      // Get both approved and featured testimonials
      const { objects } = await cosmic.objects
        .find({
          type: "testimonials",
          "metadata.status": { $in: ["approved", "featured"] },
        })
        .props("id,slug,title,created_at,modified_at,metadata")
        .depth(1)
        .sort("-created_at")
        .limit(limit);
      
      return objects || [];
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        return [];
      }
      console.error("Error fetching approved testimonials:", error);
      return [];
    }
  },
  ["testimonials-approved"],
  { revalidate: 300, tags: ["testimonials"] }
);

export const getUserTestimonial = async (
  userId: string
): Promise<Type.Testimonial | null> => {
  return unstable_cache(
    async () => {
      try {
        const { objects } = await cosmic.objects
          .find({
            type: "testimonials",
            "metadata.user_id": userId,
          })
          .props("id,slug,title,created_at,modified_at,metadata")
          .depth(1)
          .limit(1);

        return objects?.[0] || null;
      } catch (error: unknown) {
        if (
          error &&
          typeof error === "object" &&
          "status" in error &&
          error.status === 404
        ) {
          return null;
        }
        console.error("Error fetching user testimonial:", error);
        return null;
      }
    },
    [`user-testimonial-${userId}`],
    { revalidate: 300, tags: ["testimonials", `user-testimonial-${userId}`] }
  )();
};

export const submitTestimonial = async (
  data: Omit<Type.Testimonial["metadata"], "status" | "featured_at" | "admin_notes">
): Promise<Type.Testimonial> => {
  const { nanoid } = await import("nanoid");
  const slug = `testimonial-${data.user_id}-${nanoid(8)}`.toLowerCase();
  
  const result = await cosmic.objects.insertOne({
    type: "testimonials",
    title: `${data.user_name}'s testimonial`,
    slug,
    metadata: {
      ...data,
      status: "pending" as Type.TestimonialStatus,
    },
  });

  return result.object;
};

export const updateTestimonial = async (
  testimonialId: string,
  data: Partial<Type.Testimonial["metadata"]>
): Promise<Type.Testimonial> => {
  const result = await cosmic.objects.updateOne(testimonialId, {
    metadata: data,
  });

  return result.object;
};
