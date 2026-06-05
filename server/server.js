import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import prisma from "./configs/prisma.js";

import authRouter from "./src/routes/auth.route.js";
import adminRouter from "./src/routes/admin.route.js";
import { storeRouter } from "./src/routes/store.route.js";
import { ratingRouter } from "./src/routes/rating.route.js";
import { ownerRouter } from "./src/routes/owner.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "https://assignment-task-fullstack.vercel.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Store Rating API Running",
  });
});

app.use("/api/auth", authRouter);

app.use("/api/admin", adminRouter);

app.use("/api/stores", storeRouter);

app.use("/api/ratings", ratingRouter);

app.use("/api/owner", ownerRouter);

async function startServer() {
  try {
    await prisma.$connect();

    console.log("Database Connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();

export default app;
