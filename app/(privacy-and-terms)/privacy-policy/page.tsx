import { getPrivacy } from "@/lib/cosmic";
import React from "react";
import Markdown from "react-markdown";

const PrivacyPolicyPage: React.FC = async () => {
  const privacy = await getPrivacy();

  return (
    <article className="prose prose-gray dark:prose-invert">
      <h1>{privacy.title}</h1>
      <Markdown>{privacy.metadata.content}</Markdown>
    </article>
  );
};

export default PrivacyPolicyPage;
