import React from 'react';

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { fetchTrackVotes, trackId } = this.props;
    // ! N + 1 queries
    fetchTrackVotes(trackId);
  }

  render () {
    const { upvote, downvote, trackId } = this.props;

    return (
      <div onClick={() => upvote(trackId)} className="material-icons">
        keyboard_arrow_up
      </div>

      <div onClick={() => downvote(trackId)} className="rating">
        {this.props.rating}
      </div>

      <div className="material-icons">
        keyboard_arrow_down
      </div>
    )
  }
}