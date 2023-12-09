"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(link: {
  index: number;
  title: string;
  href: string;
}): React.JSX.Element {
  const path = usePathname();

  return (
    <li key={link.index}>
      <Link
        className={
          buttonVariants({ variant: "ghost" }) +
          `${path == link.href && " !border !border-blue-500 !text-blue-500"}`
        }
        href={link.href}
      >
        {link.title}
      </Link>
    </li>
  );
}
