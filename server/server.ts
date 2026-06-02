import express from "express";
import authRouter from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
