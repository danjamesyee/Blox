import axios from "axios";

//Get all comments for specific track
export const getTrackComments = (trackId) => (
  axios.get(`/api/comments/track/${trackId}`)
);

// Create Comment
// data format:
// { text: "some text", trackId: "some trackId" } 
export const postComment = (data) => (
  axios.post(`/api/comments`, data)
);

//Edit Comment
export const patchComment = (comment) => (
  axios.patch(`/api/comments/${comment.id}`, {text: comment.text})
);

//Delete Comment
export const deleteComment = (commentId) => (
  axios.delete(`/api/comments/${commentId}`)
)