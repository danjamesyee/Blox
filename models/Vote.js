const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true
    },
    track: {
      type: Schema.Types.ObjectId,
      ref: 'Track'
    }
  }
);

module.exports = Vote = mongoose.model('Vote', VoteSchema);