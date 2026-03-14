const express = require("express")
const router = express.Router()

const Provider = require("../models/provider")

// 1️⃣ Get providers by service
router.get("/service/:service", async (req, res) => {
  try {
    const service = decodeURIComponent(req.params.service)
    const serviceRegex = new RegExp('^' + service + '$', 'i')

    const providers = await Provider.find({ service: serviceRegex })

    res.json(providers)
  } catch (err) {
    res.status(500).json(err)
  }
})


const mockProviders = [
  { _id: "1", name: "Rajesh Kumar", service: "Plumber", location: "Koramangala, Bangalore", phone: "+91 98765 43210", description: "15 years of experience in residential plumbing. Specializes in leak detection, pipe fitting, and bathroom renovations.", verified: true },
  { _id: "2", name: "Amit Sharma", service: "Electrician", location: "Indiranagar, Bangalore", phone: "+91 98765 43211", description: "Licensed electrician handling wiring, switchboard installation, and electrical safety inspections.", verified: true },
  { _id: "3", name: "Priya Constructions", service: "Painter", location: "HSR Layout, Bangalore", phone: "+91 98765 43212", description: "Interior and exterior painting services using premium paints with clean finishing.", verified: false },
  { _id: "4", name: "CoolTech Services", service: "AC Repair", location: "Whitefield, Bangalore", phone: "+91 98765 43213", description: "AC installation, repair and maintenance for all major brands with same-day service.", verified: true },
  { _id: "5", name: "WoodCraft Studio", service: "Carpenter", location: "Jayanagar, Bangalore", phone: "+91 98765 43214", description: "Custom furniture, modular kitchen installation, and wood repair work.", verified: true },
  { _id: "6", name: "CleanHome Services", service: "Cleaning", location: "BTM Layout, Bangalore", phone: "+91 98765 43215", description: "Deep cleaning, bathroom cleaning, and home maintenance services.", verified: false },
  { _id: "7", name: "BugFree Pest Control", service: "Pest Control", location: "Marathahalli, Bangalore", phone: "+91 98765 43216", description: "Safe pest removal services for homes and offices using eco-friendly solutions.", verified: true },
  { _id: "8", name: "ApplianceFix Experts", service: "Appliance Repair", location: "Electronic City, Bangalore", phone: "+91 98765 43217", description: "Repair services for washing machines, refrigerators, microwaves and other appliances.", verified: true },
  { _id: "9", name: "Spark Electricals", service: "Electrician", location: "Malleshwaram, Bangalore", phone: "+91 98765 43218", description: "Electrical troubleshooting, wiring installation and lighting setup.", verified: true },
  { _id: "10", name: "PipeFix Plumbing", service: "Plumber", location: "Yelahanka, Bangalore", phone: "+91 98765 43219", description: "Emergency plumbing services including pipe leaks, tank installation and drain cleaning.", verified: true },
];

// 2️⃣ Get provider by ID (for details page)
router.get("/:providerId", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const { providerId } = req.params;
    let provider = null;

    if (mongoose.Types.ObjectId.isValid(providerId)) {
      provider = await Provider.findById(providerId);
    }

    if (!provider) {
        provider = mockProviders.find(p => p._id === String(providerId));
    }

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" })
    }

    res.json(provider)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router