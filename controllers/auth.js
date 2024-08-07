import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  const oldUser = await UserModel.findOne({ email });
  if (oldUser)
    return res
      .status(403)
      .json({ error: "Account with this email already exist" });
  const user = await UserModel.create({ email, password, name });
  res.json({ success: true, user });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found!" });
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return res.status(403).json({ error: "Email or Password is incorrect" });
  }
  const token = jwt.sign({ id: user._id.toString() }, "secret");
  res.json({ success: true, token });
};

export const privateResponse = async (req, res) => {
  res.json({ message: "Cool man you're in the private property" });
};

export const adminResponse = async (req, res) => {
  res.json({ message: "Cool man you're in the admin property" });
};
