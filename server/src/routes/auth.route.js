import express from "express";
import {
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/reset-password", auth, resetPassword);
authRouter.post("/logout", logout);

export default authRouter;
