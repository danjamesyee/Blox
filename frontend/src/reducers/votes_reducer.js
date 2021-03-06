import {
  RECEIVE_VOTES,
  RECEIVE_VOTE
} from '../actions/votes_actions';

export default (state={}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_VOTES:
      // receive votes arr
      action.votes.forEach(vote => {
        newState[vote._id] = vote;
      });
      return newState;
    case RECEIVE_VOTE:
      // res returns data: { vote, track }
      newState[action.res.data.vote._id] = action.res.data.vote;
      return newState;
    default:
      return state;
  }
}