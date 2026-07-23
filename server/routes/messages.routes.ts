import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
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
      error: "Internal Server Error",
    });
  }
});

export default messagesRouter;
