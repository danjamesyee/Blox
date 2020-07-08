const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comments');

// show comments for a specific user
// router.get('/user/:user_id', (req, res) => {
//     Comment.find({user: req.params.user_id})
//         .sort({ date: -1 })
//         .then(comments => res.json(comments))
//         .catch(err =>
//             res.status(404).json({ nocommentsfound: 'No comments found from that user' }
//         )
//     );
// });

// show comments for a specific track
// router.get('/track/:track_id', (req, res) => {
//     Comment.find({track: req.params.track_id})
//         .sort({ date: -1 })
//         .then(comments => res.json(comments))
//         .catch(err =>
//             res.status(404).json({ nocommentsfound: 'No comments found from that track' }
//         )
//     );
// });

// show comment by specific ID
// router.get('/:id', (req, res) => {
//     Comment.findById(req.params.id)
//         .then(comment => res.json(comment))
//         .catch(err => 
//             res.status(404).json({nocommentfound:'No comment found with that ID'})
//         );
// });

// comments create
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {isValid, errors} = validateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newComment = new Comment({
            text: req.body.text,
            track: req.track.id,
            user: req.user.id
        });

        newComment.save().then(comment => res.json(comment));
    }
);

// comments edit
router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Comment.findById(req.params.id)
        .then((comment) => {
          // use != because user.id is string and comment.user is object
          if (req.user.id != comment.user) {
            res.status(403).json("Cannot edit comment!");
          } else {
            comment.text = req.body.text;
            comment
              .save()
              .then((comment) => res.json(comment))
              .catch((err) => res.status(400).json(err));
          }
        })
        .catch((err) => res.status(400).json(err));
    }
);

// tracks delete
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
        (req, res) => {
            Comment.findById(req.params.id)
                .then((comment) => {
                    // use != because user.id is string and comment.user is object
                    if (req.user.id != comment.user) {
                        res.status(403).json("Cannot delete comment!");
                    } else {
                        Comment.deleteOne({ _id: req.params.id })
                        .then(() => res.json("Successfully deleted comment."))
                        .catch((err) => res.status(400).json(err));
                    }
                })
                .catch((err) => res.status(400).json(err));
    }
);

module.exports = router;