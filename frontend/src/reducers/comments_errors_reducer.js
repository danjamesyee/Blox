import { RECEIVE_COMMENT_ERRORS } from "../actions/comments_actions";

const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    default:
      return state;
  }
};