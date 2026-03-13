const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Provider = require("../models/provider");

/* ---------------- CREATE BOOKING ---------------- */

const mockProviders = [
  { _id: "1", name: "Rajesh Kumar", service: "Plumber" },
  { _id: "2", name: "Amit Sharma", service: "Electrician" },
  { _id: "3", name: "Priya Constructions", service: "Painter" },
  { _id: "4", name: "CoolTech Services", service: "AC Repair" },
  { _id: "5", name: "WoodCraft Studio", service: "Carpenter" },
  { _id: "6", name: "CleanHome Services", service: "Cleaning" },
  { _id: "7", name: "BugFree Pest Control", service: "Pest Control" },
  { _id: "8", name: "ApplianceFix Experts", service: "Appliance Repair" },
  { _id: "9", name: "Spark Electricals", service: "Electrician" },
  { _id: "10", name: "PipeFix Plumbing", service: "Plumber" },
];

router.post("/", async (req, res) => {
  try {

    const { providerId, userId, date, timeSlot } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User not logged in" });
    }

    const mongoose = require("mongoose");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    
    let providerName = "";
    let providerService = "";

    if (mongoose.Types.ObjectId.isValid(providerId)) {
        const provider = await Provider.findById(providerId);
        if (provider) {
            providerName = provider.name;
            providerService = provider.service;
        }
    } 
    
    if (!providerName) {
        // Fallback to mock providers
        const mockProvider = mockProviders.find(p => p._id === String(providerId));
        if (mockProvider) {
            providerName = mockProvider.name;
            providerService = mockProvider.service;
        } else {
            return res.status(404).json({ message: "Provider not found" });
        }
    }

    const booking = new Booking({
      providerId: providerId,
      userId: new mongoose.Types.ObjectId(userId),
      providerName: providerName,
      service: providerService,
      date: new Date(date),
      timeSlot,
      status: "upcoming"
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