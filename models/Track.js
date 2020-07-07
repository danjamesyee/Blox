const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    blocks: [{
      type: Schema.Types.ObjectId,
      ref: 'Block'
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = Track = mongoose.model('Track', TrackSchema);