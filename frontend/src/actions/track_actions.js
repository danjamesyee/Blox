import {
  getTracks,
  getUserTracks,
  getTrack,
  createTrack,
  editTrack,
  deleteTrack,
} from "../util/track_api_util";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_USER_TRACKS = "RECEIVE_USER_TRACKS";
export const RECEIVE_NEW_TRACK = "RECEIVE_NEW_TRACK";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_TRACK_RATING = "RECEIVE_TRACK_RATING";

export const receiveTracks = (tracks) => ({
  type: RECEIVE_TRACKS,
  tracks,
});

export const receiveUserTracks = (tracks) => ({
  type: RECEIVE_USER_TRACKS,
  tracks,
});

export const receiveNewTrack = (track) => ({
  type: RECEIVE_NEW_TRACK,
  track,
});

export const receiveTrack = (track) => ({
  type: RECEIVE_TRACK,
  track,
});

export const receiveTrackRating = (trackId, rating) => ({
  type: RECEIVE_TRACK_RATING,
  trackId,
  rating
});

export const removeTrack = (trackId) => ({
  type: REMOVE_TRACK,
  trackId,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors,
});

export const fetchTracks = () => (dispatch) => {
  return getTracks()
    .then((tracks) => dispatch(receiveTracks(tracks)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchUserTracks = (id) => (dispatch) => {
  return getUserTracks(id)
    .then((tracks) => dispatch(receiveUserTracks(tracks)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const fetchTrack = (id) => (dispatch) => {
  return getTrack(id)
    .then((track) => dispatch(receiveTrack(track)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const makeTrack = (data) => (dispatch) => {
  return createTrack(data)
    .then((track) => dispatch(receiveNewTrack(track)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const updateTrack = (data) => (dispatch) => {
  return editTrack(data)
    .then((track) => dispatch(receiveNewTrack(track)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const destroyTrack = (id) => (dispatch) => {
  return deleteTrack(id)
    .then((track) => dispatch(removeTrack(id)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};
