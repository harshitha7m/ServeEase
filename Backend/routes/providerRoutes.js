const express = require("express")
const router = express.Router()

const Provider = require("../models/provider")

// get providers by service

router.get("/:service", async (req, res) => {
  try {
    const service = decodeURIComponent(req.params.service)

    const providers = await Provider.find({ service })

    res.json(providers)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router