"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { Search, Plus, Sparks, Folder, MailIn } from "iconoir-react";

type EmptyType = "first-use" | "no-results" | "cleared";

export function EmptyStatesDemo() {
  const [type, setType] = useState<EmptyType>("first-use");

  return (
    <ExampleWrapper
      title="Empty States"
      description="Different empty states require different user guidance"
      controls={
        <ControlGroup label="Scenario">
          <ControlButton active={type === "first-use"} onClick={() => setType("first-use")}>First Use</ControlButton>
          <ControlButton active={type === "no-results"} onClick={() => setType("no-results")}>No Results</ControlButton>
          <ControlButton active={type === "cleared"} onClick={() => setType("cleared")}>Cleared</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex justify-center p-6 bg-neutral-50 rounded-xl border border-neutral-200 dark:bg-neutral-900/50 dark:border-neutral-800">
        <div className="w-full max-w-[340px] bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden min-h-[300px] flex flex-col dark:bg-neutral-950 dark:border-neutral-800">
          
          {/* Header */}
          <div className="h-14 border-b border-neutral-100 flex items-center justify-between px-4 dark:border-neutral-900">
            <span className="font-bold text-neutral-900 dark:text-white">
               {type === "first-use" ? "Projects" : type === "no-results" ? "Search" : "Inbox"}
            </span>
            {type === "first-use" && <button className="p-2 bg-neutral-900 text-white rounded-full"><Plus width={16} height={16} /></button>}
          </div>

          <div className="flex-1 flex items-center justify-center p-6 text-center">
             
             {type === "first-use" && (
               <div className="space-y-4 max-w-[240px]">
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                   <Sparks width={32} height={32} />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Start your first project</h3>
                   <p className="text-sm text-neutral-500 mt-1">Create a project to organise your tasks and collaborate with your team.</p>
                 </div>
                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 w-full transition-colors shadow-sm">
                   Create Project
                 </button>
               </div>
             )}

             {type === "no-results" && (
               <div className="space-y-4 max-w-[240px]">
                 <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 dark:bg-neutral-900">
                   <Search width={32} height={32} />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">No matching results</h3>
                   <p className="text-sm text-neutral-500 mt-1">We couldn't find anything for "quantum_flux". Try checking for typos or using different keywords.</p>
                 </div>
                 <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 w-full transition-colors dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                   Clear Search
                 </button>
               </div>
             )}

             {type === "cleared" && (
               <div className="space-y-4 max-w-[240px]">
                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 dark:bg-green-900/20 dark:text-green-400">
                   <MailIn width={32} height={32} />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">All caught up!</h3>
                   <p className="text-sm text-neutral-500 mt-1">You've cleared your inbox. Nice work!</p>
                 </div>
               </div>
             )}

          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

