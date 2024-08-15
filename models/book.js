import mongoose, { Schema } from "mongoose";
import Grid from "gridfs-stream";

const bookSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter the name of the book."],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a brief description about the book."],
      unique: true,
    },
    file: {
      type: Schema.Types.ObjectId,
      ref: "uploads.files",
      required: [true, "Please upload the book's PDF file."],
    },
  },
  { timestamps: true }
);

export const BookModel = mongoose.model("Book", bookSchema);

const conn = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
