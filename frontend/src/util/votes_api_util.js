import axios from "axios";

// grab votes for a specific track
export const getTrackVotes = (trackId) => {
  return axios.get(`/api/votes/track/${trackId}`)
};

// grab all votes
export const getAllVotes = () => {
  return axios.get(`/api/votes/`)
};

// upvote a track
export const postUpvote = (trackId) => (
  axios.post(`/api/votes/track/${trackId}/upvote`)
);

// downvote a track
export const postDownvote = (trackId) => (
  axios.post(`/api/votes/track/${trackId}/downvote`)
);