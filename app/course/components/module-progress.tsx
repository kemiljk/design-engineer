"use client";

import { CheckCircle as CheckCircle2, Circle } from "iconoir-react";
import { cn } from "@/lib/utils";

interface ModuleProgressProps {
  modules: {
    id: string;
    title: string;
    lessons: number;
    completedLessons: number;
  }[];
}

export function ModuleProgress({ modules }: ModuleProgressProps) {
  return (
    <div className="space-y-3">
      {modules.map((module) => {
        const percentage = module.lessons > 0 
          ? Math.round((module.completedLessons / module.lessons) * 100) 
          : 0;
        const isComplete = percentage === 100;
        
        return (
          <div key={module.id} className="flex items-center gap-3">
            {isComplete ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-neutral-300 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "text-sm font-medium truncate",
                  isComplete && "text-green-600 dark:text-green-400"
                )}>
                  {module.title}
                </span>
                <span className="text-xs text-neutral-500 ml-2">
                  {module.completedLessons}/{module.lessons}
                </span>
              </div>
              <div className="h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all rounded-full",
                    isComplete ? "bg-green-500" : "bg-swiss-red"
                  )}
                  style={{ width: `${percentage}%` }} 
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
