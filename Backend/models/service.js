const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({

name:String,
icon:String

})

module.exports = mongoose.model("Service",serviceSchema)