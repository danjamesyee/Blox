const express = require("express");
const router = express.Router();
const Track = require("../../models/Track");
const validateTracksInput = require("../../validation/tracks");
const passport = require("passport");

// test
router.get("/test", (req, res) =>
  res.json({ msg: "This is the tracks route" })
);

// tracks index: return all tracks
router.get("/", (req, res) => {
  Track.find()
    .sort({ createdAt: -1 })
    .then((tracks) => res.json(tracks))
    .catch((err) => res.status(400).json(err));
});

// show tracks for a specific user
router.get("/user/:user_id", (req, res) => {
  // debugger;
  Track.find({ user: req.params.user_id })
    .sort({ createdAt: -1 })
    .then((tracks) => res.json(tracks))
    .catch((err) => res.status(400).json(err));
});

// tracks create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTracksInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    // attach user and title to track
    const track = new Track({
      user: req.user.id,
      title: req.body.title,
    });

    // populate blocks
    track.blocks = req.body.blocks.map((block) => block._id);
    track
      .save()
      .then((track) => res.json(track))
      .catch((err) => res.status(400).json(err));
  }
);

// tracks edit
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Track.findById(req.params.id)
      .then((track) => {
        // use != because user.id is string and track.user is object
        if (req.user.id != track.user) {
          res.status(403).json("Cannot edit track!");
        } else {
          track.title = req.body.title;
          track.blocks = req.body.blocks.map((block) => block._id);
          track
            .save()
            .then((track) => res.json(track))
            .catch((err) => res.status(400).json(err));
        }
      })
      .catch((err) => res.status(400).json(err));
  }
);

// tracks delete
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Track.findById(req.params.id)
      .then((track) => {
        // use != because user.id is string and track.user is object
        if (req.user.id != track.user) {
          res.status(403).json("Cannot delete track!");
        } else {
          Track.deleteOne({ _id: req.params.id })
            .then(() => res.json("Successfully deleted track."))
            .catch((err) => res.status(400).json(err));
        }
      })
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
