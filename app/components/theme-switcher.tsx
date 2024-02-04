// app/components/ThemeSwitcher.tsx
"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { icon: <SunIcon className="size-4" />, value: "light", label: "Light" },
    { icon: <MoonIcon className="size-4" />, value: "dark", label: "Dark" },
  ];

  return (
    <Select
      size="sm"
      variant="faded"
      value={theme}
      placeholder={theme && theme?.charAt(0).toUpperCase() + theme?.slice(1)}
      items={themes}
      radius="lg"
      aria-label="Select theme"
      onChange={(e) => setTheme(e.target.value)}
    >
      {(theme) => (
        <SelectItem
          key={theme.value}
          value={theme.value}
          startContent={theme.icon}
        >
          {theme.label}
        </SelectItem>
      )}
    </Select>
  );
}
