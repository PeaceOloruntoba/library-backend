import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("Could not connect:", err?.message);
  });
