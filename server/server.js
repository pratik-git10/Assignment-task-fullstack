import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./src/routes/auth.route.js";
import prisma from "./configs/prisma.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth/user", authRouter);

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

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
