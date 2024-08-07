import { UserModel } from "../models/user.js";

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
