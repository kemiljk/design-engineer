"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { AlertCircle, XCircle, Info } from "lucide-react";

type ErrorType = "vague" | "blame" | "helpful";

export function ErrorStatesDemo() {
  const [type, setType] = useState<ErrorType>("helpful");

  return (
    <ExampleWrapper
      title="Error Messages"
      description="Good errors explain what happened and how to fix it"
      controls={
        <ControlGroup label="Type">
          <ControlButton active={type === "vague"} onClick={() => setType("vague")}>Vague</ControlButton>
          <ControlButton active={type === "blame"} onClick={() => setType("blame")}>Hostile</ControlButton>
          <ControlButton active={type === "helpful"} onClick={() => setType("helpful")}>Helpful</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex justify-center p-8 bg-neutral-100 rounded-xl dark:bg-neutral-900/50">
        <div className="w-full max-w-sm space-y-4">
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Address</label>
            <input 
              type="text" 
              value="user@example" 
              readOnly 
              className={cn(
                "w-full px-3 py-2 border rounded-md text-sm",
                "border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50 text-red-900 dark:bg-red-900/10 dark:border-red-900 dark:text-red-200"
              )}
            />
            
            {type === "vague" && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <XCircle size={12} />
                Invalid input.
              </p>
            )}
            
            {type === "blame" && (
              <p className="text-xs text-red-600 mt-1 font-bold flex items-center gap-1">
                <XCircle size={12} />
                You entered a bad email address! Fix it.
              </p>
            )}
            
            {type === "helpful" && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1 dark:text-red-400">
                <AlertCircle size={12} />
                Please include an '@' and a domain (e.g. .com)
              </p>
            )}
          </div>

          <div className="p-4 rounded-lg border bg-white shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
             {type === "vague" && (
               <div className="flex gap-3">
                 <div className="text-red-500"><AlertCircle size={20} /></div>
                 <div>
                   <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Error 500</h4>
                   <p className="text-sm text-neutral-500 mt-1">Something went wrong.</p>
                 </div>
               </div>
             )}

             {type === "blame" && (
               <div className="flex gap-3">
                 <div className="text-red-600"><XCircle size={20} /></div>
                 <div>
                   <h4 className="text-sm font-bold text-red-700 dark:text-red-400">Operation Failed</h4>
                   <p className="text-sm text-red-600 mt-1 dark:text-red-300">You lost your connection. Try again when your internet isn't broken.</p>
                 </div>
               </div>
             )}

             {type === "helpful" && (
               <div className="flex gap-3">
                 <div className="text-amber-500"><Info size={20} /></div>
                 <div className="flex-1">
                   <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Connection Lost</h4>
                   <p className="text-sm text-neutral-500 mt-1">We couldn't save your changes. Check your connection—we'll retry automatically in 5s.</p>
                   <div className="mt-3 flex gap-3">
                     <button className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">Retry Now</button>
                     <button className="text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">Save Offline</button>
                   </div>
                 </div>
               </div>
             )}
          </div>

        </div>
      </div>
    </ExampleWrapper>
  );
}

