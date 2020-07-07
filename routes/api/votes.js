const express = require("express");
const router = express.Router();
const Vote = require("../../models/Vote");
const Track = require("../../models/Track");

// test
router.get("/test", (req, res) => res.json({ msg: "This is the votes route" }));

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
    .find(req.params.track_id)
    .then(tracks => res.json(tracks))
    .catch(err => res.status(400).json(err));
});

// upvote track either create a vote instance if it does not already exist
// OR update a vote instance // ! NOT RESTful
router.post(':id', (req, res) => {
  
});

module.exports = router;