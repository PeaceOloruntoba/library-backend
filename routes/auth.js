import { Router } from "express";
import {
  adminResponse,
  createUser,
  privateResponse,
  signin,
} from "../controllers/auth.js";
import { newUserValidator } from "../middleware/validator.js";
import {
  adminAuthorization,
  userAuthorization,
} from "../middleware/authorization.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);

export default authRouter;
