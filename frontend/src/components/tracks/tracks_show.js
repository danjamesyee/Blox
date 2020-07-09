import React from "react";
import * as Tone from "tone";
import CommentsContainer from '../comments/comments_container';
//what users will see when they land on the home page
class TracksShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.state.track = [];
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  componentDidMount() {
    // debugger;
    this.props.fetchBlocks();
    this.props.fetchTrack(this.props.match.params.trackId);
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
    let blocks = Object.values(this.props.blocks) || [];
    let track = this.props.tracks.track || [];
    // debugger;
    if (blocks.length === 0 || track.length === 0) {
      return null;
    } else {
      for (let j = 0; j < track.blocks.length; j++) {
        for (let b = 0; b < blocks.length; b++) {
          if (blocks[b]._id === track.blocks[j]) {
            track.blocks[j] = blocks[b];
          }
        }
      }
    }

    return (
      <div className="main-page">
        <header>
          <strong>
            <h1 className="title">BLOX</h1>
          </strong>
          <small>BEAT</small>
        </header>

        <div className="top-tracks">The best rhythm-beat maker in the biz!</div>
        <br />

        <div className="track-outer">
          <h4>{track.title}</h4>
          <h3></h3>
          <br />

          <img
            src="https://www.pinpng.com/pngs/m/47-472328_play-button-svg-png-icon-free-download-download.png"
            className="play-button"
            onClick={() => this.playNote(track)}
          ></img>
          <br />

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

          <CommentsContainer tracksId={this.props.match.params.trackId} />
        </div>
      </div>
    );
  }
}

export default TracksShowPage;
