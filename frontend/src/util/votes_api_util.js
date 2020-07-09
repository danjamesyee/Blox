import axios from "axios";

// grab votes for a specific track
export const getTrackVotes = () => (
  axios.post(`/track/${trackId}`)
);

// upvote a track
export const upvote = () => (
  axios.post(`/track/${trackId}/upvote`)
);

// downvote a track
export const downvote = () => (
  axios.post(`/track/${trackId}/downvote`)
);