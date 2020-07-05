const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//set up our schema
const UserSchema = new Schema(
  {
    handle: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



module.exports = User = mongoose.model("User", UserSchema);