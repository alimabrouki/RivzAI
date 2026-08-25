import { Router } from "express";
import prisma from "../lib/prisma";
import type { Request, Response } from "express";
import { ai } from "../lib/gemini";
import type { Message } from "../../prisma/generated/client";

const chatsRouter = Router();

chatsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { newChatPrompt } = req.body;
    const chatTitlePrompt = `Generate a short 3-5 word title for this prompt: "${newChatPrompt}" i want it serious and describing the user message perfectly and make the user remember exactly what happened in this chat when he sees the card in the future make it serious and simple like chat gpt . Return ONLY the title.`;
    const aiGeneratedTitle = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: chatTitlePrompt,
      config: {
        temperature: 0.2,
        maxOutputTokens: 50,
      },
    });

    const chat = await prisma.chat.create({
      data: {
        title: aiGeneratedTitle
          ? aiGeneratedTitle.text
          : newChatPrompt.slice(0, 20),
        user: {
          connect: {
            id: userId,
          },
        },
        messages: {
          create: {
            role: "user",
            content: newChatPrompt,
            animated: false,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    // const aiResponse = await ai.models.generateContent({
    //   model: "gemini-3.1-flash-lite",
    //   contents: newChatPrompt,
    // });

    // if (!aiResponse.text) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "RivzAI is temporarily unvailable please try again in a moment",
    //   });
    // }

    // await prisma.message.create({
    //   data: {
    //     chatId: chat.id,
    //     content: aiResponse.text,
    //     role: "ai",
    //     animated: false,
    //   },
    // });

    res.status(201).json(chat);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

chatsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const chats = await prisma.chat.findMany({
      where: {
        userId,
      },
      include: {
        messages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(chats);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

chatsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid chat id",
      });
    }

    const chat = await prisma.chat.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found",
      });
    }

    res.status(200).json(chat);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

chatsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid chat id",
      });
    }

    const chat = await prisma.chat.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found",
      });
    }

    await prisma.chat.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Chat Deleted",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

function toGeminiHistory(messages: Message[]) {
  return messages.map((message) => ({
    role: message.role === "user" ? "user" : "model",
    parts: [{ text: message.content }],
  }));
}

chatsRouter.post("/:id/messages", async (req: Request, res: Response) => {
  try {
    const chatId = Number(req.params.id);

    if (Number.isNaN(chatId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid chat id",
      });
    }

    const { message } = req.body;

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: req.user?.id,
      },
    });
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found",
      });
    }

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        messages: {
          create: {
            content: message,
            role: "user",
            animated: false,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const history = toGeminiHistory(messages);

    let fullText = "";

    const stream = await ai.models.generateContentStream({
      model: "gemini-3.1-flash-lite",
      contents: history,
    });

    for await (const chunk of stream) {
      fullText += chunk.text;
      res.write(chunk.text);
    }

    await prisma.message.create({
      data: {
        chatId,
        content: fullText,
        role: "ai",
        animated: false,
      },
    });

    res.end();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

chatsRouter.post("/:id/generate", async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const chatId = Number(req.params.id);

    if (Number.isNaN(chatId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid chat id",
      });
    }

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
        messages: {
          some: {
            role: "user",
          },
          none: {
            role: "ai",
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
      return res.status(404).json({
        success: false,
        error: "Chat not found",
      });
    }

    const userMessage = chat.messages[0];

    if (!userMessage) {
      return res.status(400).json({
        success: false,
        error: "Chat has no user message",
      });
    }

    let fullText = "";
    const stream = await ai.models.generateContentStream({
      model: "gemini-3.1-flash-lite",
      contents: userMessage.content,
    });

    for await (const chunk of stream) {
      fullText += chunk.text;
      res.write(chunk.text);
    }

    await prisma.message.create({
      data: {
        chatId,
        content: fullText,
        role: "ai",
        animated: false,
      },
    });

    res.end();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
export default chatsRouter;
