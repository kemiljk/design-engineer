import React from "react";
import Nav from "./nav";
import { getRecentPostSlugs } from "@/lib/cosmic";

const MainNav: React.FC = async () => {
  const posts = await getRecentPostSlugs();

  const links = [
    { index: 0, title: "Home", href: "/" },
    { index: 1, title: "Design Engineering", href: "/design-engineering" },
    { index: 2, title: "Course", href: "/course" },
    { index: 3, title: "Tools", href: "/tools" },
    { index: 4, title: "Posts", href: "/posts" },
    { index: 5, title: "Resources", href: "/resources" },
  ];

  return <Nav links={links} posts={posts} />;
};

export default MainNav;
