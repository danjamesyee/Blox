const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    blocks: {
      type: Schema.Types.ObjectId,
      ref: 'Block'
    }
  },
  { timestamps: true }
);

module.exports = Track = mongoose.model('Track', TrackSchema);