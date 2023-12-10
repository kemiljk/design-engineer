import { getAbout } from "@/lib/cosmic";
import React from "react";
import Markdown from "react-markdown";

const AboutPage: React.FC = async () => {
  const about = await getAbout();

  return (
    <article className="prose prose-gray dark:prose-invert">
      <h1 className="prose-h1:tracking-tight">{about.title}</h1>
      <Markdown>{about.metadata.content}</Markdown>
    </article>
  );
};

export default AboutPage;
