import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
const chatsRouter = Router();

chatsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { newPrompt } = req.body;

    const chat = await prisma.chat.create({
      data: {
        title: newPrompt.slice(0, 20),
        user: {
          connect: {
            id: userId,
          },
        },
        messages: {
          create: {
            role: "user",
            content: newPrompt,
            reaction: "",
            animated: false,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    res.status(201).json(chat);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return res.status(500).json({
      message: "Internal Server Error",
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
      message: "Internal Server Error",
    });
  }
});

chatsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chat = await prisma.chat.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        messages: true,
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

chatsRouter.post("/:id/messages", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    console.log(message);
    const chat = await prisma.chat.update({
      where: {
        id: Number(id),
      },
      data: {
        messages: {
          create: {
            content: message,
            role: "user",
            animated: false,
            reaction: "",
          },
        },
      },
      include: {
        messages: true,
      },
    });
    console.log(chat);
    res.status(201).json({
      success: true,
      data: chat.messages,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return res.status(500).json({
      success: false,
      error: "Chat not found",
    });
  }
});

export default chatsRouter;
