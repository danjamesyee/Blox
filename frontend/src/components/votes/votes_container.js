import { connect } from "react-redux";
import Votes from "./votes";
import { fetchTrackVotes, upvote, downvote } from "../../actions/votes_actions";
// * Deprecated import { patchTrackRating } from "../../util/track_api_util";
import { receiveTrackRating } from "../../actions/track_actions";

// * Deprecated
// Filter votes that belong to a track
// const trackRating = (trackId, votes) => {
//   const votesArr = Object.values(votes);
//   let rating = 0;

//   votesArr.forEach((vote) => {
//     if (vote.track == trackId) {
//       rating += vote.rating;
//     }
//   });
//   debugger;
//   receiveTrackRating(trackId, rating);
//   return rating;
// };

// make sure to pass VotesContainer the trackId
// like this <VotesContainer trackId={trackId}
const MSP = (state, ownProps) => {
  // debugger
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
  downvote: (trackId) => dispatch(downvote(trackId)),
  receiveRatings: (trackId, rating) =>
  dispatch(receiveTrackRating(trackId, rating)),
});

export default connect(MSP, MDP)(Votes);
