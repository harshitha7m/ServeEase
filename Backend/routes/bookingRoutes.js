const express = require("express")
const router = express.Router()

const Booking = require("../models/booking")

router.post("/", async(req,res)=>{

const booking = new Booking(req.body)

await booking.save()

res.json(booking)

})

router.get("/", async(req,res)=>{

const bookings = await Booking.find()

res.json(bookings)

})
router.put("/:id", async(req,res)=>{

const booking = await Booking.findByIdAndUpdate(
req.params.id,
{status:req.body.status},
{new:true}
)

res.json(booking)

})
router.get("/provider/:providerId", async (req,res)=>{

const bookings = await Booking.find({
providerId: req.params.providerId
}).populate("userId")

res.json(bookings)

})

module.exports = router