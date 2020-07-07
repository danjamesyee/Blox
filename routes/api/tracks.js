const express = require('express');
const router = express.Router();
const Track = require('../../models/Track');
const validateTracksInput = require('../../validation/tracks');
const passport = require("passport");

// test
router.get("/test", (req, res) => res.json({ msg: "This is the tracks route" }));

// tracks index: return all tracks
router.get("/", (req, res) => {
  Track
    .find()
    .sort({ date: -1 })
    .then(tracks => res.json(tracks))
    .catch(err => res.status(400).json(err))
});

// tracks show
router.get("/user/:user_id", (req, res) => {
  Track
    .findById(req.params.user_id)
    .sort({ date: -1 })
    .then(tracks => res.json(tracks))
    .catch(err => res.status(400).json(err))
});

// tracks create
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  // attach user to track
  const { errors, isValid } = validateTracksInput(req.body.blocks);

  if (!isValid) {
    res.status(400).json(errors);
  }
 
  const track = new Track({
    user: req.user.id
  });

  // populate blocks
  track.blocks = req.body.blocks.map(block => block.id);
  track.save();
  res.json('Created new track.');
});

module.exports = router;