const mongoose = require("mongoose")

const providerSchema = new mongoose.Schema({

name:String,
serviceId:String,
service:String,
location:String,
rating:Number,
experience:Number,
description:String

})

module.exports = mongoose.model("Provider",providerSchema)