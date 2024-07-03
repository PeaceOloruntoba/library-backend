const express = require("express");
const db = require("./db"); // Using require to import the database module

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "This Library of Peace works fine",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
