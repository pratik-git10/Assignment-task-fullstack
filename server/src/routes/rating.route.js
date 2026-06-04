import express from "express";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import {
  submitRating,
  updateRating,
} from "../controllers/rating.controller.js";

const ratingRouter = express.Router();

ratingRouter.post("/", auth, authorize("USER"), submitRating);

ratingRouter.put("/:storeId", auth, authorize("USER"), updateRating);

export { ratingRouter };
