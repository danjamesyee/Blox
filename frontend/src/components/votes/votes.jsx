import React from "react";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rating: this.props.rating };
    this.calcRating = this.calcRating.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    const { fetchTrackVotes, trackId, votes, receiveRatings } = this.props;

    fetchTrackVotes(trackId)
      .then(() => {
        if (Object.keys(votes).length > 0) {
          receiveRatings(trackId, this.calcRating(trackId, votes));
        }
      })
  }

  calcRating (votes, trackId) {
    let rating = 0;

    votes.forEach((vote) => {
      if (vote.track == trackId) {
        rating += vote.rating;
      }
    });

    return rating;
  }

  handleVote (type) {
    const { upvote, downvote, trackId, receiveRatings, votes } = this.props;
    if ( type === 'up' ) {
      upvote(trackId)
      .then(() => receiveRatings(trackId, this.calcRating(trackId, votes)))
    } else {
      downvote(trackId)
        .then(() => receiveRatings(trackId, this.calcRating(trackId, votes)))
    }
  }

  render() {
    const { upvote, downvote, trackId, currentUser, votes } = this.props;

    let upvoted = "";
    let downvoted = "";


    Object.values(votes).forEach(vote => {
      if (vote.user === currentUser.id && vote.track === trackId && vote.rating === 1) {
        upvoted = " upvoted";
        downvoted = "";
      } else if (vote.user === currentUser.id && vote.track === trackId && vote.rating === -1) {
        downvoted = " downvoted";
        upvoted = "";
      }
    })
    
    return (
      <div className="vote">
        <div onClick={() => this.handleVote('up')} className={"material-icons upvote" + upvoted}>
          keyboard_arrow_up
        </div>

        <div className="rating">{this.props.rating}</div>

        <div
          onClick={() => () => this.handleVote('down')}
          className={"material-icons downvote" + downvoted}
        >
          keyboard_arrow_down
        </div>
      </div>
    );
  }
}
