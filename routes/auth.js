import { Router } from "express";
import { createUser, privateResponse, signin } from "../controllers/auth.js";
import { newUserValidator } from "../middleware/validator.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);
authRouter.get(
  "/private",
  (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split("Bearer ");
    console.log(token);
  },
  privateResponse
);

export default authRouter;
