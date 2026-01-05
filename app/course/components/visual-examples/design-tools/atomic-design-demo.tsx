"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { Search, Bell, User } from "iconoir-react";

type Level = "atoms" | "molecules" | "organisms" | "templates";

export function AtomicDesignDemo() {
  const [level, setLevel] = useState<Level>("atoms");

  return (
    <ExampleWrapper
      title="Atomic Design"
      description="Break down interfaces into their fundamental building blocks"
      controls={
        <ControlGroup label="Level">
          {(["atoms", "molecules", "organisms", "templates"] as Level[]).map((l) => (
            <ControlButton
              key={l}
              active={level === l}
              onClick={() => setLevel(l)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 min-h-[300px] bg-neutral-50/50 p-6 rounded-xl border border-dashed border-neutral-200 dark:bg-neutral-900/30 dark:border-neutral-800 transition-all duration-300">
        
        {level === "atoms" && (
          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="group flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-blue-500 shadow-md group-hover:scale-110 transition-transform"></div>
              <span className="text-xs font-mono text-neutral-400">Color</span>
            </div>
            <div className="group flex flex-col items-center gap-2">
              <div className="px-4 py-2 bg-white border border-neutral-200 rounded-md text-sm font-medium shadow-sm group-hover:scale-105 transition-transform dark:bg-neutral-800 dark:border-neutral-700">Button</div>
              <span className="text-xs font-mono text-neutral-400">Shape</span>
            </div>
            <div className="group flex flex-col items-center gap-2">
              <Search className="text-neutral-600 dark:text-neutral-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono text-neutral-400">Icon</span>
            </div>
            <div className="group flex flex-col items-center gap-2">
              <span className="text-lg font-bold text-neutral-900 dark:text-white group-hover:scale-110 transition-transform">Title</span>
              <span className="text-xs font-mono text-neutral-400">Type</span>
            </div>
          </div>
        )}

        {level === "molecules" && (
          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in zoom-in-95 duration-300">
             {/* Search Bar Molecule */}
             <div className="flex flex-col items-center gap-3">
               <div className="flex items-center w-64 rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
                 <Search width={18} height={18} className="mr-2 text-neutral-400" />
                 <span className="text-sm text-neutral-400">Search...</span>
               </div>
               <span className="text-xs font-mono text-neutral-400">Search Molecule</span>
             </div>

             {/* User Profile Molecule */}
             <div className="flex flex-col items-center gap-3">
               <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                 <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">SJ</div>
                 <div className="text-sm font-medium">Sarah Jenkins</div>
               </div>
               <span className="text-xs font-mono text-neutral-400">User Molecule</span>
             </div>
          </div>
        )}

        {level === "organisms" && (
          <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-300">
            {/* Header Organism */}
            <div className="flex flex-col items-center gap-3 w-full">
              <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200 shadow-sm rounded-t-lg dark:bg-neutral-900 dark:border-neutral-800">
                <div className="font-bold text-lg tracking-tight">Acme Inc.</div>
                
                <div className="hidden sm:flex items-center gap-6">
                   <nav className="flex gap-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                     <span className="text-neutral-900 dark:text-white">Dashboard</span>
                     <span>Projects</span>
                     <span>Team</span>
                   </nav>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Bell width={20} height={20} className="text-neutral-500" />
                    <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-neutral-900"></div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">SJ</div>
                </div>
              </header>
              <span className="text-xs font-mono text-neutral-400">Header Organism</span>
            </div>
          </div>
        )}

        {level === "templates" && (
          <div className="w-full max-w-lg aspect-[4/3] bg-white border border-neutral-200 shadow-lg rounded-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300 dark:bg-neutral-950 dark:border-neutral-800">
            {/* Header Placeholder */}
            <div className="h-14 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between px-4 dark:bg-neutral-900 dark:border-neutral-800">
              <div className="h-4 w-20 bg-neutral-200 rounded dark:bg-neutral-800"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
              </div>
            </div>
            
            <div className="flex-1 flex">
              {/* Sidebar Placeholder */}
              <div className="w-48 border-r border-neutral-200 bg-neutral-50 p-4 hidden sm:block dark:bg-neutral-900 dark:border-neutral-800">
                <div className="space-y-3">
                  <div className="h-3 w-24 bg-neutral-200 rounded dark:bg-neutral-800"></div>
                  <div className="h-3 w-32 bg-neutral-200 rounded dark:bg-neutral-800"></div>
                  <div className="h-3 w-20 bg-neutral-200 rounded dark:bg-neutral-800"></div>
                </div>
              </div>
              
              {/* Content Placeholder */}
              <div className="flex-1 p-6 space-y-6">
                <div className="h-8 w-48 bg-neutral-200 rounded dark:bg-neutral-800"></div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-neutral-100 rounded-lg border border-dashed border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"></div>
                  <div className="h-32 bg-neutral-100 rounded-lg border border-dashed border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"></div>
                  <div className="h-32 bg-neutral-100 rounded-lg border border-dashed border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      
      <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {level === "atoms" && "Building blocks that can't be broken down further."}
        {level === "molecules" && "Groups of atoms functioning together as a unit."}
        {level === "organisms" && "Complex components forming distinct sections of UI."}
        {level === "templates" && "Page-level layouts showing structure without content."}
      </div>
    </ExampleWrapper>
  );
}

