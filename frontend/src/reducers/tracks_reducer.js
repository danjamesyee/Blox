import {
  RECEIVE_TRACKS,
  RECEIVE_USER_TRACKS,
  RECEIVE_TRACK,
  RECEIVE_TRACK_RATING,
  RECEIVE_NEW_TRACK,
  REMOVE_TRACK,
} from "../actions/track_actions";

import {
  RECEIVE_VOTE
} from "../actions/votes_actions";

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  let receiveTracksState = {};

  switch (action.type) {
    case RECEIVE_TRACKS:
      action.tracks.data.forEach((track) => {
        receiveTracksState[track._id] = track;
      });
      return receiveTracksState;
    case RECEIVE_USER_TRACKS:
      action.tracks.data.forEach((track) => {
        receiveTracksState[track._id] = track;
      });
      return receiveTracksState;
      // return action.tracks.data;
    case RECEIVE_NEW_TRACK:
      newState.track = action.track.data;
      return newState;
    case RECEIVE_TRACK:
      newState.track = action.track.data;
      return newState;
    case REMOVE_TRACK:
      delete newState[action.trackId.data];
      return newState;
    case RECEIVE_VOTE:
      //when receiving a vote a track is also sent 
      // res.data = { vote, track}
      // use this case to update track's rating
      newState[action.res.data.track._id].rating = action.res.data.track.rating;
      return newState;
    default:
      return state;
  }
};

export default TracksReducer;
