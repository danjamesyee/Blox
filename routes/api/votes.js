const express = require("express");
const router = express.Router();
const Vote = require("../../models/Vote");

// test
router.get("/test", (req, res) => res.json({ msg: "This is the votes route" }));

// votes index
router.get('/', (req, res) => {
  Vote
    .find()
    .then(votes => res.json(votes))
    .catch(err => res.status(400).json(err))
})


module.exports = router;