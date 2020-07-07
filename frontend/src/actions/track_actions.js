import {
  getTracks,
  createTrack,
  editTrack,
  deleteTrack,
} from "../util/track_api_util";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_NEW_TRACK = "RECEIVE_NEW_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";

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

export const fetchTracks = () => (dispatch) => {
  return getTracks()
    .then((tracks) => dispatch(receiveTracks(tracks)))
    .catch((err) => console.log(err));
};

export const makeTrack = (data) => (dispatch) => {
  return createTrack(data)
    .then((track) => dispatch(receiveNewTrack(track)))
    .catch((err) => console.log(err));
};

export const updateTrack = (data) => (dispatch) => {
  return editTrack(data)
    .then((track) => dispatch(receiveNewTrack(track)))
    .catch((err) => console.log(err));
};

export const destroyTrack = (id) => (dispatch) => {
  return deleteTrack(id)
    .then((track) => dispatch(removeTrack(id)))
    .catch((err) => console.log(err));
};
