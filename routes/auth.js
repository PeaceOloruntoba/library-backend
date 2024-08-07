import { Router } from "express";
import { createUser, privateResponse, signin } from "../controllers/auth.js";
import { newUserValidator } from "../middleware/validator.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);
authRouter.get(
  "/private",
  async (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split("Bearer ")[1];
    if (!token) return res.status(403).json({ error: "unauthorized access!" });
    const payload = jwt.verify(token, "secret");
    const user = await UserModel.findById(payload.id);
    if (!user) return res.status(403).json({ error: "unauthorized access!" });
    req.user = user;
    next();
  },
  privateResponse
);

export default authRouter;
