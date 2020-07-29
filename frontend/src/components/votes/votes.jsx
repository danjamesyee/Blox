import React from "react";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // ! N + 1 queries (FIXED)
    const { fetchTrackVotes, trackId } = this.props;

    fetchTrackVotes(trackId);
  }

  render() {
    const { upvote, downvote, trackId } = this.props;
    const { votes, receiveRatings } = this.props;
    if (Object.keys(votes).length > 0) {
      const votesArr = Object.values(votes);
      let rating = 0;

      votesArr.forEach((vote) => {
        if (vote.track == trackId) {
          rating += vote.rating;
        }
      });
      debugger;
      receiveRatings(trackId, rating);
    }

    return (
      <div className="vote">
        <div onClick={() => upvote(trackId)} className="material-icons upvote">
          keyboard_arrow_up
        </div>

        <div className="rating">{this.props.rating}</div>

        <div
          onClick={() => downvote(trackId)}
          className="material-icons downvote"
        >
          keyboard_arrow_down
        </div>
      </div>
    );
  }
}
