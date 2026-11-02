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
  const { chatId, userPrompt } = body;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
        messages: {
          some: {
            role: "user",
          },
          none: {
            role: "model",
          },
        },
      },
      include: {
        messages: {
          where: {
            role: "user",
          },
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        },
      },
    });

    if (!chat) {
      return new Response(JSON.stringify({ error: "Chat is not found" }), {
        status: 404,
        headers: { "Content-type": "application/json" },
      });
    }

    const userPrompt = chat.messages[0];

    if (!userPrompt) {
      return new Response(
        JSON.stringify({ error: "Chat has no user message" }),
        {
          status: 404,
          headers: { "Content-type": "application/json" },
        },
      );
    }

    let fullText = "";

    const geminiStream = await gemini.models.generateContentStream({
      model: "gemini-3.5-flash-lite",
      contents: userPrompt.content,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of geminiStream) {
            const text = chunk.text;
            if (text) {
              fullText += text;
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();

          await prisma.message.create({
            data: {
              chatId,
              content: fullText,
              role: "model",
              animated: false,
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
