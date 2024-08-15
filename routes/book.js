import { Router } from "express";
import {
  createBook,
  deleteBook,
  fetchBook,
  fetchBooks,
  updateBook,
} from "../controllers/book";
import {
  adminAuthorization,
  userAuthorization,
} from "../middleware/authorization";
import upload from "../middleware/fileUploadValidator";

const bookRouter = Router();
bookRouter.post(
  "/book",
  adminAuthorization,
  userAuthorization,
  upload.single("file"),
  createBook
);
bookRouter.patch(
  "/book/:id",
  adminAuthorization,
  userAuthorization,
  upload.single("file"),
  updateBook
);
bookRouter.delete(
  "/book/:id",
  adminAuthorization,
  userAuthorization,
  deleteBook
);
bookRouter.get("/book", fetchBooks);
bookRouter.get("/book/:id", fetchBook);

export default bookRouter;
