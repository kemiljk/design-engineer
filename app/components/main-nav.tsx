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
      title: "Jobs",
      href: "/jobs",
    },
    {
      index: 5,
      title: "Resources",
      href: "/resources",
    },
    {
      index: 6,
      title: "Updates",
      href: "/updates",
    },
  ];

  const protectedLinks = [
    {
      // index: 0,
      // title: "Stats",
      // href: "/stats",
    },
  ];

  return <Nav links={links} />;
};

export default MainNav;
