import React from "react";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // ! N + 1 queries (FIXED)
    const { fetchTrackVotes, trackId } = this.props;

    fetchTrackVotes(trackId);
    // currentUserVote(votes, currentUser._id);
  }

  render() {
     

    const { upvote, downvote, trackId, currentUser } = this.props;
    const { votes, receiveRatings } = this.props;
    if (Object.keys(votes).length > 0) {
      const votesArr = Object.values(votes);
      let rating = 0;

      votesArr.forEach((vote) => {
        if (vote.track == trackId) {
          rating += vote.rating;
        }
      });
      
      receiveRatings(trackId, rating);
    }

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
        <div onClick={() => upvote(trackId)} className={"material-icons upvote" + upvoted}>
          keyboard_arrow_up
        </div>

        <div className="rating">{this.props.rating}</div>

        <div
          onClick={() => downvote(trackId)}
          className={"material-icons downvote" + downvoted}
        >
          keyboard_arrow_down
        </div>
      </div>
    );
  }
}
