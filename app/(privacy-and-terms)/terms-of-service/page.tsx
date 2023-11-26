import React from "react";
import { getTerms } from "@/lib/cosmic";
import Markdown from "react-markdown";

const TermsOfServicePage: React.FC = async () => {
  const terms = await getTerms();

  return (
    <article className="prose prose-gray dark:prose-invert">
      <h1>{terms.title}</h1>
      <Markdown>{terms.metadata.content}</Markdown>
    </article>
  );
};

export default TermsOfServicePage;
