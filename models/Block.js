const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockSchema = new Schema({
  note: {
    type: String,
  },
  duration: {
    type: String,
    required: true,
  },
});

module.exports = Block = mongoose.model("Block", BlockSchema);
