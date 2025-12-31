import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserNotes } from "@/lib/course";
import { Notes, ArrowLeft, Pin, OpenNewWindow } from "iconoir-react";
import type { CourseNote } from "@/lib/types";

export const metadata = {
  title: "My Course Notes | Design Engineer Course",
};

export default async function NotesPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in?redirect=/course/notes");
  }
  
  const notes = await getUserNotes(userId);
  
  const groupedNotes = notes.reduce((acc, note) => {
    const path = note.metadata.lesson_path;
    if (!acc[path]) {
      acc[path] = [];
    }
    acc[path].push(note);
    return acc;
  }, {} as Record<string, CourseNote[]>);
  
  const sortedGroups = Object.entries(groupedNotes).sort(([, a], [, b]) => {
    const aLatest = Math.max(...a.map(n => new Date(n.modified_at).getTime()));
    const bLatest = Math.max(...b.map(n => new Date(n.modified_at).getTime()));
    return bLatest - aLatest;
  });
  
  const formatLessonTitle = (path: string): string => {
    const lastPart = path.split('/').pop() || '';
    return lastPart
      .replace(/^\d+-/, '')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatBreadcrumb = (path: string): string => {
    return path
      .split('/')
      .slice(0, -1)
      .map(part => part.replace(/-/g, ' ').replace(/^\d+\s*/, ''))
      .join(' › ');
  };
  
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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Notes className="h-8 w-8 text-swiss-red" />
            My Course Notes
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {notes.length} note{notes.length !== 1 ? 's' : ''} across {Object.keys(groupedNotes).length} lesson{Object.keys(groupedNotes).length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {sortedGroups.length === 0 ? (
          <div className="rounded-none border border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <Notes className="mx-auto h-12 w-12 text-neutral-300" />
            <h2 className="mt-4 text-lg font-semibold">No notes yet</h2>
            <p className="mt-2 text-neutral-500">
              Start taking notes while learning to see them here.
            </p>
            <Link
              href="/course"
              className="mt-6 inline-flex items-center gap-2 bg-swiss-red px-4 py-2 text-white hover:bg-neutral-900"
            >
              Go to Course
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedGroups.map(([lessonPath, lessonNotes]) => (
              <div key={lessonPath} className="rounded-none border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
                  <div>
                    <p className="text-xs text-neutral-500">
                      {formatBreadcrumb(lessonPath)}
                    </p>
                    <h2 className="font-semibold">
                      {formatLessonTitle(lessonPath)}
                    </h2>
                  </div>
                  <Link
                    href={`/course/${lessonPath}`}
                    className="flex items-center gap-1 text-sm text-swiss-red hover:underline"
                  >
                    Go to lesson
                    <OpenNewWindow className="h-3 w-3" />
                  </Link>
                </div>
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {lessonNotes.map((note) => (
                    <div key={note.id} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-sm whitespace-pre-wrap">
                          {note.metadata.content || <span className="italic text-neutral-400">Empty note</span>}
                        </p>
                        {note.metadata.is_pinned && (
                          <Pin className="h-4 w-4 shrink-0 text-swiss-red" />
                        )}
                      </div>
                      <p className="mt-2 text-xs text-neutral-400">
                        {new Date(note.modified_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
