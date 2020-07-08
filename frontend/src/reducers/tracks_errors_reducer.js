import { RECEIVE_ERRORS } from "../actions/track_actions";

const _nullErrors = [];

const TracksErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default TracksErrorsReducer;
