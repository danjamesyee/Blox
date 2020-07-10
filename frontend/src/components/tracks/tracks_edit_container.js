import { connect } from "react-redux";
import { updateTrack, fetchTrack } from "../../actions/track_actions";
import { fetchBlocks } from "../../actions/block_actions";
import TracksEdit from "./tracks_edit";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    blocks: Object.values(state.blocks),
    errors: state.errors.tracks,
    tracks: state.tracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrack: (track) => dispatch(updateTrack(track)),
    fetchBlocks: (blocks) => dispatch(fetchBlocks(blocks)),
    fetchTrack: (id) => dispatch(fetchTrack(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksEdit);
