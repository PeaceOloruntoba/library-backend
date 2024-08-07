import { Router } from "express";
import { createUser, privateResponse, signin } from "../controllers/auth.js";
import { newUserValidator } from "../middleware/validator.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);
authRouter.get(
  "/private",
  (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split("Bearer ")[1];
    if (!token) return res.status(403).json({ error: "unauthorized access!" });
    const payload = jwt.verify(token, "secret");
    console.log(payload.id);
  },
  privateResponse
);

export default authRouter;
