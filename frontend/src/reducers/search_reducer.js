import {
  RECEIVE_SEARCH,
  CLEAR_SEARCH
} from "../actions/search_actions";

const _default = {
  users: [],
  tracks: []
}

export default (state = _default, action ) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SEARCH:
      let newState = {};
      newState.users = action.searchResults.users;
      newState.tracks = action.searchResults.tracks;
      return newState;
    
    case CLEAR_SEARCH:
      return _default;

    default: 
      return state;
  }
};