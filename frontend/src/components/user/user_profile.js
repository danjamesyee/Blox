import React from "react";
import { Link } from "react-router-dom";
import * as Tone from "tone";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tracks: [] };
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  componentWillMount() {
    console.log(this.props.currentUser.id);
    this.props.fetchUserTracks(this.props.match.params.userId);
  }

  componentWillReceiveProps(newState) {
    this.setState({ tracks: newState.tracks });
  }
  playNote(track) {
    Tone.Transport.start();
    const synth = new Tone.Synth().toMaster();
    for (let i = 0; i < track.blocks.length; i++) {
      synth.triggerAttackRelease(
        track.blocks[i].note,
        track.blocks[i].duration
      );
      if (track.blocks[i].duration === "16n") {
        this.sleep(200);
      } else if (track.blocks[i].duration === "8n") {
        this.sleep(400);
      } else if (track.blocks[i].duration === "4n") {
        this.sleep(800);
      }
    }
  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }
  render() {
    debugger;
    if (this.state.tracks.length === 0) {
      return <div>This user has no tracks</div>;
    } else {
      return (
        <div>
          <h2>All of This User's tracks</h2>
          {this.state.tracks.map((track, i) => (
            <div className="track-outer" key={i}>
              <h4 id="tt">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/tracks/${track._id}`}
                >
                  {track.title}
                </Link>
              </h4>
              <h4 id="th">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/users/${track.user._id}`}
                >
                  by {track.user.handle}
                </Link>
              </h4>
              <div className="flexer">
                <img
                  src="https://www.pinpng.com/pngs/m/47-472328_play-button-svg-png-icon-free-download-download.png"
                  className="play-button"
                  onClick={() => this.playNote(track)}
                ></img>
                <br />
                <Link className="link-to-track" to={`/tracks/${track._id}`}>
                  <div className="track">
                    {track.blocks.map((block, i) => (
                      <div
                        style={{
                          backgroundColor: block.color,
                          width: block.width,
                          height: block.height,
                        }}
                        key={i}
                      ></div>
                    ))}
                    <br />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Profile;
