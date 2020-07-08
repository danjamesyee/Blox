import {
  getTracks,
  createTrack,
  editTrack,
  deleteTrack,
} from "../util/track_api_util";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_NEW_TRACK = "RECEIVE_NEW_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveTracks = (tracks) => ({
  type: RECEIVE_TRACKS,
  tracks,
});

export const receiveNewTrack = (track) => ({
  type: RECEIVE_NEW_TRACK,
  track,
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
