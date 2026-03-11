const express = require("express")
const router = express.Router()

const Provider = require("../models/Provider")

router.get("/:serviceId", async(req,res)=>{

const providers = await Provider.find({
serviceId:req.params.serviceId
})

res.json(providers)

})

module.exports = router