import React from "react";
import * as Tone from "tone";
import "./tracks.scss";

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.addNoteToTrack = this.addNoteToTrack.bind(this);
    this.playNote = this.playNote.bind(this);
    this.sleep = this.sleep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { title: "" };
    this.state.track = [];
    this.state.notes = [];
  }

  componentDidMount() {
    this.props.fetchBlocks();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.makeTrack({ title: this.state.title, blocks: this.state.track });

  }

  addNoteToTrack(note, length, block, width, height, color) {
    const synth = new Tone.Synth().toMaster();
    this.state.notes.push([note, length, width, height, color]);
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
    // debugger;
    return (
      <div className="tracks-container">
        <h2 className="tracks-title">Unleash your inner musical genius</h2>
        <form className="track-title-form" onSubmit={this.handleSubmit}>
          <label>
            Title your masterpiece...
            <br />
            <input
              type="text"
              value={this.state.title}
              onChange={this.update("title")}
            />
          </label>
          <div className="notes">
            {notes.map((note, i) => (
              <div
                style={{
                  backgroundColor: note[note.length - 1],
                  width: note[note.length - 3],
                  height: note[note.length - 2],
                }}
                key={i}
              >
                {/* {note[1]} */}
              </div>
            ))}
          </div>
          <br />

          <button
            className="play-button"
            type="button"
            onClick={() => this.playNote()}
          >
            Play
          </button>
          <button
            className="play-button"
            type="button"
            onClick={() => this.setState({ notes: [], track: [] })}
          >
            Clear
          </button>
          <h3>Quarter Notes</h3>
          <button
            style={{
              backgroundColor: "#AF3508",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("C4", "4n", blocks[0], 100, 25, "#AF3508")
            }
            onMouseEnter={() => synth.triggerAttackRelease("C4", "4n")}
          >
            C4
          </button>
          <button
            style={{
              backgroundColor: "#C64E1B",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("D4", "4n", blocks[1], 100, 25, "#C64E1B")
            }
            onMouseEnter={() => synth.triggerAttackRelease("D4", "4n")}
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: "#DD662E",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("E4", "4n", blocks[3], 100, 25, "#DD662E")
            }
            onMouseEnter={() => synth.triggerAttackRelease("E4", "4n")}
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: "#E98440",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("F4", "4n", blocks[2], 100, 25, "#E98440")
            }
            onMouseEnter={() => synth.triggerAttackRelease("F4", "4n")}
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: "#F5A151",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("G4", "4n", blocks[4], 100, 25, "#F5A151")
            }
            onMouseEnter={() => synth.triggerAttackRelease("G4", "4n")}
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: "#F5A951",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("A4", "4n", blocks[8], 100, 25, "#F5A951")
            }
            onMouseEnter={() => synth.triggerAttackRelease("A4", "4n")}
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: "#F4B150",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("B4", "4n", blocks[5], 100, 25, "#F4B150")
            }
            onMouseEnter={() => synth.triggerAttackRelease("B4", "4n")}
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: "#E6B775",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("C5", "4n", blocks[6], 100, 25, "#E6B775")
            }
            onMouseEnter={() => synth.triggerAttackRelease("C5", "4n")}
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: "black",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("", "4n", blocks[22], 100, 25, "white")
            }
          >
            Rest
          </button>
          <h3>Eighth notes</h3>
          <button
            style={{
              backgroundColor: "#6E607A",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("C4", "8n", blocks[7], 50, 50, "#6E607A")
            }
            onMouseEnter={() => synth.triggerAttackRelease("C4", "8n")}
          >
            C4
          </button>
          <button
            style={{
              backgroundColor: "#957F9E",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("D4", "8n", blocks[10], 50, 50, "#957F9E")
            }
            onMouseEnter={() => synth.triggerAttackRelease("D4", "8n")}
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: "#BC9EC1",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("E4", "8n", blocks[9], 50, 50, "#BC9EC1")
            }
            onMouseEnter={() => synth.triggerAttackRelease("E4", "8n")}
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: "#C6A5C3",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("F4", "8n", blocks[12], 50, 50, "#C6A5C3")
            }
            onMouseEnter={() => synth.triggerAttackRelease("F4", "8n")}
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: "#D0ACC4",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("G4", "8n", blocks[13], 50, 50, "#D0ACC4")
            }
            onMouseEnter={() => synth.triggerAttackRelease("G4", "8n")}
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: "#E3BAC6",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("A4", "8n", blocks[11], 50, 50, "#E3BAC6")
            }
            onMouseEnter={() => synth.triggerAttackRelease("A4", "8n")}
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: "#EAC6CF",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("B4", "8n", blocks[17], 50, 50, "#EAC6CF")
            }
            onMouseEnter={() => synth.triggerAttackRelease("B4", "8n")}
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: "#FDE8E9",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("C5", "8n", blocks[16], 50, 50, "#FDE8E9")
            }
            onMouseEnter={() => synth.triggerAttackRelease("C5", "8n")}
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: "black",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("", "8n", blocks[22], 50, 50, "white")
            }
          >
            Rest
          </button>

          <h3>Sixteenth notes</h3>
          <button
            style={{
              backgroundColor: "#031A6B",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("C4", "16n", blocks[15], 25, 100, "#031A6B")
            }
            onMouseEnter={() => synth.triggerAttackRelease("C4", "16n")}
          >
            C4
          </button>
          <button
            style={{
              backgroundColor: "#182288",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("D4", "16n", blocks[18], 25, 100, "#182288")
            }
            onMouseEnter={() => synth.triggerAttackRelease("D4", "16n")}
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: "#2C29A4",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("E4", "16n", blocks[14], 25, 100, "#2C29A4")
            }
            onMouseEnter={() => synth.triggerAttackRelease("E4", "16n")}
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: "#5438DC",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("F4", "16n", blocks[20], 25, 100, "#5438DC")
            }
            onMouseEnter={() => synth.triggerAttackRelease("F4", "16n")}
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: "#4D4AE1",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("G4", "16n", blocks[19], 25, 100, "#4D4AE1")
            }
            onMouseEnter={() => synth.triggerAttackRelease("G4", "16n")}
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: "#455BE5",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("A4", "16n", blocks[21], 25, 100, "#455BE5")
            }
            onMouseEnter={() => synth.triggerAttackRelease("A4", "16n")}
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: "#357DED",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("B4", "16n", blocks[23], 25, 100, "#357DED")
            }
            onMouseEnter={() => synth.triggerAttackRelease("B4", "16n")}
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: "#4789EF",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("C5", "16n", blocks[22], 25, 100, "#4789EF")
            }
            onMouseEnter={() => synth.triggerAttackRelease("C5", "16n")}
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: "black",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack("", "16n", blocks[22], 25, 100, "white")
            }
          >
            Rest
          </button>

          <br />
          <br />

          <input type="submit" value="Save track" />
        </form>
      </div>
    );
  }
}

export default Tracks;
