const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")

router.post("/register", async(req,res)=>{

const {name,email,password} = req.body

const hashedPassword = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hashedPassword
})

await user.save()

res.json({message:"User registered"})

})

router.post("/login", async(req,res)=>{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user) return res.status(400).json("User not found")

const match = await bcrypt.compare(password,user.password)

if(!match) return res.status(400).json("Invalid password")

res.json({
userId:user._id,
name:user.name
})

})

module.exports = router