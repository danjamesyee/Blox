import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import blocks from "./blocks_reducer";
import tracks from "./tracks_reducer";
import comments from "./comments_reducer";
import votes from "./votes_reducer";
import users from "./users_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  blocks,
  tracks,
  comments,
  votes,
  users
});

export default RootReducer;
