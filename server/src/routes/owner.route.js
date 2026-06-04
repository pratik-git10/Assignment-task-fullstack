import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import { getStores } from "../controllers/store.controller.js";
import { getDashboard } from "../controllers/owner.controller.js";

const ownerRouter = express.Router();

ownerRouter.get("/dashboard", auth, authorize("STORE_OWNER"), getDashboard);
export { ownerRouter };
