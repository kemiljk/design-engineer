"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

interface SearchProps {
  initialSearchTerm: string;
  page: string;
}

function Search({ initialSearchTerm, page }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchTerm(search);
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("search", search);
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <Input
      type="text"
      placeholder={`Search ${page}...`}
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default Search;
