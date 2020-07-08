const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema(
  {
    rating: {
      type: Number,
      default: 0
    },
    track: {
      type: Schema.Types.ObjectId,
      ref: 'Track'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
);

module.exports = Vote = mongoose.model('Vote', VoteSchema);