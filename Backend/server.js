require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const serviceRoutes = require("./routes/serviceRoutes")
const providerRoutes = require("./routes/providerRoutes")
const bookingRoutes = require("./routes/bookingRoutes")

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://local-service-provider-pvvo.onrender.com"
  ]
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"))

app.use("/api/auth",authRoutes)
app.use("/api/services",serviceRoutes)
app.use("/api/providers",providerRoutes)
app.use("/api/bookings",bookingRoutes)

app.listen(5000,()=>{
console.log("Server running on port 5000")
})