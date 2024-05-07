import { getPrompts, getSpecs } from "@/lib/cosmic";
import { Prompt, Spec } from "@/lib/types";

export const checkSpecs = async ({ checkString }: { checkString: string }) => {
  const prompts: Prompt[] = await getPrompts();
  console.log("Prompts:", prompts);

  const prompt = prompts.find((prompt: Prompt) => prompt.title === checkString);
  console.log("Checking prompts:", prompt || "No prompt found");

  if (prompt) {
    const completions: Spec[] = await getSpecs();
    console.log("Completions:", completions);

    const matchingCompletion = completions.find((completion: Spec) => {
      console.log("Checking completion:", completion);
      return completion.title.includes(prompt.title);
    });

    if (matchingCompletion) {
      console.log("Matching completion found:", matchingCompletion);
      return matchingCompletion;
    }
  } else {
    console.log("Input not found in prompts:", checkString);
  }
};
