import {
  RECEIVE_TRACK_COMMENTS,
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comments_actions';

export default (state={}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_TRACK_COMMENTS:
      // set newState to empty so prev state is replaced
      newState = {};
      // receive comments arr
      action.comments.forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    case RECEIVE_COMMENT:
      newState[action.comment.id] = action.comment;
      return newState;
    case REMOVE_COMMENT:
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
}