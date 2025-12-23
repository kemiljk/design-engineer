interface ExerciseCardProps {
  children: React.ReactNode;
}

export function ExerciseCard({ children }: ExerciseCardProps) {
  return (
    <div className="my-8 border-2 border-swiss-red bg-red-50/50 dark:bg-red-950/20">
      <div className="border-b-2 border-swiss-red bg-swiss-red px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-white">
          Try It Yourself
        </span>
      </div>
      <div className="exercise-content p-6 text-neutral-800 dark:text-neutral-200 [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:tracking-tight first:[&_h3]:mt-0 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:my-3 [&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </div>
  );
}
