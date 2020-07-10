import axios from "axios";

export const getTracks = () => {
  return axios.get("/api/tracks");
};

export const getUserTracks = (id) => {
  return axios.get(`/api/tracks/user/${id}`);
};

export const getTrack = (id) => {
  return axios.get(`/api/tracks/${id}`);
};

export const createTrack = (data) => {
  return axios.post("/api/tracks", data);
};

export const editTrack = (data) => {
  return axios.patch(`/api/tracks/${data.id}`, data);
};

export const deleteTrack = (trackId) => {
  return axios.delete(`/api/tracks/${trackId}`);
};

export const patchTrackRating = (trackId, rating) => {
  return axios.patch(`/api/tracks/${trackId}/rating`, { rating })
};