const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    track: {
        type: Schema.Types.ObjectId,
        ref: 'tracks'
    },

    text: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('comment', CommentSchema)
module.exports = Comment;