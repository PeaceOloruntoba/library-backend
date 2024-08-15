import { Router } from "express";
import { createBook, deleteBook, fetchBook, fetchBooks, updateBook } from "../controllers/book";
import { adminAuthorization } from "../middleware/authorization";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const bookRouter = Router();

bookRouter.post("/book", adminAuthorization, upload.single("file"), createBook);
bookRouter.patch("/book", adminAuthorization, updateBook);
bookRouter.get("/book", fetchBooks);
bookRouter.get("/book", fetchBook);
bookRouter.delete("/book", deleteBook);

export default bookRouter;

