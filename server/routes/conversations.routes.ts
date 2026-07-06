import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
const conversationsRouter = Router();

conversationsRouter.post("/", async (req: Request, res: Response) => {
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
  });

  res.status(201).json({
    conversation,
  });
});

export default conversationsRouter;
