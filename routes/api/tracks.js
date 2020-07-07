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

// show tracks for currentUser
router.get("/currentUser", passport.authenticate('jwt', {session: false}), (req, res) => {
  Track
    .find({user: req.user.id})
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
  track
    .save()
    .then(res.json('Created new track.'))
    .catch(err => res.json(err));
});

// tracks edit
router.patch('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Track.findById(req.params.id)
    .then(track => {
      // use != because user.id is string and track.user is object
      if (req.user.id != track.user) {
        res.status(403).json('Cannot edit track!')
      } else {
        track.blocks = req.body.blocks.map(block => block.id);
        track
          .save()
          .then(res.json('Successfully updated track.'))
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err))
  });

// tracks delete
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Track.findById(req.params.id)
    .then( track => {
      // use != because user.id is string and track.user is object
      if (req.user.id != track.user) {
        res.status(403).json("Cannot delete track!");
      } else {
        Track.deleteOne({ _id: req.params.id })
          .then(() => res.json("Successfully deleted track."))
          .catch(err => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

module.exports = router;