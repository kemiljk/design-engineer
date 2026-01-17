function PageHeaderSkeleton() {
  return (
    <div className="border-b border-neutral-200 bg-white pt-16 dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="py-10 md:py-12 lg:py-14">
          <div className="mb-4 h-1 w-10 animate-pulse bg-neutral-200 dark:bg-neutral-800 md:w-12 lg:w-14" />
          <div className="mb-5 h-9 w-32 animate-pulse bg-neutral-200 dark:bg-neutral-800 md:mb-6 md:h-10 lg:h-12" />
          <div className="h-5 w-full max-w-lg animate-pulse bg-neutral-200 dark:bg-neutral-800 md:h-6" />
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
        {/* Search and Submit Row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-10 w-full animate-pulse bg-neutral-200 dark:bg-neutral-800 sm:w-64" />
          <div className="h-10 w-full animate-pulse bg-neutral-200 dark:bg-neutral-800 sm:w-40" />
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/9] w-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              {/* Content */}
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="mb-2 h-6 w-3/4 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-4 w-2/3 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-4 w-24 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
