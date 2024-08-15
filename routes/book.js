import { Router } from "express";
import { fetchBook, fetchBooks } from "../controllers/book.js";

const bookRouter = Router();

bookRouter.get("/book", fetchBooks);
bookRouter.get("/book/:id", fetchBook);

export default bookRouter;
