import { connect } from "react-redux";
import Votes from "./votes";
import { fetchTrackVotes, upvote, downvote } from "../../actions/votes_actions";

// make sure to pass VotesContainer the trackId
// like this <VotesContainer trackId={trackId}
const MSP = (state, ownProps) => {
  return {
    rating: state.tracks[ownProps.trackId].rating,
    votes: state.votes,
    trackId: ownProps.trackId,
    currentUser: state.session.user,
  };
};

const MDP = (dispatch) => ({
  fetchTrackVotes: (trackId) => dispatch(fetchTrackVotes(trackId)),
  upvote: (trackId) => dispatch(upvote(trackId)),
  downvote: (trackId) => dispatch(downvote(trackId))
});

export default connect(MSP, MDP)(Votes);
