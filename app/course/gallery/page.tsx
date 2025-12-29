import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  ArrowLeft,
  FolderKanban,
  Sparkles,
  PlusCircle,
  Filter,
} from "lucide-react";
import { getGalleryProjects, getFeaturedGalleryProjects } from "@/lib/cosmic";
import { getUserEnrollment } from "@/lib/course";
import { Button } from "@/app/components/ui";
import { GalleryProjectCard } from "../dashboard/gallery-project-card";
import { GalleryFilters } from "./gallery-filters";

export const metadata = {
  title: "Capstone Gallery | Design Engineer Course",
  description: "Browse capstone projects from Design Engineer Course students",
};

interface GalleryPageProps {
  searchParams: Promise<{
    platform?: string;
    track?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const { userId } = await auth();
  
  let isEnrolled = false;
  if (userId) {
    const enrollment = await getUserEnrollment(userId);
    isEnrolled = !!enrollment;
  }

  const filterOptions: {
    status?: "approved" | "featured";
    platform?: "web" | "ios" | "android";
    track?: "design" | "engineering" | "convergence";
  } = {
    status: "approved",
  };

  if (params.platform && ["web", "ios", "android"].includes(params.platform)) {
    filterOptions.platform = params.platform as "web" | "ios" | "android";
  }
  if (params.track && ["design", "engineering", "convergence"].includes(params.track)) {
    filterOptions.track = params.track as "design" | "engineering" | "convergence";
  }

  const [featuredProjects, projects] = await Promise.all([
    getFeaturedGalleryProjects(3),
    getGalleryProjects(filterOptions),
  ]);

  const showFeatured = !params.platform && !params.track && featuredProjects.length > 0;

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 dark:bg-neutral-950">
      <div className="container-page py-8">
        <Link
          href="/course"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <FolderKanban className="h-8 w-8 text-swiss-red" />
              <h1 className="text-2xl font-bold md:text-3xl">Capstone Gallery</h1>
            </div>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Explore capstone projects from our Design Engineer students
            </p>
          </div>

          {isEnrolled && (
            <Button
              href="/course/gallery/submit"
              startContent={<PlusCircle className="h-4 w-4" />}
            >
              Submit Your Project
            </Button>
          )}
        </div>

        {/* Featured Projects */}
        {showFeatured && (
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-swiss-red" />
              <h2 className="text-lg font-bold">Featured Projects</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <GalleryProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Filter className="h-4 w-4" />
            Filter:
          </div>
          <GalleryFilters
            currentPlatform={params.platform}
            currentTrack={params.track}
          />
        </div>

        {/* All Projects */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {params.platform || params.track ? "Filtered Projects" : "All Projects"}
            </h2>
            <span className="text-sm text-neutral-500">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-none border border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <FolderKanban className="mx-auto h-12 w-12 text-neutral-300" />
              <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
              <p className="mt-2 text-neutral-500">
                {params.platform || params.track
                  ? "No projects match the selected filters. Try adjusting your filters."
                  : "Be the first to submit a capstone project!"}
              </p>
              {isEnrolled && (
                <Button
                  href="/course/gallery/submit"
                  startContent={<Sparkles className="h-4 w-4" />}
                  className="mt-6"
                >
                  Submit Your Project
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <GalleryProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* CTA for non-enrolled users */}
        {!isEnrolled && (
          <section className="mt-12 rounded-none border-2 border-swiss-red bg-swiss-red/[0.025] p-8 text-center dark:bg-swiss-red/5">
            <Sparkles className="mx-auto h-8 w-8 text-swiss-red" />
            <h2 className="mt-4 text-xl font-bold">Create Your Own Capstone</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Enrol in the Design Engineer Course to complete capstone projects and showcase your work here.
            </p>
            <Button
              href="/course/pricing"
              className="mt-6"
            >
              View Pricing
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
