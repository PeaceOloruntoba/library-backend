const { Schema } = require("mongoose");
const mongoose = require("mongoose");

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

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
