import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import historyRouter from "./routes/history.routes";
import userRouter from "./routes/user.routes";
import authMiddleware from "./middleware/authMiddleware";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authMiddleware, authRouter);

app.use("/users", userRouter);

app.use("/history", historyRouter);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
