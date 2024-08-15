import { Book, BookModelModel } from "../models/book.js";

export const createBook = async (req, res) => {
  const { name, description, file } = req.body;
  const oldBook = await BookModel.findOne({ name });
  if (oldBook)
    return res.status(403).json({ error: "Book with this name already exist" });
  const book = await BookModel.create({ name, description, file });
  res.json({ success: true, book });
};

export const fetchBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
};

export const fetchBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ error: "Error fetching the book" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, description, file } = req.body;
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    book.name = name || book.name;
    book.description = description || book.description;
    book.file = file || book.file;
    await book.save();
    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ error: "Error updating the book" });
  }
};

export const deleteBook = async (req, res) => {};
