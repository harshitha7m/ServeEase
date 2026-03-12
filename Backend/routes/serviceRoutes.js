const express = require("express")
const router = express.Router()

const Service = require("../models/service")

// get all services

router.get("/", async(req,res)=>{

  try{

    const services = await Service.find()

    res.json(services)

  }catch(err){

    res.status(500).json(err)

  }

})

module.exports = router