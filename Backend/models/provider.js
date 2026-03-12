const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  service:{
    type:String,
    required:true
  },

  location:{
    type:String
  },

  phone:{
    type:String
  },

  description:{
    type:String
  },

  verified:{
    type:Boolean,
    default:false
  }

});

module.exports = mongoose.model("Provider",providerSchema);