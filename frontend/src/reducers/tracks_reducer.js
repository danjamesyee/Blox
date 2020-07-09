import {
  RECEIVE_TRACKS,
  RECEIVE_USER_TRACKS,
  RECEIVE_TRACK,
  RECEIVE_NEW_TRACK,
  REMOVE_TRACK,
} from "../actions/track_actions";

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_TRACKS:
      return action.tracks.data;
    case RECEIVE_USER_TRACKS:
      return action.tracks.data;
    // debugger;

    case RECEIVE_NEW_TRACK:
      newState.track = action.track.data;
      return newState;
    case RECEIVE_TRACK:
      // debugger;
      // newState[action.track.id] = action.track;
      newState.track = action.track.data;
      return newState;
    case REMOVE_TRACK:
      delete newState[action.trackId.data];
      return newState;
    default:
      return state;
  }
};

export default TracksReducer;
