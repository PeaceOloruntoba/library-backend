import { Router } from "express";
import { createBook, deleteBook, updateBook } from "../controllers/book.js";
import upload from "../middleware/fileUploadValidator.js";

const adminRoute = Router();

adminRoute.post("/book", upload.single("file"), createBook);
adminRoute.patch("/book/:id", upload.single("file"), updateBook);
adminRoute.delete("/book/:id", deleteBook);

export default adminRoute;
