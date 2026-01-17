import React from "react";
import { getAbout } from "@/lib/cosmic";
import Markdown from "react-markdown";
import { PageHeader } from "../components/page-header";

const AboutPage: React.FC = async () => {
  const about = await getAbout();

  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="About"
        description="What is Design Engineer, and why does it exist?"
      />

      <div className="container-readable py-12">
        <article className="prose prose-neutral dark:prose-invert prose-headings:font-bold prose-a:text-swiss-red">
          <Markdown>{about.metadata.content}</Markdown>
        </article>
      </div>
    </main>
  );
};

export default AboutPage;
