"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { NavArrowRight, Folder, Page } from "iconoir-react";

type HierarchyType = "flat" | "deep";

export function IAHierarchyDepthDemo() {
  const [type, setType] = useState<HierarchyType>("flat");
  const [activePath, setActivePath] = useState<string[]>([]);

  const togglePath = (id: string) => {
    if (activePath.includes(id)) {
      setActivePath(activePath.filter(p => p !== id));
    } else {
      setActivePath([...activePath, id]);
    }
  };

  return (
    <ExampleWrapper
      title="Hierarchy Depth"
      description="Compare discoverability (flat) vs. manageability (deep)"
      controls={
        <ControlGroup label="Structure">
          <ControlButton active={type === "flat"} onClick={() => setType("flat")}>Flat (Broad)</ControlButton>
          <ControlButton active={type === "deep"} onClick={() => setType("deep")}>Deep (Narrow)</ControlButton>
        </ControlGroup>
      }
    >
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden dark:bg-neutral-950 dark:border-neutral-800">
         <div className="h-10 bg-neutral-100 border-b border-neutral-200 flex items-center px-4 text-xs font-mono text-neutral-500 dark:bg-neutral-900 dark:border-neutral-800">
           root/
           {type === "flat" ? "all-items/" : "categories/sub-categories/"}
         </div>
         
         <div className="p-6 min-h-[300px]">
           {type === "flat" ? (
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
               {Array.from({ length: 9 }).map((_, i) => (
                 <div key={i} className="flex flex-col items-center p-4 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer dark:border-neutral-800 dark:hover:bg-neutral-900">
                    <Page width={24} height={24} className="text-blue-500 mb-2" />
                    <span className="text-xs text-center font-medium">Item {i + 1}</span>
                 </div>
               ))}
             </div>
           ) : (
             <div className="space-y-2 max-w-sm mx-auto">
               {["Electronics", "Clothing", "Home"].map((cat, i) => (
                 <div key={cat} className="border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-800">
                   <div 
                     className="flex items-center gap-3 p-3 bg-neutral-50 cursor-pointer hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                     onClick={() => togglePath(cat)}
                   >
                     <NavArrowRight width={16} height={16} className={cn("transition-transform text-neutral-400", activePath.includes(cat) && "rotate-90")} />
                     <Folder width={18} height={18} className="text-yellow-500" />
                     <span className="text-sm font-medium">{cat}</span>
                   </div>
                   
                   {activePath.includes(cat) && (
                     <div className="pl-9 pr-3 py-2 space-y-2 border-t border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800">
                        {["Sub-category A", "Sub-category B"].map((sub) => (
                          <div key={sub}>
                             <div 
                               className="flex items-center gap-2 py-1 cursor-pointer hover:text-blue-600"
                               onClick={() => togglePath(`${cat}-${sub}`)}
                             >
                                <NavArrowRight width={14} height={14} className={cn("transition-transform text-neutral-300", activePath.includes(`${cat}-${sub}`) && "rotate-90")} />
                                <Folder width={14} height={14} className="text-yellow-500/70" />
                                <span className="text-xs">{sub}</span>
                             </div>
                             
                             {activePath.includes(`${cat}-${sub}`) && (
                               <div className="pl-6 py-1 space-y-1">
                                  <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer">
                                     <Page width={12} height={12} className="text-blue-500" />
                                     <span className="text-xs text-neutral-600 dark:text-neutral-400">Item 1</span>
                                  </div>
                                  <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer">
                                     <Page width={12} height={12} className="text-blue-500" />
                                     <span className="text-xs text-neutral-600 dark:text-neutral-400">Item 2</span>
                                  </div>
                               </div>
                             )}
                          </div>
                        ))}
                     </div>
                   )}
                 </div>
               ))}
             </div>
           )}
         </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
         <div className={cn("p-4 rounded-lg border text-sm transition-opacity", type === "flat" ? "border-blue-200 bg-blue-50 opacity-100 dark:bg-blue-900/20 dark:border-blue-800" : "opacity-50 border-transparent")}>
            <strong className="block mb-1 text-blue-900 dark:text-blue-100">Flat Pros:</strong>
            <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1 text-xs">
               <li>Everything visible at once</li>
               <li>Fewer clicks to reach items</li>
               <li>Good for small sets</li>
            </ul>
         </div>
         <div className={cn("p-4 rounded-lg border text-sm transition-opacity", type === "deep" ? "border-blue-200 bg-blue-50 opacity-100 dark:bg-blue-900/20 dark:border-blue-800" : "opacity-50 border-transparent")}>
            <strong className="block mb-1 text-blue-900 dark:text-blue-100">Deep Pros:</strong>
            <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1 text-xs">
               <li>Handles massive scale</li>
               <li>Progressive disclosure</li>
               <li>Clean, uncluttered UI</li>
            </ul>
         </div>
      </div>
    </ExampleWrapper>
  );
}

