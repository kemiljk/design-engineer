"use client";

import { useState } from "react";
import { createUpgradeCheckout } from "@/app/api/course/upgrade/actions";
import { cn } from "@/lib/utils";

// Wraps the "Get Everything" button for existing customers
export function UpgradeButton({ 
  targetProductKey, 
  currentAccess, 
  children,
  className 
}: { 
  targetProductKey: string, 
  currentAccess: string | null,
  children: React.ReactNode,
  className?: string
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Only show this upgrade logic if they have a paid tier that isn't the target
  const isUpgrade = (currentAccess === "engineering_full" || currentAccess === "design_full") && targetProductKey === "full";

  if (!isUpgrade) {
    // Return standard button if not an upgrade scenario
    return <>{children}</>; 
  }

  const handleUpgrade = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent parent click if inside a card
    
    setIsLoading(true);
    const result = await createUpgradeCheckout(targetProductKey);
    
    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
    } else {
      alert(result.error || "Upgrade failed");
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleUpgrade}
      disabled={isLoading}
      className={cn(className, "relative overflow-hidden")}
    >
      {isLoading ? "Calculating Credit..." : "Upgrade (Pay Difference)"}
    </button>
  );
}
