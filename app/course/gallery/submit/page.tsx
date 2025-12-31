import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "iconoir-react";
import { getUserEnrollment } from "@/lib/course";
import { SubmitProjectForm } from "./submit-form";

export const metadata = {
  title: "Submit Project | Design Engineer Course",
  description: "Submit your capstone project to the gallery",
};

export default async function SubmitProjectPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/course/gallery/submit");
  }

  const enrollment = await getUserEnrollment(userId);
  
  if (!enrollment) {
    return (
      <main className="min-h-screen bg-neutral-50 pt-24 dark:bg-neutral-950">
        <div className="container-page py-8">
          <Link
            href="/course/gallery"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>

          <div className="mx-auto max-w-2xl rounded-none border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <Upload className="mx-auto h-12 w-12 text-neutral-300" />
            <h1 className="mt-4 text-xl font-bold">Enrolment Required</h1>
            <p className="mt-2 text-neutral-500">
              You need to be enrolled in the Design Engineer Course to submit projects to the gallery.
            </p>
            <Link
              href="/course/pricing"
              className="mt-6 inline-block bg-swiss-red px-6 py-2 font-medium text-white hover:bg-neutral-900"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 dark:bg-neutral-950">
      <div className="container-page py-8">
        <Link
          href="/course/gallery"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Link>

        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="flex items-center gap-3 text-2xl font-bold md:text-3xl">
              <Upload className="h-8 w-8 text-swiss-red" />
              Submit Your Project
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              ShareIos your capstone project with the Design Engineer community. All submissions are reviewed before being published.
            </p>
          </div>

          <SubmitProjectForm />
        </div>
      </div>
    </main>
  );
}
