const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Provider = require("../models/provider");

/* ---------------- CREATE BOOKING ---------------- */

router.post("/", async (req, res) => {
  try {

    const { providerId, userId, date, timeSlot } = req.body;

    const provider = await Provider.findById(providerId);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const booking = new Booking({
      providerId,
      userId,
      providerName: provider.name,
      service: provider.service,
      date,
      timeSlot,
      status: "upcoming",
    });

    await booking.save();

    res.json(booking);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* ---------------- GET BOOKINGS FOR USER ---------------- */

router.get("/:userId", async (req, res) => {
  try {

    const bookings = await Booking.find({
      userId: req.params.userId,
    });

    res.json(bookings);

  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- CANCEL BOOKING ---------------- */

router.put("/cancel/:id", async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);

  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- COMPLETE BOOKING ---------------- */

router.put("/complete/:id", async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    res.json(booking);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;