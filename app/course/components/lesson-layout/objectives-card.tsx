import ReactMarkdown from "react-markdown";

interface ObjectivesCardProps {
  objectives: string[];
}

export function ObjectivesCard({ objectives }: ObjectivesCardProps) {
  return (
    <div className="my-8 rounded-none border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        What You&apos;ll Learn
      </h3>
      <ul className="space-y-3">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-neutral-300 dark:border-neutral-600">
              <span className="h-2 w-2 bg-swiss-red" />
            </span>
            <span className="text-sm text-neutral-700 dark:text-neutral-300 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-100">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <>{children}</>,
                }}
              >
                {objective}
              </ReactMarkdown>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
