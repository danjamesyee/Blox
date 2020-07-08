const express = require("express");
const router = express.Router();
const Vote = require("../../models/Vote");
const passport = require("passport");

// test
// router.get("/test", (req, res) => res.json({ msg: "This is the votes route" }));

// grab votes for currentUser
router.get(
  '/currentUser',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vote.find({
      user: req.user.id
    })
      .then((vote) => {
        return res.json(vote);
      })
      .catch((err) => {
        return res.status(404).json(err);
      });
    });

// votes index
router.get('/', (req, res) => {
  Vote
    .find()
    .then(votes => res.json(votes))
    .catch(err => res.status(400).json(err))
})

// get votes for specific track
router.get('/track/:track_id', (req, res) => {
  Vote
    .find({track: req.params.track_id})
    .then(tracks => res.json(tracks))
    .catch(err => res.status(400).json(err));
});

// upvote track either create a vote instance if it does not already exist
// OR update a vote instance // ! NOT RESTful
router.post(
  '/track/:track_id/upvote', 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    Vote.findOne({ user: req.user.id, track: req.params.track_id })
      .then((vote) => {
        if (vote) {
          // update vote since it exists
          vote.rating = 1;
          vote.save()
            .then(vote => res.json(vote))
            .catch(err => res.status(400).json(err))
        } else {
          // create vote since it does not exist
          Vote
            .create({ user: req.user.id, track: req.params.track_id, rating: 1})
            .then(vote => res.json(vote));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// downvote track either create a vote instance if it does not already exist
// OR update a vote instance // ! NOT RESTful
router.post(
  "/track/:track_id/downvote",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vote.findOne({ user: req.user.id, track: req.params.track_id })
      .then((vote) => {
        if (vote) {
          // update vote since it exists
          vote.rating = -1;
          vote
            .save()
            .then((vote) => res.json(vote))
            .catch((err) => res.status(400).json(err));
        } else {
          // create vote since it does not exist
          Vote.create({
            user: req.user.id,
            track: req.params.track_id,
            rating: -1,
          }).then((vote) => res.json(vote));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;