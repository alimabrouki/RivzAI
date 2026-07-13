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
        messages: true,
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

chatsRouter.post("/:id/messages", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid chat id",
      });
    }

    const { message } = req.body;

    const chat = await prisma.chat.update({
      where: {
        id,
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
      error: "Internal Server Error",
    });
  }
});

export default chatsRouter;
