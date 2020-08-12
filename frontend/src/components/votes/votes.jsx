import React from "react";
import { withRouter } from 'react-router-dom';
import lodash from "lodash"

class Votes extends React.Component {
  componentDidMount() {
    const { fetchTrackVotes, trackId } = this.props;

    fetchTrackVotes(trackId);
  }

  handleVote(type) {
    const { upvote, downvote, currentUser, trackId, history } = this.props;

    if (lodash.isEmpty(currentUser)) {
      history.push("/login")}
    else if (type === 'up') upvote(trackId);
    else downvote(trackId);
  }

  render() {
    const { trackId, currentUser, votes } = this.props;

    let upvoted = "";
    let downvoted = "";
    let up = "up";
    let down = "down";

    // current user exists
    if (currentUser) {
      Object.values(votes).forEach(vote => {
        if (vote.user === currentUser.id && vote.track === trackId && vote.rating === 1) {
          upvoted = " upvoted";
          downvoted = "";
        } else if (vote.user === currentUser.id && vote.track === trackId && vote.rating === -1) {
          downvoted = " downvoted";
          upvoted = "";
        }
      })
    }
    return (
      <div className="vote">
        <div onClick={() => this.handleVote(up)} className={"material-icons upvote" + upvoted}>
          keyboard_arrow_up
        </div>

        <div className="rating">{this.props.rating}</div>

        <div
          onClick={() => this.handleVote(down)}
          className={"material-icons downvote" + downvoted}
        >
          keyboard_arrow_down
        </div>
      </div>
    );
  }
}

export default withRouter(Votes);