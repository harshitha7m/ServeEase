const express = require("express")
const router = express.Router()
const Service = require("../models/service")

// get all services
router.get("/", async(req,res)=>{

const services = await Service.find()

res.json(services)

})

// create new service
router.post("/", async(req,res)=>{

const service = new Service({
name:req.body.name
})

await service.save()

res.json(service)

})

module.exports = router