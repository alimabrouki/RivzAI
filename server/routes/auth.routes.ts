import { Router } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
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
        verified: user.verified,
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
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

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

    const now = new Date();
    if (user.lockUntil && user.lockUntil < now) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failed_login_attempts: 0,
          lockUntil: null,
        },
      });
    }
    if (user.lockUntil && user.lockUntil > now) {
      const remainingMs = user.lockUntil.getTime() - now.getTime();
      const remainingMinutes = Math.ceil(remainingMs / (1000 * 60));
      return res.status(429).json({
        message: `account is temporarily locked try again in ${remainingMinutes} minutes`,
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password!);

    const refreshedUser = await prisma.user.findUnique({
      where: { email },
    });

    const numberOfAttempts = refreshedUser!.failed_login_attempts! + 1;

    if (!validPassword) {
      if (numberOfAttempts >= 5) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lockUntil: new Date(Date.now() + 5 * 60 * 1000),
          },
        });

        return res.status(429).json({
          message: `too many failed attempts, try again later `,
        });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          failed_login_attempts: numberOfAttempts,
        },
      });
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failed_login_attempts: 0,
        lockUntil: null,
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
        verified: user.verified,
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
      return res.status(200).json({
        message: "If an account exists, a reset email has been sent",
      });
    }

    const now = new Date();

    if (
      user.next_reset_email_attempt_allowed_at &&
      now < user.next_reset_email_attempt_allowed_at
    ) {
      const remainingMs =
        user.next_reset_email_attempt_allowed_at.getTime() - now.getTime();
      const remainingMinutes = Math.ceil(remainingMs / (1000 * 60));
      return res.status(429).json({
        message: `"Please wait for ${remainingMinutes} minute(s) before requesting another reset email."`,
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

    const resetURL = `http://localhost:5173/auth/reset-password/${rawToken}`;

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

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        next_reset_email_attempt_allowed_at: expires,
      },
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

authRouter.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required." });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findUnique({
      where: {
        reset_token: tokenHash,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired password reset token.",
      });
    }

    const now = new Date();

    if (user.reset_token_expires && user.reset_token_expires < now) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          reset_token: null,
          reset_token_expires: null,
        },
      });

      return res.status(400).json({
        message: "Invalid or expired password reset token.",
      });
    }

    const newPasswordhashed = bcrypt.hashSync(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newPasswordhashed,
        reset_token: null,
        reset_token_expires: null,
      },
    });

    return res.status(200).json({
      message: "Password has been successfully reset.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      error: "An internal server error occurred.",
    });
  }
});

authRouter.post("/verify-email", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "No email provided",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(409).json({
        message: "Email id already verified",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const verifiedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        verified_token: verifiedToken,
        verified_token_expires: expires,
      },
    });

    const verifyURL = `http://localhost:5173/auth/verify-email/${rawToken}`;

    const resend = new Resend(`${process.env.RESEND_API_KEY}`);

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verify Email",
      html: `
    <a href="${verifyURL}">
      Verify Email
    </a>
  `,
    });

    return res.status(200).json({
      message: "Verification email is sent successfuly",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({
      error: "An internal server error occurred.",
    });
  }
});

authRouter.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const now = new Date();
    const user = await prisma.user.findFirst({
      where: {
        verified_token: tokenHash,
        verified_token_expires: {
          gt: now,
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token is invalid or expired",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        verified_token: null,
        verified_token_expires: null,
      },
    });

    return res.status(200).json({
      updatedUser: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        verified: updatedUser.verified,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({
      error: "An internal server error occurred.",
    });
  }
});

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

authRouter.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({
        error: "Invalid google token payload",
      });
    }

    let user = await prisma.user.findUnique({
      where: {
        email: payload?.email,
      },
    });

    if (user && payload.email_verified && !user.verified) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          verified: true,
        },
      });
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload.email,
          username: payload.name ?? "google user",
        },
      });
    }

    const appToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
    return res.status(201).json({
      success: true,
      appToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        verified: user.verified,
      },
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

export default authRouter;
