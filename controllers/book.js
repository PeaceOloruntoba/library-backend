import { Book, BookModelModel } from "../models/book.js";

export const createBook = async (req, res) => {
  const { name, description, file } = req.body;
  const oldBook = await BookModel.findOne({ name });
  if (oldBook)
    return res.status(403).json({ error: "Book with this name already exist" });
  const book = await BookModel.create({ name, description, file });
  res.json({ success: true, book });
};

export const fetchBooks = async (req, res) => {};

export const fetchBook = async (req, res) => {};

export const updateBook = async (req, res) => {};

export const deleteBook = async (req, res) => {};
