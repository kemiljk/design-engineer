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
import { Link } from "@nextui-org/link";
import { Logo } from "./logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { StyledButton as Button } from "./styled-button";

export default function Nav({
  links,
}: {
  links: {
    index: number;
    title: string;
    href: string;
    target?: string;
  }[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Logo className="size-8" />
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
        {links.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === item.href ? true : false}
          >
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
              target={item.target}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
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
        {links.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            isActive={pathname === item.href ? true : false}
          >
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
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
