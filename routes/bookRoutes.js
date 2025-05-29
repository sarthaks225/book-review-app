const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks,
} = require("../controllers/bookController");
const { addReview } = require("../controllers/reviewController");

router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/", auth, addBook); // Only authenticated users can add books

router.post("/:id/reviews", auth, addReview); // Only authenticated users can add reviews to books

module.exports = router;
