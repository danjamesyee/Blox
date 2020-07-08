import { connect } from "react-redux";
import { makeTrack } from "../../actions/track_actions";
import { fetchBlocks } from "../../actions/block_actions";
import Tracks from "./tracks";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    newTrack: {},
    blocks: Object.values(state.blocks),
    errors: state.errors.tracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeTrack: (track) => dispatch(makeTrack(track)),
    fetchBlocks: (blocks) => dispatch(fetchBlocks(blocks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
