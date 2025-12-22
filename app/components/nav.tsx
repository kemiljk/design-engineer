"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/app/components/ui";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useBanner } from "./banner-context";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";

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
  const pathname = usePathname();
  const { isBannerVisible, bannerHeight } = useBanner();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
        <div className="hidden items-center gap-8 sm:flex">
          {links.map((item, index) =>
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
