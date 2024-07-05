import express from "express";
import "./db/index.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    message: "This Library of Peace works fine",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
