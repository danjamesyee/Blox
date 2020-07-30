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

const receiveVote = (vote) => {
  return {
    type: RECEIVE_VOTE,
    vote
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

export const upvote = (trackId) => dispatch => {
  return postUpvote(trackId)
    .then((vote) => dispatch(receiveVote(vote.data)))
    .catch((err) => dispatch(receiveVoteErrors(err.response.data)));
}

export const downvote = (trackId) => dispatch => {
  return postDownvote(trackId)
    .then((vote) => dispatch(receiveVote(vote.data)))
    .catch((err) => dispatch(receiveVoteErrors(err.response.data)));
}

