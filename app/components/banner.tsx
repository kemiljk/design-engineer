"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { NavArrowRight, Xmark } from "iconoir-react";
import Markdown from "react-markdown";
import { useBanner } from "./banner-context";

export default function Banner({
  link,
  message,
  button_label,
  modified_at,
}: {
  link: string;
  message: string;
  button_label: string;
  modified_at: string;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [bannerHidden, setBannerHidden] = useState(true);
  const { setBannerVisible, setBannerHeight } = useBanner();
  const bannerRef = useRef<HTMLDivElement>(null);
  const isCapturePage = pathname?.startsWith("/capture");

  const updateBannerHeight = useCallback(() => {
    if (bannerRef.current) {
      setBannerHeight(bannerRef.current.offsetHeight);
    }
  }, [setBannerHeight]);

  useEffect(() => {
    setMounted(true);
    const hiddenInStorage = localStorage.getItem("bannerHidden") === "true";
    const modifiedAtInStorage = localStorage.getItem("bannerModifiedAt");
    const shouldHide = hiddenInStorage && modifiedAtInStorage === modified_at;
    setBannerHidden(shouldHide);
  }, [modified_at]);

  useEffect(() => {
    const isVisible = mounted && !bannerHidden && !isCapturePage;
    setBannerVisible(isVisible);
    return () => {
      setBannerVisible(false);
      setBannerHeight(0);
    };
  }, [mounted, bannerHidden, isCapturePage, setBannerVisible, setBannerHeight]);

  useEffect(() => {
    if (!bannerRef.current || bannerHidden || isCapturePage) return;

    updateBannerHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateBannerHeight();
    });

    resizeObserver.observe(bannerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [bannerHidden, isCapturePage, updateBannerHeight]);

  const handleDismiss = () => {
    setBannerHidden(true);
    localStorage.setItem("bannerHidden", "true");
    localStorage.setItem("bannerModifiedAt", modified_at);
  };

  // Hide on capture routes or when not mounted/hidden
  if (isCapturePage || !mounted || bannerHidden) return null;

  return (
    <div
      ref={bannerRef}
      className="sticky top-0 z-[999999] flex w-full items-center justify-between gap-4 border-b border-neutral-800 bg-neutral-900 px-4 py-2.5 dark:border-neutral-200 dark:bg-white md:px-8"
    >
      <div className="flex flex-1 items-center justify-center gap-4">
        <NextLink
          href={link}
          className="text-sm text-neutral-400 transition-colors hover:text-white motion-reduce:transition-none dark:text-neutral-600 dark:hover:text-black [&_strong]:font-bold [&_strong]:text-white dark:[&_strong]:text-black"
        >
          <Markdown>{message}</Markdown>
        </NextLink>
        <NextLink
          href={link}
          className="group flex items-center gap-2 bg-swiss-red px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black motion-reduce:transition-none dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          {button_label}
          <NavArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </NextLink>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Close Banner"
        className="flex h-8 w-8 items-center justify-center text-neutral-500 transition-colors hover:text-white motion-reduce:transition-none dark:hover:text-black"
      >
        <Xmark className="h-4 w-4" />
      </button>
    </div>
  );
}
