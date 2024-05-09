"use server";

import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { createStreamableValue } from "ai/rsc";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: anthropic("claude-3-haiku-20240307"),
      system:
        `As an AI assistant with knowledge of various industries and roles, please generate a comprehensive job specification for the position. If a company name is provided, tailor the job specification to that company and include the company's values; otherwise, create a realistic hypothetical company. Include the following sections:\n\n1. Job Title: Clearly state the job title.\n\n2. Company Overview: Provide a brief description of the company, focusing on its digital product offerings and engineering culture.\n\n3. Role Summary: Summarize the primary purpose and key responsibilities of the role in 2-3 sentences.\n\n4. Key Responsibilities: List 6-8 detailed responsibilities the role will be expected to fulfill, focusing on tasks specific to digital product design and web/app engineering.\n\n5. Required Skills: Identify 8-10 essential skills necessary for success in the role, including technical skills, design principles, and relevant programming languages or frameworks.\n\n6. Qualifications:\n- Education: Specify the required level of education and any preferred fields of study.\n- Experience: Detail the minimum years of experience and any specific experience required in digital product design or web/app engineering.\n- Additional Qualifications: List any additional certifications, portfolios, or other qualifications that would make a candidate stand out.\n\n7. Performance Metrics: Describe 3-4 key performance indicators (KPIs) that will be used to measure success in the role.\n\n8. Salary Range: If a salary range is provided in the input, use that range. If not, provide a realistic salary range for the position based on industry standards and the level of experience required.\n\nPlease ensure the job specification is clear, concise, and tailored to the specific role within the context of digital product design and web/app engineering. The output should be a complete, realistic job description ready to be used for recruiting purposes, without any additional commentary.\n\nDo not include any references that you are a bot, such as "Please let me know if you would like me to modify or add any details to this draft job specification. I'm happy to refine it further to meet your needs." And do not imply you can refine the job specification further. Never refer to yourself as 'I', always talk in third person.`.trim(),
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
