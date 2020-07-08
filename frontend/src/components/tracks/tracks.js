import React from "react";
import * as Tone from "tone";
import "./tracks.scss";

let colors = {
  color0: "#AF3508",
  color2: "#C64E1B",
  color1: "#DD662E",
  color3: "#E98440",
  color6: "#F5A151",
  color5: "#F5A951",
  color4: "#F4B150",
  color7: "#E6B775",
  rest: "#black",
  color11: "#6E607A",
  color10: "#957F9E",
  color9: "#BC9EC1",
  color12: "#C6A5C3",
  color13: "#D0ACC4",
  color14: "#E3BAC6",
  color15: "#EAC6CF",
  color16: "#FDE8E9",
  color18: "#031A6B",
  color19: "#182288",
  color20: "#2C29A4",
  color22: "#5438DC",
  color21: "#4D4AE1",
  color24: "#455BE5",
  color25: "#357DED",
};

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
    // debugger;
    this.props.makeTrack({ title: this.state.title, blocks: this.state.track });
  }

  addNoteToTrack(note, length, block, width, height, color) {
    const synth = new Tone.Synth().toMaster();
    this.state.notes.push([note, length, width, height, color]);
    this.setState({ notes: this.state.notes });
    this.state.track.push(block);
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
    let titleError;
    if (this.props.errors.title === undefined) {
      titleError = <div className="errors"></div>;
    } else {
      titleError = (
        <div className="errors">
          {Object.values(this.props.errors.title).join("")}
        </div>
      );
    }

    let blocksError;
    if (this.props.errors.blocks === undefined) {
      blocksError = <div className="errors"></div>;
    } else {
      blocksError = (
        <div className="errors">
          {Object.values(this.props.errors.blocks).join("")}
        </div>
      );
    }

    let notes = this.state.notes || [];
    let blocks = Object.values(this.props.blocks) || [];
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
          {titleError}
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

          <h3>Click the note buttons to add them to the track</h3>
          <h4>Quarter Notes</h4>
          {blocks
            .slice(0, 8)
            .sort()
            .map((block) => (
              <button
                style={{
                  backgroundColor: block.color,
                }}
                type="button"
                onClick={() =>
                  this.addNoteToTrack(
                    block.note,
                    block.duration,
                    block,
                    block.width,
                    block.height,
                    block.color
                  )
                }
                onMouseEnter={() =>
                  synth.triggerAttackRelease(block.note, block.duration)
                }
              >
                {block.note}
              </button>
            ))}
          <button
            style={{
              backgroundColor: "",
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[0].note,
                blocks[0].duration,
                blocks[0],
                blocks[0].width,
                blocks[0].height,
                blocks[0].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[0].note, blocks[0].duration)
            }
          >
            C4
          </button>

          <button
            style={{
              backgroundColor: colors.color2,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[2].note,
                blocks[2].duration,
                blocks[2],
                blocks[2].width,
                blocks[2].height,
                blocks[2].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[2].note, blocks[2].duration)
            }
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: colors.color1,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[1].note,
                blocks[1].duration,
                blocks[1],
                blocks[1].width,
                blocks[1].height,
                blocks[1].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[1].note, blocks[1].duration)
            }
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: colors.color3,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[3].note,
                blocks[3].duration,
                blocks[3],
                blocks[3].width,
                blocks[3].height,
                blocks[3].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[3].note, blocks[3].duration)
            }
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: colors.color6,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[6].note,
                blocks[6].duration,
                blocks[6],
                blocks[6].width,
                blocks[6].height,
                blocks[6].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[6].note, blocks[6].duration)
            }
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: colors.color5,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[5].note,
                blocks[5].duration,
                blocks[5],
                blocks[5].width,
                blocks[5].height,
                blocks[5].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[5].note, blocks[5].duration)
            }
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: colors.color4,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[4].note,
                blocks[4].duration,
                blocks[4],
                blocks[4].width,
                blocks[4].height,
                blocks[4].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[4].note, blocks[4].duration)
            }
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: colors.color7,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[7].note,
                blocks[7].duration,
                blocks[7],
                blocks[7].width,
                blocks[7].height,
                blocks[7].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[7].note, blocks[7].duration)
            }
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: colors.rest,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[8].note,
                blocks[8].duration,
                blocks[8],
                blocks[8].width,
                blocks[8].height,
                blocks[8].color
              )
            }
          >
            Rest
          </button>
          <h4>Eighth notes</h4>
          <button
            style={{
              backgroundColor: colors.color11,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[11].note,
                blocks[11].duration,
                blocks[11],
                blocks[11].width,
                blocks[11].height,
                blocks[11].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[11].note, blocks[11].duration)
            }
          >
            C4
          </button>
          <button
            style={{
              backgroundColor: colors.color10,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[10].note,
                blocks[10].duration,
                blocks[10],
                blocks[10].width,
                blocks[10].height,
                blocks[10].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[10].note, blocks[10].duration)
            }
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: colors.color9,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[9].note,
                blocks[9].duration,
                blocks[9],
                blocks[9].width,
                blocks[9].height,
                blocks[9].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[9].note, blocks[9].duration)
            }
          >
            E4
          </button>
          <button
            style={{
              backgroundColor: colors.color12,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[12].note,
                blocks[12].duration,
                blocks[12],
                blocks[12].width,
                blocks[12].height,
                blocks[12].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[12].note, blocks[12].duration)
            }
          >
            F4
          </button>
          <button
            style={{
              backgroundColor: colors.color13,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[13].note,
                blocks[13].duration,
                blocks[13],
                blocks[13].width,
                blocks[13].height,
                blocks[13].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[13].note, blocks[13].duration)
            }
          >
            G4
          </button>
          <button
            style={{
              backgroundColor: colors.color14,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[14].note,
                blocks[14].duration,
                blocks[14],
                blocks[14].width,
                blocks[14].height,
                blocks[14].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[14].note, blocks[14].duration)
            }
          >
            A4
          </button>
          <button
            style={{
              backgroundColor: colors.color15,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[15].note,
                blocks[15].duration,
                blocks[15],
                blocks[15].width,
                blocks[15].height,
                blocks[15].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[15].note, blocks[15].duration)
            }
          >
            B4
          </button>
          <button
            style={{
              backgroundColor: colors.color16,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[16].note,
                blocks[16].duration,
                blocks[16],
                blocks[16].width,
                blocks[16].height,
                blocks[16].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[16].note, blocks[16].duration)
            }
          >
            C5
          </button>
          <button
            style={{
              backgroundColor: colors.rest,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[17].note,
                blocks[17].duration,
                blocks[17],
                blocks[17].width,
                blocks[17].height,
                blocks[17].color
              )
            }
          >
            Rest
          </button>

          <h4>Sixteenth notes</h4>
          <button
            style={{
              backgroundColor: colors.color18,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[18].note,
                blocks[18].duration,
                blocks[18],
                blocks[18].width,
                blocks[18].height,
                blocks[18].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[18].note, blocks[18].duration)
            }
          >
            C4
          </button>
          <button
            style={{
              backgroundColor: colors.color19,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[19].note,
                blocks[19].duration,
                blocks[19],
                blocks[19].width,
                blocks[19].height,
                blocks[19].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[19].note, blocks[19].duration)
            }
          >
            D4
          </button>
          <button
            style={{
              backgroundColor: colors.color20,
            }}
            type="button"
            onClick={() =>
              this.addNoteToTrack(
                blocks[20].note,
                blocks[20].duration,
                blocks[20],
                blocks[20].width,
                blocks[20].height,
                blocks[20].color
              )
            }
            onMouseEnter={() =>
              synth.triggerAttackRelease(blocks[20].note, blocks[20].duration)
            }
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
              this.addNoteToTrack("", "16n", blocks[26], 25, 100, "white")
            }
          >
            Rest
          </button>

          <br />
          <br />

          <input type="submit" value="Save track" />
          {blocksError}
        </form>
      </div>
    );
  }
}

export default Tracks;
