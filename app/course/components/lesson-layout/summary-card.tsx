interface SummaryCardProps {
  children: React.ReactNode;
}

export function SummaryCard({ children }: SummaryCardProps) {
  return (
    <div className="relative my-8 border-l-4 border-swiss-red bg-neutral-50 p-6 dark:bg-neutral-900/50">
      <span className="absolute -top-3 left-4 bg-neutral-50 px-2 text-xs font-semibold uppercase tracking-wider text-swiss-red dark:bg-neutral-900">
        Quick Summary
      </span>
      <div className="prose prose-sm prose-gray max-w-none dark:prose-invert">
        {children}
      </div>
    </div>
  );
}
