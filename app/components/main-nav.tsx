import React from "react";
import Nav from "./nav";
import { getPosts } from "@/lib/cosmic";

const MainNav: React.FC = async () => {
  const posts = await getPosts();

  const links = [
    {
      index: 0,
      title: "Home",
      href: "/",
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
    {
      index: 1,
      title: "About",
      href: "/about",
    },
  ];

  const simplifiedPosts = posts.slice(0, 10).map((post) => ({
    title: post.title,
    slug: post.slug,
  }));

  return <Nav links={links} posts={simplifiedPosts} />;
};

export default MainNav;
