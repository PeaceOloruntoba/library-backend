import { Book, BookModelModel } from "../models/book.js";

export const createBook = async (req, res) => {
  const { name, description } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "Please upload a file." });
  }
  try {
    const oldBook = await BookModel.findOne({ name });
    if (oldBook)
      return res
        .status(403)
        .json({ error: "Book with this name already exists" });

    const book = await BookModel.create({
      name,
      description,
      file: file.path,
    });
    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ error: "Error creating the book" });
  }
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
      return res.status(404).json({ error: "No book with provided id" });
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
      return res.status(404).json({ error: "No book with provided id" });
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

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ error: "No book with provided id" });
    }
    await BookModel.deleteOne({ _id: id });
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the book" });
  }
};
