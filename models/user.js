import mongoose, {Schema} from "mongoose";

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

export const UserModel = mongoose.model("User", userSchema);
