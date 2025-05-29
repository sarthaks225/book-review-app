const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const existing = await Review.findOne({
      user: req.user.userId,
      book: req.params.id,
    });

    if (existing) return res.status(400).json({ error: "Already reviewed" });
    const review = new Review({
      user: req.user.userId,
      book: req.params.id,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
