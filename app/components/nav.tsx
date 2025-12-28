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
import { Menu, MoreHorizontal, X, LayoutDashboard, StickyNote, Award, FolderKanban } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ease, duration } from "@/lib/motion";

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
        aria-label="More pages"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex h-9 w-9 items-center justify-center text-neutral-500 transition-[color,transform] duration-150 ease-out hover:text-black active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none dark:text-neutral-400 dark:hover:text-white"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-black"
          >
            {items.map((item, index) =>
              isExternalLink(item.href) ? (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: duration.fast, delay: index * 0.03 }}
                  className="focus-ring block px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-black dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white"
                >
                  {item.title}
                </motion.a>
              ) : (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: duration.fast, delay: index * 0.03 }}
                >
                  <NextLink
                    href={item.href}
                    prefetch={true}
                    role="menuitem"
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "focus-ring block px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white",
                      isActive(item.href)
                        ? "text-swiss-red"
                        : "text-neutral-700 dark:text-neutral-200",
                    )}
                  >
                    {item.title}
                  </NextLink>
                </motion.div>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
              className="focus-ring relative text-sm font-medium tracking-widest whitespace-nowrap text-neutral-500 uppercase transition-[color,transform] duration-150 ease-out after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:text-black hover:after:scale-x-100 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none motion-reduce:after:transition-none dark:text-neutral-400 dark:hover:text-white"
            >
              {item.title}
            </a>
          ) : (
            <NextLink
              key={`${item.title}-${index}`}
              href={item.href}
              prefetch={true}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "focus-ring relative text-sm font-medium tracking-widest whitespace-nowrap uppercase transition-[color,transform] duration-150 ease-out after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:text-black hover:after:scale-x-100 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none motion-reduce:after:transition-none dark:hover:text-white",
                isActive(item.href)
                  ? "text-swiss-red after:scale-x-100"
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

const menuItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
};

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
          <NextLink
            href="/"
            prefetch={true}
            className="focus-ring text-foreground"
          >
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
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Dashboard"
                  labelIcon={<LayoutDashboard className="h-4 w-4" />}
                  href="/course/dashboard"
                />
                <UserButton.Link
                  label="My Notes"
                  labelIcon={<StickyNote className="h-4 w-4" />}
                  href="/course/notes"
                />
                <UserButton.Link
                  label="Certificates"
                  labelIcon={<Award className="h-4 w-4" />}
                  href="/course/certificate"
                />
                <UserButton.Link
                  label="Project Gallery"
                  labelIcon={<FolderKanban className="h-4 w-4" />}
                  href="/course/gallery"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="focus-ring p-2 transition-transform duration-150 ease-out active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none sm:hidden"
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: duration.normal, ease: ease.outQuint }}
            className="overflow-hidden bg-white sm:hidden dark:bg-black"
            style={
              isBannerVisible
                ? {
                    maxHeight: `calc(100dvh - 64px - ${bannerHeight}px)`,
                  }
                : { maxHeight: "calc(100dvh - 64px)" }
            }
          >
            <motion.div
              className="flex flex-col gap-6 px-6 pt-4 pb-8"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: { transition: { staggerChildren: 0.04 } },
                exit: { transition: { staggerChildren: 0.02 } },
              }}
            >
              {links.map((item, index) =>
                isExternalLink(item.href) ? (
                  <motion.a
                    key={`menu-${item.title}-${index}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    variants={menuItemVariants}
                    transition={{ duration: duration.normal, ease: ease.outQuint }}
                    className="focus-ring text-foreground w-full text-2xl font-medium tracking-tight uppercase transition-[color,transform] duration-150 ease-out hover:text-black active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none dark:hover:text-white"
                  >
                    {item.title}
                  </motion.a>
                ) : (
                  <motion.div
                    key={`menu-${item.title}-${index}`}
                    variants={menuItemVariants}
                    transition={{ duration: duration.normal, ease: ease.outQuint }}
                  >
                    <NextLink
                      href={item.href}
                      prefetch={true}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "focus-ring block w-full text-2xl font-medium tracking-tight uppercase transition-[color,transform] duration-150 ease-out hover:text-black active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none dark:hover:text-white",
                        isActive(item.href) ? "text-swiss-red" : "text-foreground",
                      )}
                    >
                      {item.title}
                    </NextLink>
                  </motion.div>
                ),
              )}
              <motion.div
                className="mt-4"
                variants={menuItemVariants}
                transition={{ duration: duration.normal, ease: ease.outQuint }}
              >
                <SignedOut>
                  <Button
                    href="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full justify-center"
                  >
                    Sign in
                  </Button>
                </SignedOut>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
