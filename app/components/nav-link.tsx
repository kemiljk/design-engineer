"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink(link: {
  index: number;
  title: string;
  href: string;
}): React.JSX.Element {
  const path = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <li key={link.index}>
      <Link
        className={
          buttonVariants({ variant: "ghost" }) +
          `${path == link.href && " !border !border-blue-500 !text-blue-500"}`
        }
        href={link.href}
        onClick={() => setIsOpen(false)}
      >
        {link.title}
      </Link>
    </li>
  );
}
