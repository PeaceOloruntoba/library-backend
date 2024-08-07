import { Router } from "express";
import { createUser, privateResponse, signin } from "../controllers/auth.js";
import { newUserValidator } from "../middleware/validator.js";
import jwt from "jsonwebtoken";
import { authorizATion } from "../middleware/authorization.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);
authRouter.get(
  "/private", authorizATion,
  privateResponse
);

export default authRouter;
