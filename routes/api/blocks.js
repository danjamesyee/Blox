const express = require("express");
const router = express.Router();
const Block = require("../../models/Block");

// test
router.get('/test', (req, res) => res.json("This is blocks route"));

// blocks index: return all blocks
router.get('/', (req, res) => {
  Block.find()
    .then(blocks => res.json(blocks));
});

module.exports = router;