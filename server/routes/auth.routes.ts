import { Router } from "express";
import prisma from "../lib/prisma";
const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return res.status(503).json({
      message: "Server Error",
    });
  }
});

export default authRouter;
