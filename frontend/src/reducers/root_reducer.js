import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import blocks from "./blocks_reducer";
import tracks from "./tracks_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  blocks,
  tracks,
});

export default RootReducer;
