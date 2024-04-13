// "use client";

// import { Switch } from "@nextui-org/react";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { useTheme } from "next-themes";

// export function ThemeSwitcher() {
//   const { theme, setTheme } = useTheme();

//   const handleThemeChange = (value: boolean) => {
//     const newTheme = value ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   return (
//     <Switch
//       defaultSelected={localStorage.getItem("theme") === "light"}
//       size="sm"
//       color="primary"
//       startContent={<SunIcon />}
//       endContent={<MoonIcon />}
//       onValueChange={handleThemeChange}
//     />
//   );
// }
