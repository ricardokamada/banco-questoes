const express = require("express");
const { createPreference } = require("../controllers/checkoutController");
const router = express.Router();

router.post("/", createPreference);


module.exports = router;