import React from "react";
import { Logo } from "./logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

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
        {user && (
          <>
            <div className="flex-1" />
            <ul className="flex items-center gap-4">
              <li className="text-sm">
                <Link
                  className={buttonVariants({ variant: "ghost" })}
                  href="/stats"
                >
                  Stats
                </Link>
              </li>
              <UserButton afterSignOutUrl="/" />
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
