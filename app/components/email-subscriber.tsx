"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function EmailSubscriber() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const isCapturePage = pathname?.startsWith("/capture");

  useEffect(() => {
    // Skip on capture routes
    if (isCapturePage) return;
    if (!isLoaded || !user) return;

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return;

    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {
      // Silently fail - this is a background operation
    });
  }, [user, isLoaded, isCapturePage]);

  return null;
}

