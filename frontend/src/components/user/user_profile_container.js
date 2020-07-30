import { connect } from "react-redux";
import { fetchUserTracks } from "../../actions/track_actions";
import { fetchBlocks } from "../../actions/block_actions";
import UserProfile from "./user_profile";

function userTracks (userId, tracks) {
  return tracks.filter(track => track.user._id === userId);
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    trackUserId: ownProps.match.params.userId,
    blocks: Object.values(state.blocks),
    tracks: userTracks(ownProps.match.params.userId, Object.values(state.tracks)),
    errors: state.errors.tracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlocks: (blocks) => dispatch(fetchBlocks(blocks)),
    fetchUserTracks: (id) => dispatch(fetchUserTracks(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
