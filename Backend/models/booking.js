const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

userId:String,
providerId:String,
serviceId:String,
date:String,
timeSlot:String,
status:String

})

module.exports = mongoose.model("Booking",bookingSchema)