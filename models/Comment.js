const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
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

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment;