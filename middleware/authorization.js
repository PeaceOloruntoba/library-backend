import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";
const { JsonWebTokenError } = pkg;
import { UserModel } from "../models/user.js";

export const userAuthorization = async (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split("Bearer ")[1];
    if (!token) return res.status(403).json({ error: "unauthorized access!" });
    const payload = jwt.verify(token, "secret");
    const user = await UserModel.findById(payload.id);
    if (!user) return res.status(403).json({ error: "unauthorized access!" });
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(403).json({ error: "unauthorized access!" });
    } else {
      res.status(500).json({ error: "Something went wrong!" });
    }
  }
};

export const adminAuthorization = (req, res, next) => {
  if (req.user && req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied! Admins only." });
  }
};
