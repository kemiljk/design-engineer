"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/app/components/ui";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useBanner } from "./banner-context";
import { Logo } from "./logo";
import { Menu, X, MoreHorizontal } from "lucide-react";

const CommandPalette = dynamic(
  () => import("./command-palette").then((m) => m.CommandPalette),
  {
    ssr: false,
    loading: () => (
      <div className="hidden h-9 w-28 animate-pulse items-center gap-2 bg-zinc-100 dark:bg-zinc-800 md:flex" />
    ),
  }
);

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Nav({
  links,
  posts = [],
}: {
  links: {
    index: number;
    title: string;
    href: string;
    target?: string;
  }[];
  posts?: { title: string; slug: string }[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(links.length);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isBannerVisible, bannerHeight } = useBanner();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!navRef.current) return;
      
      const navWidth = navRef.current.offsetWidth;
      const itemWidth = 120; // Approximate width per nav item
      const overflowButtonWidth = 60; // Width for ... button
      const buffer = 100; // Extra buffer for safety
      
      const availableWidth = navWidth - buffer;
      const maxItems = Math.floor((availableWidth - overflowButtonWidth) / itemWidth);
      
      // Always show at least 3 items, and if we can show all, don't add overflow
      const itemsToShow = Math.max(3, Math.min(maxItems, links.length));
      
      // Only show overflow if we actually need to hide items
      setVisibleCount(itemsToShow >= links.length ? links.length : itemsToShow);
    };

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, [links.length]);

  const visibleLinks = links.slice(0, visibleCount);
  const overflowLinks = links.slice(visibleCount);
  const hasOverflow = overflowLinks.length > 0;

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-md transition-[top] duration-200"
      )}
      style={{
        top: isBannerVisible ? `${bannerHeight}px` : 0,
      }}
    >
      <nav className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <NextLink href="/" prefetch={true} className="text-foreground">
            <Logo className="size-8 text-foreground" />
          </NextLink>
        </div>

        {/* Desktop Navigation */}
        <div ref={navRef} className="hidden items-center gap-8 sm:flex">
          {visibleLinks.map((item, index) =>
            isExternalLink(item.href) ? (
              <a
                key={`${item.title}-${index}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-widest text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                {item.title}
              </a>
            ) : (
              <NextLink
                key={`${item.title}-${index}`}
                href={item.href}
                prefetch={true}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors hover:text-black dark:hover:text-white",
                  isActive(item.href)
                    ? "text-swiss-red"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                {item.title}
              </NextLink>
            )
          )}
          
          {/* Overflow Menu */}
          {hasOverflow && (
            <div className="relative">
              <button
                onClick={() => setIsOverflowOpen(!isOverflowOpen)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium uppercase tracking-widest transition-colors hover:text-black dark:hover:text-white",
                  isOverflowOpen
                    ? "text-swiss-red"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
                aria-label="More navigation items"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
              
              {isOverflowOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOverflowOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-black">
                    {overflowLinks.map((item, index) =>
                      isExternalLink(item.href) ? (
                        <a
                          key={`overflow-${item.title}-${index}`}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOverflowOpen(false)}
                          className="block px-4 py-3 text-sm font-medium uppercase tracking-wide text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <NextLink
                          key={`overflow-${item.title}-${index}`}
                          href={item.href}
                          prefetch={true}
                          onClick={() => setIsOverflowOpen(false)}
                          className={cn(
                            "block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-neutral-50 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white",
                            isActive(item.href)
                              ? "text-swiss-red"
                              : "text-neutral-700 dark:text-neutral-300"
                          )}
                        >
                          {item.title}
                        </NextLink>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <CommandPalette posts={posts} />

          <SignedOut>
            <Button
              href="/sign-in"
              className="h-9 px-4 text-xs font-medium uppercase tracking-wide"
            >
              Sign in
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "hover:cursor-default hover:opacity-80 rounded-none",
                  userButtonPopoverActionButton:
                    "hover:cursor-default hover:opacity-80",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 sm:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="flex flex-col gap-6 bg-white px-6 pb-8 pt-4 dark:bg-black sm:hidden"
          style={
            isBannerVisible
              ? {
                  maxHeight: `calc(100dvh - 64px - ${bannerHeight}px)`,
                }
              : { maxHeight: "calc(100dvh - 64px)" }
          }
        >
          {links.map((item, index) =>
            isExternalLink(item.href) ? (
              <a
                key={`menu-${item.title}-${index}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-2xl font-medium uppercase tracking-tight text-foreground hover:text-black dark:hover:text-white"
              >
                {item.title}
              </a>
            ) : (
              <NextLink
                key={`menu-${item.title}-${index}`}
                href={item.href}
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "w-full text-2xl font-medium uppercase tracking-tight hover:text-black dark:hover:text-white",
                  isActive(item.href) ? "text-swiss-red" : "text-foreground"
                )}
              >
                {item.title}
              </NextLink>
            )
          )}
          <div className="mt-4">
          <SignedOut>
            <Button
              href="/sign-in"
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-center"
            >
              Sign in
            </Button>
          </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
