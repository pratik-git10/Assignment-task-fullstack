import express from "express";
import {
  createStore,
  createUser,
  getStats,
  getStores,
  getUserDetails,
  getUsers,
} from "../controllers/admin.controller.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";

const adminRouter = express.Router();

adminRouter.use(auth, authorize("ADMIN"));

adminRouter.get("/dashboard", getStats);
adminRouter.get("/users", getUsers);
adminRouter.get("/users/:id", getUserDetails);

adminRouter.post("/users", createUser);

adminRouter.get("/stores", getStores);
adminRouter.post("/stores", createStore);

export default adminRouter;
