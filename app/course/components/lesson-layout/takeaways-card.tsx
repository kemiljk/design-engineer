import ReactMarkdown from "react-markdown";

interface TakeawaysCardProps {
  takeaways: string[];
}

export function TakeawaysCard({ takeaways }: TakeawaysCardProps) {
  return (
    <div className="my-8 rounded-none bg-neutral-900 p-6 dark:bg-neutral-950">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Key Takeaways
      </h3>
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 flex-shrink-0 bg-swiss-red" />
            <span className="text-sm text-white [&_strong]:font-semibold [&_code]:rounded [&_code]:bg-neutral-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs">
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
