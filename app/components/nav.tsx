"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import { Logo } from "./logo";
import { SignedIn, UserButton } from "@clerk/nextjs";
// import { ThemeSwitcher } from "./theme-switcher";
import { usePathname } from "next/navigation";

export default function Nav({
  links,
  protectedLinks,
}: {
  links: { index: number; title: string; href: string }[];
  protectedLinks: { index: number; title: string; href: string }[];
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

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {links.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === item.href ? true : false}
          >
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
        <SignedIn>
          <>
            {protectedLinks.map((item, index) => (
              <NavbarItem
                key={`${item}-${index}`}
                isActive={pathname === item.href ? true : false}
              >
                <Link
                  isBlock
                  color={pathname === item.href ? "primary" : "foreground"}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </NavbarItem>
            ))}
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
          </>
        </SignedIn>
        {/* <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem> */}
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
        <SignedIn>
          <>
            {protectedLinks.map((item, index) => (
              <NavbarMenuItem
                key={`${item}-${index}`}
                isActive={pathname === item.href ? true : false}
              >
                <Link
                  isBlock
                  color={pathname === item.href ? "primary" : "foreground"}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </NavbarMenuItem>
            ))}
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
          </>
        </SignedIn>
        {/* <NavbarMenuItem>
          <ThemeSwitcher />
        </NavbarMenuItem> */}
      </NavbarMenu>
    </Navbar>
  );
}
