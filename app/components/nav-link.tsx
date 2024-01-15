"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MobileNavContext } from "./mobile-nav-container";

export default function NavLink(link: {
  index: number;
  title: string;
  href: string;
}): React.JSX.Element {
  const path = usePathname();
  const { isOpen, toggle } = React.useContext(MobileNavContext);

  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (link.href === "/") {
      setIsActive(path === link.href);
    } else {
      setIsActive(
        path === link.href || window.location.href.includes(link.href),
      );
    }
  }, [path, link.href]);

  return (
    <li key={link.index} className="w-full md:w-max">
      <Link
        className={
          buttonVariants({ variant: "ghost" }) +
          `${
            isActive &&
            " !border !border-blue-500 !bg-blue-50/50 !text-blue-500 dark:!bg-blue-950"
          } w-full md:w-max`
        }
        href={link.href}
        onClick={() => toggle()}
      >
        {link.title}
      </Link>
    </li>
  );
}
