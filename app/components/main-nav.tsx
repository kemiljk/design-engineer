import React from "react";
import { Logo } from "./logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const MainNav: React.FC = async () => {
  const user = await currentUser();

  return (
    <nav className="fixed z-[999] w-full bg-white/5 px-4 py-2 backdrop-blur-md md:px-16 lg:px-24 dark:bg-black/5">
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
            <li>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/posts"
              >
                Posts
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    className={buttonVariants({ variant: "ghost" })}
                    href="/stats"
                  >
                    Stats
                  </Link>
                </li>
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
