import { BookModel } from "../models/book.js";

export const createBook = async (req, res) => {
  const { name, description, author } = req.body;
  const { file } = req.body;
  // console.log(req);
  // const file = req?.file;
  // console.log(file);
  if (!file) {
    return res.status(400).json({ error: "Please upload a file." });
  }
  try {
    const oldBook = await BookModel.findOne({ name });
    if (oldBook) {
      return res
        .status(403)
        .json({ error: "Book with this name/title already exists" });
    }
    const book = await BookModel.create({
      name,
      description,
      author,
      file: file.id,
    });
    res.json({ success: true, book });
  } catch (error) {
    console.error("Error creating book:", error.stack);
    res.status(500).json({ error: "Error creating the book" });
  }
};

export const fetchBooks = async (req, res) => {
  try {
    const books = await BookModel.find().populate("file");
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
};

export const fetchBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id).populate("file");
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
  const { name, description, author } = req.body;
  const file = req.file;
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ error: "No book with provided id" });
    }
    book.name = name || book.name;
    book.description = description || book.description;
    book.author = author || book.author;
    if (file) {
      book.file = file._id;
    }
    await book.save();
    res.json({ success: true, book });
  } catch (error) {
    console.error("Error updating book:", error.stack);
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
