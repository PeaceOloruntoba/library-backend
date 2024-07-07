// import {UserModel} from "../models/user.js";

export const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  await UserModel.create({ email, password, name });
  console.log(req?.body);
  res.json(req?.body);
};
