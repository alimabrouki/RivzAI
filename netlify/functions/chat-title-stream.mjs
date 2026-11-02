import prisma from "../../server/lib/prisma";
import { gemini } from "../../server/lib/gemini";
import { authenticateAndValidateChat } from "./utils/authMiddleware";

export default async (request, context) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const authResult = await authenticateAndValidateChat(request);
  if (!authResult.success) {
    return new Response(JSON.stringify({ error: authResult.error }), {
      status: authResult.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { userId, body } = authResult;
  const { chatId } = body;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: Number(chatId),
        userId,
      },
      select: {
        messages: {
          where: { role: "user" },
          orderBy: { createdAt: "asc" },
          take: 1,
          select: { content: true },
        },
      },
    });

    const firstUserPrompt = chat?.messages[0]?.content;

    if (!firstUserPrompt) {
      return new Response("No user message found", {
        status: 404,
        headers: { "Content-type": "application/json" },
      });
    }

    const chatTitlePrompt = `You are a chat title generator. Summarize the user's message in 2 to 3 natural words.
        User message: "${firstUserPrompt}"
        Rules:
        - If the message is just a greeting (like "hello", "hi", "hey"), return "Greeting" or "Hello".
        - Write it in plain, conversational language (like ChatGPT or Gemini).
        - Do not make it dramatic, corporate, or overly formal.
        - No punctuation, no quotes. Return ONLY the title text.`;
    const generatedTitleStream = await gemini.models.generateContentStream({
      model: "gemini-3.5-flash-lite",
      contents: chatTitlePrompt,
      config: {
        temperature: 0.1,
        maxOutputTokens: 10,
      },
    });

    let fullTitle = "";

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of generatedTitleStream) {
            const text = chunk.text;
            if (text) {
              fullTitle += text;
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();

          await prisma.chat.update({
            where: {
              id: Number(chatId),
            },
            data: {
              title: fullTitle,
            },
          });
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-type": "application/json" },
    });
  }
};
