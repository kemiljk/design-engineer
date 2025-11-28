"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function EmailSubscriber() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
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
  }, [user, isLoaded]);

  return null;
}

