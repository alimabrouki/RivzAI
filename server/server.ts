import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import authMiddleware from "./middleware/authMiddleware";
import chatsRouter from "./routes/chats.routes";
import messagesRouter from "./routes/messages.routes";
const app = express();

const PORT = process.env.PORT || 8080;
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// adapt Express server to netlify function

app.use("/api/auth", authRouter);

app.use("/api/chats", authMiddleware, chatsRouter);

app.use("/api/messages", authMiddleware, messagesRouter);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
  });
}

export default app;
