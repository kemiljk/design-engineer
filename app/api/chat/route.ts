import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

// Create Anthropic API client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  console.log(messages);

  // Request the Anthropic API for the response based on the prompt
  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    stream: true,
    messages: messages,
    max_tokens: 1024,
    temperature: 1,
    top_k: 1,
    top_p: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
