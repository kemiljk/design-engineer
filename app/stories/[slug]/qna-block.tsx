"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@nextui-org/react";
import Markdown from "react-markdown";
import * as Type from "@/lib/types";

export const QnABlock = ({
  qna,
}: {
  qna: Type.Story["metadata"]["qna"]["metadata"]["qna"][0];
}) => {
  const questionRef = useRef<HTMLDivElement>(null);
  const [questionHeight, setQuestionHeight] = useState(0);

  useEffect(() => {
    if (questionRef.current) {
      setQuestionHeight(questionRef.current.offsetHeight);
    }
  }, []);

  return (
    <div key={qna.person.title} className="mt-6  w-full space-y-4">
      <div className="flex w-full items-start gap-4">
        <Avatar
          className="sticky shrink-0"
          style={{ top: questionHeight + 72 }}
          src={qna.person.metadata?.image.imgix_url}
          alt={qna.person.title}
          title={qna.person.title}
        />
        <Markdown
          key={qna.content}
          className="space-y-4 text-zinc-700 dark:text-zinc-300"
        >
          {qna.content}
        </Markdown>
      </div>
    </div>
  );
};
