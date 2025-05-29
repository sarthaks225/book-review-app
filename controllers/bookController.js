const Book = require("../models/Book");
const Review = require("../models/Review");

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const query = {};
    if (author) query.author = new RegExp(author, "i");
    if (genre) query.genre = new RegExp(genre, "i");

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalReviews = await Review.countDocuments({ book: book._id });

    const reviews = await Review.find({ book: book._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const allReviews = await Review.find({ book: book._id });
    const averageRating =
      allReviews.reduce((acc, r) => acc + r.rating, 0) /
      (allReviews.length || 1);

    res.json({
      book,
      averageRating: Number(averageRating.toFixed(2)), // Round to 2 decimal places
      reviews,
      pagination: {
        totalReviews,
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit),
        perPage: limit,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { title, author } = req.query;
    const query = {};
    if (title) query.title = new RegExp(title, "i");
    if (author) query.author = new RegExp(author, "i");
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
