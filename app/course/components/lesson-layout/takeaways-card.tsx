import ReactMarkdown from "react-markdown";

interface TakeawaysCardProps {
  takeaways: string[];
}

export function TakeawaysCard({ takeaways }: TakeawaysCardProps) {
  return (
    <div className="my-8 rounded-none bg-neutral-900 p-6 dark:bg-neutral-950">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-400">
        Key Takeaways
      </h3>
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 bg-swiss-red" />
            <span className="text-sm text-white dark:text-white [&_strong]:font-semibold [&_strong]:text-white [&_strong]:dark:text-white [&_code]:rounded-none [&_code]:border [&_code]:border-neutral-700 [&_code]:dark:border-neutral-600 [&_code]:bg-neutral-800 [&_code]:dark:bg-neutral-800 [&_code]:px-1 [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-neutral-200 [&_code]:dark:text-neutral-200">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <>{children}</>,
                }}
              >
                {takeaway}
              </ReactMarkdown>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
