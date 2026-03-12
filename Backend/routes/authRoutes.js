const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")

// REGISTER
router.post("/register", async (req,res)=>{

  try{

    const {name,email,password} = req.body

    const existingUser = await User.findOne({email})

    if(existingUser){
      return res.status(400).json({message:"User already exists"})
    }

    const user = new User({
      name,
      email,
      password
    })

    await user.save()

    res.json({message:"User registered successfully"})

  }catch(err){
    console.log(err)
    res.status(500).json({message:"Server error"})
  }

})


// LOGIN
router.post("/login", async (req,res)=>{

  const {email,password} = req.body

  const user = await User.findOne({email})

  if(!user || user.password !== password){
    return res.status(400).json({message:"Invalid credentials"})
  }

  const token = jwt.sign(
    { id:user._id },
    process.env.JWT_SECRET,
    { expiresIn:"1d" }
  )

  res.json({
    token,
    userId:user._id
  })

})

module.exports = router