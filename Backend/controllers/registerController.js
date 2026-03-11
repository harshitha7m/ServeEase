const User = require("../models/user")
const Provider = require("../models/provider")
const bcrypt = require("bcryptjs")

exports.register = async (req,res)=>{

try{

const {name,email,password,role} = req.body

const hashedPassword = await bcrypt.hash(password,10)

const user = await User.create({
name,
email,
password:hashedPassword,
role
})

if(role === "provider"){

await Provider.create({
name:name,
location:"",
phone:"",
serviceId:"",
userId:user._id
})

}

res.json({message:"User Registered"})

}catch(err){

console.log(err)
res.status(500).json({message:"Error registering user"})

}

}