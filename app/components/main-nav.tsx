import React from "react";
import { Logo } from "./logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import NavLink from "./nav-link";

const MainNav: React.FC = async () => {
  const user = await currentUser();
  const links = [
    {
      index: 0,
      title: "Home",
      href: "/",
    },
    {
      index: 1,
      title: "About",
      href: "/about",
    },
    {
      index: 2,
      title: "Stories",
      href: "/stories",
    },
    {
      index: 3,
      title: "Posts",
      href: "/posts",
    },
  ];

  const protectedLinks = [
    {
      index: 0,
      title: "Stats",
      href: "/stats",
    },
  ];

  return (
    <nav className="fixed z-[999] w-full bg-white/5 px-4 py-2 backdrop-blur-md dark:bg-black/5 md:px-16 lg:px-24">
      <div
        className={cn(
          "flex h-10 w-full items-center justify-center",
          user && "justify-between",
        )}
      >
        <Link
          href="/"
          className="duration-250 rounded-full p-1 transition-all ease-in-out hover:cursor-default hover:bg-gray-100 hover:dark:bg-gray-800"
        >
          <Logo className="h-auto w-8 text-blue-500 dark:text-blue-300" />
        </Link>
        <>
          <div className="flex-1" />
          <ul className="flex items-center gap-4 text-sm">
            {links.map((link) => (
              <NavLink key={link.index} {...link} />
            ))}
            {user && (
              <>
                {protectedLinks.map((link) => (
                  <NavLink key={link.index} {...link} />
                ))}
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "hover:cursor-default hover:opacity-80",
                      userButtonPopoverActionButton:
                        "hover:cursor-default hover:opacity-80",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </>
            )}
          </ul>
        </>
      </div>
    </nav>
  );
};

export default MainNav;
