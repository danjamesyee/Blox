import { connect } from 'react-redux';
import Votes from './votes';
import {
  fetchTrackVotes,
  upvote,
  downvote
} from '../../actions/votes_actions';

// Filter votes that belong to a track
const trackVotes = (trackId, votes) => {
  const votesArr = Object.values(votes);
  const filteredVotes = votesArr.filter(vote => {
    return vote.track == trackId;
  })
  return filteredVotes;
}

// make sure to pass VotesContainer the trackId
// like this <VotesContainer trackId={trackId}
const MSP = (state, ownProps) => ({
  votes: trackVotes(ownProps.trackId, state.votes),
  trackId: ownProps.trackId,
  currentUser: state.session.user
});

const MDP = (dispatch) => ({
  fetchTrackVotes: trackId => dispatch(fetchTrackVotes(trackId)),
  upvote: trackId => dispatch(upvote(trackId)),
  downvote: trackId => dispatch(downvote(trackId)),
});

export default connect(MSP, MDP)(Votes);
