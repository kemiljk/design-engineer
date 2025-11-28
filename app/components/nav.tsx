"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/navbar";
import { Logo } from "./logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { StyledButton as Button } from "./styled-button";
import { CommandPalette } from "./command-palette";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";

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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <NextLink href="/" prefetch={true}>
            <Logo className="size-8" />
          </NextLink>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent
        className="z-[9999999999] hidden gap-4 sm:flex"
        justify="center"
      >
        {links.map((item, index) =>
          item.target ? (
            <NavbarItem key={`${item.title}-${index}`}>
              <Link
                as="a"
                href={item.href}
                target={item.target}
                className="text-sm text-foreground transition-colors hover:text-foreground-600"
              >
                {item.title}
              </Link>
            </NavbarItem>
          ) : (
            <NavbarItem key={`${item.title}-${index}`}>
              <NextLink
                href={item.href}
                prefetch={true}
                className="text-sm text-foreground transition-colors hover:text-foreground-600"
              >
                {item.title}
              </NextLink>
            </NavbarItem>
          )
        )}

        <CommandPalette posts={posts} />

        <SignedOut>
          <Button as={Link} color="primary" variant="stylised" href="/sign-in">
            Sign in
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "hover:cursor-default hover:opacity-80",
                userButtonPopoverActionButton:
                  "hover:cursor-default hover:opacity-80",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
      </NavbarContent>
      <NavbarMenu>
        {links.map((item, index) =>
          item.target ? (
            <NavbarMenuItem key={`menu-${item.title}-${index}`}>
              <Link
                as="a"
                href={item.href}
                target={item.target}
                className="w-full text-lg text-foreground transition-colors hover:text-foreground-600"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem key={`menu-${item.title}-${index}`}>
              <NextLink
                href={item.href}
                prefetch={true}
                className="w-full text-lg text-foreground transition-colors hover:text-foreground-600"
              >
                {item.title}
              </NextLink>
            </NavbarMenuItem>
          )
        )}
        <SignedOut>
          <Button as={Link} color="primary" variant="stylised" href="/sign-in">
            Sign in
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "hover:cursor-default hover:opacity-80",
                userButtonPopoverActionButton:
                  "hover:cursor-default hover:opacity-80",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
      </NavbarMenu>
    </Navbar>
  );
}
