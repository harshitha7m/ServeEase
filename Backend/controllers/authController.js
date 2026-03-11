const User = require("../models/user")
const Provider = require("../models/provider")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
exports.register = async (req,res)=>{

try{

const {name,email,password,role} = req.body

const hashedPassword = await bcrypt.hash(password,10)

const user = await User.create({
name,
email,
password: hashedPassword,
role
})

if(role === "provider"){

await Provider.create({
name: name,
serviceId: "",
location: "",
phone: "",
userId: user._id.toString()
})

}

res.json({
message:"User Registered",
userId:user._id,
role:user.role
})

}catch(err){

console.log(err)
res.status(500).json({message:"Error registering user"})

}

}


// LOGIN
exports.login = async (req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"User not found"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({message:"Wrong Password"})
}

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

res.json({
token: token,
role: user.role,
userId: user._id,
name:user.name
})

}catch(err){

console.log(err)
res.status(500).json({message:"Login error"})

}

}