import { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-black md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl text-pretty text-lg text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
