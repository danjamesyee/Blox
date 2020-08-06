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
    console.log(track.blocks);
    const synth = new Tone.Synth().toMaster();
    // synth.oscillator.type = "sine";
    let newPart = [];
    let dur = 0;
    track.blocks.forEach((block) => {
      if (block.duration === "4n") dur += 0.5;
      if (block.duration === "8n") dur += 0.25;
      if (block.duration === "16n") dur += 0.125;

      newPart.push([dur, block.note]);
    });
    newPart.push([dur + 1, "C4"]);
    this.setState({ playing: track._id });
    console.log(newPart);

    let note = 0;
    console.log(Tone.Transport);
    Tone.Transport.cancel();

    let part = new Tone.Part((time, pitch) => {
      if (note >= newPart.length - 1 || this.state.playing === -1) {
        this.setState({ playing: -1 });

        Tone.Transport.cancel();
      } else {
        synth.triggerAttackRelease(pitch, "4n", time);
      }
      // console.log(pitch);
      // console.log(note);

      note++;
    }, newPart);

    part.start();
    Tone.Transport.start();
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
