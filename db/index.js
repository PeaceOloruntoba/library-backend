import mongoose from "mongoose";

const uri =
  "mongodb+srv://peaceoloruntoba22:UVHqmrvl4q0ACtOx@cluster0.dzjss5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("Could not connect:", err?.message);
  });
