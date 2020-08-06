import React from "react";
import { Link } from "react-router-dom";
import * as Tone from "tone";
import * as ReactBootStrap from "react-bootstrap";
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tracks: [], isLoading: true, playing: -1 };
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserTracks(this.props.match.params.userId);
    this.props.fetchBlocks();
    this.setState({ isLoading: false });
  }

  componentWillReceiveProps(newState) {
    this.setState({ tracks: newState.tracks });
  }
  playNote(track) {
    this.setState({ playing: track._id });
    const synth = new Tone.Synth().toMaster();

    let note = 0;
    // debugger;
    synth.setNote(track.blocks[note].note);

    Tone.Transport.scheduleRepeat((time) => {
      if (note >= track.blocks.length || this.state.playing === -1) {
        this.setState({ playing: -1 });

        synth.triggerRelease(time);
        Tone.Transport.cancel();
      } else {
        synth.setNote(track.blocks[note].note);

        synth.triggerAttackRelease(
          track.blocks[note].note,
          track.blocks[note].duration,
          time
        );
      }
      note++;
    }, track.blocks[note].duration);

    Tone.Transport.start();
    // Tone.Transport.start();
    // const synth = new Tone.Synth().toMaster();
    // for (let i = 0; i < track.blocks.length; i++) {
    //   synth.triggerAttackRelease(
    //     track.blocks[i].note,
    //     track.blocks[i].duration
    //   );
    //   if (track.blocks[i].duration === "16n") {
    //     this.sleep(200);
    //   } else if (track.blocks[i].duration === "8n") {
    //     this.sleep(400);
    //   } else if (track.blocks[i].duration === "4n") {
    //     this.sleep(800);
    //   }
    // }
  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }
  render() {
    let pause = (
      <img
        src={require("../../assets/stylesheets/stop.png")}
        alt="pause-button"
        className="stop-button"
        onClick={() => {
          this.playing = false;
          this.setState({ playing: -1 });
        }}
      ></img>
    );
    let blocks = this.props.blocks || {};
    let tracks = this.state.tracks || [];
    let user = tracks[0] || {};

    for (let i = 0; i < tracks.length; i++) {
      for (let j = 0; j < tracks[i].blocks.length; j++) {
        for (let b = 0; b < blocks.length; b++) {
          if (blocks[b]._id === tracks[i].blocks[j]) {
            tracks[i].blocks[j] = blocks[b];
          }
        }
      }
    }
    if (this.state.tracks.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactBootStrap.Spinner animation="border" />
          &nbsp; &nbsp;This User has no tracks
        </div>
      );
    } else {
      return (
        <div>
          {" "}
          {this.state.isLoading ? (
            <ReactBootStrap.Spinner animation="border" />
          ) : (
            <div className="main-page">
              <h2>All of {user.user.handle}'s tracks</h2>
              {tracks.map((track, i) => (
                <div className="track-outer" key={i}>
                  <h4 id="tt">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/tracks/${track._id}`}
                    >
                      {track.title}
                    </Link>
                  </h4>

                  <div className="flexer">
                    {this.state.playing === track._id ? (
                      pause
                    ) : (
                      <img
                        src={require("../../assets/stylesheets/play.png")}
                        alt="play-button"
                        className="play-button"
                        onClick={() => this.playNote(track)}
                      ></img>
                    )}
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
          )}
        </div>
      );
    }
  }
}
export default Profile;
