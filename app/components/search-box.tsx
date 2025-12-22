"use client";

import { useState, useEffect, useTransition } from "react";
import { Input } from "@/app/components/ui";
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
      placeholder={`Search ${page}...`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={isPending ? "opacity-70" : ""}
    />
  );
}

export default Search;
