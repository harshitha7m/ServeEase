const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

userId:String,
providerId:String,
service:String,
date:String,
status:String

})

module.exports = mongoose.model("Booking",bookingSchema)