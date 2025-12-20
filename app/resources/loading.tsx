export default function Loading() {
  return (
    <div className="mx-auto mb-16 mt-8 flex h-full w-full max-w-7xl flex-col items-center px-4 md:px-0">
      <div className="h-10 w-40 animate-pulse rounded-none bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-2 h-5 w-72 animate-pulse rounded-none bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-96 w-80 shrink-0 animate-pulse rounded-none bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    </div>
  );
}
