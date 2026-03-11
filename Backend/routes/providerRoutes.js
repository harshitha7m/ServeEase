const express = require("express")
const router = express.Router()

const Provider = require("../models/provider")

// Create provider
router.post("/", async(req,res)=>{

const {name,userId,serviceId,location,phone} = req.body

const provider = await Provider.create({
name,
userId,
serviceId: serviceId || "",
location: location || "",
phone: phone || ""
})

res.json(provider)

})

// Update provider service details
router.put("/service", async(req,res)=>{

const {userId,serviceId,location,phone} = req.body

const provider = await Provider.findOne({userId})

if(!provider){
return res.status(404).json({message:"Provider not found"})
}

provider.serviceId = serviceId
provider.location = location
provider.phone = phone

await provider.save()

res.json(provider)

})

// Get providers by service
router.get("/service/:id", async (req, res) => {
try{

const providers = await Provider.find({
serviceId:req.params.id
})

res.json(providers)

}catch(err){
res.status(500).json({message:"Error fetching providers"})
}

})

// Get provider by userId
router.get("/user/:userId", async(req,res)=>{

const provider = await Provider.findOne({
userId:req.params.userId
})

res.json(provider)

})

// Get provider by provider ID
router.get("/:id", async(req,res)=>{

try{

const provider = await Provider.findById(req.params.id)

if(!provider){
return res.status(404).json({message:"Provider not found"})
}

res.json(provider)

}catch(err){
res.status(500).json({message:"Error fetching provider"})
}

})

module.exports = router