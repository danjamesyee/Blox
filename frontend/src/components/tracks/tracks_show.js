import React from "react";
import * as Tone from "tone";
import CommentsContainer from "../comments/comments_container";
import { Link } from "react-router-dom";
import VotesContainer from "../votes/votes_container";
import * as ReactBootStrap from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

//what users will see when they land on the home page
class TracksShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, playing: -1 };
    // this.state.track = [];
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  componentDidMount() {
    this.props.fetchBlocks();
    this.props.fetchTrack(this.props.match.params.trackId);
    this.setState({ isLoading: false });
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
    let blocks = Object.values(this.props.blocks) || [];
    let track = this.props.track || [];
    if (blocks.length === 0 || track.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactBootStrap.Spinner animation="border" />
        </div>
      );
    } else {
      for (let j = 0; j < track.blocks.length; j++) {
        for (let b = 0; b < blocks.length; b++) {
          if (blocks[b]._id === track.blocks[j]) {
            track.blocks[j] = blocks[b];
          }
        }
      }
    }
    let editLink;
    if (
      this.props.currentUser &&
      this.props.currentUser.id === track.user._id
    ) {
      editLink = (
        <div>
          <Link id="show-edit" to={`/tracks/${track._id}/edit`}>
            Edit
          </Link>
          <div
            id="delete-track-button"
            onClick={() =>
              this.props
                .destroyTrack(track._id)
                .then(this.props.history.push(`/users/${track.user._id}`))
                .then(() => window.location.reload())
            }
          >
            Delete
          </div>
        </div>
      );
    } else {
      editLink = <div></div>;
    }

    return (
      <div>
        {this.state.isLoading ? (
          <ReactBootStrap.Spinner animation="border" />
        ) : (
          <div className="main-page">
            <header>
              <strong>
                <h1 className="title">BLOX</h1>
              </strong>
              <small>BEAT</small>
            </header>

            <div className="top-tracks">
              The best rhythm-beat maker in the biz!
            </div>
            <br />

            <div className="track-outer">
              <h4 id="show-title">{track.title}</h4>
              <h4 id="show-handle">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/users/${track.user._id}`}
                >
                  by {track.user.handle}
                </Link>
              </h4>{" "}
              <br />
              <br />
              <div className="outer-track-container">
                <VotesContainer trackId={this.props.match.params.trackId} />
                {this.state.playing === this.props.match.params.trackId ? (
                  pause
                ) : (
                  <img
                    alt=""
                    src={require("../../assets/stylesheets/play.png")}
                    className="play-button"
                    onClick={() => this.playNote(track)}
                  ></img>
                )}
                <div className="track" onClick={() => this.playNote(track)}>
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
              </div>
              {editLink}
              <CommentsContainer trackId={this.props.match.params.trackId} />
            </div>
          </div>
        )}
        <NotificationContainer />
      </div>
    );
  }
}

export default TracksShowPage;
