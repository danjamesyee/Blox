import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tracks: [] };
  }

  componentWillMount() {
    console.log(this.props.currentUser.id);
    this.props.fetchUserTracks(this.props.match.params.userId);
  }

  componentWillReceiveProps(newState) {
    this.setState({ tracks: newState.tracks });
  }

  render() {
    // debugger;
    if (this.state.tracks.length === 0) {
      return <div>This user has no tracks</div>;
    } else {
      return (
        <div>
          <h2>All of This User's tracks</h2>
          {this.state.tracks.map((track) => (
            <div>hello</div>
          ))}
        </div>
      );
    }
  }
}

export default Profile;
