const express = require("express");
const router = express.Router();
const Track = require("../../models/Track");
const User = require("../../models/User");

// test
router.get('/test', (req,res) => res.json("This is the search route"));

module.exports = router;