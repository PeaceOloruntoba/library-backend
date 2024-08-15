import express from "express";
import "./db/index.js";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/book.js";
import adminRoute from "./routes/adminRoute.js";
import {
  adminAuthorization,
  userAuthorization,
} from "./middleware/authorization.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/", bookRouter);
app.use("/admin", userAuthorization, adminAuthorization, adminRoute);

app.get("/", (req, res) => {
  res.json({
    message: "This Library of Peace works fine",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
