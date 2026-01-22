import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { NavArrowLeft as ArrowLeft } from "iconoir-react";
import { getFlashcardsForUser } from "@/lib/flashcards";
import { FlashcardsClient } from "./flashcards-client";

export const metadata = {
  title: "Flashcards | Design Engineer Course",
  description: "Review concepts from completed lessons.",
};

export default async function FlashcardsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/course/dashboard/flashcards");
  }

  const exercises = await getFlashcardsForUser(userId);

  return (
    <main className="min-h-dvh bg-neutral-50 pt-24 dark:bg-neutral-950">
      <div className="container-page py-8">
        <Link
          href="/course/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Flashcards</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Review your knowledge from lessons you've already completed.
          </p>
        </div>

        <FlashcardsClient initialExercises={exercises} />
      </div>
    </main>
  );
}
