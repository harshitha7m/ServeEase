const express = require("express")
const router = express.Router()

const Booking = require("../models/booking")

router.post("/", async(req,res)=>{

  try{

    const booking = new Booking(req.body)

    await booking.save()

    res.json({message:"Booking successful"})

  }catch(err){

    res.status(500).json(err)

  }

})

module.exports = router