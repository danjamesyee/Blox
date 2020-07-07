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

// get vote for specific track
router.get('/track/:track_id', (req, res) => {
  Track
    .findById(req.params.track_id)
    .then(track => res.json(track))
    .catch(err => res.status(400).json(err));
});

module.exports = router;