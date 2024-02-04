import React from "react";
import { Logo } from "./logo";
import { Link } from "@nextui-org/react";
import { UserButton, currentUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";

const MainNav: React.FC = async () => {
  const user = await currentUser();

  return (
    <nav className="fixed z-[999] w-full bg-white/5 px-4 py-2 backdrop-blur-md dark:bg-black/5 md:px-16 lg:px-24">
      <div
        className={cn(
          "flex h-10 w-full items-center justify-center",
          user && "justify-between",
        )}
      >
        <Link href="/">
          <Logo className="h-auto w-8 text-blue-500 dark:text-blue-300" />
        </Link>
        <>
          <div className="flex-1" />
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <Link isBlock color="foreground" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link isBlock color="foreground" href="/posts">
                Posts
              </Link>
            </li>
            <li>
              <Link isBlock color="foreground" href="/jobs">
                Jobs
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link isBlock color="foreground" href="/stats">
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
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </>
      </div>
    </nav>
  );
};

export default MainNav;
