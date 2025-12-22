"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Wrench,
  BookOpen,
  Users,
  Info,
  Search,
  ExternalLink,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface CommandPaletteProps {
  posts?: { title: string; slug: string }[];
}

export function CommandPalette({ posts = [] }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const pages = [
    { name: "Home", href: "/", icon: Home, keywords: "home main landing" },
    {
      name: "Posts",
      href: "/posts",
      icon: FileText,
      keywords: "articles blog content read",
    },
    {
      name: "Tools",
      href: "/tools",
      icon: Wrench,
      keywords: "task builder practice",
    },
    {
      name: "Resources",
      href: "/resources",
      icon: BookOpen,
      keywords: "links learning",
    },
    {
      name: "Stories",
      href: "/stories",
      icon: Users,
      keywords: "interviews people",
    },
    { name: "About", href: "/about", icon: Info, keywords: "who what" },
    {
      name: "Hiring",
      href: "https://designengineer.io",
      icon: Briefcase,
      external: true,
      keywords: "jobs careers work",
    },
  ];

  const actions = [
    {
      name: "Sign Up",
      href: "/sign-up",
      icon: Sparkles,
      keywords: "register join",
    },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 md:flex dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="ml-2 bg-neutral-200 px-1.5 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        className="fixed inset-0 z-[99999]"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div className="fixed top-[20%] left-1/2 z-[100000] w-full max-w-lg -translate-x-1/2 overflow-hidden border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
          <Command.Input
            placeholder="Type a command or search..."
            className="dark:text-foreground w-full border-b border-neutral-200 bg-transparent px-4 py-3 text-base outline-none placeholder:text-neutral-400 dark:border-neutral-800"
          />
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-4 py-8 text-center text-sm text-neutral-500">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="mb-2 px-2 text-xs font-medium tracking-wider text-neutral-400 uppercase"
            >
              {pages.map((page) => (
                <Command.Item
                  key={page.href}
                  value={`${page.name} ${page.keywords}`}
                  onSelect={() =>
                    runCommand(() => {
                      if (page.external) {
                        window.open(page.href, "_blank");
                      } else {
                        router.push(page.href);
                      }
                    })
                  }
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-neutral-700 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:aria-selected:bg-neutral-800"
                >
                  <page.icon className="h-4 w-4 text-neutral-400" />
                  <span>{page.name}</span>
                  {page.external && (
                    <ExternalLink className="ml-auto h-3 w-3 text-neutral-400" />
                  )}
                </Command.Item>
              ))}
            </Command.Group>

            {posts.length > 0 && (
              <Command.Group
                heading="Recent Posts"
                className="mb-2 px-2 text-xs font-medium tracking-wider text-neutral-400 uppercase"
              >
                {posts.slice(0, 5).map((post) => (
                  <Command.Item
                    key={post.slug}
                    value={post.title}
                    onSelect={() =>
                      runCommand(() => router.push(`/posts/${post.slug}`))
                    }
                    className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-neutral-700 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:aria-selected:bg-neutral-800"
                  >
                    <FileText className="h-4 w-4 text-neutral-400" />
                    <span className="line-clamp-1">{post.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group
              heading="Actions"
              className="mb-2 px-2 text-xs font-medium tracking-wider text-neutral-400 uppercase"
            >
              {actions.map((action) => (
                <Command.Item
                  key={action.href}
                  value={`${action.name} ${action.keywords}`}
                  onSelect={() => runCommand(() => router.push(action.href))}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-neutral-700 aria-selected:bg-neutral-100 dark:text-neutral-300 dark:aria-selected:bg-neutral-800"
                >
                  <action.icon className="h-4 w-4 text-neutral-400" />
                  <span>{action.name}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2 text-xs text-neutral-400 dark:border-neutral-800">
            <span>Navigate with ↑↓ • Select with ↵</span>
            <span>ESC to close</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
