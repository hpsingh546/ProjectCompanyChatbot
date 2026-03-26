import Groq from "groq-sdk";
import readline from "node:readline/promises";
import { vectorStore } from "./prepare.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  while (true) {
    const ques = await rl.question("You:");

    if (ques == "bye") break;
    //retrival
    const relevantChunks = await vectorStore.similaritySearch(ques, 3);
    const context = relevantChunks
      .map((chunk) => chunk.pageContent)
      .join("\n\n");
    console.log("Context=>", context);
    console.log(context);
    const SYSTEM_PROMPT = `You are an assistant for question-answering tasks. Use the following relevant pieces of retrieved context to answer the question If you don't know the answer, say I don't know.`;
    const User_Prompt = `Question:${ques}
     Context:${context}
    Answer:`;
    const chatCompletion = await groq.chat.completions.create({
      temperature: 0,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: User_Prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
    });
    // Print the completion returned by the LLM.
    console.log("Assistant=>", chatCompletion.choices[0]?.message?.content);
  }
}
main();
