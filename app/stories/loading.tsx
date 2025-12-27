function PageHeaderSkeleton() {
  return (
    <div className="border-b border-neutral-200 bg-white pt-16 dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="py-10 md:py-12 lg:py-14">
          <div className="mb-4 h-1 w-10 animate-pulse bg-neutral-200 dark:bg-neutral-800 md:w-12 lg:w-14" />
          <div className="mb-5 h-9 w-32 animate-pulse bg-neutral-200 dark:bg-neutral-800 md:mb-6 md:h-10 lg:h-12" />
          <div className="h-5 w-full max-w-xl animate-pulse bg-neutral-200 dark:bg-neutral-800 md:h-6" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeaderSkeleton />

      <div className="container-page py-12">
        {/* Stories Grid - matches flex wrap layout */}
        <div className="flex flex-wrap justify-center gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-[28rem] w-80 animate-pulse border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              style={{
                transform: i % 2 === 0 ? "rotate(-3deg)" : "rotate(2deg)",
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
