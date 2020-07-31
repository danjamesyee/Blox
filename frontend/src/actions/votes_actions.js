import { getTrackVotes, getAllVotes, postUpvote, postDownvote } from '../util/votes_api_util';

export const RECEIVE_VOTES = 'RECEIVE_VOTES';
export const RECEIVE_VOTE = 'RECEIVE_VOTE';
export const RECEIVE_VOTE_ERRORS = 'RECEIVE_VOTE_ERRORS';

const receiveVotes = (votes) => {
  return {
    type: RECEIVE_VOTES,
    votes
  }
}

// shared with track
const receiveVote = (res) => {
  return {
    type: RECEIVE_VOTE,
    res
  }
}

const receiveVoteErrors = (errors) => {
  return {
    type: RECEIVE_VOTE_ERRORS,
    errors
  }
}

export const fetchTrackVotes = (trackId) => dispatch => {
  return getTrackVotes(trackId)
    .then(votes => dispatch(receiveVotes(votes.data)))
    .catch(err => dispatch(receiveVoteErrors(err.response.data)))
}

export const fetchAllVotes = () => dispatch => {
  return getAllVotes()
    .then(votes => dispatch(receiveVotes(votes.data)))
    .catch(err => dispatch(receiveVoteErrors(err.response.data)))
}

// Destructure to get vote
export const upvote = (trackId) => dispatch => {
  return postUpvote(trackId)
  .then((res) => dispatch(receiveVote(res)))
  .catch((err) => dispatch(receiveVoteErrors(err.response.data)));
}

// Destructure to get vote
export const downvote = (trackId) => dispatch => {
  return postDownvote(trackId)
    .then((res) => dispatch(receiveVote(res)))
    .catch((err) => dispatch(receiveVoteErrors(err.response.data)));
}

