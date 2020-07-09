import {
  RECEIVE_VOTES,
  RECEIVE_VOTE
} from '../actions/votes_actions';

export default (state={}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_VOTES:
      // set newState to empty so prev state is replaced
      newState = {};
      // receive votes arr
      action.votes.forEach(vote => {
        newState[vote._id] = vote;
      });
      return newState;
    case RECEIVE_VOTE:
      newState[action.vote._id] = action.vote;
      return newState;
    default:
      return state;
  }
}