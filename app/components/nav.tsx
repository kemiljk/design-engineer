"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
} from "@heroui/navbar";
import { Logo } from "./logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { StyledButton as Button } from "./styled-button";
import NextLink from "next/link";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CommandPalette = dynamic(
  () => import("./command-palette").then((m) => m.CommandPalette),
  {
    ssr: false,
    loading: () => (
      <div className="hidden h-9 w-28 animate-pulse items-center gap-2 bg-zinc-100 dark:bg-zinc-800 md:flex" />
    ),
  },
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      classNames={{
        base: "border-b border-foreground/10 bg-background/80 backdrop-blur-md",
        wrapper: "px-4 md:px-8",
        item: "data-[active=true]:text-swiss-red",
        menu: "bg-white dark:bg-black",
        menuItem: "data-[active=true]:text-swiss-red",
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <NextLink href="/" prefetch={true} className="text-foreground">
            <Logo className="size-8 text-foreground" />
          </NextLink>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden gap-8 sm:flex" justify="center">
        {links.map((item, index) =>
          isExternalLink(item.href) ? (
            <NavbarItem key={`${item.title}-${index}`}>
              <Link
                as="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-widest text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                {item.title}
              </Link>
            </NavbarItem>
          ) : (
            <NavbarItem key={`${item.title}-${index}`} isActive={isActive(item.href)}>
              <NextLink
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
            </NavbarItem>
          ),
        )}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <CommandPalette posts={posts} />

        <SignedOut>
          <Button
            as={Link}
            color="primary"
            variant="stylised"
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
      </NavbarContent>

      <NavbarMenu className="pt-8">
        {links.map((item, index) =>
          isExternalLink(item.href) ? (
            <NavbarMenuItem key={`menu-${item.title}-${index}`}>
              <Link
                as="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-2xl font-medium uppercase tracking-tight text-foreground hover:text-black dark:hover:text-white"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem key={`menu-${item.title}-${index}`} isActive={isActive(item.href)}>
              <NextLink
                href={item.href}
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "w-full text-2xl font-medium uppercase tracking-tight hover:text-black dark:hover:text-white",
                  isActive(item.href)
                    ? "text-swiss-red"
                    : "text-foreground"
                )}
              >
                {item.title}
              </NextLink>
            </NavbarMenuItem>
          ),
        )}
        <div className="mt-8">
          <SignedOut>
            <Button
              as={Link}
              color="primary"
              variant="stylised"
              href="/sign-in"
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-center"
            >
              Sign in
            </Button>
          </SignedOut>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
