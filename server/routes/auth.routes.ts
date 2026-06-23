import { Router } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

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
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return res.status(503).json({
      message: "Server Error",
    });
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "This Email Is Not Signed Up",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
    console.log(token, user);
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
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

authRouter.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "email is required." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "If an account exists, a reset email has been sent",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const resetToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        reset_token: resetToken,
        reset_token_expires: expires,
      },
    });
    const resetURL = `http://localhost:5173/auth/reset-password/${resetToken}`;

    const resend = new Resend(`${process.env.RESEND_API_KEY}`);

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Password Reset",
      html: `
    <a href="${resetURL}">
      Reset Password
    </a>
  `,
    });

    return res.status(200).json({
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("forgot password error:", error);
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
});

export default authRouter;
