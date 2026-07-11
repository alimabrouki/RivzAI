import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import authMiddleware from "./middleware/authMiddleware";
import chatsRouter from "./routes/chats.routes";
import messagesRouter from "./routes/messages.routes";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRouter);

app.use("/users", authMiddleware, userRouter);

app.use("/chats", authMiddleware, chatsRouter);

app.use("/messages", authMiddleware, messagesRouter);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
