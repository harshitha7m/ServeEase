const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// GET all reviews for a specific provider
router.get("/provider/:providerId", async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new review
router.post("/", async (req, res) => {
  try {
    const { providerId, userName, rating, comment } = req.body;

    if (!providerId || !userName || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReview = new Review({
      providerId,
      userName,
      rating: Number(rating),
      comment,
      date: new Date().toISOString().split('T')[0] // formats as YYYY-MM-DD
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
