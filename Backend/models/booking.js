const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  providerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Provider"
  },

  service:{
    type:String
  },

  date:{
    type:String
  },

  time:{
    type:String
  },

  status:{
    type:String,
    default:"upcoming"
  }

});

module.exports = mongoose.model("Booking",bookingSchema);