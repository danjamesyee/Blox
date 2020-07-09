import axios from "axios";

// grab votes for a specific track
export const getTrackVotes = (trackId) => (
  axios.get(`/track/${trackId}`)
);

// upvote a track
export const upvote = (trackId) => (
  axios.post(`/track/${trackId}/upvote`)
);

// downvote a track
export const downvote = (trackId) => (
  axios.post(`/track/${trackId}/downvote`)
);

// grab all votes
export const getAllVotes = () => (
  axios.get(`/`)
)