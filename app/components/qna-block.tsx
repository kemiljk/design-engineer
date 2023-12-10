"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Markdown from "react-markdown";
import * as Type from "@/lib/types";

export const QnABlock = ({
  story,
  metadata,
  qna,
}: {
  story: Type.Story;
  metadata: any;
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
    <div key={qna.question} className="mt-6 space-y-4">
      <div
        ref={questionRef}
        className="sticky top-14 flex h-max items-center gap-4 bg-white py-2 dark:bg-black"
      >
        <Avatar className="bg-zinc-100 dark:bg-zinc-800">
          <AvatarImage src={metadata.logo.imgix_url}></AvatarImage>
        </Avatar>
        <h3 className="text-lg font-medium leading-snug text-black dark:text-white md:text-xl ">
          {qna.question}
        </h3>
      </div>

      <div className="flex items-start gap-4">
        <Avatar className="sticky" style={{ top: questionHeight + 56 }}>
          <AvatarImage
            src={story.metadata.design_engineer.metadata.image.imgix_url}
          ></AvatarImage>
        </Avatar>
        <Markdown
          key={qna.question}
          className="space-y-4 text-zinc-700 dark:text-zinc-300"
        >
          {qna.answer}
        </Markdown>
      </div>
    </div>
  );
};
