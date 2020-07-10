import {
  RECEIVE_SEARCH,
  CLEAR_SEARCH
} from "../actions/search_actions";

export default (state = {}, action ) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SEARCH:
      return action.searchResults.users
    
    case CLEAR_SEARCH:
      return {};

    default: 
      return state;
  }
};