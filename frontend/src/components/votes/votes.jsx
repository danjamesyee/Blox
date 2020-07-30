import React from 'react';

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { fetchTrackVotes, trackId, votes, currentUser } = this.props;
    // ! N + 1 queries
    fetchTrackVotes(trackId);
    // currentUserVote(votes, currentUser._id);
  }

  render () {
    const { upvote, downvote, trackId, votes } = this.props;
    // let wantedVotes = currentUserVote(votes, currentUserId);
    
    return (
      <div className="vote">
        <div onClick={() => upvote(trackId)} className="material-icons upvote">
          keyboard_arrow_up
        </div>

        <div className="rating">
          {this.props.rating}
        </div>

        <div onClick={() => downvote(trackId)} className="material-icons downvote">
          keyboard_arrow_down
        </div>
      </div>
    )
  }
}