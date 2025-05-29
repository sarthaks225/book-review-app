const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.put("/:id", auth, updateReview); // Only authenticated users can update reviews
router.delete("/:id", auth, deleteReview); // Only authenticated users can delete reviews

module.exports = router;
