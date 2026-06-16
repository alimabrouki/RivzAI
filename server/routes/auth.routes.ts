import { Router } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "This Email Already Signed Up",
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    return res.status(201).json(token);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return res.status(503).json({
      message: "Server Error",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "This Email Is Not Registered",
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    return res.status(201).json({
      message: "Login Successful",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
