import React from "react";
import Nav from "./nav";

const MainNav: React.FC = async () => {
  const links = [
    {
      index: 0,
      title: "Home",
      href: "/",
    },
    {
      index: 1,
      title: "About",
      href: "/about",
    },
    {
      index: 2,
      title: "Stories",
      href: "/stories",
    },
    {
      index: 3,
      title: "Posts",
      href: "/posts",
    },
    {
      index: 4,
      title: "Tools",
      href: "/tools",
    },
    {
      index: 5,
      title: "Hiring",
      href: "https://designengineer.io",
      target: "_blank",
    },
    {
      index: 6,
      title: "Resources",
      href: "/resources",
    },
  ];

  return <Nav links={links} />;
};

export default MainNav;
