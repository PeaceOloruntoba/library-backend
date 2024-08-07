import { Router } from "express";
import { createUser } from "../controllers/auth.js";
import { newUserValidator } from "../middleware/validator.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);

export default authRouter;
