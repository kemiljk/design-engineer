export default function Loading() {
  return (
    <section>
      <div className="mx-auto mt-4 flex w-full max-w-3xl justify-end md:mt-20">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <div className="h-10 w-full animate-pulse rounded-none bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-10 w-full animate-pulse rounded-none bg-neutral-200 dark:bg-neutral-800 md:w-40" />
        </div>
      </div>
      <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-none bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    </section>
  );
}
