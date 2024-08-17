import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import mongoose from "mongoose";

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    console.log(req?.body, file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = `${buf.toString("hex")}${path.extname(
          file.originalname
        )}`;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        console.log(fileInfo);
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

export default upload;
