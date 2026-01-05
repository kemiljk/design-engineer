"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { Menu, Search, User, Home, Bell, Settings, ArrowLeft } from "iconoir-react";

type NavPattern = "global" | "local" | "contextual";

export function NavPatternsDemo() {
  const [pattern, setPattern] = useState<NavPattern>("global");

  return (
    <ExampleWrapper
      title="Navigation Patterns"
      description="Different levels of navigation serve different wayfinding needs"
      controls={
        <ControlGroup label="Pattern">
          <ControlButton active={pattern === "global"} onClick={() => setPattern("global")}>Global</ControlButton>
          <ControlButton active={pattern === "local"} onClick={() => setPattern("local")}>Local</ControlButton>
          <ControlButton active={pattern === "contextual"} onClick={() => setPattern("contextual")}>Contextual</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex justify-center p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
        <div className="w-full max-w-[360px] bg-white dark:bg-neutral-950 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col h-[400px]">
          
          {/* Global Nav Bar */}
          <div className={cn(
            "h-14 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 transition-all duration-500",
            pattern === "global" ? "bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-inset z-20" : "bg-white dark:bg-neutral-950"
          )}>
            <div className="font-bold text-lg">Logo</div>
            <div className="flex gap-4">
              <Search width={20} height={20} className="text-neutral-500" />
              <User width={20} height={20} className="text-neutral-500" />
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar (Local Nav) */}
            <div className={cn(
               "w-16 border-r border-neutral-200 dark:border-neutral-800 flex flex-col items-center py-4 gap-6 transition-all duration-500",
               pattern === "local" ? "bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-inset z-20" : "bg-neutral-50 dark:bg-neutral-900"
            )}>
               <div className="p-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg"><Home width={20} height={20} /></div>
               <div className="p-2 text-neutral-400"><Bell width={20} height={20} /></div>
               <div className="p-2 text-neutral-400"><Settings width={20} height={20} /></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
               <div className="flex items-center gap-2 mb-6 text-sm text-neutral-500">
                  <ArrowLeft width={16} height={16} />
                  <span>Back to Settings</span>
               </div>
               
               <h2 className="text-2xl font-bold mb-4">Profile</h2>
               
               <div className="space-y-4">
                 <div className="h-32 bg-neutral-100 rounded-lg dark:bg-neutral-900"></div>
                 <div className="h-4 w-3/4 bg-neutral-100 rounded dark:bg-neutral-900"></div>
                 <div className="h-4 w-1/2 bg-neutral-100 rounded dark:bg-neutral-900"></div>
               </div>

               {/* Contextual Nav */}
               <div className={cn(
                 "mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 transition-all duration-500",
                 pattern === "contextual" ? "bg-blue-50 -mx-6 px-6 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-inset z-20" : ""
               )}>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">Related Articles</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded border border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
                      <span className="text-sm font-medium">Security Settings</span>
                      <ArrowRightIcon />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
                      <span className="text-sm font-medium">Notification Preferences</span>
                      <ArrowRightIcon />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {pattern === "global" && "Consistent across the entire app. Helps users know 'where they are'."}
        {pattern === "local" && "Specific to the current section. Helps users explore sub-areas."}
        {pattern === "contextual" && "Connects related content. Helps users find 'what's next'."}
      </div>
    </ExampleWrapper>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

