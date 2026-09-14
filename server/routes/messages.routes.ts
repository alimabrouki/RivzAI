import { Router } from "express";
import prisma from "../lib/prisma";
import type { Request, Response } from "express";
import type { Message } from "../../prisma/generated/client";
import { ai } from "../lib/gemini";
const messagesRouter = Router();

messagesRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid message id",
      });
    }
    const { newContent, animated, reaction } = req.body;
    const reactionType = await prisma.message.findUnique({
      where: {
        id,
      },
      select: {
        reaction: true,
      },
    });

    const newMessage = await prisma.message.update({
      where: {
        id,
      },
      data: {
        content: newContent,
        animated: animated,
        reaction: reaction === reactionType?.reaction ? null : reaction,
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "Failed to update message",
    });
  }
});

function toGeminiHistory(messages: Message[]) {
  return messages.map((message) => ({
    role: message.role === "user" ? "user" : "model",
    parts: [{ text: message.content }],
  }));
}

messagesRouter.post("/:id", async (req: Request, res: Response) => {
  try {
    const msgId = Number(req.params.id);

    const { chatId } = req.body;

    if (!msgId) {
      return res.status(404).json({
        message: "message not found",
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    let fullModelResponse = "";

    const history = toGeminiHistory(messages);

    const stream = await ai.models.generateContentStream({
      model: "gemini-3.1-flash-lite",
      contents: history,
    });

    for await (const chunk of stream) {
      fullModelResponse += chunk.text;
      res.write(chunk.text);
    }

    await prisma.message.upsert({
      create: {
        content: fullModelResponse,
        role: "ai",
        animated: false,
        reaction: null,
        chatId: chatId,
      },
      update: {
        content: fullModelResponse,
      },
      where: {
        id: msgId,
      },
    });

    res.end();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "failed to update response",
    });
  }
});

export default messagesRouter;
