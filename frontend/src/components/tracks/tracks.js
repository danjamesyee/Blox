import React from "react";
import * as Tone from "tone";

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.addNoteToTrack = this.addNoteToTrack.bind(this);
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
    this.state.track = [];
    this.state.notes = [];
  }

  componentDidMount() {
    this.props.fetchBlocks();
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger;
    this.props.makeTrack(this.state.track);
  }

  addNoteToTrack(note, length, block) {
    const synth = new Tone.Synth().toMaster();
    this.state.notes.push([note, length]);
    this.setState({ notes: this.state.notes });
    this.state.track.push(block);
    // this.setState({
    //   part: new Tone.Sequence(
    //     function (time, pitch) {
    //       synth.triggerAttackRelease(pitch, time);
    //     },
    //     this.state.track,
    //     "8n"
    //   ),
    // });
    console.log(block);
    // debugger;
  }

  playNote(part) {
    Tone.Transport.start();
    const synth = new Tone.Synth().toMaster();
    // this.state.part.loop = true;

    // if (this.state.part.state === "started") {
    //   this.state.part.stop(0);
    // } else {
    //   this.state.part.start(0);
    // }
    // debugger;
    for (let i = 0; i < this.state.notes.length; i++) {
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
    const synth = new Tone.Synth().toMaster();
    // debugger;

    let notes = this.state.notes || [];
    let blocks = this.props.blocks || [];
    debugger;
    return (
      <div>
        <h1>MERNblocks</h1>
        <ul>
          {notes.map((note, i) => (
            <div key={i}>{note}</div>
          ))}
        </ul>
        <button onClick={() => this.playNote()}>Play</button>

        <h3>Quarter Notes</h3>
        <button
          onClick={() => this.addNoteToTrack("C4", "4n", blocks[0])}
          onMouseEnter={() => synth.triggerAttackRelease("C4", "4n")}
        >
          C4
        </button>
        <button
          onClick={() => this.addNoteToTrack("D4", "4n", blocks[1])}
          onMouseEnter={() => synth.triggerAttackRelease("D4", "4n")}
        >
          D4
        </button>
        <button
          onClick={() => this.addNoteToTrack("E4", "4n", blocks[3])}
          onMouseEnter={() => synth.triggerAttackRelease("E4", "4n")}
        >
          E4
        </button>
        <button
          onClick={() => this.addNoteToTrack("F4", "4n", blocks[2])}
          onMouseEnter={() => synth.triggerAttackRelease("F4", "4n")}
        >
          F4
        </button>
        <button
          onClick={() => this.addNoteToTrack("G4", "4n", blocks[4])}
          onMouseEnter={() => synth.triggerAttackRelease("G4", "4n")}
        >
          G4
        </button>
        <button
          onClick={() => this.addNoteToTrack("A4", "4n", blocks[8])}
          onMouseEnter={() => synth.triggerAttackRelease("A4", "4n")}
        >
          A4
        </button>
        <button
          onClick={() => this.addNoteToTrack("B4", "4n", blocks[5])}
          onMouseEnter={() => synth.triggerAttackRelease("B4", "4n")}
        >
          B4
        </button>
        <button
          onClick={() => this.addNoteToTrack("C5", "4n", blocks[6])}
          onMouseEnter={() => synth.triggerAttackRelease("C5", "4n")}
        >
          C5
        </button>

        <h3>Eighth notes</h3>
        <button
          onClick={() => this.addNoteToTrack("C4", "8n", blocks[7])}
          onMouseEnter={() => synth.triggerAttackRelease("C4", "8n")}
        >
          C4
        </button>
        <button
          onClick={() => this.addNoteToTrack("D4", "8n", blocks[10])}
          onMouseEnter={() => synth.triggerAttackRelease("D4", "8n")}
        >
          D4
        </button>
        <button
          onClick={() => this.addNoteToTrack("E4", "8n", blocks[9])}
          onMouseEnter={() => synth.triggerAttackRelease("E4", "8n")}
        >
          E4
        </button>
        <button
          onClick={() => this.addNoteToTrack("F4", "8n", blocks[12])}
          onMouseEnter={() => synth.triggerAttackRelease("F4", "8n")}
        >
          F4
        </button>
        <button
          onClick={() => this.addNoteToTrack("G4", "8n", blocks[13])}
          onMouseEnter={() => synth.triggerAttackRelease("G4", "8n")}
        >
          G4
        </button>
        <button
          onClick={() => this.addNoteToTrack("A4", "8n", blocks[11])}
          onMouseEnter={() => synth.triggerAttackRelease("A4", "8n")}
        >
          A4
        </button>
        <button
          onClick={() => this.addNoteToTrack("B4", "8n", blocks[17])}
          onMouseEnter={() => synth.triggerAttackRelease("B4", "8n")}
        >
          B4
        </button>
        <button
          onClick={() => this.addNoteToTrack("C5", "8n", blocks[16])}
          onMouseEnter={() => synth.triggerAttackRelease("C5", "8n")}
        >
          C5
        </button>

        <h3>Sixteenth notes</h3>
        <button
          onClick={() => this.addNoteToTrack("C4", "16n", blocks[15])}
          onMouseEnter={() => synth.triggerAttackRelease("C4", "16n")}
        >
          C4
        </button>
        <button
          onClick={() => this.addNoteToTrack("D4", "16n", blocks[18])}
          onMouseEnter={() => synth.triggerAttackRelease("D4", "16n")}
        >
          D4
        </button>
        <button
          onClick={() => this.addNoteToTrack("E4", "16n", blocks[14])}
          onMouseEnter={() => synth.triggerAttackRelease("E4", "16n")}
        >
          E4
        </button>
        <button
          onClick={() => this.addNoteToTrack("F4", "16n", blocks[20])}
          onMouseEnter={() => synth.triggerAttackRelease("F4", "16n")}
        >
          F4
        </button>
        <button
          onClick={() => this.addNoteToTrack("G4", "16n", blocks[19])}
          onMouseEnter={() => synth.triggerAttackRelease("G4", "16n")}
        >
          G4
        </button>
        <button
          onClick={() => this.addNoteToTrack("A4", "16n", blocks[21])}
          onMouseEnter={() => synth.triggerAttackRelease("A4", "16n")}
        >
          A4
        </button>
        <button
          onClick={() => this.addNoteToTrack("B4", "16n", blocks[23])}
          onMouseEnter={() => synth.triggerAttackRelease("B4", "16n")}
        >
          B4
        </button>
        <button
          onClick={() => this.addNoteToTrack("C5", "16n", blocks[22])}
          onMouseEnter={() => synth.triggerAttackRelease("C5", "16n")}
        >
          C5
        </button>

        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
        <footer>Copyright &copy; 2020 Daniel Group</footer>
      </div>
    );
  }
}

export default Tracks;
