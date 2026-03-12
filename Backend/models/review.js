const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

  providerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Provider"
  },

  userName:{
    type:String
  },

  rating:{
    type:Number
  },

  comment:{
    type:String
  },

  date:{
    type:String
  }

});

module.exports = mongoose.model("Review",reviewSchema);