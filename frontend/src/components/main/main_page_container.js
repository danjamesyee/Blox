import { connect } from "react-redux";
import { makeTrack, fetchTracks } from "../../actions/track_actions";
import { fetchBlocks } from "../../actions/block_actions";
import MainPage from "./main_page";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    newTrack: {},
    blocks: Object.values(state.blocks),
    tracks: Object.values(state.tracks),
    errors: state.errors.tracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeTrack: (track) => dispatch(makeTrack(track)),
    fetchBlocks: (blocks) => dispatch(fetchBlocks(blocks)),
    fetchTracks: (tracks) => dispatch(fetchTracks(tracks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
