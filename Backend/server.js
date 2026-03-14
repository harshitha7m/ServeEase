const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

// Allow requests from your Vercel frontend
app.use(cors({
  origin: ["https://serve-ease-eosin.vercel.app", "https://serve-ease-kwdejnl7g-harshitha7m-5736s-projects.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* ---------------- DATABASE ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* ---------------- ROUTES ---------------- */

app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/providers", require("./routes/providerRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

/* ---------------- TEST ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("Local Service Provider API Running");
});

/* ---------------- SERVER ---------------- */

// Render provides its own port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});