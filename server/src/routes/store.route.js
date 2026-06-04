import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import { getStores } from "../controllers/store.controller.js";

const storeRouter = express.Router();

storeRouter.get("/", auth, authorize("USER"), getStores);

export { storeRouter };
