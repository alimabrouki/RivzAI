import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
const messagesRouter = Router();

messagesRouter.get("/:id", async (req: Request, res: Response) => {
  const { chatId } = req.params;

  const messages = await prisma.message.findFirst({
    where: {
      id: Number(chatId),
    },
  });

  res.status(200).json(messages);
});

export default messagesRouter;
