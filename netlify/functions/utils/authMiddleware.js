import jwt from "jsonwebtoken";
import prisma from "../../../server/lib/prisma";

export async function authenticateAndValidateChat(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorized: No token provided", status: 401 };
    }

    const token = authHeader.split(" ")[1];

    let decodedUser;
    try {
      decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return { error: "Unauthorized: Invalid token", status: 401 };
    }
    const userId = decodedUser.id;
    const body = await request.json();
    const chatId = body.chatId ? Number(body.chatId) : null;
    if (chatId) {
      if (Number.isNaN(chatId)) {
        return { error: "Invalid chat id", status: 400 };
      }
    }

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: userId,
      },
    });

    if (!chat) {
      return { error: "Chat not found or unauthorized", status: 404 };
    }

    return { userId, body, success: true };
  } catch (error) {
    console.error("Auth helper error:", error);
    return {
      error: "Internal server Error during authentication",
      status: 500,
    };
  }
}
