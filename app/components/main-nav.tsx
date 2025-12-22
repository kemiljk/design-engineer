import React from "react";
import Nav from "./nav";
import { getRecentPostSlugs } from "@/lib/cosmic";

const MainNav: React.FC = async () => {
  const posts = await getRecentPostSlugs();

  const links = [
    { index: 0, title: "Home", href: "/" },
    { index: 1, title: "Design Engineering", href: "/design-engineering" },
    { index: 2, title: "Course", href: "/course" },
    { index: 3, title: "Posts", href: "/posts" },
    { index: 4, title: "Tools", href: "/tools" },
    {
      index: 5,
      title: "Hiring",
      href: "https://designengineer.io",
      target: "_blank",
    },
    { index: 6, title: "Resources", href: "/resources" },
    { index: 7, title: "About", href: "/about" },
  ];

  return <Nav links={links} posts={posts} />;
};

export default MainNav;
