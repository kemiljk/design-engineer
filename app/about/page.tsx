import React from "react";
import { getAbout } from "@/lib/cosmic";
import Markdown from "react-markdown";
import { PageHeader } from "../components/page-header";

const AboutPage: React.FC = async () => {
  const about = await getAbout();

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="About"
        description="What is Design Engineer, and why does it exist?"
      />

      <div className="container mx-auto px-4 py-12">
        <article className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert prose-headings:font-bold prose-a:text-swiss-red">
          <Markdown>{about.metadata.content}</Markdown>
        </article>
      </div>
    </main>
  );
};

export default AboutPage;
