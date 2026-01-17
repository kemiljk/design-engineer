function PageHeaderSkeleton() {
  return (
    <div className="border-b border-neutral-200 bg-white pt-16 dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="py-10 md:py-12 lg:py-14">
          <div className="mb-4 h-1 w-10 animate-pulse bg-neutral-200 dark:bg-neutral-800 md:w-12 lg:w-14" />
          <div className="mb-5 h-9 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-800 md:mb-6 md:h-10 lg:h-12" />
          <div className="h-5 w-full max-w-md animate-pulse bg-neutral-200 dark:bg-neutral-800 md:h-6" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeaderSkeleton />

      <div className="container-page py-12">
        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex h-64 flex-col border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-2 h-6 w-32 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              <div className="mb-6 flex-1 space-y-2">
                <div className="h-4 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-4 w-3/4 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              </div>
              <div className="space-y-2">
                <div className="h-10 w-full animate-pulse bg-neutral-100 dark:bg-neutral-800" />
                <div className="h-10 w-full animate-pulse bg-neutral-100 dark:bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Community Posts Section */}
        <div className="mb-8 mt-16 border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div className="h-8 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-2 h-5 w-64 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-4 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-4 w-2/3 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              </div>
              <div className="h-4 w-4 shrink-0 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
