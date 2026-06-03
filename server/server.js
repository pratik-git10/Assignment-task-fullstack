import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./src/routes/auth.route.js";
import prisma from "./configs/prisma.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Store Rating API Running",
  });
});

// app.use("/api/admin", adminRouter);

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
