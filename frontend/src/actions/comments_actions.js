import { 
  getTrackComments, 
  postComment, 
  patchComment, 
  deleteComment } from '../util/comments_api_util';

export const RECEIVE_TRACK_COMMENTS = "RECEIVE_TRACK_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveTrackComments = (comments) => ({
  type: RECEIVE_TRACK_COMMENTS,
  comments
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment
});

const receiveCommentErrors = (errors) => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId
});

export const fetchTrackComments = (trackId) => dispatch => {
  return getTrackComments(trackId)
    .then(comments => dispatch(receiveTrackComments(comments.data)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)));
}

// data format: 
// { text: "some text", trackId: "some trackId" }
export const createComment = (data) => dispatch => {
  return postComment(data)
    .then(createdComment => dispatch(receiveComment(createdComment.data)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)))
};

export const updateComment = (comment) => dispatch => (
  patchComment(comment)
    .then(updatedComment => dispatch(receiveComment(updatedComment.data)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)))
);

export const destroyComment = (commentId) => dispatch => (
  deleteComment(commentId)
    .then(() => dispatch(removeComment(commentId)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)))
);