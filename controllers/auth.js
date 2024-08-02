import { UserModel } from "../models/user.js";

export const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await UserModel.create({ email, password, name });
  res.json({ success: true, user });
};
