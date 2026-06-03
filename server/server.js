import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/auth.route";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth/user", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
