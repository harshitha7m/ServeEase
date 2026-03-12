const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

app.use("/api/services",require("./routes/serviceRoutes"))
app.use("/api/providers",require("./routes/providerRoutes"))
app.use("/api/bookings",require("./routes/bookingRoutes"))
app.use("/api/auth",require("./routes/authRoutes"))

app.listen(5000,()=>{
console.log("Server running on port 5000")
})