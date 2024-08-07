import { Router } from "express";
import { createUser, privateResponse, signin } from "../controllers/auth.js";
import { newUserValidator } from "../middleware/validator.js";
import { authorizATion } from "../middleware/authorization.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);
authRouter.get("/private", authorizATion, privateResponse);
authRouter.get("/admin", authorizATion, adminAuthorization, adminResponse);

export default authRouter;
