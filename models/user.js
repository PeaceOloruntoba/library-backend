import mongoose, { Schema } from "mongoose";
import { hash, compare, genSalt } from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter your full name."],
    },
    email: {
      unique: true,
      trim: true,
      type: String,
      required: [true, "Please enter your full name."],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timeStamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(16);
  this.password = await hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

export const UserModel = mongoose.model("User", userSchema);
