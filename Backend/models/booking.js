const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

providerId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Provider"
},

providerName:String,

service:String,

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

date:Date,

timeSlot:String,

status:{
type:String,
default:"upcoming"
}

})

module.exports = mongoose.model("Booking",bookingSchema)