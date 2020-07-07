import { RECEIVE_BLOCKS } from "../actions/block_actions";

const BlocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_BLOCKS:
      return action.blocks.data;
    default:
      return state;
  }
};

export default BlocksReducer;
