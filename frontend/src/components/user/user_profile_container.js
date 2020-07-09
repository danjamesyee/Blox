import { connect } from "react-redux";
import { fetchUserTracks } from "../../actions/track_actions";
import { fetchBlocks } from "../../actions/block_actions";
import UserProfile from "./user_profile";

const mapStateToProps = (state, ownProps) => {
  //   debugger;
  return {
    currentUser: state.session.user,
    trackUserId: ownProps.match.params.userId,
    blocks: Object.values(state.blocks),
    tracks: Object.values(state.tracks),
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
