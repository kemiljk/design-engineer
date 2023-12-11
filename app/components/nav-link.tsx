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

  return (
    <li key={link.index}>
      <Link
        className={
          buttonVariants({ variant: "ghost" }) +
          `${path == link.href && " !border !border-blue-500 !text-blue-500"} w-full md:w-max`
        }
        href={link.href}
        onClick={() => toggle()}
      >
        {link.title}
      </Link>
    </li>
  );
}
