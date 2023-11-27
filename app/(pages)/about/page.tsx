import React from "react";
import { getAbout } from "@/lib/cosmic";
import Markdown from "react-markdown";

const AboutPage: React.FC = async () => {
  const about = await getAbout();

  return (
    <article className="prose prose-gray dark:prose-invert">
      <h1>{about.title}</h1>
      <Markdown>{about.metadata.content}</Markdown>
    </article>
  );
};

export default AboutPage;
