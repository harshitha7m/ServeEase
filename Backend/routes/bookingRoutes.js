const express = require("express")
const router = express.Router()

const Booking = require("../models/Booking")

router.post("/", async(req,res)=>{

const booking = new Booking(req.body)

await booking.save()

res.json({message:"Booking created"})

})

router.get("/:userId", async(req,res)=>{

const bookings = await Booking.find({
userId:req.params.userId
})

res.json(bookings)

})

module.exports = router