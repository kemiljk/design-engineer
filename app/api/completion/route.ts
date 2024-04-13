// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// // Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

// export async function POST(req: Request) {
//   // Extract the `prompt` from the body of the request
//   const { prompt } = await req.json();
//   const fullPrompt = `Create a detailed job specification for a role in ${prompt}. The specification should include responsibilities, required skills, and qualifications necessary for the job. The content should be clear, professional, and concise, providing valuable information for potential applicants. Do not try to be too creative and focus on providing a realistic job description that is finished, not an example of how to write one. Make sure this is specific to people working in digital product design and web/app engineering, not physical product design.`;

//   console.log(prompt, fullPrompt);

//   // Ask OpenAI for a streaming completion given the prompt
//   const response = await openai.completions.create({
//     model: "ft:davinci-002:personal::8yH5Pgbh",
//     max_tokens: 2048,
//     temperature: 0,
//     stream: true,
//     prompt: fullPrompt,
//   });

//   // // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);

//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

// Create Anthropic API client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { prompt } = await req.json();

  console.log(prompt);

  const fullPrompt =
    `As an AI assistant with knowledge of various industries and roles, please generate a comprehensive job specification for the position of ${prompt}. If a company name is provided, tailor the job specification to that company and include the company's values; otherwise, create a realistic hypothetical company. Include the following sections:\n\n1. Job Title: Clearly state the job title.\n\n2. Company Overview: Provide a brief description of the company, focusing on its digital product offerings and engineering culture.\n\n3. Role Summary: Summarize the primary purpose and key responsibilities of the role in 2-3 sentences.\n\n4. Key Responsibilities: List 6-8 detailed responsibilities the role will be expected to fulfill, focusing on tasks specific to digital product design and web/app engineering.\n\n5. Required Skills: Identify 8-10 essential skills necessary for success in the role, including technical skills, design principles, and relevant programming languages or frameworks.\n\n6. Qualifications:\n- Education: Specify the required level of education and any preferred fields of study.\n- Experience: Detail the minimum years of experience and any specific experience required in digital product design or web/app engineering.\n- Additional Qualifications: List any additional certifications, portfolios, or other qualifications that would make a candidate stand out.\n\n7. Performance Metrics: Describe 3-4 key performance indicators (KPIs) that will be used to measure success in the role.\n\n8. Salary Range: If a salary range is provided in the input, use that range. If not, provide a realistic salary range for the position based on industry standards and the level of experience required.\n\nPlease ensure the job specification is clear, concise, and tailored to the specific role within the context of digital product design and web/app engineering. The output should be a complete, realistic job description ready to be used for recruiting purposes, without any additional commentary.\n\nDo not include any references that you are a bot, such as "Please let me know if you would like me to modify or add any details to this draft job specification. I'm happy to refine it further to meet your needs." And do not imply you can refine the job specification further.`.trim();

  // Request the Anthropic API for the response based on the prompt
  const response = await anthropic.completions.create({
    prompt: `Human: ${fullPrompt}\n\nAssistant:`,
    model: "claude-2",
    stream: true,
    max_tokens_to_sample: 2048,
  });

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
