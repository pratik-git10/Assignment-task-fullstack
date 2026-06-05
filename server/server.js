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

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: "UP", database: "CONNECTED" });
  } catch (error) {
    res.status(500).json({ status: "DOWN", error: error.message });
  }
});

app.use("/api/auth", authRouter);

app.use("/api/admin", adminRouter);

app.use("/api/stores", storeRouter);

app.use("/api/ratings", ratingRouter);

app.use("/api/owner", ownerRouter);

export default app;
