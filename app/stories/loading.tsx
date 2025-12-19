export default function Loading() {
  return (
    <section>
      <div className="mx-auto w-full p-4 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center md:mt-0">
            <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="mt-2 h-5 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
      <div className="mt-12 flex w-full flex-wrap justify-evenly gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[28rem] w-80 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    </section>
  );
}
