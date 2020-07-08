import React from "react";
import * as Tone from "tone";

//what users will see when they land on the home page
class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBlocks();
    this.props.fetchTracks();
  }

  playNote(track) {
    Tone.Transport.start();
    const synth = new Tone.Synth().toMaster();
    // this.state.part.loop = true;

    // if (this.state.part.state === "started") {
    //   this.state.part.stop(0);
    // } else {
    //   this.state.part.start(0);
    // }
    // debugger;
    for (let i = 0; i < track.length; i++) {
      // debugger;

      synth.triggerAttackRelease(
        this.state.notes[i][0],
        this.state.notes[i][1]
      );
      if (this.state.notes[i][1] === "16n") {
        this.sleep(200);
      } else if (this.state.notes[i][1] === "8n") {
        this.sleep(400);
      } else if (this.state.notes[i][1] === "4n") {
        this.sleep(800);
      }
    }
  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
  }

  render() {
    let blocks = this.props.blocks || {};
    let tracks = this.props.tracks || [];
    // debugger;
    return (
      <div className="main-page">
        <header>
          <strong>
            <h1 className="title">BLOX</h1>
          </strong>
          <small>BEAT</small>
        </header>

        <span>The best rhythm-beat maker in the biz!</span>
        <br />
        {tracks.map((track) => (
          <div>{track.blocks}</div>
        ))}
      </div>
    );
  }
}

export default MainPage;
