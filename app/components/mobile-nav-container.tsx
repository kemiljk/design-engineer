"use client";

import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import React from "react";

export const MobileNavContext = React.createContext({
  isOpen: false,
  toggle: () => {},
});

export const MobileNavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MobileNavContext.Provider value={{ isOpen, toggle }}>
      {children}
    </MobileNavContext.Provider>
  );
};

export const MobileNavButton = () => {
  const { isOpen, toggle } = React.useContext(MobileNavContext);

  return (
    <nav
      className={`fixed top-0 z-[999] flex w-full origin-top transform justify-end bg-white/5 px-4 py-2 backdrop-blur-md transition-transform duration-200 ease-in-out dark:bg-black/5 ${
        isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
      }`}
    >
      <Button
        variant="ghost"
        className={`${isOpen ? "hidden" : "flex"} z-[999]`}
        onClick={toggle}
      >
        <MenuIcon className="h-6 w-6 text-gray-500 hover:cursor-pointer dark:text-gray-400" />
      </Button>
    </nav>
  );
};

export const MobileNavContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isOpen, toggle } = React.useContext(MobileNavContext);

  return (
    <nav
      className={`fixed top-0 z-[999] flex h-screen w-full origin-top transform justify-end bg-white/5 p-4 backdrop-blur-md transition-transform duration-200 ease-in-out dark:bg-black/5 md:hidden ${
        isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
      }`}
    >
      <Button variant="ghost" className="fixed right-4 top-2" onClick={toggle}>
        <XIcon className="h-6 w-6 text-gray-500 hover:cursor-pointer dark:text-gray-400" />
      </Button>
      {children}
    </nav>
  );
};
