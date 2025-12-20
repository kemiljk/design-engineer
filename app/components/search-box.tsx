"use client";

import { useState, useEffect, useTransition } from "react";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";

interface SearchProps {
  initialSearchTerm: string;
  page: string;
}

function Search({ initialSearchTerm, page }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== initialSearchTerm) {
        startTransition(() => {
          const params = new URLSearchParams();
          if (searchTerm) params.set("search", searchTerm);
          const query = params.toString();
          router.push(query ? `/${page}?${query}` : `/${page}`);
        });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, page, router, initialSearchTerm]);

  return (
    <Input
      type="text"
      radius="none"
      variant="bordered"
      placeholder={`Search ${page}...`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      classNames={{
        base: isPending ? "opacity-70 transition-opacity" : "transition-opacity",
        inputWrapper: "border-zinc-200 dark:border-zinc-800 data-[hover=true]:border-zinc-400 dark:data-[hover=true]:border-zinc-600 group-data-[focus=true]:border-swiss-red dark:group-data-[focus=true]:border-swiss-red bg-transparent",
        input: "text-foreground placeholder:text-zinc-400",
      }}
    />
  );
}

export default Search;
