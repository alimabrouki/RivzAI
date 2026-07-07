import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
const chatsRouter = Router();

chatsRouter.post("/", async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { newPrompt } = req.body;

  const conversation = await prisma.conversation.create({
    data: {
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

  res.status(201).json({
    conversation,
  });
});

chatsRouter.get("/", async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const convos = await prisma.conversation.findMany({
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

  res.status(200).json(convos);
});

chatsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const chat = await prisma.conversation.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      messages: true,
    },
  });

  res.status(200).json(chat);
});

export default chatsRouter;
