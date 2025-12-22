"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/app/components/ui";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useBanner } from "./banner-context";
import { Logo } from "./logo";
import { Menu, MoreHorizontal, X } from "lucide-react";

const CommandPalette = dynamic(
  () => import("./command-palette").then((m) => m.CommandPalette),
  {
    ssr: false,
    loading: () => (
      <div className="hidden h-9 w-28 animate-pulse items-center gap-2 bg-zinc-100 md:flex dark:bg-zinc-800" />
    ),
  },
);

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

type NavLink = {
  index: number;
  title: string;
  href: string;
  target?: string;
};

function DesktopOverflowMenu({
  items,
  isActive,
}: {
  items: NavLink[];
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!containerRef.current?.contains(target)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  if (items.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="More"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-black"
        >
          {items.map((item) =>
            isExternalLink(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-black dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white"
              >
                {item.title}
              </a>
            ) : (
              <NextLink
                key={item.href}
                href={item.href}
                prefetch={true}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white",
                  isActive(item.href)
                    ? "text-swiss-red"
                    : "text-neutral-700 dark:text-neutral-200",
                )}
              >
                {item.title}
              </NextLink>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function DesktopNavLinks({
  links,
  isActive,
}: {
  links: NavLink[];
  isActive: (href: string) => boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(links.length);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measurerRef = useRef<HTMLDivElement | null>(null);
  const measurerItemRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const moreButtonMeasureRef = useRef<HTMLButtonElement | null>(null);

  const measureAndUpdate = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    if (containerWidth <= 0) return;

    const gapValue = (() => {
      const el = measurerRef.current;
      if (!el) return 0;
      const styles = window.getComputedStyle(el);
      const raw = styles.columnGap || styles.gap || "0";
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    })();

    const widths = links.map(
      (_, idx) => measurerItemRefs.current[idx]?.offsetWidth ?? 0,
    );
    const totalWidth =
      widths.reduce((sum, w) => sum + w, 0) +
      Math.max(0, widths.length - 1) * gapValue;

    if (totalWidth <= containerWidth) {
      setVisibleCount(links.length);
      return;
    }

    const moreWidth = moreButtonMeasureRef.current?.offsetWidth ?? 0;
    const available = Math.max(0, containerWidth - moreWidth - gapValue);

    let used = 0;
    let count = 0;
    for (const w of widths) {
      const next = count === 0 ? w : used + gapValue + w;
      if (next <= available) {
        used = next;
        count += 1;
      } else {
        break;
      }
    }

    setVisibleCount(Math.max(0, Math.min(links.length, count)));
  }, [links]);

  useLayoutEffect(() => {
    measureAndUpdate();
  }, [measureAndUpdate]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => measureAndUpdate());
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measureAndUpdate]);

  useEffect(() => {
    window.addEventListener("resize", measureAndUpdate);
    return () => window.removeEventListener("resize", measureAndUpdate);
  }, [measureAndUpdate]);

  useEffect(() => {
    if (!("fonts" in document)) return;
    document.fonts.ready.then(() => measureAndUpdate()).catch(() => {});
  }, [measureAndUpdate]);

  const visible = links.slice(0, visibleCount);
  const overflow = links.slice(visibleCount);

  return (
    <div
      ref={containerRef}
      className="flex w-full min-w-0 items-center justify-center"
    >
      <div className="flex min-w-0 items-center gap-8">
        {visible.map((item, index) =>
          isExternalLink(item.href) ? (
            <a
              key={`${item.title}-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-widest whitespace-nowrap text-neutral-500 uppercase transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              {item.title}
            </a>
          ) : (
            <NextLink
              key={`${item.title}-${index}`}
              href={item.href}
              prefetch={true}
              className={cn(
                "text-sm font-medium tracking-widest whitespace-nowrap uppercase transition-colors hover:text-black dark:hover:text-white",
                isActive(item.href)
                  ? "text-swiss-red"
                  : "text-neutral-500 dark:text-neutral-400",
              )}
            >
              {item.title}
            </NextLink>
          ),
        )}

        <DesktopOverflowMenu items={overflow} isActive={isActive} />
      </div>

      <div className="pointer-events-none absolute top-0 -left-[9999px] opacity-0">
        <div ref={measurerRef} className="flex items-center gap-8">
          {links.map((item, idx) => (
            <span
              key={`${item.href}-${idx}`}
              ref={(el) => {
                measurerItemRefs.current[idx] = el;
              }}
              className="text-sm font-medium tracking-widest whitespace-nowrap uppercase"
            >
              {item.title}
            </span>
          ))}
          <button
            ref={moreButtonMeasureRef}
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="flex h-9 w-9 items-center justify-center"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Nav({
  links,
  posts = [],
}: {
  links: NavLink[];
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
        "border-foreground/10 bg-background/80 fixed inset-x-0 z-40 border-b backdrop-blur-md transition-[top] duration-200",
      )}
      style={{
        top: isBannerVisible ? `${bannerHeight}px` : 0,
      }}
    >
      <nav className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <NextLink href="/" prefetch={true} className="text-foreground">
            <Logo className="text-foreground size-8" />
          </NextLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden min-w-0 flex-1 justify-center sm:flex">
          <DesktopNavLinks links={links} isActive={isActive} />
        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-4">
          <CommandPalette posts={posts} />

          <SignedOut>
            <Button
              href="/sign-in"
              className="h-9 px-4 text-xs font-medium tracking-wide uppercase"
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
          className="flex flex-col gap-6 bg-white px-6 pt-4 pb-8 sm:hidden dark:bg-black"
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
                className="text-foreground w-full text-2xl font-medium tracking-tight uppercase hover:text-black dark:hover:text-white"
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
                  "w-full text-2xl font-medium tracking-tight uppercase hover:text-black dark:hover:text-white",
                  isActive(item.href) ? "text-swiss-red" : "text-foreground",
                )}
              >
                {item.title}
              </NextLink>
            ),
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
