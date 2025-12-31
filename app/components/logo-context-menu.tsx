"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  Code, 
  MediaImage, 
  Check,
  OpenNewWindow
} from "iconoir-react";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/motion";

interface LogoContextMenuProps {
  children: ReactNode;
  logoName: string;
  getSvgElement: () => SVGElement | null;
  className?: string;
}

interface MenuPosition {
  x: number;
  y: number;
}

type ActionStatus = "idle" | "loading" | "success" | "error";

interface MenuItem {
  label: string;
  icon: ReactNode;
  action: () => Promise<void>;
  dividerAfter?: boolean;
}

export function LogoContextMenu({ 
  children, 
  logoName, 
  getSvgElement,
  className 
}: LogoContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ x: 0, y: 0 });
  const [actionStatus, setActionStatus] = useState<Record<string, ActionStatus>>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle right-click - attach to document in capture phase for maximum priority
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContextMenu = (e: MouseEvent) => {
      // Check if the click was inside our container
      const target = e.target as Node;
      if (!container.contains(target)) return;
      
      // Prevent browser context menu
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Calculate position, ensuring menu stays within viewport
      const x = Math.min(e.clientX, window.innerWidth - 220);
      const y = Math.min(e.clientY, window.innerHeight - 300);
      
      setPosition({ x, y });
      setIsOpen(true);
      setActionStatus({});
      
      return false;
    };

    // Attach to document in capture phase - this fires before ANY other handlers
    document.addEventListener("contextmenu", handleContextMenu, true);
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
    };
  }, []);

  // Close menu on escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Get SVG string from element
  const getSvgString = useCallback(() => {
    const svg = getSvgElement();
    if (!svg) return null;
    
    // Clone to avoid modifying the original
    const clone = svg.cloneNode(true) as SVGElement;
    
    // Add XML declaration and namespace if missing
    if (!clone.getAttribute("xmlns")) {
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
    
    // Serialise to string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(clone);
  }, [getSvgElement]);

  // Convert SVG to PNG blob
  const svgToPngBlob = useCallback(async (scale: number = 4): Promise<Blob | null> => {
    const svgString = getSvgString();
    if (!svgString) return null;

    const svg = getSvgElement();
    if (!svg) return null;

    const width = svg.clientWidth || 32;
    const height = svg.clientHeight || 32;

    return new Promise((resolve) => {
      const img = new window.Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width * scale;
      canvas.height = height * scale;

      img.onload = () => {
        if (ctx) {
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => resolve(blob), "image/png");
        } else {
          resolve(null);
        }
      };

      img.onerror = () => resolve(null);

      // Create data URL from SVG
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      img.src = URL.createObjectURL(svgBlob);
    });
  }, [getSvgString, getSvgElement]);

  // Action handlers
  const copySvg = useCallback(async () => {
    const svgString = getSvgString();
    if (!svgString) throw new Error("Could not get SVG");
    await navigator.clipboard.writeText(svgString);
  }, [getSvgString]);

  const copyPng = useCallback(async () => {
    const blob = await svgToPngBlob();
    if (!blob) throw new Error("Could not generate PNG");
    
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob })
    ]);
  }, [svgToPngBlob]);

  const downloadSvg = useCallback(async () => {
    const svgString = getSvgString();
    if (!svgString) throw new Error("Could not get SVG");
    
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${logoName.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [getSvgString, logoName]);

  const downloadPng = useCallback(async () => {
    const blob = await svgToPngBlob();
    if (!blob) throw new Error("Could not generate PNG");
    
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${logoName.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [svgToPngBlob, logoName]);

  // Execute action with status tracking
  const executeAction = useCallback(async (id: string, action: () => Promise<void>) => {
    setActionStatus((prev) => ({ ...prev, [id]: "loading" }));
    
    try {
      await action();
      setActionStatus((prev) => ({ ...prev, [id]: "success" }));
      
      // Reset after showing success
      setTimeout(() => {
        setActionStatus((prev) => ({ ...prev, [id]: "idle" }));
      }, 1500);
    } catch (error) {
      console.error(`Action ${id} failed:`, error);
      setActionStatus((prev) => ({ ...prev, [id]: "error" }));
      
      setTimeout(() => {
        setActionStatus((prev) => ({ ...prev, [id]: "idle" }));
      }, 2000);
    }
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: "Copy as SVG",
      icon: <Code className="h-4 w-4" />,
      action: copySvg,
    },
    {
      label: "Copy as PNG",
      icon: <MediaImage className="h-4 w-4" />,
      action: copyPng,
      dividerAfter: true,
    },
    {
      label: "Download SVG",
      icon: <Download className="h-4 w-4" />,
      action: downloadSvg,
    },
    {
      label: "Download PNG",
      icon: <Download className="h-4 w-4" />,
      action: downloadPng,
      dividerAfter: true,
    },
  ];

  return (
    <>
      <div
        ref={containerRef}
        className={cn("cursor-context-menu", className)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            style={{ left: position.x, top: position.y }}
            className="fixed z-50 min-w-[200px] overflow-hidden rounded-lg border border-neutral-200 bg-white p-1 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 mb-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {logoName}
              </p>
            </div>

            {/* Menu Items */}
            {menuItems.map((item, index) => {
              const id = item.label.toLowerCase().replace(/\s+/g, "-");
              const status = actionStatus[id] || "idle";
              
              return (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      executeAction(id, item.action);
                    }}
                    disabled={status === "loading"}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      "text-neutral-700 dark:text-neutral-300",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                      "focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {status === "success" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : status === "loading" ? (
                        <span className="h-4 w-4 block border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                      ) : (
                        item.icon
                      )}
                    </span>
                    <span className={cn(
                      status === "success" && "text-green-600 dark:text-green-400"
                    )}>
                      {status === "success" ? "Copied!" : item.label}
                    </span>
                  </button>
                  
                  {item.dividerAfter && index < menuItems.length - 1 && (
                    <div className="my-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                  )}
                </div>
              );
            })}

            {/* Brand Guidelines Link */}
            <div className="mt-1 pt-1 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href="/brand"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  "text-neutral-700 dark:text-neutral-300",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  "focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800"
                )}
              >
                <OpenNewWindow className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                <span>Brand Guidelines</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

