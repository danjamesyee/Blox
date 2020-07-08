const express = require("express");
const router = express.Router();
const Track = require("../../models/Track");
const User = require("../../models/User");
const validText = require("../../validation/valid-text");

// test
router.get('/test', (req,res) => res.json("This is the search route"));

// search
router.get('/', (req,res) => {
  if (!validText(req.body.query)) {
    return res.status(400).json("Invalid Query");
  }

  const usersQuery = User.find({ handle: req.body });
  const tracksQuery = Track.find({ title: req.body });

  Promise.all([usersQuery, tracksQuery]);
});

module.exports = router;